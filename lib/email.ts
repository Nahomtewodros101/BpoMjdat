
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"MJDAt Solutions" <${process.env.EMAIL_USER}>`, // sender address
      to: Array.isArray(to) ? to.join(", ") : to, // list of receivers
      subject, // Subject line
      text: text || html.replace(/<[^>]*>?/gm, ""), // plain text body
      html, // html body
    })
    console.log("Email sent successfully!")
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email.")
  }
}
