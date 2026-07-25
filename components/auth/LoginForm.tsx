"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle2, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)
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
      className="w-full max-w-md rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-4 shadow-2xl backdrop-blur-xl supports-backdrop-filter:bg-card/60"
    >
      {/* BRAND & HEADER */}
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Login to continue managing your workspace
          </CardDescription>
        </div>
      </CardHeader>

      {/* FORM */}
      <CardContent>
        <form action={handleLogin} className="space-y-5">
          <FieldGroup className="space-y-4">
            {/* EMAIL */}
            <Field>
              <FieldLabel htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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

            {/* PASSWORD */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-muted-foreground transition hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

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
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* FOOTER LINK */}
          <div className="pt-2 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              onClick={clearAll}
              replace
              aria-disabled={isPending}
              href="/auth/register"
              className="font-semibold text-primary transition hover:underline"
            >
              Create one
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}