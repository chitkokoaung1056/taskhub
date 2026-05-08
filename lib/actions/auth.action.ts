"use server"

import z from "zod"
import {
  deleteAccount,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  updateEmail,
  updatePassword,
} from "../services/auth.service"
import {
  DeleteAccountActionStateType,
  ForgotPasswordActionStateType,
  LoginActionStateType,
  LogoutActionStateType,
  RegisterActionStateType,
  ResetPasswordActionStateType,
  UpdateEmailActionStateType,
  UpdatePasswordActionStateType,
} from "../types/actionTypes/auth.actionType"
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateEmailSchema,
  updatePasswordSchema,
} from "../schemas/auth.schema"
import { revalidatePath } from "next/cache"

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

    revalidatePath("/", "layout")
    return {
      success: true,
      message: ["Email confirmaton was sent to your email!"],
      errors: {},
      values: rawData,
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
      redirectTo: "/",
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

export async function forgotPasswordAction(
  prevState: ForgotPasswordActionStateType,
  formData: FormData
): Promise<ForgotPasswordActionStateType> {
  const rawData = {
    email: formData.get("email") as string,
  }

  const validationResult = forgotPasswordSchema.safeParse(rawData)

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

    await forgotPassword(validatedData.email)

    return {
      success: true,
      message: ["If this email exists, a reset link has been sent"],
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

export async function resetPasswordAction(
  prevState: ResetPasswordActionStateType,
  formData: FormData
): Promise<ResetPasswordActionStateType> {
  const rawData = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const validationResult = resetPasswordSchema.safeParse(rawData)

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

    await forgotPassword(validatedData.confirmPassword)

    return {
      success: true,
      message: ["Password reset link sent to your email"],
      errors: {},
      redirectTo: "/login",
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

export async function updatePasswordAction(
  prevState: UpdatePasswordActionStateType,
  formData: FormData
): Promise<UpdatePasswordActionStateType> {
  const rawData = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const validationResult = updatePasswordSchema.safeParse(rawData)

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

    await updatePassword({
      currentPassword: validatedData.currentPassword,
      newPassword: validatedData.newPassword,
    })

    return {
      success: true,
      message: ["Password updated successfully"],
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

export async function updateEmailAction(
  prevState: UpdateEmailActionStateType,
  formData: FormData
): Promise<UpdateEmailActionStateType> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validationResult = updateEmailSchema.safeParse(rawData)

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

    await updateEmail({
      email: validatedData.email,
      password: validatedData.password,
    })

    revalidatePath("/setting")

    return {
      success: true,
      message: ["Email Updated Successfully"],
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

export async function deleteAccountAction(): Promise<DeleteAccountActionStateType> {
  try {
    await deleteAccount()

    return {
      success: true,
      message: ["Account Deleted successfully!"],
      redirectTo: "/",
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
