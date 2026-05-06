"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggleButton({
  className,
}: {
  className?: string
}) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    // If system → decide based on resolved theme
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark")
      return
    }

    // Normal toggle
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        disabled
      >
        <div className="h-5 w-5 animate-pulse rounded bg-muted" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}