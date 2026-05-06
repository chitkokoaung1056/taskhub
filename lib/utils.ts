import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExportUserDataType } from "./types/actionTypes/export.actionType"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(first_name: string, last_name: string) {
  const initials = `${first_name[0]}${last_name[0]}`

  return initials
}

export const parseDate = (date: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split("-").map(Number)
    return new Date(y, m - 1, d)
  }
  return new Date(date)
}

export function formatDate(date: string | Date) {
  let d: Date

  if (typeof date === "string") {
    d = parseDate(date)
  } else {
    d = date
  }

  const today = new Date()

  if (d.toDateString() === today.toDateString()) return "Today"

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://192.168.1.22:3000"
}

export function downloadJSON(data: ExportUserDataType) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "taskhub-export.json"
  a.click()

  URL.revokeObjectURL(url)
}
