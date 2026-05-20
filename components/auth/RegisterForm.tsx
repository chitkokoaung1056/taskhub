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
  RegisterActionStateType,
  RegisterErrorsType,
  RegisterValuesType,
} from "@/lib/types/actionTypes/auth.actionType"

import Link from "next/link"
import { useState, useTransition } from "react"
import { toast } from "sonner"

const initialState: RegisterActionStateType = {
  success: false,
  errors: {},
  message: [],
}

export default function RegisterForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<RegisterErrorsType>({})
  const [formValues, setFormValues] = useState<RegisterValuesType>({})

  const clearError = (field: keyof RegisterErrorsType) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const clearAll = () => {
    setErrors({})
    setFormValues({})
  }

  const handleRegister = async (formData: FormData) => {
    setErrors({})

    startTransition(async () => {
      const result = await registerUserAction(initialState, formData)

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
          Create account
        </CardTitle>
        <CardDescription className="text-sm">
          Start managing your tasks smarter
        </CardDescription>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleRegister} className="space-y-6">
          <FieldGroup className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* FIRST NAME */}
              <Field>
                <FieldLabel htmlFor="first_name">First name</FieldLabel>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="John"
                  className="mt-2 transition focus-visible:ring-2"
                  defaultValue={formValues.first_name}
                  onChange={() => clearError("first_name")}
                />
                {errors.first_name && (
                  <FieldDescription className="mt-1 text-xs text-destructive">
                    {errors.first_name[0]}
                  </FieldDescription>
                )}
              </Field>

              {/* LAST NAME */}
              <Field>
                <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Doe"
                  className="mt-2 transition focus-visible:ring-2"
                  defaultValue={formValues.last_name}
                  onChange={() => clearError("last_name")}
                />
                {errors.last_name && (
                  <FieldDescription className="mt-1 text-xs text-destructive">
                    {errors.last_name[0]}
                  </FieldDescription>
                )}
              </Field>
            </div>

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
            className={`h-11 w-full text-sm font-medium transition-all duration-200 ${
              isPending ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              onClick={clearAll}
              replace
              aria-disabled={isPending}
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
