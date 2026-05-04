import { SidebarMenu, SidebarMenuItem } from "../../../ui/sidebar"
import { Skeleton } from "../../../ui/skeleton"

const SidebarUserSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2 pt-2">
          <div className="h-14 px-2">
            <div className="flex w-full items-center gap-3">
              {/* Avatar */}
              <Skeleton className="h-10 w-10 rounded-full" />

              {/* Name + Email */}
              <div className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-32 rounded" />
              </div>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarUserSkeleton
