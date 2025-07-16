import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { generateToken, setAuthCookie } from "@/lib/auth"
import { sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "user", // Default role
      },
    })

    const token = generateToken({ userId: user.id, email: user.email, role: user.role })
    const cookie = setAuthCookie(token)

    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: "Welcome to MJDAt Solutions!",
      html: `
        <h1>Welcome, ${user.name || user.email}!</h1>
        <p>Thank you for creating an account with MJDAt Solutions. We are excited to have you on board.</p>
        <p>Best regards,<br/>The MJDAt Solutions Team</p>
      `,
    })

    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully",
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      }),
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
