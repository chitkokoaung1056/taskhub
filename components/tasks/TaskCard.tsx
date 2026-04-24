"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Calendar, AlertCircle } from "lucide-react"
import { TaskBadge } from "./TaskBadge"
import { TaskType } from "@/types/task"

interface TaskCardProps {
  task: TaskType
}

const isOverdue = (dueDate: string, status: string) => {
  return status === "pending" && new Date(dueDate) < new Date()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed")

  const toggleTaskStatus = async () => {
    setIsCompleted(!isCompleted)
  }

  return (
    <div
      className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent/50"
      onClick={toggleTaskStatus}
    >
      <div className="flex flex-col gap-3">
        {/* Header with Status Icon */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {isCompleted ? (
              <CheckCircle2 className="size-5 text-green-600 dark:text-green-500" />
            ) : (
              <Circle className="size-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className={
                isCompleted ? "text-muted-foreground line-through" : ""
              }
            >
              {task.task_name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {task.task_description}
        </p>

        {/* Badges using TaskBadge component */}
        <div className="flex flex-wrap items-center gap-2">
          <TaskBadge type="priority" value={task.priority} />
          <TaskBadge
            type="status"
            value={isCompleted ? "completed" : "pending"}
            status={isCompleted ? "completed" : "pending"}
          />
        </div>

        {/* Dates */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5" />
            <span
              className={
                isOverdue(task.due_date, isCompleted ? "completed" : "pending")
                  ? "text-red-600 dark:text-red-500"
                  : ""
              }
            >
              Due: {formatDate(task.due_date)}
            </span>
            {isOverdue(
              task.due_date,
              isCompleted ? "completed" : "pending"
            ) && (
              <AlertCircle className="size-3.5 text-red-600 dark:text-red-500" />
            )}
          </div>
          <div className="text-muted-foreground">
            Created: {formatDate(task.created_at)}
          </div>
        </div>
      </div>
    </div>
  )
}
