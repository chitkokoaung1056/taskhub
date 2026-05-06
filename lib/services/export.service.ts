import { getCurrentUser } from "./auth.service"
import { getTasks } from "./task.service"
import { getProfile } from "./profile.service"
import { ExportUserDataType } from "../types/actionTypes/export.actionType"

export async function exportUserData(): Promise<ExportUserDataType> {
  const user = await getCurrentUser()

  const [tasks, profile] = await Promise.all([getTasks(user.id), getProfile()])

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile: profile || null,
    tasks: tasks || [],
    exportedAt: new Date().toISOString(),
  }
}
