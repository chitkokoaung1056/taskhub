import AddTaskButton from "@/components/tasks/AddTaskButton"
import { TaskGridSkeleton } from "@/components/tasks/skeleton/TaskGridSkeleton"
import TaskTitleSkeleton from "@/components/tasks/skeleton/TaskTitleSkeleton"
import TaskFilter from "@/components/tasks/TaskFilter"
import TaskGrid from "@/components/tasks/TaskGrid"
import TaskTitle from "@/components/tasks/TaskTitle"
import { Card, CardHeader } from "@/components/ui/card"
import { Suspense } from "react"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage and track your tasks efficiently
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <AddTaskButton />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Suspense fallback={<TaskTitleSkeleton />}>
              <TaskTitle searchParams={searchParams} />
            </Suspense>
            <Suspense fallback={<span />}>
              <TaskFilter />
            </Suspense>
          </div>
        </CardHeader>
        <Suspense fallback={<TaskGridSkeleton />}>
          <TaskGrid searchParams={searchParams} />
        </Suspense>
      </Card>
    </div>
  )
}
