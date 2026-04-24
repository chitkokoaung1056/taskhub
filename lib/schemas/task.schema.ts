import { z } from "zod"

export const taskSchema = z.object({
  task_name: z.string().min(1, "Task name is required"),
  task_description: z.string().min(1, "Task description is required"),
  priority: z.enum(["high", "medium", "low"]),
  status: z.enum(["completed", "pending"]),
  due_date: z.string().min(1, "Please select a due date"),
})