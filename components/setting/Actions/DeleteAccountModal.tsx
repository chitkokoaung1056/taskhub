"use client"

import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Trash2, ChevronRight } from "lucide-react"
import { deleteAccountAction } from "@/lib/actions/auth.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function DeleteAccountModal() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccountAction()

      if (result.success && result.message) {
        toast.success(result.message[0])
        router.replace(result.redirectTo!)
      } else {
        toast.error(result.errors?.general?.[0])
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <button className="flex w-full items-center justify-between rounded-lg border border-destructive/30 px-4 py-3 transition hover:bg-red-500/10">
          <div className="flex items-center gap-5">
            <Trash2 className="h-4 w-4 text-destructive" />

            <div className="space-y-1">
              <p className="text-left text-sm font-medium text-destructive">
                Delete Account
              </p>
              <p className="text-left text-xs text-destructive/70">
                Permanently remove your account
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-red-400" />
        </button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Account</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>

          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting Account..." : "Confirm Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
