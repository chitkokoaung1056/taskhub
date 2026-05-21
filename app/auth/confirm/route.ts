import { type EmailOtpType } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/"

  if (token_hash && type) {
    const supabase = await createClient()

    // Verifies the temporary OTP token with Supabase Auth
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      const redirectUrl = new URL(next, request.url)

      // 1. Signup / Sign-in confirmation
      if (type === "email" || type === "signup") {
        redirectUrl.searchParams.set("message", "account-confirmed")
      }

      // 2. Email update confirmation
      if (type === "email_change") {
        redirectUrl.searchParams.set("message", "email-change-success")
      }

      // 3. Password recovery
      if (type === "recovery") {
        redirectUrl.searchParams.set("message", "password-reset-success")
      }

      return NextResponse.redirect(redirectUrl)
    } else {
      // Log the exact validation error on the server console for easy debugging
      console.error("Supabase Auth Verification Error:", error.message)
    }
  } else {
    console.error(
      "Auth Confirmation Error: Missing token_hash or type parameters",
      {
        token_hash: !!token_hash,
        type,
      }
    )
  }

  // Fallback to error page if validation or parameters fail
  return NextResponse.redirect(new URL("/auth/error", request.url))
}
