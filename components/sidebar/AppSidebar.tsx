import { Suspense } from "react"
import { Separator } from "../ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import AppSidebarNav from "./AppSidebarNav"
import { SidebarUserInfo } from "./SidebarUserInfo"
import SidebarUserSkeleton from "./SidebarUserSkeleton"

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">TaskHub</span>
            <span className="text-xs text-muted-foreground">Workspace</span>
          </div>
        </div>
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <AppSidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />
      <SidebarFooter>
        <Suspense fallback={<SidebarUserSkeleton />}>
          <SidebarUserInfo />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}
