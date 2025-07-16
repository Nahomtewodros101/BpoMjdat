import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/email"

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
    const jobApplications = await prisma.jobApplication.findMany({
      include: { jobOpening: { select: { title: true } } }, // Include job title
      orderBy: { appliedAt: "desc" },
    })
    return NextResponse.json(jobApplications)
  } catch (error) {
    console.error("Error fetching job applications:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ message: "ID and status are required" }, { status: 400 })
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: { status },
      include: { jobOpening: { select: { title: true } } },
    })

    // Send email to applicant about status change
    await sendEmail({
      to: updatedApplication.applicantEmail,
      subject: `Your Application for ${updatedApplication.jobOpening.title} has been Updated`,
      html: `
        <h1>Dear ${updatedApplication.applicantName},</h1>
        <p>Your application for the <strong>${updatedApplication.jobOpening.title}</strong> position has been updated.</p>
        <p>Current Status: <strong>${updatedApplication.status}</strong></p>
        <p>We will notify you of any further updates.</p>
        <p>Best regards,<br/>The MJDAt Solutions Recruitment Team</p>
      `,
    })

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error("Error updating job application status:", error)
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

    await prisma.jobApplication.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Job application deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting job application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
