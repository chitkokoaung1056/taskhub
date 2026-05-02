import { ProfileType } from "../types/profile"
import { createClient } from "../supabase/server"

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

export async function createProfile(profile: ProfileType) {
  const supabase = await createClient()

  const { error } = await supabase.from("profiles").insert(profile)

  if (error) {
    throw new Error(error.message)
  }
}
