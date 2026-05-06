"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  const [isClient, setIsClient] = useState(false)

  // settings state
  const [emailNotif, setEmailNotif] = useState(false)
  const [taskReminders, setTaskReminders] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)

    // later you can load from DB/localStorage here
  }, [])

  if (!isClient) {
    return (
      <div className="rounded-lg border p-4">
        <div className="mb-2 h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-5 rounded-lg border p-4">
      {/* Title */}
      <div>
        <p className="text-sm font-medium">Notifications</p>
        <p className="text-xs text-muted-foreground">
          Control how TaskHub notifies you
        </p>
      </div>

      {/* Email Notifications */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">Email notifications</p>
          <p className="text-xs text-muted-foreground">
            Receive updates via email
          </p>
        </div>
        <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
      </div>

      {/* Task Reminders */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">Task reminders</p>
          <p className="text-xs text-muted-foreground">
            Notify before task deadline
          </p>
        </div>
        <Switch checked={taskReminders} onCheckedChange={setTaskReminders} />
      </div>
    </div>
  )
}
