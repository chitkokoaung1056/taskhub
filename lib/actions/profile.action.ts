"use server"

import { z } from "zod"
import { updateProfile } from "@/lib/services/profile.service"
import { profileSchema } from "@/lib/schemas/profile.schema"
import { ProfileActionStateType } from "@/lib/types/actionTypes/profile.actionType"
import { createClient } from "../supabase/server"
import { getCurrentUser } from "../services/auth.service"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(
  prevState: ProfileActionStateType,
  formData: FormData
): Promise<ProfileActionStateType> {
  const supabase = await createClient()

  const file = formData.get("profile_photo") as File | null

  const rawData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  }

  const validationResult = profileSchema.safeParse(rawData)

  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)

    return {
      success: false,
      errors: fieldErrors,
      values: rawData,
    }
  }

  try {
    let profilePhotoUrl: string | undefined

    if (file?.size) {
      const user = await getCurrentUser()
      if (!user) throw new Error("User not authenticated")

      const fileExt = file.name.split(".").pop()

      const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true })

      if (error) throw error

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      profilePhotoUrl = data.publicUrl
    }

    const profile = await updateProfile({
      first_name: validationResult.data.first_name.trim(),
      last_name: validationResult.data.last_name.trim(),
      profile_photo: profilePhotoUrl ?? undefined,
    })
    revalidatePath("/")

    return {
      success: true,
      message: ["Profile updated successfully!"],
      errors: {},
      values: { ...profile },
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
      values: rawData,
    }
  }
}
