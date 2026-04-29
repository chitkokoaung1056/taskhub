import { CardContent } from "../ui/card"
import { getTasks } from "@/lib/services/task.service"
import { FilterOptionType, SortOptionType } from "@/lib/types/task"
import { TaskCard } from "./TaskCard"

type TaskGridProps = {
  searchParams: Promise<{
    search?: string
    filter?: string
    sort?: string
  }>
}

const TaskGrid = async ({ searchParams }: TaskGridProps) => {
  const params = await searchParams

  const search = params.search
  const filter = (params.filter as FilterOptionType) || "all"
  const sort = (params.sort as SortOptionType) || "createdDate"

  const { data: tasks } = await getTasks(search, filter, sort)

  return (
    <CardContent>
      {tasks?.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No tasks found matching your filters
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </CardContent>
  )
}

export default TaskGrid
