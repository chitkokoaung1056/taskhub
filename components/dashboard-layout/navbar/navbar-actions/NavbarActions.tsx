import { ThemeToggleButton } from "./ThemeToggleButton"
import NotificationsButton from "./NotificationsButton"
import { UserDropdown } from "./user-dropdown/UserDropdown"

export function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggleButton />

      {/*
      will implement after v3 of admin panel
      <NotificationsButton /> */}

      <UserDropdown />
    </div>
  )
}
