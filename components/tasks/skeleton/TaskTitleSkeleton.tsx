'use client'

import { Skeleton } from "@/components/ui/skeleton"

const TaskTitleSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-10" />
    </div>
  )
}

export default TaskTitleSkeleton
