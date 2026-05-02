"use server"

import { TaskType } from "@/lib/types/task"
import { taskSchema } from "../schemas/task.schema"
import z from "zod"
import { createTask, deleteTask, updateTask } from "../services/task.service"
import { revalidatePath } from "next/cache"
import { TaskActionStateType } from "../types/actionTypes/task.actionType"
export async function createTaskAction(
  prevState: TaskActionStateType,
  formData: FormData
): Promise<TaskActionStateType> {
  const rawData = {
    task_name: formData.get("task_name") as string,
    task_description: formData.get("task_description") as string,
    priority: formData.get("priority") as "high" | "medium" | "low",
    status: formData.get("status") as "completed" | "pending",
    due_date: formData.get("due_date") as string,
  }

  const validationResult = taskSchema.safeParse(rawData)

  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)

    return {
      success: false,
      errors: fieldErrors,
      values: rawData,
    }
  }

  try {
    const data = validationResult.data

    await createTask(data as TaskType)

    revalidatePath("/task")

    return {
      success: true,
      message: ["Task created successfully!"],
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

export async function updateTaskAction(
  prevState: TaskActionStateType,
  formData: FormData
): Promise<TaskActionStateType> {
  const id = formData.get("id")
  const taskId = id ? Number(id) : null

  if (!taskId || isNaN(taskId)) {
    return {
      success: false,
      errors: {
        general: ["Invalid task ID"],
      },
    }
  }

  const rawData = {
    task_name: formData.get("task_name") as string,
    task_description: formData.get("task_description") as string,
    priority: formData.get("priority") as "high" | "medium" | "low",
    status: formData.get("status") as "completed" | "pending",
    due_date: formData.get("due_date") as string,
  }

  const validationResult = taskSchema.safeParse(rawData)

  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)

    return {
      success: false,
      errors: fieldErrors,
      values: rawData,
    }
  }

  try {
    await updateTask(taskId, validationResult.data)

    revalidatePath("/task")

    return {
      success: true,
      message: ["Task updated successfully!"],
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

export async function deleteTaskAction(
  id: number
): Promise<TaskActionStateType> {
  try {
    await deleteTask(id)

    revalidatePath("/task")

    return {
      success: true,
      message: ["Task deleted successfully"],
      errors: {},
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
    }
  }
}

export async function toggleTaskStatusAction(
  id: number,
  currentStatus: "completed" | "pending"
): Promise<TaskActionStateType> {
  try {
    await updateTask(id, {
      status: currentStatus === "completed" ? "pending" : "completed",
    })

    revalidatePath("/task")

    return {
      success: true,
      message: ["Status updated"],
      errors: {},
    }
  } catch (err) {
    return {
      success: false,
      errors: {
        general: [(err as Error).message],
      },
    }
  }
}
