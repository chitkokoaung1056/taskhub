import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeSetting } from "./ThemeSetting"
import { LanguageSetting } from "./LanguageSetting"

export function PreferencesSection() {
  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Preferences</CardTitle>
        <CardDescription>
          Customize your experience by adjusting your preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <ThemeSetting />
        <LanguageSetting />
      </CardContent>
    </Card>
  )
}
