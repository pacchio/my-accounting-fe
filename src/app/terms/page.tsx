import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 20, 2026</p>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using My Accounting (&quot;the Service&quot;), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              My Accounting is a personal finance management application that allows you to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Track income and expenses across multiple accounts</li>
              <li>Categorize and organize financial transactions</li>
              <li>View financial reports and analytics</li>
              <li>Manage personal budget and spending</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              To use the Service, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Create an account with accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with or disrupt the Service</li>
              <li>Not use the Service to transmit harmful content</li>
              <li>Keep your financial data accurate and up-to-date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data and Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. We take data security seriously
              and implement industry-standard measures to protect your financial information. All data is
              encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All content, features, and functionality of the Service, including but not limited to text,
              graphics, logos, and software, are owned by My Accounting and are protected by copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service may integrate with third-party authentication providers (such as Google OAuth).
              Your use of these services is subject to their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages resulting from your use or
              inability to use the Service. You are solely responsible for the accuracy of your financial data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Service Availability</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              While we strive to maintain continuous availability, we do not guarantee that the Service will
              be uninterrupted or error-free. We reserve the right to suspend or discontinue the Service at
              any time for maintenance or other reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend your account at our sole discretion, without notice,
              for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material
              changes via email or through the Service. Your continued use of the Service after such changes
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us through the application or at
              the contact information provided in the Service.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By using My Accounting, you acknowledge that you have read, understood, and agree to be bound by
              these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

