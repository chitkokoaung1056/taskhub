"use client"

import { useState } from "react"
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

export function ChangePasswordModal() {
  const [open, setOpen] = useState(false)

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input type="password" placeholder="Current password" />
          <Input type="password" placeholder="New password" />
          <Input type="password" placeholder="Confirm new password" />

          <Button className="w-full">Update Password</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
