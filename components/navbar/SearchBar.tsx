"use client"

import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [open, setOpen] = useState(false)

  const updateSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) params.set("search", term)
    else params.delete("search")

    replace(`${pathname}?${params.toString()}`)
  }, 500)

  const defaultValue = searchParams.get("search") || ""

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="relative hidden w-full max-w-md sm:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={defaultValue}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Search..."
          className="pl-9 pr-3 rounded-full border-muted bg-muted/40 focus:bg-background transition"
        />
      </div>

      {/* ================= MOBILE BUTTON ================= */}
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>

      {/* ================= MOBILE DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md fixed top-6 left-1/2 -translate-x-1/2 translate-y-0 rounded-xl border bg-background shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center">Search</DialogTitle>
          </DialogHeader>

          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={defaultValue}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-3 h-11 rounded-lg"
              autoFocus
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}