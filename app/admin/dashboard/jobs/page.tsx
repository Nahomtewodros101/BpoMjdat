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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  salaryRange?: string;
  postedAt: string;
}

export default function AdminJobOpeningsPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentJobOpening, setCurrentJobOpening] = useState<JobOpening | null>(
    null
  );
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formSalaryRange, setFormSalaryRange] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/job-openings");
      if (response.ok) {
        const data = await response.json();
        setJobOpenings(data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching job openings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCurrentJobOpening(null);
    setFormTitle("");
    setFormDescription("");
    setFormLocation("");
    setFormDepartment("");
    setFormSalaryRange("");
    setDialogOpen(true);
  };

  const handleEditClick = (job: JobOpening) => {
    setCurrentJobOpening(job);
    setFormTitle(job.title);
    setFormDescription(job.description);
    setFormLocation(job.location);
    setFormDepartment(job.department);
    setFormSalaryRange(job.salaryRange || "");
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;

    try {
      const response = await fetch("/api/admin/job-openings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchJobOpenings();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error deleting job opening:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const method = currentJobOpening ? "PUT" : "POST";
    const body: any = {
      title: formTitle,
      description: formDescription,
      location: formLocation,
      department: formDepartment,
      salaryRange: formSalaryRange,
    };
    if (currentJobOpening) {
      body.id = currentJobOpening.id;
    }

    try {
      const response = await fetch("/api/admin/job-openings", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setDialogOpen(false);
        fetchJobOpenings();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error submitting job opening form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Job Openings</h1>
        <Button size="sm" onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Job Opening
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Job Openings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading job openings...</div>
          ) : jobOpenings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No job openings found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Salary Range
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Posted At
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobOpenings.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.salaryRange || "N/A"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(job.postedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(job)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(job.id)}
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
            <DialogTitle>
              {currentJobOpening
                ? "Edit Job Opening"
                : "Create New Job Opening"}
            </DialogTitle>
            <DialogDescription>
              {currentJobOpening
                ? "Make changes to this job opening."
                : "Add a new job position to your listings."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormTitle(e.target.value)
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formLocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormLocation(e.target.value)
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                value={formDepartment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormDepartment(e.target.value)
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salaryRange" className="text-right">
                Salary Range
              </Label>
              <Input
                id="salaryRange"
                value={formSalaryRange}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormSalaryRange(e.target.value)
                }
                className="col-span-3"
                placeholder="e.g., $50,000 - $70,000"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormDescription(e.target.value)
                }
                className="col-span-3"
                required
                rows={7}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
