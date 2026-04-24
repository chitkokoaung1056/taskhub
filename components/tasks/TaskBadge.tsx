// components/TaskBadge.tsx (Client Component)
"use client"

import { Badge } from "../ui/badge"

interface TaskBadgeProps {
  type: "priority" | "status"
  value: "high" | "medium" | "low" | "pending" | "completed"
  status?: "pending" | "completed" // Only for status type
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    default:
      return ""
  }
}

const getStatusColor = (status: string) => {
  return status === "completed"
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    : ""
}

export const TaskBadge = ({ type, value, status }: TaskBadgeProps) => {
  if (type === "priority") {
    return (
      <Badge variant="secondary" className={getPriorityColor(value)}>
        {value}
      </Badge>
    )
  }

  if (type === "status") {
    const isCompleted = value === "completed" || status === "completed"
    return (
      <Badge
        variant={isCompleted ? "default" : "outline"}
        className={isCompleted ? getStatusColor(value) : ""}
      >
        {value}
      </Badge>
    )
  }

  return null
}