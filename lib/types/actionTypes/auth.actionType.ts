export type AuthActionErrorType = {
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
  general?: string[] // For Supabase/server errors
}

export type AuthActionValuesType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export type AuthActionStateType = {
  success?: boolean
  errors?: AuthActionErrorType
  message?: string[]
  values?: Partial<AuthActionValuesType>
}
