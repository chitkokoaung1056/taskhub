"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Globe, ChevronDown } from "lucide-react"
import { useState } from "react"

type Language = "en" | "mm"

const languages = [
  { value: "en", label: "English", icon: Globe },
  { value: "mm", label: "Myanmar", icon: Globe },
]

export function LanguageSetting() {
  const [language, setLanguage] = useState<Language>("en")

  const current = languages.find((l) => l.value === language)

  return (
    <div className="flex w-full items-center justify-between rounded-lg border px-4 py-3">
      {/* Left */}

      <div className="space-y-1">
        <p className="text-sm font-medium">Language</p>
        <p className="text-xs text-muted-foreground">
          Choose your preferred language
        </p>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex max-w-40 min-w-40 items-center justify-between gap-6 rounded-md border px-3 py-2 text-sm transition hover:bg-accent">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{current?.label}</span>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onClick={() => setLanguage(lang.value as Language)}
              className="flex cursor-pointer items-center gap-2 py-2"
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
