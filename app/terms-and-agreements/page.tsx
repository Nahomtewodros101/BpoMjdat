import { HexagonalBackground } from "@/components/hexagonal-background"

export default function TermsAndAgreementsPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center py-12">
      <HexagonalBackground className="opacity-50 dark:opacity-20" />
      <div className="relative z-10 container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center">
            Terms and Agreements
          </h1>
          <p className="text-muted-foreground text-center md:text-lg">
            Please read these terms and conditions carefully before using our website and services.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the MJDAt Solutions website and services, you agree to be bound by these Terms and
              Agreements and all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Services Description</h2>
            <p>
              MJDAt Solutions provides Business Process Outsourcing (BPO) services, including but not limited to
              customer support, back-office operations, data management, finance and accounting, human resources, and
              digital marketing. The specific details of services provided will be outlined in a separate service
              agreement or contract.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You agree to use the website and services only for lawful purposes.</li>
              <li>You are responsible for maintaining the confidentiality of your account information.</li>
              <li>You agree not to engage in any activity that interferes with or disrupts the website or services.</li>
              <li>
                You must provide accurate and complete information when using our contact or job application forms.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of
              MJDAt Solutions or its content suppliers and is protected by international copyright laws. Unauthorized
              use of any materials on this site is prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Privacy Policy</h2>
            <p>
              Your use of our website and services is also governed by our Privacy Policy, which is incorporated into
              these Terms by reference. Please review our Privacy Policy to understand our practices regarding your
              personal data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p>
              MJDAt Solutions will not be liable for any damages arising out of the use or inability to use the
              materials on MJDAt Solutions' website, even if MJDAt Solutions or a MJDAt Solutions authorized
              representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of [Your
              Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or
              location.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
            <p>
              MJDAt Solutions reserves the right to revise these terms and agreements at any time without notice. By
              using this website, you are agreeing to be bound by the then current version of these Terms and
              Agreements.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8 text-center">Last updated: July 16, 2025</p>
        </div>
      </div>
    </div>
  )
}
