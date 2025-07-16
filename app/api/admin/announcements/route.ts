import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/email"

// Helper to check admin role
const checkAdmin = (req: Request) => {
  const token = cookies().get("token")?.value
  if (!token) return null
  const decoded = verifyToken(token) as { role?: string } | null
  return decoded && decoded.role === "admin" ? decoded : null
}

export async function GET(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { publishedAt: "desc" },
    })
    return NextResponse.json(announcements)
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { title, content } = await req.json()
    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 })
    }

    const newAnnouncement = await prisma.announcement.create({
      data: { title, content },
    })

    // Send email to all users about new announcement (simplified for example)
    // In a real app, you'd fetch all user emails or use a dedicated mailing list service
    const users = await prisma.user.findMany({ select: { email: true } })
    const userEmails = users.map((user: any) => user.email)

    if (userEmails.length > 0) {
      await sendEmail({
        to: userEmails,
        subject: `New Announcement: ${title}`,
        html: `
          <h1>${title}</h1>
          <p>${content}</p>
          <p>Check out more announcements on our website!</p>
        `,
      })
    }

    return NextResponse.json(newAnnouncement, { status: 201 })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, title, content } = await req.json()
    if (!id || !title || !content) {
      return NextResponse.json({ message: "ID, title, and content are required" }, { status: 400 })
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id },
      data: { title, content },
    })
    return NextResponse.json(updatedAnnouncement)
  } catch (error) {
    console.error("Error updating announcement:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id } = await req.json() // Assuming ID is sent in the request body for DELETE
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 })
    }

    await prisma.announcement.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Announcement deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
