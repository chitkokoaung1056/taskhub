import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getTaskStats } from "@/lib/services/task.service"

export const TaskStatus = async () => {
  const data = await getTaskStats()

  const { total, completed, pending, overdue } = data

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle className="text-3xl">{total}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Completed</CardDescription>
          <CardTitle className="text-3xl text-green-600 dark:text-green-500">
            {completed}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Pending</CardDescription>
          <CardTitle className="text-3xl text-blue-600 dark:text-blue-500">
            {pending}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Overdue</CardDescription>
          <CardTitle className="text-3xl text-red-600 dark:text-red-500">
            {overdue}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
