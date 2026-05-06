"use server"

import { exportUserData } from "../services/export.service"
import { ExportUserDataActionStateType } from "../types/actionTypes/export.actionType"

export async function exportUserDataAction(): Promise<ExportUserDataActionStateType> {
  try {
    const data = await exportUserData()

    return {
      success: true,
      message: ["Export ready!"],
      errors: {},
      data,
    }
  } catch (err) {
    return {
      success: false,
      message: [],
      errors: {
        general: [(err as Error).message],
      },
    }
  }
}
