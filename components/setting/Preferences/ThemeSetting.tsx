"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Monitor, Moon, Sun, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export function ThemeSetting() {
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex w-full items-center justify-between rounded-lg border px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">Theme</p>
          <p className="text-xs text-muted-foreground">
            Choose your preferred theme
          </p>
        </div>

        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  const current = themes.find((t) => t.value === theme) ?? themes[2]

  const CurrentIcon = current.icon

  return (
    <div className="flex w-full items-center justify-between rounded-lg border px-4 py-3">
      {/* Left */}
      <div className="space-y-1">
        <p className="text-sm font-medium">Theme</p>
        <p className="text-xs text-muted-foreground">
          Choose your preferred theme
        </p>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex max-w-40 min-w-40 items-center justify-between rounded-md border px-3 py-2 text-sm transition hover:bg-accent">
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4 text-muted-foreground" />
              <span>{current.label}</span>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {themes.map((t) => {
            const Icon = t.icon
            return (
              <DropdownMenuItem
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex cursor-pointer items-center gap-2 py-2"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                {t.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
