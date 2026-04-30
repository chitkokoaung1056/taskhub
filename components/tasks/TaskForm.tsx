"use client"

import { useState, useTransition } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

import {
  TaskActionErrorType,
  TaskActionStateType,
  TaskActionValuesType,
} from "@/lib/types/actionTypes/task.actionType"
import { toast } from "sonner"
import { TaskType } from "@/lib/types/task"

const initialState: TaskActionStateType = {
  success: false,
  errors: {},
  message: [],
}

type TaskAction = (
  prevState: TaskActionStateType,
  formData: FormData
) => Promise<TaskActionStateType>

type TaskFormProps = {
  onClose: () => void
  action: TaskAction
  formType: "edit" | "add"
  task?: TaskType
}

export default function TaskForm({
  onClose,
  action,
  formType,
  task,
}: TaskFormProps) {
  const [isPending, startTransition] = useTransition()

  const [date, setDate] = useState<Date | undefined>(
    formType === "edit" && task?.due_date ? new Date(task.due_date) : undefined
  )

  const [errors, setErrors] = useState<TaskActionErrorType>({})
  const [formValues, setFormValues] = useState<TaskActionValuesType>({})

  const handleCancel = () => {
    setDate(undefined)
    setErrors({})
    setFormValues({})
    onClose()
  }

  const handleSubmit = async (formData: FormData) => {
    setErrors({})
    setFormValues({})
    startTransition(async () => {
      const result = await action(initialState, formData)

      if (result.success && result.message) {
        toast.success(result.message?.[0])
        handleCancel()
      } else if (!result.success && result.errors?.general) {
        toast.error(result.errors?.general[0])
      }

      if (!result.success && result.errors) {
        setErrors(result.errors || {})
        setFormValues(result.values || {})
      }
    })
  }

  return (
    <DialogContent className="p-6 sm:max-w-xl" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>
          {formType === "add" ? "Create New Task" : "Edit Task"}
        </DialogTitle>
      </DialogHeader>

      <form action={handleSubmit} className="mt-2 space-y-5">
        {/* Hidden field for edit mode */}
        {formType === "edit" && task?.id && (
          <input type="hidden" name="id" value={task.id} />
        )}

        <div className="space-y-2">
          <Label>Task Name</Label>
          <Input
            name="task_name"
            defaultValue={
              formType === "edit" ? task?.task_name : formValues.task_name
            }
          />
          {errors.task_name && (
            <p className="text-sm text-destructive">{errors.task_name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            name="task_description"
            defaultValue={
              formType === "edit"
                ? task?.task_description
                : formValues.task_description
            }
          />
          {errors.task_description && (
            <p className="text-sm text-destructive">
              {errors.task_description[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <Label>Priority</Label>
            <Select
              name="priority"
              defaultValue={
                formType === "edit" ? task?.priority || "medium" : "medium"
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <Label>Status</Label>
            <Select
              name="status"
              defaultValue={
                formType === "edit"
                  ? task?.status || "pending"
                  : formValues.status || "pending"
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Due Date</Label>

          <input
            type="hidden"
            name="due_date"
            value={date ? date.toISOString() : ""}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
              >
                <CalendarIcon className="mr-2 size-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>

          {errors.due_date && (
            <p className="text-sm text-destructive">{errors.due_date[0]}</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className={`${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isPending
              ? formType === "add"
                ? "Creating..."
                : "Saving..."
              : formType === "add"
                ? "Create Task"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
