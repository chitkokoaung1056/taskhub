import { iconMap } from "@/components/sidebar/icon"

export type MenuItemType = {
  title: string
  icon: keyof typeof iconMap
  url: string
}
