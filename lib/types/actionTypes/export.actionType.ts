import { ProfileType } from "../profile"
import { TaskType } from "../task"

export type ExportUserDataType = {
  user: {
    id: string
    email: string | undefined
  }
  profile: ProfileType
  tasks: TaskType[]
  exportedAt: string
}

export type ExportUserDataActionStateType = {
  success: boolean
  message: string[]
  errors: {
    general?: string[]
  }
  data?: ExportUserDataType
}
