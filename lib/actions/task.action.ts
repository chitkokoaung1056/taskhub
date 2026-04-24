"use server"

import { TaskType } from "@/types/task"
import { taskSchema } from "../schemas/task.schema"
import z from "zod"
import { TaskActionStateType } from "@/types/action.type"
import { formatDate } from "../utils"
import { createTask } from "../services/task.service"

export async function createTaskAction(
  prevState: TaskActionStateType,
  formData: FormData
): Promise<TaskActionStateType> {
  const rawData = {
    task_name: formData.get("task_name") as string,
    task_description: formData.get("task_description") as string,
    priority: formData.get("priority") as "high" | "medium" | "low",
    status: formData.get("status") as "completed" | "pending",
    due_date: formData.get("due_date"),
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

  const validatedData = validationResult.data
  const newTask: TaskType = {
    task_name: validatedData.task_name,
    task_description: validatedData.task_description,
    priority: validatedData.priority,
    due_date: validatedData.due_date,
    status: validatedData.status,
    created_at: formatDate(new Date()),
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

  return {
    success: true,
    errors: {},
    message: ["Task created successfully!"],
  }
}
