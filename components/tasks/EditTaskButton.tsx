"use client"

import { Dialog } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useState } from "react"
import { updateTaskAction } from "@/lib/actions/task.action"
import TaskForm from "./TaskForm"
import { TaskType } from "@/lib/types/task"
import { DropdownMenuItem } from "../ui/dropdown-menu"

type EditTaskButtonProps = {
  task: TaskType
  isPending: boolean
}

export default function EditTaskButton({
  task,
  isPending,
}: EditTaskButtonProps) {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        <Edit className="h-3.5 w-3.5" />
        <span>Edit Task</span>
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <TaskForm
          onClose={onClose}
          action={updateTaskAction}
          formType="edit"
          task={task}
        />
      </Dialog>
    </>
  )
}
