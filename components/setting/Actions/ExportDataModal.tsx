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
import { Download, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { exportUserDataAction } from "@/lib/actions/export.action"
import { downloadJSON } from "@/lib/utils"

export function ExportDataModal() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleExport = () => {
    startTransition(async () => {
      const result = await exportUserDataAction()

      if (result.success && result.message) {
        toast.success(result.message[0])

        if (result.data) {
          downloadJSON(result.data)
        }

        setOpen(false)
      } else {
        toast.error(result.errors?.general?.[0])
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <button className="flex w-full items-center justify-between rounded-lg border px-4 py-3 transition hover:bg-accent">
          <div className="flex items-center gap-5">
            <Download className="h-4 w-4 text-muted-foreground" />

            <div className="space-y-1">
              <p className="text-left text-sm font-medium">Export Data</p>
              <p className="text-left text-xs text-muted-foreground">
                Download your account data
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Your Data</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            This will generate a file containing all your account data.
          </p>

          <Button
            className="w-full"
            disabled={isPending}
            onClick={handleExport}
          >
            {isPending ? "Exporting..." : "Download Data"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
