import { ProfileType } from "../types/profile"
import { createClient } from "../supabase/server"
import { getCurrentUser } from "./auth.service"

export async function getProfile(): Promise<ProfileType> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("profiles").select("*").single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Profile not found")
  }

  return data
}

export async function updateProfile(
  profile: Partial<ProfileType>
): Promise<ProfileType> {
  const supabase = await createClient()
  const user = await getCurrentUser()

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Profile not exist!!")
  }

  return data
}
