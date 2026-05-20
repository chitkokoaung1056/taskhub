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
import { loginUserAction } from "@/lib/actions/auth.action"
import {
  LoginActionStateType,
  LoginErrorsType,
  LoginValuesType,
} from "@/lib/types/actionTypes/auth.actionType"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"

const initialState: LoginActionStateType = {
  success: false,
  errors: {},
  message: [],
}

export default function LoginForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<LoginErrorsType>({})
  const [formValues, setFormValues] = useState<LoginValuesType>({})
  const router = useRouter()

  const clearError = (field: keyof LoginErrorsType) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const clearAll = () => {
    setErrors({})
    setFormValues({})
  }

  const handleLogin = async (formData: FormData) => {
    clearAll()
    startTransition(async () => {
      const result = await loginUserAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
        router.push(result.redirectTo!)
      } else if (!result.success && result.errors?.general) {
        toast.error(result.errors.general[0])
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
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm">
          Login to continue managing your tasks
        </CardDescription>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleLogin} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link> 
              </div>

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
          </FieldGroup>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className={`h-11 w-full text-sm font-medium transition-all duration-200 ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              onClick={clearAll}
              replace
              aria-disabled={isPending}
              href="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
