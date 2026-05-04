"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useTransition } from "react"
import { logoutUserAction } from "@/lib/actions/auth.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutUserAction()

      if (result.success && result.message) {
        toast.success(result.message[0])
        router.replace(result.redirectTo!)
      } else {
        toast.error(result.errors?.general?.[0])
      }
    })
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={isPending}
      className="cursor-pointer"
    >
      <LogOut className="mr-2 size-4" />
      {isPending ? "Logging out..." : "Logout"}
    </DropdownMenuItem>
  )
}

export default LogoutButton
