import { getTaskCount } from "@/lib/services/task.service"
import { CardDescription, CardTitle } from "../ui/card"
import { FilterOptionType } from "@/types/task"

const TITLE_MAP: Record<FilterOptionType, string> = {
  all: "All Tasks",
  completed: "Completed Tasks",
  pending: "Pending Tasks",
  high: "High Priority Tasks",
  medium: "Medium Priority Tasks",
  low: "Low Priority Tasks",
}

const TaskTitle = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) => {
  const params = await searchParams

  const filter = (params.filter as FilterOptionType) || "all"

  const { data, error } = await getTaskCount(filter)

  const title = TITLE_MAP[filter]

  return (
    <CardTitle>
      {!error ? `${title} ` : "Tasks"}
      <CardDescription className="inline-block">({data})</CardDescription>
    </CardTitle>
  )
}

export default TaskTitle
