import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const newContactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    // Send email notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || "admin@example.com", // Replace with actual admin email from env
      subject: `New Contact Message: ${subject}`,
      html: `
        <h1>New Contact Message from ${name} (${email})</h1>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Please log in to the admin dashboard to view and manage messages.</p>
      `,
    })

    return NextResponse.json({ message: "Message sent successfully", data: newContactMessage }, { status: 201 })
  } catch (error) {
    console.error("Error submitting contact message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
