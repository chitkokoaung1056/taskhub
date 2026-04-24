// lib/services/taskService.ts
import { createClient } from "@/lib/supabase/server"
import { TaskServiceResponseType, TaskStatsType, TaskType } from "@/types/task"

export async function getTaskStats(): Promise<
  TaskServiceResponseType<TaskStatsType>
> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .select("status, due_date")

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let completed = 0,
    pending = 0,
    overdue = 0

  for (const t of data ?? []) {
    switch (t.status) {
      case "completed":
        completed++
        break

      case "pending":
        pending++
        if (t.due_date && new Date(t.due_date) < today) {
          overdue++
        }
        break
    }
  }

  return {
    data: {
      total: data?.length ?? 0,
      completed,
      pending,
      overdue,
    },
    error: null,
  }
}

export async function createTask(
  task: TaskType
): Promise<TaskServiceResponseType<TaskType>> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("tasks")
    .insert([task])
    .select()
    .single()

  if (error) {
    return { error: new Error(error.message) }
  }

  return {
    error: null,
  }
}
