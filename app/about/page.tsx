"use client";

import { HexagonalBackground } from "@/components/hexagonal-background";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Target,
  Eye,
  HeartHandshake,
  Award,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center py-12">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            About MJDAt Solutions
          </h1>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
            Pioneering the future of Business Process Outsourcing with
            innovation, efficiency, and unwavering commitment to excellence.
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Journey: Redefining BPO Excellence
              </h2>
              <p className="text-muted-foreground md:text-lg">
                MJDAT Solutions was founded with the mission to transform how
                businesses operate by providing tailored, efficient, and
                innovative BPO solutions. With a team of experts from diverse
                industries, we bring a wealth of knowledge, fresh perspectives,
                and a problem-solving mindset to every challenge. Our services
                are designed to reduce operational burdens, improve performance,
                and ensure compliance, all while allowing our partners to focus
                on their core competencies.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Business owners, particularly logistics carriers, face
                increasing challenges in maintaining cost efficiency, managing
                daily operations, and staying competitive in a dynamic market.
                They require innovative, comprehensive systems that can handle
                repetitive, stressful tasks while enabling growth and expansion.
                MJDAT Solutions addresses these needs by offering
                cost-effective, scalable, and innovative services tailored to
                their requirements
              </p>
            </div>
            <div className="relative flex justify-center items-center">
              <Image
                src="/MJDAT/MJDAT3.png"
                width={600}
                height={400}
                alt="Our Journey"
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Target className="h-16 w-16 text-primary mb-4 animate-bounce-subtle" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To empower businesses globally by delivering innovative,
                  efficient, and scalable BPO solutions that drive sustainable
                  growth and operational excellence.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Eye className="h-16 w-16 text-primary mb-4 animate-pulse-subtle" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To be the leading BPO partner, recognized for our futuristic
                  approach, technological integration, and unwavering commitment
                  to client success and employee well-being.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <HeartHandshake className="h-16 w-16 text-primary mb-4 animate-float-subtle" />
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Integrity, Innovation, Excellence, Collaboration, and
                  Client-Centricity are the pillars guiding every action and
                  decision we make.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">
            Meet Our Expert Team
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mb-12">
            Our strength lies in our diverse team of professionals, each
            bringing unique expertise and a shared dedication to delivering
            unparalleled results.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Example Team Member Card */}
            <Card className="flex flex-col items-center text-center p-4">
              <Image
                src="/placeholder.svg?height=120&width=120"
                width={120}
                height={120}
                alt="Team Member 1"
                className="rounded-full mb-4 object-cover"
              />
              <CardTitle className="text-xl">Jane Doe</CardTitle>
              <CardDescription className="text-primary">
                CEO & Founder
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Visionary leader with 20+ years in BPO and technology.
              </p>
            </Card>
            <Card className="flex flex-col items-center text-center p-4">
              <Image
                src="/placeholder.svg?height=120&width=120"
                width={120}
                height={120}
                alt="Team Member 2"
                className="rounded-full mb-4 object-cover"
              />
              <CardTitle className="text-xl">John Smith</CardTitle>
              <CardDescription className="text-primary">
                Chief Operations Officer
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Expert in operational efficiency and process optimization.
              </p>
            </Card>
            <Card className="flex flex-col items-center text-center p-4">
              <Image
                src="/placeholder.svg?height=120&width=120"
                width={120}
                height={120}
                alt="Team Member 3"
                className="rounded-full mb-4 object-cover"
              />
              <CardTitle className="text-xl">Emily White</CardTitle>
              <CardDescription className="text-primary">
                Head of Client Success
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Dedicated to building strong client relationships and
                satisfaction.
              </p>
            </Card>
            <Card className="flex flex-col items-center text-center p-4">
              <Image
                src="/placeholder.svg?height=120&width=120"
                width={120}
                height={120}
                alt="Team Member 4"
                className="rounded-full mb-4 object-cover"
              />
              <CardTitle className="text-xl">David Green</CardTitle>
              <CardDescription className="text-primary">
                Lead Solutions Architect
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Innovator in designing scalable and secure BPO solutions.
              </p>
            </Card>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">
            Why Choose MJDAt Solutions?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 text-left shadow-md">
              <Award className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-xl mb-2">
                Strengthened compliance and risk management
              </CardTitle>
              <CardDescription>
                Scalable solutions to match business growth.
              </CardDescription>
            </Card>
            <Card className="p-6 text-left shadow-md">
              <Lightbulb className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-xl mb-2">
                Improved operational efficiency and cost savings.
              </CardTitle>
              <CardDescription>
                Streamlined processes and reduced operational burdens. Enhanced
                focus on core business activities.
              </CardDescription>
            </Card>
            <Card className="p-6 text-left shadow-md">
              <Lightbulb className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-xl mb-2">
                Access to expert teams and innovative technologies.{" "}
              </CardTitle>
              <CardDescription>
                Specialized expertise in various domains. Integration of
                cutting-edge technologies for improved performance. Continuous
                innovation to stay ahead in the industry.
              </CardDescription>
            </Card>
            <Card className="p-6 text-left shadow-md">
              <Rocket className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-xl mb-2">
                Enhanced customer satisfaction through 24/7 support.
              </CardTitle>
              <CardDescription>
                Round-the-clock support for clients and customers. Faster
                response times and issue resolution. Improved customer loyalty
                and retention.
              </CardDescription>
            </Card>
          </div>
        </section>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.3;
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        @keyframes float-subtle {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s infinite ease-in-out;
        }
        .animate-float-subtle {
          animation: float-subtle 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
