"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HexagonalBackground } from "@/components/hexagonal-background";
import { Mountain } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define the Announcement interface for type safety
interface Announcement {
  id: string;
  title: string;
  summary: string;
}

export default function Home() {
  // State for news announcements with type
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/admin/announcements");
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data: Announcement[] = await response.json();
        setAnnouncements(data);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />

      {/* Hero Section */}
      <section className="relative z-10 w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center">
        <div className="container px-4 md:px-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              MJDAt Solutions
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transforming businesses with tailored, efficient, and innovative
              BPO solutions.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button className="px-8 py-3 text-lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/jobs/apply">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Executive Summary
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Tailored Solutions for Your Business
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              MJDAT Solutions is a premier Business Process Outsourcing (BPO)
              company dedicated to empowering businesses and driving efficiency
              in their respective industries. Our vision is to become one of the
              largest BPO providers in East Africa. By leveraging our expertise
              in customer support, freight management, administrative services,
              and innovative solutions, we aim to optimize operations, reduce
              costs, and enhance customer satisfaction for our partners. This
              proposal outlines how our services address the specific needs of
              logistics carriers and business owners providing a comprehensive
              360° solution for growth and efficiency.
            </p>
            <Button asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <Image
            src="/MJDAT/MJDAT11.png"
            width={600}
            height={400}
            alt="About Us"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We offer a wide range of BPO services designed to optimize your
              operations.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-lg">
              <Mountain className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Customer Support</h3>
              <p className="text-muted-foreground">
                24/7 multi-channel support to keep your customers happy.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-lg">
              <Mountain className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Back Office Operations</h3>
              <p className="text-muted-foreground">
                Streamline your administrative tasks with our expert team.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-lg">
              <Mountain className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Data Management</h3>
              <p className="text-muted-foreground">
                Accurate and efficient data entry, processing, and analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="relative z-10 w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Latest News
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Stay updated with the latest announcements and updates from MJDAt
              Solutions.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {isLoading ? (
              <p>Loading news...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : announcements.length === 0 ? (
              <p>No announcements found.</p>
            ) : (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex flex-col space-y-4 p-6 bg-muted rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold">{announcement.title}</h3>
                  <p className="text-muted-foreground">
                    {announcement.summary}
                  </p>
                  <Button variant="link" asChild>
                    <Link href={`/news/${announcement.id}`}>Read More</Link>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">MJDAt Solutions</h3>
              <p className="text-muted-foreground text-sm">
                Transforming businesses with innovative BPO solutions since
                2020.
              </p>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/jobs/apply" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:info@mjdatsolutions.com"
                  className="hover:underline"
                >
                  info@mjdatsolutions.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Address: 123 Business Ave, Suite 100, City, Country
              </p>
            </div>
            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  LinkedIn
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MJDAt Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
