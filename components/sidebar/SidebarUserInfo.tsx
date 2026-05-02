import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar"
import { getProfile } from "@/lib/services/profile.service"
import { getCurrentUser } from "@/lib/services/auth.service"

export async function SidebarUserInfo() {
  const profile = await getProfile()
  const email = (await getCurrentUser()).email

  const { first_name, last_name } = profile
  const initials = getInitials(first_name, last_name)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="size-10">
              <AvatarImage src="" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">
                {first_name} {last_name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {email}
              </span>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
