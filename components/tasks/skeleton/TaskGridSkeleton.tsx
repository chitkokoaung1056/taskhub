"use client"

import { TaskCardSkeleton } from "./TaskCardSkeleton"

export const TaskGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  )
}
