import { CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const TaskGridSkeleton = () => {
  const skeletons = [
    { breakpoint: "", count: 2 }, // Always visible
    { breakpoint: "sm:", count: 2 }, // Tablet+
    { breakpoint: "lg:", count: 2 }, // Desktop+
  ]

  return (
    <CardContent>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skeletons.map(({ breakpoint, count }, groupIndex) =>
          Array.from({ length: count }).map((_, index) => (
            <div
              key={`${groupIndex}-${index}`}
              className={`${breakpoint === "sm:" ? "hidden sm:block" : ""} ${breakpoint === "lg:" ? "hidden lg:block" : ""} space-y-3 rounded-lg border p-4`}
            >
              <div className="flex items-start gap-3">
                <Skeleton className="size-5 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))
        )}
      </div>
    </CardContent>
  )
}

export default TaskGridSkeleton
