import { createClient } from "../supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  if (!data.user) {
    throw new Error("User not found")
  }

  return data.user
}

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
      emailRedirectTo: "/dashboard",
    },
  })

  if (error) {
    throw new Error(error.message)
  }
}

export async function loginUser(data: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(error.message)
  }
}

export async function logoutUser() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

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
    throw new Error(error.message)
  }
}

export async function updateEmail(data: { email: string; password: string }) {
  const supabase = await createClient()

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error("User not found")
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: currentUser.email || "",
    password: data.password,
  })

  if (signInError) {
    throw new Error("Incorrect password")
  }

  const { error: updateError } = await supabase.auth.updateUser({
    email: data.email,
  })

  if (updateError) {
    throw new Error(updateError.message)
  }
}

export async function deleteAccount() {
  const supabase = await createClient("deleteAccount")

  const userId = (await getCurrentUser()).id
  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) {
    throw new Error(error.message)
  }
}
