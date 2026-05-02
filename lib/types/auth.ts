import { ProfileType } from "./profile"

export type AuthType = {
  email: string
  password: string
} 

export type RegisterType = AuthType & ProfileType

export type LoginType = AuthType
