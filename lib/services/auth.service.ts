import { createClient } from "../supabase/server"
import { AuthServiceResponse, AuthType } from "../types/auth"

export async function registerUser(
  authData: AuthType
): Promise<AuthServiceResponse<AuthType>> {
  const supabase = await createClient()

  const { email, password } = authData
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) return { error: new Error(error.message) }
  return { error: null }
}

export async function loginUser(
  authData: AuthType
): Promise<AuthServiceResponse<AuthType>> {
  const supabase = await createClient()

  const { email, password } = authData
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: new Error(error.message) }
  return { error: null }
}

export async function logoutUser(): Promise<AuthServiceResponse<null>> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) return { error: new Error(error.message) }
  return { error: null }
}
