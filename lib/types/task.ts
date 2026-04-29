export type TaskType = {
  id?: number
  task_name: string
  task_description: string
  priority: "high" | "medium" | "low"
  due_date: string
  status: "completed" | "pending"
  created_at?: string
}

export type SortOptionType = "created_at" | "due_date" | "priority" | "status"
export type FilterOptionType = "all" | "completed" | "pending" | "high" | "medium" | "low"

export type TaskServiceResponseType<T> = {
  data?: T | null
  error: Error | null
}

export type TaskStatsType = {
  total: number
  completed: number
  pending: number
  overdue: number
}