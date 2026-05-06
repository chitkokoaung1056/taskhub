"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function CallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        router.replace("/login")
        return
      }

      // 🔥 IMPORTANT: re-check session AFTER exchange
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace("/login")
        return
      }

      const flow = sessionStorage.getItem("auth_flow")
      sessionStorage.removeItem("auth_flow")

      router.replace(flow === "email_update" ? "/setting" : "/dashboard")
    }

    handleAuth()
  }, [router, supabase])

  return <p>Processing authentication...</p>
}
