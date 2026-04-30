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
      values: rawData
    }
  }

  const validatedData = validationResult.data
  const newTask: TaskType = {
    task_name: validatedData.task_name,
    task_description: validatedData.task_description,
    priority: validatedData.priority,
    due_date: validatedData.due_date,
    status: validatedData.status,
  }

  const { error } = await createTask(newTask)

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
      message: [],
    }
  }
  revalidatePath("/task")

  return {
    success: true,
    errors: {},
    message: ["Task created successfully!"],
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
      errors: {
        task_name: fieldErrors.task_name,
        task_description: fieldErrors.task_description,
        priority: fieldErrors.priority,
        status: fieldErrors.status,
        due_date: fieldErrors.due_date,
      },
    }
  }

  const { error } = await updateTask(taskId, validationResult.data)

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
    }
  }

  revalidatePath("/task")

  return {
    success: true,
    errors: {},
    message: ["Task updated successfully!"],
  }
}

export async function deleteTaskAction(id: number) {
  const { error } = await deleteTask(id)

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
    }
  }

  revalidatePath("/task")

  return {
    success: true,
    message: ["Task deleted successfully"],
  }
}

export async function toggleTaskStatusAction(
  id: number,
  currentStatus: "completed" | "pending"
): Promise<TaskActionStateType> {
  const { error } = await updateTask(id, {
    status: currentStatus === "completed" ? "pending" : "completed",
  })

  if (error) {
    return {
      success: false,
      errors: {
        general: [error.message],
      },
    }
  }

  revalidatePath("/task")

  return {
    success: true,
    errors: {},
    message: ["Status updated"],
  }
}
