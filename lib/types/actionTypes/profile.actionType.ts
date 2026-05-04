import { ProfileType } from "../profile"

export type ProfileErrorsType = {
  first_name?: string[]
  last_name?: string[]
  profile_photo?: string[]
  general?: string[]
}

export type ProfileActionStateType = {
  success?: boolean
  errors?: ProfileErrorsType
  values?: Partial<ProfileType>
  message?: string[]
}

export type ProfileValuesType = Partial<ProfileType>
