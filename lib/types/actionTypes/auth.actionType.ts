import { LoginType, RegisterType } from "../auth"

export type RegisterErrorsType = {
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
  first_name?: string[]
  last_name?: string[]
  general?: string[]
}

export type RegisterActionStateType = {
  success?: boolean
  errors?: RegisterErrorsType
  values?: Partial<RegisterType>
  message?: string[]
  redirectTo?: string
}

//login

export type LoginErrorsType = {
  email?: string[]
  password?: string[]
  general?: string[]
}

export type LoginActionStateType = {
  success?: boolean
  errors?: LoginErrorsType
  values?: Partial<LoginType>
  message?: string[]
  redirectTo?: string
}

//logout

export type LogoutActionStateType = {
  success?: boolean
  errors?: {
    general?: string[]
  }
  message?: string[]
  redirectTo?: string
}
