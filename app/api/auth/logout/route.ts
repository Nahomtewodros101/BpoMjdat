import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export async function POST() {
  try {
    const cookie = clearAuthCookie()
    return new NextResponse(JSON.stringify({ message: "Logged out successfully" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
