import { ThemeToggleButton } from "./ThemeToggleButton"
import NotificationsButton from "./NotificationsButton"
import { UserDropdown } from "./user-dropdown/UserDropdown"

export function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggleButton />

      <NotificationsButton />

      <UserDropdown />
    </div>
  )
}
