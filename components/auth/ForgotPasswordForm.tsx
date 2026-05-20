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

import Link from "next/link"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import { forgotPasswordAction } from "@/lib/actions/auth.action"
import {
  ForgotPasswordErrorsType,
  ForgotPasswordValuesType,
} from "@/lib/types/actionTypes/auth.actionType"

type ForgotPasswordActionStateType = {
  success: boolean
  message?: string[]
  errors?: ForgotPasswordErrorsType
  values?: ForgotPasswordValuesType
}

const initialState: ForgotPasswordActionStateType = {
  success: false,
  errors: {},
  message: [],
}

export default function ForgotPasswordForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()

  const [errors, setErrors] = useState<ForgotPasswordErrorsType>({})

  const [formValues, setFormValues] = useState<ForgotPasswordValuesType>({})

  const clearError = (field: keyof ForgotPasswordErrorsType) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const handleForgotPassword = async (formData: FormData) => {
    setErrors({})

    startTransition(async () => {
      const result = await forgotPasswordAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
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
          Forgot password
        </CardTitle>

        <CardDescription className="text-sm">
          Enter your email and we’ll send you a reset link
        </CardDescription>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleForgotPassword} className="space-y-6">
          <FieldGroup className="space-y-5">
            {/* EMAIL */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                className="mt-2 transition focus-visible:ring-2"
                defaultValue={formValues.email}
                onChange={() => clearError("email")}
              />

              {errors.email && (
                <FieldDescription className="mt-1 text-xs text-destructive">
                  {errors.email[0]}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className={`h-11 w-full text-sm font-medium transition-all duration-200 ${
              isPending ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isPending ? "Sending reset link..." : "Send reset link"}
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
