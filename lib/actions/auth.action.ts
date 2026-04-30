"use server"

import z from "zod"
import { loginUser, logoutUser, registerUser } from "../services/auth.service"
import { AuthActionStateType } from "../types/actionTypes/auth.actionType"
import { loginSchema, registerSchema } from "../schemas/auth.schema"

export async function registerUserAction(
  prevState: AuthActionStateType,
  formData: FormData
): Promise<AuthActionStateType> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const validationResult = registerSchema.safeParse(rawData)

  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)
    return {
      success: false,
      errors: fieldErrors,
      values: rawData,
    }
  }

  const validatedData = validationResult.data
  const newUser = {
    email: validatedData.email,
    password: validatedData.password,
  }
  const { error } = await registerUser(newUser)

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
      message: [],
    }
  }

  return {
    success: true,
    errors: {},
    message: ["User registered successfully!"],
  }
}

export async function loginUserAction(
  prevState: AuthActionStateType,
  formData: FormData
): Promise<AuthActionStateType> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validationResult = loginSchema.safeParse(rawData)

  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)
    return {
      success: false,
      errors: fieldErrors,
      values: rawData,
    }
  }

  const validatedData = validationResult.data
  const user = {
    email: validatedData.email,
    password: validatedData.password,
  }

  const { error } = await loginUser(user)

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
      message: [],
    }
  }

  return {
    success: true,
    errors: {},
    message: ["Login successful!"],
  }
}

export async function logoutUserAction(): Promise<AuthActionStateType> {
  const { error } = await logoutUser()

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
      message: [],
    }
  }

  return {
    success: true,
    errors: {},
    message: ["Logged out successfully!"],
  }
}
