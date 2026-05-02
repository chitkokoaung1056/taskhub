import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Settings } from "lucide-react"
import UserInfo from "./UserInfo"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import LogoutButton from "./LogoutButton"
import { getCurrentUser } from "@/lib/services/auth.service"
import { getProfile } from "@/lib/services/profile.service"
import AvatarDropdownButton from "./AvatarDropdownButton"

export async function UserDropdown() {
  const profile = getProfile()
  const user = getCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1 transition outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
            <AvatarDropdownButton profile={profile} user={user} />
          </Suspense>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <Suspense
          fallback={
            <div className="space-y-2 px-2 py-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          }
        >
          <UserInfo profile={profile} user={user} />
        </Suspense>
        <DropdownMenuSeparator />

        {/* Settings */}
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex cursor-pointer items-center">
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
