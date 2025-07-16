import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return NextResponse.json({ user: null, message: "No token found" }, { status: 200 })
    }

    const decoded = verifyToken(token) as { userId: string; email: string; role: string } | null

    if (!decoded) {
      return NextResponse.json({ user: null, message: "Invalid token" }, { status: 200 })
    }

    // Optionally, fetch user from DB to ensure it's still valid and get latest data
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true },
    })

    if (!user) {
      return NextResponse.json({ user: null, message: "User not found" }, { status: 200 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("Error fetching auth status:", error)
    return NextResponse.json({ user: null, message: "Internal server error" }, { status: 500 })
  }
}
