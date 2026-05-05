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
  { value: "en", label: "English" },
  { value: "mm", label: "Myanmar" },
]

export function LanguageSetting() {
  const [language, setLanguage] = useState<Language>("en")

  const current = languages.find((l) => l.value === language)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border px-4 py-3">
      
      {/* Left */}
      <div>
        <p className="text-sm font-medium">Language</p>
        <p className="text-xs text-muted-foreground">
          Choose your preferred language
        </p>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              flex w-full items-center justify-between
              rounded-md border px-3 py-2 text-sm
              transition hover:bg-accent
              sm:w-auto sm:min-w-40
            "
          >
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