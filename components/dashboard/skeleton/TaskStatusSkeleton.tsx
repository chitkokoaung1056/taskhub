import { Card, CardHeader } from "../../ui/card"
import { Skeleton } from "../../ui/skeleton"

const TaskStatusSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-20" /> {/* Description skeleton */}
            <Skeleton className="mt-2 h-9 w-16" /> {/* Title number skeleton */}
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default TaskStatusSkeleton
