import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileType } from "@/lib/types/profile"
import { getInitials } from "@/lib/utils"
import { User } from "@supabase/supabase-js"

type Props = {
  user: Promise<User>
  profile: Promise<ProfileType>
}

export default async function AvatarDropdownButton({ user, profile }: Props) {
  const currentUser = await user
  const currentProfile = await profile

  const { first_name, last_name } = currentProfile
  const initials = getInitials(first_name, last_name)

  return (
    <Avatar className="size-8">
      <AvatarImage src="" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
