import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar"

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
}

export function SidebarUser() {
  const initials = getInitials(user.name)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="size-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
