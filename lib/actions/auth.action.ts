"use server"

import z from "zod"
import { loginUser, logoutUser, registerUser } from "../services/auth.service"
import {
  LoginActionStateType,
  LogoutActionStateType,
  RegisterActionStateType,
} from "../types/actionTypes/auth.actionType"
import { loginSchema, registerSchema } from "../schemas/auth.schema"

export async function registerUserAction(
  prevState: RegisterActionStateType,
  formData: FormData
): Promise<RegisterActionStateType> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
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

  try {
    const validatedData = validationResult.data

    await registerUser({
      email: validatedData.email,
      password: validatedData.password,
      first_name: validatedData.first_name.trim(),
      last_name: validatedData.last_name.trim(),
    })

    return {
      success: true,
      message: ["User registered successfully!"],
      redirectTo: "/dashboard",
      errors: {},
      values: {},
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
      values: rawData,
    }
  }
}

export async function loginUserAction(
  prevState: LoginActionStateType,
  formData: FormData
): Promise<LoginActionStateType> {
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

  try {
    const validatedData = validationResult.data

    await loginUser({
      email: validatedData.email,
      password: validatedData.password,
    })

    return {
      success: true,
      message: ["Login successful!"],
      redirectTo: "/dashboard",
      errors: {},
      values: {},
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
      values: rawData,
    }
  }
}

export async function logoutUserAction(): Promise<LogoutActionStateType> {
  try {
    await logoutUser()

    return {
      success: true,
      message: ["Logged out successfully!"],
      redirectTo: "/login",
      errors: {},
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
      message: [],
    }
  }
}
