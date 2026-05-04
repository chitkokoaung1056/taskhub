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
