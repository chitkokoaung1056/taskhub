// types/action.types.ts
import { TaskType } from "./task"

export type TaskActionErrorType = {
  task_name?: string[]
  task_description?: string[]
  priority?: string[]
  status?: string[]
  due_date?: string[]
  general?: string[] // For Supabase/server errors
}

export type TaskActionStateType = {
  success?: boolean
  errors?: TaskActionErrorType
  message?: string[] // For success messages
  task?: TaskType | null
}
