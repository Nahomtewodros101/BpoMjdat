"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Download, Trash2 } from "lucide-react";

interface JobApplication {
  id: string;
  jobOpeningId: string;
  jobOpening: { title: string }; // Nested object for job title
  applicantName: string;
  applicantEmail: string;
  resumeUrl?: string;
  coverLetter?: string;
  appliedAt: string;
  status: string;
}

export default function AdminJobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] =
    useState<JobApplication | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/job-applications");
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (application: JobApplication) => {
    setCurrentApplication(application);
    setFormStatus(application.status);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job application?"))
      return;

    try {
      const response = await fetch("/api/admin/job-applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchApplications();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentApplication) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/job-applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentApplication.id, status: formStatus }),
      });

      if (response.ok) {
        setDialogOpen(false);
        fetchApplications();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold text-lg md:text-2xl">Job Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No job applications found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Applied At
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      {app.jobOpening.title}
                    </TableCell>
                    <TableCell>{app.applicantName}</TableCell>
                    <TableCell>{app.applicantEmail}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewClick(app)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                        {app.resumeUrl && (
                          <Button variant="outline" size="icon" asChild>
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Resume</span>
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(app.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review and update the status of this job application.
            </DialogDescription>
          </DialogHeader>
          {currentApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">Job Title:</Label>
                <span className="col-span-2 font-medium">
                  {currentApplication.jobOpening.title}
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">Applicant Name:</Label>
                <span className="col-span-2">
                  {currentApplication.applicantName}
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">Applicant Email:</Label>
                <span className="col-span-2">
                  {currentApplication.applicantEmail}
                </span>
              </div>
              <div className="grid grid-cols-3 items-start gap-4">
                <Label className="text-right pt-2">Cover Letter:</Label>
                <p className="col-span-2 text-sm text-muted-foreground">
                  {currentApplication.coverLetter ||
                    "No cover letter provided."}
                </p>
              </div>
              {currentApplication.resumeUrl && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Resume/CV:</Label>
                  <a
                    href={currentApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 text-primary hover:underline flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" /> Download Resume
                  </a>
                </div>
              )}
              <form
                onSubmit={handleStatusUpdate}
                className="grid grid-cols-3 items-center gap-4 mt-4 border-t pt-4"
              >
                <Label htmlFor="status" className="text-right">
                  Update Status:
                </Label>
                <Select value={formStatus} onValueChange={setFormStatus}>
                  <SelectTrigger id="status" className="col-span-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Interviewed">Interviewed</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-start-2 col-span-2 flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Status"}
                  </Button>
                </div>
              </form>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
