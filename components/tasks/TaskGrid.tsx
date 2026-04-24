import { CardContent } from "../ui/card"
import { TaskCard } from "./TaskCard"

interface TaskGridProps {
  search?: string
  filter?: string
  sort?: string
}

export const TaskGrid = async ({ 
  search = "", 
  filter = "all", 
  sort = "dueDate" 
}: TaskGridProps) => {
  const tasks = await getTasks({ search, filter, sort })

  return (
    <CardContent>
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No tasks found matching your filters
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </CardContent>
  )
}