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
import { ChevronRight, Mail } from "lucide-react"

export function ChangeEmailModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <button className="flex w-full items-center justify-between rounded-lg border px-4 py-3 transition hover:bg-accent">
          <div className="flex items-center gap-5">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-left text-sm font-medium">Change Email</p>
              <p className="text-left text-xs text-muted-foreground">
                Update your email for more security
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input type="email" placeholder="New email address" />
          <Input type="password" placeholder="Password confirmation" />

          <Button className="w-full">Update Email</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
