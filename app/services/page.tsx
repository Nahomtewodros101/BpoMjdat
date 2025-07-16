import { HexagonalBackground } from "@/components/hexagonal-background";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Lightbulb,
  Users,
  Database,
  ShieldCheck,
  BarChart2,
  Globe,
  Plane,
  DollarSign,
  Truck,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center py-12">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Our Comprehensive Services
          </h1>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
            MJDAt Solutions offers a wide array of Business Process Outsourcing
            (BPO) services designed to optimize your operations, reduce costs,
            and enhance efficiency. We partner with you to deliver tailored
            solutions that drive growth and allow you to focus on your core
            business.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Customer Support & Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deliver exceptional customer service with our 24/7 multi-channel
                support, including voice, email, chat, and social media. We
                focus on customer satisfaction and retention.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <Plane className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Freight Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Shipment coordination for smooth pickups and deliveries. Route
                optimization for cost-effective transportation. Load planning to
                maximize truck space utilization.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <Database className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Administrative and Back-Office Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Data entry and management. Preparation and management of
                critical documents. Performance and financial reporting
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Finance & Accounting Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Billing, invoicing, and payment tracking. Cost analysis for
                operational savings. Payroll management for staff.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <BarChart2 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Human Resources Outsourcing (HRO)</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimize your HR functions from recruitment and onboarding to
                benefits administration and compliance, allowing you to focus on
                talent development.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle>IT and Technical Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Maintenance and updates for logistics systems. Data security
                measures. Automation tools for tracking and notifications.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Marketing and Sales Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                : Lead generation and digital marketing campaigns. CRM
                management to enhance customer relationships.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <Truck className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Supply Chain Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Inventory management and vendor coordination. Warehousing
                solutions for organized operations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
