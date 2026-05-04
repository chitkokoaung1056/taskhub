"use client"

import { use, useRef, useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ProfileHeader } from "./ProfileHeader"
import imageCompression from "browser-image-compression"
import {
  ProfileActionStateType,
  ProfileErrorsType,
  ProfileValuesType,
} from "@/lib/types/actionTypes/profile.actionType"
import { updateProfileAction } from "@/lib/actions/profile.action"
import { ProfileType } from "@/lib/types/profile"
import { User } from "@supabase/supabase-js"

const initialState: ProfileActionStateType = {
  success: false,
  errors: {},
  message: [],
}

type Props = {
  profile: Promise<ProfileType>
  user: Promise<User>
}

export function ProfileSection({ profile, user }: Props) {
  const currentProfile = use(profile)
  const currentUser = use(user)

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<ProfileErrorsType>({})
  const [formValues, setFormValues] = useState<ProfileValuesType>(
    currentProfile || {}
  )

  const clearError = (field: keyof ProfileErrorsType) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleFileChange = async (file: File | null) => {
    if (!file) return

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
    })

    setFile(compressedFile)
    setPreview(URL.createObjectURL(compressedFile))
  }

  const handleSubmit = async (formData: FormData) => {
    setErrors({})

    if (file) {
      formData.append("profile_photo", file)
    }

    startTransition(async () => {
      const result = await updateProfileAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
        setFormValues(result.values || {})
      } else if (!result.success && result.errors?.general) {
        toast.error(result.errors.general[0])
        setFormValues(result.values || {})
      }

      if (!result.success && result.errors) {
        setErrors(result.errors)
        setFormValues(result.values || {})
      }
    })
  }

  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          Profile Information
        </CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>

      <CardContent className="mt-2">
        <form action={handleSubmit} className="space-y-6">
          <FieldGroup className="space-y-5">
            {/* PROFILE */}
            <Field>
              <FieldLabel>Profile</FieldLabel>

              <ProfileHeader
                fileRef={fileRef}
                preview={preview}
                name={
                  currentProfile.first_name + " " + currentProfile.last_name
                }
                email={currentUser.email!}
                onFileChange={handleFileChange}
                avatarUrl={currentProfile.profile_photo}
              />
            </Field>

            {/* NAME */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input
                  name="first_name"
                  placeholder="John"
                  defaultValue={formValues.first_name}
                  onChange={() => clearError("first_name")}
                />
                {errors.first_name && (
                  <FieldDescription className="text-xs text-destructive">
                    {errors.first_name[0]}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input
                  name="last_name"
                  placeholder="Doe"
                  defaultValue={formValues.last_name}
                  onChange={() => clearError("last_name")}
                />
                {errors.last_name && (
                  <FieldDescription className="text-xs text-destructive">
                    {errors.last_name[0]}
                  </FieldDescription>
                )}
              </Field>
            </div>
          </FieldGroup>

          <Button
            type="submit"
            disabled={isPending}
            className="h-10 px-4 text-sm"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
