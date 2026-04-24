import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { EditTask } from "./EditTask"
import { TaskType } from "./CreateTask"

type EditTaskDialogProps = {
  task: TaskType | null
  isOpen: boolean
  onClose: () => void
  onTaskUpdate: (task: TaskType) => void
}

export function EditTaskDialog({
  task,
  isOpen,
  onClose,
  onTaskUpdate,
}: EditTaskDialogProps) {
  const handleTaskUpdate = (updatedTask: TaskType) => {
    onTaskUpdate(updatedTask)
    onClose()
  }

  if (!task) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <EditTask
          task={task}
          onTaskUpdate={handleTaskUpdate}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
