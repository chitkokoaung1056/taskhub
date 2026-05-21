import { createClient } from "../supabase/server"

/* -----------------------------
   AUTH ERROR MAPPER
------------------------------ */
export function mapAuthError(message: string) {
  const msg = message.toLowerCase()

  // login errors
  if (msg.includes("invalid login credentials")) {
    return "Email or password is incorrect"
  }

  // password change specific errors (MOST IMPORTANT)
  if (msg.includes("new password should be different")) {
    return "New password must be different from current password"
  }

  if (msg.includes("password should be at least")) {
    return "Password must be at least 6 characters"
  }

  if (msg.includes("current password is incorrect")) {
    return "Current password is incorrect"
  }

  // email issues
  if (msg.includes("email not confirmed")) {
    return "Please verify your email before signing in"
  }

  if (msg.includes("already registered")) {
    return "An account with this email already exists"
  }

  if (msg.includes("email")) {
    return "Unable to process email request. Please try again"
  }

  // rate limit
  if (msg.includes("rate limit")) {
    return "Too many attempts. Please try again later"
  }

  // session
  if (msg.includes("session")) {
    return "Session expired. Please login again"
  }

  return "Something went wrong. Please try again"
}

/* -----------------------------
   GET CURRENT USER
------------------------------ */
export async function getCurrentUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    throw new Error("You are not logged in")
  }

  return data.user
}

/* -----------------------------
   REGISTER
------------------------------ */
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
    },
  })

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* -----------------------------
   LOGIN
------------------------------ */
export async function loginUser(data: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* -----------------------------
   LOGOUT
------------------------------ */
export async function logoutUser() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("Unable to logout. Please try again")
  }
}

/* -----------------------------
   UPDATE PASSWORD
------------------------------ */
export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const supabase = await createClient()

  if (!data.currentPassword || !data.newPassword) {
    throw new Error("Please fill in all fields")
  }

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
    current_password: data.currentPassword,
  })

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* -----------------------------
   UPDATE EMAIL
------------------------------ */
export async function updateEmail(data: { email: string; password: string }) {
  const supabase = await createClient()

  const user = await getCurrentUser()

  // same email check
  if (user.email === data.email) {
    throw new Error("Please enter a different email")
  }

  // verify password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: data.password,
  })

  if (signInError) {
    throw new Error("Current password is incorrect")
  }

  // update email
  const { error: updateError } = await supabase.auth.updateUser({
    email: data.email,
  })

  if (updateError) {
    throw new Error("Unable to send email confirmation. Please try again")
  }
}

/* -----------------------------
   DELETE ACCOUNT
------------------------------ */
export async function deleteAccount() {
  const supabase = await createClient({ isAdmin: true })

  const user = await getCurrentUser()

  const { error } = await supabase.auth.admin.deleteUser(user.id)

  if (error) {
    throw new Error("Failed to delete account. Please contact support")
  }
}

/* -----------------------------
   FORGOT PASSWORD
------------------------------ */
export async function forgotPassword(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    throw new Error(mapAuthError(error.message))
  }
}

/* -----------------------------
   RESET PASSWORD
------------------------------ */
export async function resetPassword(newPassword: string) {
  const supabase = await createClient()

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    throw new Error(mapAuthError(updateError.message))
  }
}
