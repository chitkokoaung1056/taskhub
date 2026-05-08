import { createClient } from "../supabase/server"
import { getBaseUrl } from "../utils"

/* ---------------------------
   ERROR MAPPER
---------------------------- */
function mapAuthError(message: string) {
  const msg = message.toLowerCase()

  // login / credentials
  if (msg.includes("invalid login credentials")) {
    return "Email or password is incorrect"
  }

  // wrong current password
  if (
    msg.includes("current password") ||
    msg.includes("incorrect password") ||
    msg.includes("authentication") ||
    msg.includes("invalid credentials")
  ) {
    return "Current password is incorrect"
  }

  // email confirmation
  if (msg.includes("email not confirmed")) {
    return "Please verify your email before signing in"
  }

  // existing user
  if (
    msg.includes("already registered") ||
    msg.includes("user already registered")
  ) {
    return "An account with this email already exists"
  }

  // weak password
  if (msg.includes("password should")) {
    return "Password does not meet security requirements"
  }

  // rate limit
  if (msg.includes("rate limit")) {
    return "Too many attempts. Please try again later"
  }

  // session expired
  if (msg.includes("session")) {
    return "Your session expired. Please login again"
  }

  return "Something went wrong. Please try again"
}

/* ---------------------------
   GET USER
---------------------------- */
export async function getCurrentUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    throw new Error("You are not logged in")
  }

  return data.user
}

/* ---------------------------
   REGISTER
---------------------------- */
export async function registerUser(data: {
  email: string
  password: string
  first_name: string
  last_name: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
      emailRedirectTo: `${getBaseUrl()}/auth/confirm?next=/dashboard`,
    },
  })

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* ---------------------------
   LOGIN
---------------------------- */
export async function loginUser(data: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* ---------------------------
   LOGOUT
---------------------------- */
export async function logoutUser() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("Logout failed. Please try again")
  }
}

/* ---------------------------
   UPDATE PASSWORD
---------------------------- */
export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const supabase = await createClient()

  if (!data.currentPassword || !data.newPassword) {
    throw new Error("All fields are required")
  }

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
    current_password: data.currentPassword,
  })

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* ---------------------------
   UPDATE EMAIL
---------------------------- */
export async function updateEmail(data: { email: string; password: string }) {
  const supabase = await createClient()

  const user = await getCurrentUser()

  // re-authenticate
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: data.password,
  })

  if (signInError) {
    throw new Error("Current password is incorrect")
  }

  const { error: updateError } = await supabase.auth.updateUser({
    email: data.email,
  })

  if (updateError) {
    throw new Error(mapAuthError(updateError.message))
  }
}

/* ---------------------------
   DELETE ACCOUNT
---------------------------- */
export async function deleteAccount() {
  const supabase = await createClient({ isAdmin: true })

  const user = await getCurrentUser()

  const { error } = await supabase.auth.admin.deleteUser(user.id)

  if (error) {
    throw new Error("Failed to delete account. Please contact support.")
  }
}

export async function forgotPassword(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getBaseUrl()}/auth/confirm?next=/update-password`,
  })
  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

export async function resetPassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    throw new Error("Failed to reset password")
  }
}
