/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useActionState, useEffect, useRef } from "react"
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

import { TaskActionStateType } from "@/types/action.type"
import { toast } from "sonner"

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
  task?: {
    id?: string
    task_name?: string
    task_description?: string
    priority?: string
    status?: string
    due_date?: string
  }
}

export default function TaskForm({ onClose, action, formType, task }: TaskFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  const [date, setDate] = useState<Date | undefined>(
    formType === "edit" && task?.due_date 
      ? new Date(task.due_date) 
      : undefined
  )
  const [errors, setErrors] = useState(state.errors ?? {})

  const prevSuccess = useRef(false)

  useEffect(() => {
    if (!state.success && state.errors) {
      setErrors(state.errors)
    }

    if (state.success && !prevSuccess.current) {
      setDate(undefined)
      setErrors({})

      toast.success(state.message)

      setTimeout(() => {
        onClose()
      }, 100)
    }

    prevSuccess.current = state.success!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleCancel = () => {
    setErrors({})
    setDate(undefined)
    onClose()
  }

  return (
    <DialogContent className="p-6 sm:max-w-xl" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>
          {formType === "add" ? "Create New Task" : "Edit Task"}
        </DialogTitle>
      </DialogHeader>

      <form action={formAction} className="mt-2 space-y-5">
        {/* Hidden field for edit mode */}
        {formType === "edit" && task?.id && (
          <input type="hidden" name="task_id" value={task.id} />
        )}

        <div className="space-y-2">
          <Label>Task Name</Label>
          <Input 
            name="task_name" 
            defaultValue={formType === "edit" ? task?.task_name : ""}
          />
          {errors.task_name && (
            <p className="text-sm text-destructive">{errors.task_name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea 
            name="task_description" 
            defaultValue={formType === "edit" ? task?.task_description : ""}
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
              defaultValue={formType === "edit" ? task?.priority || "medium" : "medium"}
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
              defaultValue={formType === "edit" ? task?.status || "pending" : "pending"}
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
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className={`${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isPending 
              ? (formType === "add" ? "Creating..." : "Saving...")
              : (formType === "add" ? "Create Task" : "Save Changes")
            }
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}