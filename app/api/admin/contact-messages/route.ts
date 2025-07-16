import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

// Helper to check admin role
const checkAdmin = () => {
  const token = cookies().get("token")?.value
  if (!token) return null
  const decoded = verifyToken(token) as { role?: string } | null
  return decoded && decoded.role === "admin" ? decoded : null
}

export async function GET(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const contactMessages = await prisma.contactMessage.findMany({
      orderBy: { receivedAt: "desc" },
    })
    return NextResponse.json(contactMessages)
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, read } = await req.json()
    if (!id || typeof read !== "boolean") {
      return NextResponse.json({ message: "ID and read status are required" }, { status: 400 })
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    })
    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error("Error updating contact message status:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 })
    }

    await prisma.contactMessage.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Contact message deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting contact message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
