import { ProfileType } from "./profile"

export type AuthType = {
  email: string
  password: string
}

export type RegisterType = AuthType & ProfileType & { confirmPassword: string }

export type LoginType = AuthType
