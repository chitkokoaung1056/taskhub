import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileType } from "@/lib/types/profile"
import { getInitials } from "@/lib/utils"

type Props = {
  profile: Promise<ProfileType>
}

export default async function AvatarDropdownButton({ profile }: Props) {
  const currentProfile = await profile

  const { first_name, last_name, profile_photo } = currentProfile
  const initials = getInitials(first_name, last_name)

  return (
    <Avatar className="size-8">
      <AvatarImage src={profile_photo} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
