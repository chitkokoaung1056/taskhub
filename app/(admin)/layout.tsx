import { getCurrentUser } from "@/lib/services/auth.service"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (user.user_metadata?.role !== "admin") {
    redirect("/dashboard")
  }

  return <>{children}</>
}
