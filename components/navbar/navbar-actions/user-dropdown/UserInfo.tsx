import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"

async function getUser() {
  // replace with Supabase / DB call later
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  }
}

const UserInfo = async () => {
  const user = await getUser()

  return (
    <DropdownMenuLabel>
      <p className="text-sm font-medium">{user.name}</p>
      <p className="text-xs text-muted-foreground">{user.email}</p>
    </DropdownMenuLabel>
  )
}

export default UserInfo
