import { LoginType, RegisterType } from "../auth"

type BaseActionState<TValues, TErrors> = {
  success?: boolean
  errors?: TErrors
  values?: Partial<TValues>
  message?: string[]
  redirectTo?: string
}

//register
export type RegisterErrorsType = {
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
  first_name?: string[]
  last_name?: string[]
  general?: string[]
}

export type RegisterActionStateType = BaseActionState<
  RegisterType,
  RegisterErrorsType
>

export type RegisterValuesType = Partial<RegisterType>

//login
export type LoginErrorsType = {
  email?: string[]
  password?: string[]
  general?: string[]
}

export type LoginActionStateType = BaseActionState<LoginType, LoginErrorsType>

export type LoginValuesType = Partial<LoginType>

//logout

export type LogoutErrorsType = {
  general?: string[]
}

export type LogoutActionStateType = BaseActionState<void, LogoutErrorsType>

//update password
export type UpdatePasswordErrorsType = {
  currentPassword?: string[]
  newPassword?: string[]
  confirmPassword?: string[]
  general?: string[]
}

export type UpdatePasswordValuesType = {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export type UpdatePasswordActionStateType = BaseActionState<
  UpdatePasswordValuesType,
  UpdatePasswordErrorsType
>

//update email
export type UpdateEmailErrorsType = {
  email?: string[]
  password?: string[]
  general?: string[]
}

export type UpdateEmailValuesType = {
  email?: string
  password?: string
}

export type UpdateEmailActionStateType = BaseActionState<
  UpdateEmailValuesType,
  UpdateEmailErrorsType
>

//delete account
export type DeleteAccountErrorsType = {
  general?: string[]
}

export type DeleteAccountActionStateType = BaseActionState<
  void,
  DeleteAccountErrorsType
>
