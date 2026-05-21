"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { differenceInHours, isPast, parseISO } from "date-fns"
import { TaskType } from "@/lib/types/task"

type Props = {
  tasks: TaskType[]
}

export default function TaskDueToast({ tasks }: Props) {
  useEffect(() => {
    if (!tasks?.length) return

    const alreadyShown = sessionStorage.getItem("task-due-toast")

    if (alreadyShown) return

    const now = new Date()

    const activeTasks = tasks.filter((task) => task.status === "pending")

    const overdueTasks = activeTasks.filter((task) => {
      const dueDate = parseISO(task.due_date)

      return isPast(dueDate)
    })

    const nearDueTasks = activeTasks.filter((task) => {
      const dueDate = parseISO(task.due_date)

      const hoursLeft = differenceInHours(dueDate, now)

      return hoursLeft > 0 && hoursLeft <= 24
    })

    if (overdueTasks.length > 0) {
      toast.error(
        `${overdueTasks.length} overdue task${
          overdueTasks.length > 1 ? "s" : ""
        }`
      )
    }

    if (nearDueTasks.length > 0) {
      toast.warning(
        `${nearDueTasks.length} task${
          nearDueTasks.length > 1 ? "s are" : " is"
        } due within 24 hours`
      )
    }

    sessionStorage.setItem("task-due-toast", "true")
  }, [tasks])

  return null
}
