import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Inbox, Megaphone, Mail } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // Fetch counts for dashboard overview
  const userCount = await prisma.user.count();
  const jobOpeningCount = await prisma.jobOpening.count();
  const jobApplicationCount = await prisma.jobApplication.count();
  const announcementCount = await prisma.announcement.count();
  const unreadMessageCount = await prisma.contactMessage.count({
    where: { read: false },
  });

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold text-lg md:text-2xl">
        Admin Dashboard Overview
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/admin/dashboard/users"
                className="text-primary hover:underline"
              >
                Manage Users
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Openings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobOpeningCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/admin/dashboard/jobs"
                className="text-primary hover:underline"
              >
                Manage Openings
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Job Applications
            </CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobApplicationCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/admin/dashboard/applications"
                className="text-primary hover:underline"
              >
                View Applications
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/admin/dashboard/announcements"
                className="text-primary hover:underline"
              >
                Manage Announcements
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessageCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/admin/dashboard/messages"
                className="text-primary hover:underline"
              >
                View Messages
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Add more sections or recent activities here */}
    </div>
  );
}
