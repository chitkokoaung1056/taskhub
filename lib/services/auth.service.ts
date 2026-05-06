import { createClient } from "../supabase/server"
import { getBaseUrl } from "../utils"

/* ---------------------------
   ERROR MAPPER (IMPORTANT)
---------------------------- */
function mapAuthError(message: string) {
  const msg = message.toLowerCase()

  if (msg.includes("invalid login credentials")) {
    return "Email or password is incorrect"
  }

  if (msg.includes("password")) {
    return "Password is incorrect"
  }

  if (msg.includes("email not confirmed")) {
    return "Please confirm your email first"
  }

  if (msg.includes("rate limit")) {
    return "Too many attempts. Please try again later"
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
      emailRedirectTo: `${getBaseUrl()}/callback`,
    },
  })

  if (error) {
    throw new Error(mapAuthError(error.message))
  }

  return { success: true }
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

  return { success: true }
}

/* ---------------------------
   LOGOUT
---------------------------- */
export async function logoutUser() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("Logout failed. Please try again.")
  }

  return { success: true }
}

/* ---------------------------
   UPDATE PASSWORD
---------------------------- */
export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
    current_password: data.currentPassword,
  })

  if (error) {
    const msg = error.message.toLowerCase()

    if (msg.includes("invalid") || msg.includes("credentials")) {
      throw new Error("Current password is incorrect")
    }

    throw new Error("Failed to update password")
  }

  return { success: true }
}

/* ---------------------------
   UPDATE EMAIL
---------------------------- */
export async function updateEmail(data: { email: string; password: string }) {
  const supabase = await createClient()

  const user = await getCurrentUser()

  // re-auth
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: data.password,
  })

  if (signInError) {
    throw new Error("Incorrect password")
  }

  const { error: updateError } = await supabase.auth.updateUser(
    { email: data.email },
    {
      emailRedirectTo: `${getBaseUrl()}/callback`,
    }
  )

  if (updateError) {
    throw new Error(mapAuthError(updateError.message))
  }

  return { success: true }
}

/* ---------------------------
   DELETE ACCOUNT
---------------------------- */
export async function deleteAccount() {
  const supabase = await createClient()

  const user = await getCurrentUser()

  const { error } = await supabase.auth.admin.deleteUser(user.id)

  if (error) {
    throw new Error("Failed to delete account. Please contact support.")
  }

  return { success: true }
}
