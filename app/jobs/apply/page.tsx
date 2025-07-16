"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HexagonalBackground } from "@/components/hexagonal-background";

export default function JobApplyPage() {
  const [formData, setFormData] = useState({
    jobOpeningId: "", // This would typically come from a job listing page
    applicantName: "",
    applicantEmail: "",
    coverLetter: "",
    resumeFile: null as File | null, // For file upload
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resumeFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real application, you would upload the resumeFile to Vercel Blob storage first
    // and get a URL, then send that URL in the application data.
    // For this example, we'll simulate the process without actual file upload to Blob.
    let resumeUrl = "";
    if (formData.resumeFile) {
      // Simulate file upload and get a URL
      // In a real app:
      // const uploadResponse = await fetch('/api/upload-resume', { method: 'POST', body: formData.resumeFile });
      // const uploadData = await uploadResponse.json();
      // resumeUrl = uploadData.url;
      console.log("Simulating resume upload for:", formData.resumeFile.name);
      resumeUrl = `https://example.com/resumes/${formData.resumeFile.name}`; // Placeholder URL
    }

    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobOpeningId: formData.jobOpeningId || "65f2a1b2c3d4e5f6a7b8c9d0", // Placeholder job ID
          applicantName: formData.applicantName,
          applicantEmail: formData.applicantEmail,
          coverLetter: formData.coverLetter,
          resumeUrl: resumeUrl,
        }),
      });

      if (response.ok) {
       
        setFormData({
          jobOpeningId: "",
          applicantName: "",
          applicantEmail: "",
          coverLetter: "",
          resumeFile: null,
        });
      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      console.error("Job application submission error:", error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />
      <div className="relative z-10 container px-4 md:px-6 max-w-2xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Apply for a Job</CardTitle>
            <CardDescription>
              Fill out the form below to submit your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* In a real app, jobOpeningId would be pre-filled or selected */}
              <div className="grid gap-2">
                <Label htmlFor="applicantName">Full Name</Label>
                <Input
                  id="applicantName"
                  placeholder="John Doe"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="applicantEmail">Email</Label>
                <Input
                  id="applicantEmail"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resumeFile">Resume/CV (PDF, DOCX)</Label>
                <Input
                  id="resumeFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us about yourself and why you're a great fit..."
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={7}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
