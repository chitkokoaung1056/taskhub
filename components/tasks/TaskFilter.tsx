"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "../ui/select"
import { ArrowUpDown, Filter } from "lucide-react"
import { FilterOptionType, SortOptionType } from "@/types/task"

const TaskFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentSortBy =
    (searchParams.get("sort") as SortOptionType) || "createdDate"
  const currentFilterBy =
    (searchParams.get("filter") as FilterOptionType) || "all"

  const updateSort = (value: SortOptionType) => {
    const params = new URLSearchParams(searchParams)

    if (value !== "createdDate") params.set("sort", value)
    else params.delete("sort")

    replace(`${pathname}?${params.toString()}`)
  }

  const updateFilter = (value: FilterOptionType) => {
    const params = new URLSearchParams(searchParams)

    if (value !== "all") params.set("filter", value)
    else params.delete("filter")

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Sort By */}
      <Select
        value={currentSortBy}
        onValueChange={(value) => updateSort(value as SortOptionType)}
      >
        <SelectTrigger className="w-full bg-slate-100 sm:w-45">
          <ArrowUpDown className="mr-2 size-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdDate">Created Date (Newest)</SelectItem>
          <SelectItem value="dueDate">Due Date</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter By */}
      <Select
        value={currentFilterBy}
        onValueChange={(value) => updateFilter(value as FilterOptionType)}
      >
        <SelectTrigger className="w-full bg-slate-100 sm:w-45">
          <Filter className="mr-2 size-4" />
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="high">High Priority</SelectItem>
          <SelectItem value="medium">Medium Priority</SelectItem>
          <SelectItem value="low">Low Priority</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TaskFilter
