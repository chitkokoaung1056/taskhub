"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { Button } from "../ui/button"
import { Check, Circle, MoreVertical, Trash2, Trash2Icon } from "lucide-react"
import { TaskType } from "@/lib/types/task"
import { useTransition, useState } from "react"
import { toast } from "sonner"

import {
  toggleTaskStatusAction,
  deleteTaskAction,
} from "@/lib/actions/task.action"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import EditTaskButton from "./EditTaskButton"

type Props = {
  task: TaskType
}

const TaskCardDropdown = ({ task }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleTaskStatusAction(task.id!, task.status)

      if (res.success) {
        toast.success(res.message?.[0] || "Updated")
      } else {
        toast.error(res.errors?.general?.[0] || "Failed")
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteTaskAction(task.id!)

      if (res.success) {
        toast.success(res.message?.[0] || "Deleted")
        setShowDeleteDialog(false)
      } else {
        toast.error(res.errors?.general?.[0] || "Delete failed")
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button
            variant="ghost"
            size="icon"
            className="-mt-0.5 -mr-1 h-7 w-7 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>

        {/* Toggle Complete Task */}

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={handleToggle}
            disabled={isPending}
            className="cursor-pointer gap-2 text-sm"
          >
            {task.status === "completed" ? (
              <>
                <Circle className="h-3.5 w-3.5" />
                <span>Mark as Pending</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Mark as Complete</span>
              </>
            )}
          </DropdownMenuItem>

          {/* Edit Task */}

          <EditTaskButton task={task} isPending={isPending} />

          <DropdownMenuSeparator />

          {/* Edit Task */}

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            disabled={isPending}
            className="cursor-pointer gap-2 text-sm text-red-600 focus:text-red-600 dark:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Task</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you would like to do this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={handleDelete}
              variant="destructive"
              className="cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TaskCardDropdown
