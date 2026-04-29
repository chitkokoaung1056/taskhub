import { TaskType } from "@/lib/types/task"
import { Calendar, AlertCircle, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { Badge } from "../ui/badge"
import { formatDate, parseDate } from "@/lib/utils"
import TaskCardDropdown from "./TaskCardDropdown"

type TaskCardProps = {
  task: TaskType
}

export function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-900"
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900"
      case "low":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    const d = parseDate(dueDate)
    const now = new Date()
    return status === "pending" && d < now
  }

  const overdue = isOverdue(task.due_date, task.status)

  return (
    <Card className="group border-slate-200 transition-all duration-200 hover:shadow-md dark:border-slate-800">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={`text-lg leading-tight ${
              task.status === "completed"
                ? "text-muted-foreground line-through"
                : "text-foreground/90"
            }`}
          >
            {task.task_name}
          </CardTitle>
          <TaskCardDropdown task={task} />
        </div>

        <CardDescription
          className={`mt-1 text-[13.5px] ${
            task.status === "completed"
              ? "text-muted-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {task.task_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-1 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`${getPriorityColor(task.priority)} border px-2 py-0.5 text-xs font-normal capitalize`}
          >
            {task.priority}
          </Badge>

          <Badge
            variant="outline"
            className={`px-2 py-0.5 text-xs font-normal capitalize ${
              task.status === "completed"
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {task.status}
          </Badge>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800" />

        {/* Dates */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            <div className="flex items-center gap-2">
              <span className="text-slate-400 dark:text-slate-500">Due:</span>

              <span
                className={`text-xs font-medium ${
                  overdue
                    ? "text-destructive/70"
                    : "text-secondary-foreground/70"
                }`}
              >
                {formatDate(task.due_date)}
              </span>

              {overdue && (
                <span className="flex items-center gap-1 text-destructive/70">
                  <AlertCircle className="text-de h-3 w-3" />
                  <span className="text-xs">Overdue</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            <span>Created {formatDate(task.created_at!)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
