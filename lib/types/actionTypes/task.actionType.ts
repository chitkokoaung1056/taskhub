
export type TaskActionErrorType = {
  task_name?: string[]
  task_description?: string[]
  priority?: string[]
  status?: string[]
  due_date?: string[]
  general?: string[] // For Supabase/server errors
}

export type TaskActionValuesType = {
  task_name?: string
  task_description?: string
  priority?: "high" | "medium" | "low"
  status?: "completed" | "pending"
  due_date?: string
}

export type TaskActionStateType = {
  success?: boolean
  errors?: TaskActionErrorType
  message?: string[] // For success messages
  values?: Partial<TaskActionValuesType> // For returning validated values if needed
}