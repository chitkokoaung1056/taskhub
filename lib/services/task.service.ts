// lib/services/taskService.ts
import { createClient } from "@/lib/supabase/server"
import {
  FilterOptionType,
  SortOptionType,
  TaskStatsType,
  TaskType,
} from "../types/task"
export async function getTaskStats(): Promise<TaskStatsType> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .select("status, due_date")

  if (error) throw new Error(error.message)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let completed = 0
  let pending = 0
  let overdue = 0

  for (const t of data ?? []) {
    if (t.status === "completed") {
      completed++
    }

    if (t.status === "pending") {
      pending++

      if (t.due_date && new Date(t.due_date) < today) {
        overdue++
      }
    }
  }

  return {
    total: data?.length ?? 0,
    completed,
    pending,
    overdue,
  }
}

export async function getTaskCount(filter: FilterOptionType): Promise<number> {
  const supabase = await createClient()

  let query = supabase.from("tasks").select("*", { count: "exact", head: true })

  if (filter === "completed") {
    query = query.eq("status", "completed")
  }

  if (filter === "pending") {
    query = query.eq("status", "pending")
  }

  if (["high", "medium", "low"].includes(filter)) {
    query = query.eq("priority", filter)
  }

  const { count, error } = await query

  if (error) throw new Error(error.message)

  return count ?? 0
}

export async function createTask(task: TaskType) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single()

  if (error) throw new Error(error.message)

  if (!data) throw new Error("Task creation failed")
}

export async function getTasks(
  search?: string,
  filter?: FilterOptionType,
  sort?: SortOptionType,
  userId?: string 
): Promise<TaskType[]> {
  const supabase = await createClient()

  let query = supabase.from("tasks").select("*")

  if (userId) {
    query = query.eq("user_id", userId)
  }

  if (search) {
    query = query.or(
      `task_name.ilike.%${search}%,task_description.ilike.%${search}%`
    )
  }

  if (filter && filter !== "all") {
    if (filter === "completed" || filter === "pending") {
      query = query.eq("status", filter)
    } else {
      query = query.eq("priority", filter)
    }
  }

  switch (sort) {
    case "due_date":
      query = query.order("due_date", { ascending: true })
      break

    case "priority":
      query = query.order("priority", { ascending: true })
      break

    case "status":
      query = query.order("status", { ascending: true })
      break

    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function updateTask(id: number, updates: Partial<TaskType>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)

  if (!data) throw new Error("Task not found")
}

export async function deleteTask(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) throw new Error(error.message)
}
