import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChangePasswordModal } from "./PasswordModal"
import { ChangeEmailModal } from "./EmailModal"

export function SecuritySection() {
  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          Account Security
        </CardTitle>
        <CardDescription >
          Manage your account&apos;s security settings
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <ChangePasswordModal />
        <ChangeEmailModal />
      </CardContent>
    </Card>
  )
}
