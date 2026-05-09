import { type NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/proxy"

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/task/:path*",
    "/setting/:path*",

    "/login",
    "/register",
    "/",
  ],
}
