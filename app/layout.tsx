import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthStatus } from "@/components/auth-status"; // Import the new component
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MJDAt Solutions",
  description: "Modern and Futuristic BPO Company Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MJDAT BPO SOLUTIONS</title>
        <link rel="icon" href="/MJDAT/MJDAT9.png" />
        {/* Add any additional head elements here */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 z-50 items-center justify-around px-4 md:px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 ">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <span className="text-lg">MJDAt </span>
                  </Link>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                  <Link href="/" className="hover:underline underline-offset-4">
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="hover:underline underline-offset-4"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/services"
                    className="hover:underline underline-offset-4"
                  >
                    Services
                  </Link>
                  <Link
                    href="/jobs/apply"
                    className="hover:underline underline-offset-4"
                  >
                    Apply for Job
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:underline underline-offset-4"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="hover:underline underline-offset-4"
                  >
                    Admin
                  </Link>
                  <Link
                    href="/terms-and-agreements"
                    className="hover:underline underline-offset-4"
                  >
                    Terms & Agreements
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <AuthStatus /> {/* Use the new AuthStatus component here */}
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster /> {/* Add the Toaster component here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
