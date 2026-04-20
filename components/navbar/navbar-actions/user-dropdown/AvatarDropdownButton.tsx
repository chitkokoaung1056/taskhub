import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

async function getUser() {
  // replace with Supabase / DB call later
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  }
}

const AvatarDropdownButton = async () => {
  const user = await getUser()
  const initials = getInitials(user.name)

  return (
    <Avatar className="size-8">
      <AvatarImage src={user.avatar} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarDropdownButton
