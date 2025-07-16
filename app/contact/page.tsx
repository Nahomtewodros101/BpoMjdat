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
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />
      <div className="relative z-10 container px-4 md:px-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="text-muted-foreground md:text-xl">
              We invite you to partner with MJDAT Solutions to revolutionize
              your logistics operations and achieve unmatched efficiency.
              Contact us today to discuss how we can tailor our services to meet
              your specific needs.
            </p>
          </div>
          <div className="grid gap-6">
            <Card className="flex items-center gap-4 p-4">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-muted-foreground">info@mjdat.com</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-4">
              <Phone className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-4">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">
                  123 BPO Street, Tech City, TX 78901
                </p>
              </div>
            </Card>
          </div>
          <Image
            src="/placeholder.svg?height=300&width=500"
            width={500}
            height={300}
            alt="Contact Office"
            className="rounded-lg object-cover w-full"
          />
        </div>
        <Card className="w-full max-w-md mx-auto lg:max-w-none">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              We'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Subject of your message"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
