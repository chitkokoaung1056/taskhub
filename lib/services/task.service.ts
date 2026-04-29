// lib/services/taskService.ts
import { createClient } from "@/lib/supabase/server"
import {
  FilterOptionType,
  SortOptionType,
  TaskServiceResponseType,
  TaskStatsType,
  TaskType,
} from "../types/task"

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

export async function getTaskCount(
  filter: FilterOptionType
): Promise<TaskServiceResponseType<number>> {
  const supabase = await createClient()

  let query = supabase.from("tasks").select("*", { count: "exact", head: true })

  switch (filter) {
    case "completed":
      query = query.eq("status", "completed")
      break

    case "pending":
      query = query.eq("status", "pending")
      break

    case "high":
    case "medium":
    case "low":
      query = query.eq("priority", filter)
      break

    case "all":
    default:
      break
  }

  const { count, error } = await query

  if (error) {
    return {
      data: null,
      error: new Error(error.message),
    }
  }

  return {
    data: count ?? 0,
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

export async function getTasks(
  search?: string,
  filter?: FilterOptionType,
  sort?: SortOptionType
): Promise<TaskServiceResponseType<TaskType[]>> {
  const supabase = await createClient()
  let query = supabase.from("tasks").select("*")

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

  /* ---------------- SORT ---------------- */
  switch (sort) {
    case "due_date":
      query = query.order("due_date", { ascending: true })
      break

    case "priority":
      // high → low (custom logic handled client-side OR DB enum order)
      query = query.order("priority", { ascending: true })
      break

    case "status":
      query = query.order("status", { ascending: true })
      break

    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    return {
      data: null,
      error: new Error(error.message),
    }
  }

  return {
    data: data ?? [],
    error: null,
  }
}

export async function updateTask(
  id: number,
  updates: Partial<TaskType>
): Promise<TaskServiceResponseType<TaskType>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return {
      data: null,
      error: new Error(error.message),
    }
  }

  return {
    data,
    error: null,
  }
}

export async function deleteTask(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) {
    return { error: new Error(error.message) }
  }

  return { error: null }
}
