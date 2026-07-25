"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShieldCheck, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"

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
import { resetPasswordAction } from "@/lib/actions/auth.action"
import {
  ResetPasswordActionStateType,
  ResetPasswordErrorsType,
  ResetPasswordValuesType,
} from "@/lib/types/actionTypes/auth.actionType"

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
  const [formValues, setFormValues] = useState<ResetPasswordValuesType>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const clearError = (field: keyof ResetPasswordErrorsType) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const handleResetPassword = async (formData: FormData) => {
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
      className="w-full max-w-md rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-4 shadow-2xl backdrop-blur-xl supports-backdrop-filter:bg-card/60"
    >
      {/* BRAND & HEADER */}
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset password
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Enter your new secure password
          </CardDescription>
        </div>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleResetPassword} className="space-y-5">
          <FieldGroup className="space-y-4">
            {/* NEW PASSWORD */}
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                New password
              </FieldLabel>

              <div className="relative mt-1.5">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-border/80 bg-background/50 pl-3.5 pr-10 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                  defaultValue={formValues.password}
                  onChange={() => clearError("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <FieldDescription className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.password[0]}
                </FieldDescription>
              )}
            </Field>

            {/* CONFIRM PASSWORD */}
            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Confirm new password
              </FieldLabel>

              <div className="relative mt-1.5">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-border/80 bg-background/50 pl-3.5 pr-10 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                  defaultValue={formValues.confirmPassword}
                  onChange={() => clearError("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <FieldDescription className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.confirmPassword[0]}
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
                Resetting password...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Reset password
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}