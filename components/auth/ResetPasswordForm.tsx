"use client"

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

import { useState, useTransition } from "react"
import { toast } from "sonner"

import { resetPasswordAction } from "@/lib/actions/auth.action"
import {
  ResetPasswordActionStateType,
  ResetPasswordErrorsType,
  ResetPasswordValuesType,
} from "@/lib/types/actionTypes/auth.actionType"
import { useRouter } from "next/navigation"

const initialState: ResetPasswordActionStateType = {
  success: false,
  errors: {},
  message: [],
}

export default function ResetPasswordForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()

  const [errors, setErrors] = useState<ResetPasswordErrorsType>({})
  const router = useRouter()

  const [formValues, setFormValues] = useState<ResetPasswordValuesType>({})

  const clearError = (field: keyof ResetPasswordErrorsType) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const handleForgotPassword = async (formData: FormData) => {
    setErrors({})

    startTransition(async () => {
      const result = await resetPasswordAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
        router.replace(result.redirectTo || "/login")
      }

      if (!result.success && result.errors?.general) {
        toast.error(result.errors.general[0])
      }

      setErrors(result.errors || {})
      setFormValues(result.values || {})
    })
  }

  return (
    <Card
      {...props}
      className="w-full border-muted/40 px-4 py-8 shadow-xl backdrop-blur supports-backdrop-filter:bg-background/70"
    >
      {/* HEADER */}
      <CardHeader className="mb-6 space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Reset password
        </CardTitle>

        <CardDescription className="text-sm">
          Enter your new password
        </CardDescription>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleForgotPassword} className="space-y-6">
          <FieldGroup className="space-y-5">
            {/* PASSWORD */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 transition focus-visible:ring-2"
                defaultValue={formValues.password}
                onChange={() => clearError("password")}
              />

              {errors.password && (
                <FieldDescription className="mt-1 text-xs text-destructive">
                  {errors.password[0]}
                </FieldDescription>
              )}
            </Field>

            {/* CONFIRM PASSWORD (ADDED) */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2 transition focus-visible:ring-2"
                defaultValue={formValues.confirmPassword}
                onChange={() => clearError("confirmPassword")}
              />

              {errors.confirmPassword && (
                <FieldDescription className="mt-1 text-xs text-destructive">
                  {errors.confirmPassword[0]}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          {/* BUTTON (UPDATED TEXT) */}
          <Button
            type="submit"
            disabled={isPending}
            className={`h-11 w-full text-sm font-medium transition-all duration-200 ${
              isPending ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isPending ? "Resetting password..." : "Reset password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
