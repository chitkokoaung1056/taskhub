"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { KeyRound, Loader2, Send, ArrowLeft } from "lucide-react"

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
      className="w-full max-w-md rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-4 shadow-2xl backdrop-blur-xl supports-backdrop-filter:bg-card/60"
    >
      {/* BRAND & HEADER */}
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
          <KeyRound className="h-6 w-6" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot password
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Enter your email and we’ll send you a reset link
          </CardDescription>
        </div>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleForgotPassword} className="space-y-5">
          <FieldGroup className="space-y-4">
            {/* EMAIL */}
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email address
              </FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="mt-1.5 h-11 rounded-xl border-border/80 bg-background/50 px-3.5 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                defaultValue={formValues.email}
                onChange={() => clearError("email")}
              />

              {errors.email && (
                <FieldDescription className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.email[0]}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending reset link...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send reset link
                <Send className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* FOOTER LINK */}
          <div className="pt-2 text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 font-semibold text-primary transition hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}