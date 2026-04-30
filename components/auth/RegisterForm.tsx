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
import { registerUserAction } from "@/lib/actions/auth.action"
import {
  AuthActionErrorType,
  AuthActionStateType,
  AuthActionValuesType,
} from "@/lib/types/actionTypes/auth.actionType"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"

const initialState: AuthActionStateType = {
  success: false,
  errors: {},
  message: [],
}

export default function RegisterForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<AuthActionErrorType>({})
  const [formValues, setFormValues] = useState<AuthActionValuesType>({})
  const router = useRouter()

  const clearError = (field: keyof AuthActionErrorType) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleRegister = async (formData: FormData) => {
    setErrors({})
    setFormValues({})
    startTransition(async () => {
      const result = await registerUserAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
        setFormValues({})
        router.replace("/login")
      } else if (!result.success && result.errors?.general) {
        toast.error(result.errors.general[0])
        setFormValues({})
      }

      if (!result.success && result.errors) {
        setErrors(result.errors || {})
        setFormValues(result.values || {})
      }
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
          Create your account
        </CardTitle>
        <CardDescription className="text-sm">
          Join us and start managing your tasks smarter 🚀
        </CardDescription>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleRegister} className="space-y-6">
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

            {/* CONFIRM PASSWORD */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
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

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className={`h-11 w-full text-sm font-medium transition-all duration-200 ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {isPending ? "Creating account..." : "Create Account"}
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              replace
              aria-disabled={isPending}
              href="/login"
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
