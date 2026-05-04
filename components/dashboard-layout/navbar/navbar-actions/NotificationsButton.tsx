'use client'

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

const NotificationsButton = () => {
  return (
    <Button variant="ghost" size="icon">
      <Bell />
    </Button>
  )
}

export default NotificationsButton
