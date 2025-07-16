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
    const jobOpenings = await prisma.jobOpening.findMany({
      orderBy: { postedAt: "desc" },
    })
    return NextResponse.json(jobOpenings)
  } catch (error) {
    console.error("Error fetching job openings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { title, description, location, department, salaryRange } = await req.json()
    if (!title || !description || !location || !department) {
      return NextResponse.json(
        { message: "Title, description, location, and department are required" },
        { status: 400 },
      )
    }

    const newJobOpening = await prisma.jobOpening.create({
      data: { title, description, location, department, salaryRange },
    })
    return NextResponse.json(newJobOpening, { status: 201 })
  } catch (error) {
    console.error("Error creating job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, title, description, location, department, salaryRange } = await req.json()
    if (!id || !title || !description || !location || !department) {
      return NextResponse.json(
        { message: "ID, title, description, location, and department are required" },
        { status: 400 },
      )
    }

    const updatedJobOpening = await prisma.jobOpening.update({
      where: { id },
      data: { title, description, location, department, salaryRange },
    })
    return NextResponse.json(updatedJobOpening)
  } catch (error) {
    console.error("Error updating job opening:", error)
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

    await prisma.jobOpening.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Job opening deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
