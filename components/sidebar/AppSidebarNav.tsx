"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

import type { MenuItemType } from "@/lib/types/navigation"
import { iconMap } from "./icon"

const menuItems: MenuItemType[] = [
  { title: "Dashboard", icon: "Home", url: "/dashboard" },
  { title: "Tasks", icon: "FileText", url: "/task" },
]
const AppSidebarNav = () => {
  const pathname = usePathname()

  return (
    <SidebarMenu className="space-y-2">
      {menuItems.map((item: MenuItemType) => {
        const Icon = iconMap[item.icon]

        const isActive =
          pathname === item.url || pathname.startsWith(item.url + "/")

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={item.url} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export default AppSidebarNav
