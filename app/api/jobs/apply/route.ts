import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const {
      jobOpeningId,
      applicantName,
      applicantEmail,
      resumeUrl,
      coverLetter,
    } = await req.json();

    if (!jobOpeningId || !applicantName || !applicantEmail || !resumeUrl) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Check if job opening exists
    const jobOpening = await prisma.jobOpening.findUnique({
      where: { id: jobOpeningId },
    });

    if (!jobOpening) {
      return NextResponse.json(
        { message: "Job opening not found" },
        { status: 404 }
      );
    }

    const newApplication = await prisma.jobApplication.create({
      data: {
        jobOpeningId,
        applicantName,
        applicantEmail,
        resumeUrl,
        coverLetter,
      },
    });

    // Send email to applicant
    await sendEmail({
      to: applicantEmail,
      subject: `Application Received for ${jobOpening.title}`,
      html: `
        <h1>Thank you for your application, ${applicantName}!</h1>
        <p>We have received your application for the <strong>${jobOpening.title}</strong> position.</p>
        <p>We will review your application and get back to you soon.</p>
        <p>Best regards,<br/>The MJDAt Solutions Recruitment Team</p>
      `,
    });

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || "nahomtewodrosm@gmail.com", // Replace with actual admin email
      subject: `New Job Application for ${jobOpening.title}`,
      html: `
        <h1>New Job Application Received!</h1>
        <p><strong>Position:</strong> ${jobOpening.title}</p>
        <p><strong>Applicant Name:</strong> ${applicantName}</p>
        <p><strong>Applicant Email:</strong> ${applicantEmail}</p>
        <p><strong>Resume:</strong> <a href="${resumeUrl}">Download Resume</a></p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter || "N/A"}</p>
        <p>Please log in to the admin dashboard to view and manage applications.</p>
      `,
    });

    return NextResponse.json(
      { message: "Application submitted successfully", data: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
