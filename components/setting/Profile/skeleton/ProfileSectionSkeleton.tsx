import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProfileSectionSkeleton() {
  return (
    <Card className="border-muted/40 shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>

      <CardContent className="mt-2">
        <div className="space-y-6">
          {/* Profile */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />

            <div className="flex items-center gap-4">
              {/* Avatar */}
              <Skeleton className="h-16 w-16 rounded-full" />

              {/* Name + email */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
