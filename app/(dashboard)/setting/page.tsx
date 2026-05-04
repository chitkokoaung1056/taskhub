import { ActionSection } from "@/components/setting/Actions/ActionSection"
import { PreferencesSection } from "@/components/setting/Preferences/PreferencesSection"
import { ProfileSection } from "@/components/setting/Profile/ProfileSection"
import { ProfileSectionSkeleton } from "@/components/setting/Profile/skeleton/ProfileSectionSkeleton"
import { SecuritySection } from "@/components/setting/Security/SecuritySection"
import { getCurrentUser } from "@/lib/services/auth.service"
import { getProfile } from "@/lib/services/profile.service"
import { Suspense } from "react"

export default function SettingsPage() {
  const profile = getProfile()
  const user = getCurrentUser()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">
          <Suspense fallback={<ProfileSectionSkeleton />}>
            <ProfileSection profile={profile} user={user}/>
          </Suspense>
          <PreferencesSection />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <SecuritySection />
          <ActionSection />
        </div>
      </div>
    </div>
  )
}
