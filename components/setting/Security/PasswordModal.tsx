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
import { ChevronRight, KeyRound } from "lucide-react"
import {
  UpdatePasswordActionStateType,
  UpdatePasswordErrorsType,
  UpdatePasswordValuesType,
} from "@/lib/types/actionTypes/auth.actionType"
import { updatePasswordAction } from "@/lib/actions/auth.action"
import { toast } from "sonner"

const initialState: UpdatePasswordActionStateType = {
  success: false,
  errors: {},
  message: [],
  values: {},
}

export function ChangePasswordModal() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<UpdatePasswordErrorsType>({})
  const [formValues, setFormValues] = useState<UpdatePasswordValuesType>({})

  const clearError = (field: keyof UpdatePasswordErrorsType) => {
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

  const handleUpdatePassword = async (formData: FormData) => {
    clearAll()
    startTransition(async () => {
      const result = await updatePasswordAction(initialState, formData)

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
            <KeyRound className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-left text-sm font-medium">Change Password</p>
              <p className="text-left text-xs text-muted-foreground">
                Update your password regularly
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
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form action={handleUpdatePassword} className="mt-4 space-y-5">
          <div className="space-y-1">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current password"
              defaultValue={formValues.currentPassword}
              onChange={() => clearError("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-xs text-destructive">
                {errors.currentPassword[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              defaultValue={formValues.newPassword}
              onChange={() => clearError("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {errors.newPassword[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              defaultValue={formValues.confirmPassword}
              onChange={() => clearError("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating Password..." : " Update Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
