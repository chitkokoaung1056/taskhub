'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center py-10">
      <Card className="w-full max-w-md border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 text-lg">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We couldn’t load this section. Please try again.
          </p>

          <p className="text-xs text-red-500 break-all">
            {error.message}
          </p>

          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}