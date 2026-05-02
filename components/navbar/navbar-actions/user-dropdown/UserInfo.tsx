import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"

import { ProfileType } from "@/lib/types/profile"
import { User } from "@supabase/supabase-js"

type Props = {
  user: Promise<User>
  profile: Promise<ProfileType>
}

const UserInfo = async ({ user, profile }: Props) => {
  const currentUser = await user
  const currentProfile = await profile

  const { first_name, last_name } = currentProfile
  const { email } = currentUser

  return (
    <DropdownMenuLabel>
      <p className="text-sm font-medium">
        {first_name} {last_name}
      </p>
      <p className="text-xs text-muted-foreground">{email}</p>
    </DropdownMenuLabel>
  )
}

export default UserInfo
