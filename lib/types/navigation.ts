import { iconMap } from "@/components/dashboard-layout/sidebar/icon"

export type MenuItemType = {
  title: string
  icon: keyof typeof iconMap
  url: string
}
