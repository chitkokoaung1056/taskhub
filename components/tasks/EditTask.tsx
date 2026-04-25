import { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { TaskType } from "@/types/task"

type EditTaskProps = {
  task: TaskType
  onTaskUpdate?: (task: TaskType) => void
  onCancel?: () => void
}

export function EditTask({ task, onTaskUpdate, onCancel }: EditTaskProps) {
  const [taskName, setTaskName] = useState(task.task_name)
  const [taskDescription, setTaskDescription] = useState(task.task_description)
  const [priority, setPriority] = useState<"high" | "medium" | "low">(
    task.priority
  )
  const [dueDate, setDueDate] = useState<Date>(new Date(task.due_date))
  const [status, setStatus] = useState<"completed" | "pending">(task.status)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!taskName.trim()) {
      newErrors.taskName = "Task name is required"
    }

    if (!taskDescription.trim()) {
      newErrors.taskDescription = "Task description is required"
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const updatedTask: TaskType = {
      ...task,
      task_name: taskName.trim(),
      task_description: taskDescription.trim(),
      priority,
      due_date: formatDate(dueDate!),
      status,
    }

    onTaskUpdate?.(updatedTask)
  }

  const handleCancel = () => {
    onCancel?.()
  }

  return (
    <div className="space-y-4">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName">
              Task Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="taskName"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className={errors.taskName ? "border-destructive" : ""}
            />
            {errors.taskName && (
              <p className="text-sm text-destructive">{errors.taskName}</p>
            )}
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label htmlFor="taskDescription">
              Task Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="taskDescription"
              placeholder="Enter task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className={errors.taskDescription ? "border-destructive" : ""}
              rows={4}
            />
            {errors.taskDescription && (
              <p className="text-sm text-destructive">
                {errors.taskDescription}
              </p>
            )}
          </div>

          {/* Priority and Status Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">
                Priority <span className="text-destructive">*</span>
              </Label>
              <Select
                value={priority}
                onValueChange={(value) =>
                  setPriority(value as "high" | "medium" | "low")
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setStatus(value as "completed" | "pending")
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">
              Due Date <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dueDate"
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !dueDate ? "text-muted-foreground" : ""
                  } ${errors.dueDate ? "border-destructive" : ""}`}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {dueDate ? formatDisplayDate(dueDate) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => date && setDueDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-sm text-destructive">{errors.dueDate}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
            )}
            <Button type="submit" className="flex-1 sm:flex-initial">
              Update Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
