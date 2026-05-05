"use client"

import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail } from "lucide-react"
import { toast } from "sonner"

import {
  UpdateEmailActionStateType,
  UpdateEmailErrorsType,
  UpdateEmailValuesType,
} from "@/lib/types/actionTypes/auth.actionType"

import { updateEmailAction } from "@/lib/actions/auth.action"

const initialState: UpdateEmailActionStateType = {
  success: false,
  errors: {},
  message: [],
  values: {},
}

export function ChangeEmailModal() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<UpdateEmailErrorsType>({})
  const [formValues, setFormValues] = useState<UpdateEmailValuesType>({})

  const clearError = (field: keyof UpdateEmailErrorsType) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const clearAll = () => {
    setErrors({})
    setFormValues({})
  }

  const handleClose = () => {
    clearAll()
    setOpen(false)
  }

  const handleUpdateEmail = async (formData: FormData) => {
    clearAll()

    startTransition(async () => {
      const result = await updateEmailAction(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message[0])
        handleClose()
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <button className="flex w-full items-center justify-between rounded-lg border px-4 py-3 transition hover:bg-accent">
          <div className="flex items-center gap-5">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-left text-sm font-medium">Change Email</p>
              <p className="text-left text-xs text-muted-foreground">
                Update your email for better security
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onCloseAutoFocus={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
        </DialogHeader>

        <form action={handleUpdateEmail} className="mt-4 space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <Input
              type="email"
              name="email"
              placeholder="New email address"
              defaultValue={formValues.email}
              onChange={() => clearError("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Input
              type="password"
              name="password"
              placeholder="Confirm your password"
              defaultValue={formValues.password}
              onChange={() => clearError("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password[0]}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating Email..." : "Update Email"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
