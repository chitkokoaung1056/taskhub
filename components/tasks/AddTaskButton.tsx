"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { createTaskAction } from "@/lib/actions/task.action"
import { Button } from "../ui/button"
import TaskForm from "./TaskForm"

export default function AddTaskButton() {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <Button className="cursor-pointer px-4 py-2 font-semibold sm:py-5">
            <Plus className="mr-2 size-4" />
            Add Task
          </Button>
        </DialogTrigger>
        <TaskForm onClose={onClose} action={createTaskAction} formType="add" />
      </Dialog>
    </>
  )
}
