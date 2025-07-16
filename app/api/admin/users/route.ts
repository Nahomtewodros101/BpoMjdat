import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";

// Helper to check admin role
const checkAdmin = () => {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  const decoded = verifyToken(token) as { role?: string } | null;
  return decoded && decoded.role === "admin" ? decoded : null;
};

export async function GET(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    await sendEmail({
      to: newUser.email,
      subject: "Your Account at MJDAt Solutions",
      html: `
        <h1>Welcome, ${newUser.name || newUser.email}!</h1>
        <p>An account has been created for you at MJDAt Solutions with the role: <strong>${
          newUser.role
        }</strong>.</p>
        <p>You can now log in using your email and the password provided (if any, or reset it if you were given a temporary one).</p>
        <p>Best regards,<br/>The MJDAt Solutions Team</p>
      `,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, email, name, role, password } = await req.json();
    if (!id || !email || !role) {
      return NextResponse.json(
        { message: "ID, email, and role are required" },
        { status: 400 }
      );
    }

    const updateData: any = { email, name, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!checkAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
