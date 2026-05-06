"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function CallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      // 🔥 REQUIRED: completes BOTH signup + email update verification
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error || !data.session) {
        router.replace("/login")
        return
      }

      const flow = sessionStorage.getItem("auth_flow")

      // cleanup
      sessionStorage.removeItem("auth_flow")

      // 🎯 route based on flow type
      if (flow === "email_update") {
        router.replace("/profile") // or /settings
      } else {
        router.replace("/dashboard")
      }
    }

    handleAuth()
  }, [router, supabase])

  return <p>Processing authentication...</p>
}
