"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { toast } from "sonner"

export function DashboardToast() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get("message")

    if (!message) return

    if (message === "account-confirmed") {
      toast.success("Account confirmed successfully")
    }

    if (message === "password-reset-success") {
      toast.success("Password reset successfully")
    }

    if (message === "email-change-success") {
      toast.success("Email updated successfully")
    }

    router.replace(pathname)
  }, [searchParams, pathname, router])

  return null
}
