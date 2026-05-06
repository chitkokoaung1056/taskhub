

import { SidebarTrigger } from "../../ui/sidebar"
import { Menu } from "lucide-react"
import { SearchBar } from "./SearchBar"
import { NavbarActions } from "./navbar-actions/NavbarActions"
import { Suspense } from "react"
import { Skeleton } from "../../ui/skeleton"

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur lg:px-4">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger className="lg:hidden">
          <Menu className="size-5" />
        </SidebarTrigger>

        <div className="flex flex-1 items-center gap-4">
          <Suspense fallback={<Skeleton />}>
            <SearchBar />
          </Suspense>
        </div>

        <NavbarActions />
      </div>
    </header>
  )
}
