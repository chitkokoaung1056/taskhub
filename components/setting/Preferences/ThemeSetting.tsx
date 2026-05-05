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
      <div className="flex flex-col gap-3 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Theme</p>
          <p className="text-xs text-muted-foreground">
            Choose your preferred theme
          </p>
        </div>

        <div className="h-10 w-full animate-pulse rounded bg-muted sm:w-32" />
      </div>
    )
  }

  const current = themes.find((t) => t.value === theme) ?? themes[2]
  const CurrentIcon = current.icon

  return (
    <div className="flex flex-col gap-3 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div>
        <p className="text-sm font-medium">Theme</p>
        <p className="text-xs text-muted-foreground">
          Choose your preferred theme
        </p>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition hover:bg-accent sm:w-auto sm:min-w-40">
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4 text-muted-foreground" />
              <span>{current.label}</span>
            </div>

            <ChevronDown className="size-4 text-muted-foreground" />
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
