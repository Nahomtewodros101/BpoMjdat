import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { to, subject, html, text } = await req.json()

    if (!to || !subject || !html) {
      return NextResponse.json({ message: "To, subject, and HTML content are required" }, { status: 400 })
    }

    await sendEmail({ to, subject, html, text })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("API Email Send Error:", error)
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
  }
}
