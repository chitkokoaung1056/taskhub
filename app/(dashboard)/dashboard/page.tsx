import { DashboardToast } from "@/components/dashboard/DashboardToast"
import { TaskStatus } from "@/components/dashboard/TaskStatus"
import TaskStatusSkeleton from "@/components/dashboard/skeleton/TaskStatusSkeleton"

import { Suspense } from "react"

const DashboardPage = async () => {
  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <DashboardToast />
      </Suspense>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage and track your tasks efficiently
        </p>
      </div>

      <Suspense fallback={<TaskStatusSkeleton />}>
        <TaskStatus />
      </Suspense>
    </div>
  )
}

export default DashboardPage
