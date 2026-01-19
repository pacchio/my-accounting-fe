import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 20, 2026</p>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My Accounting (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our personal
              finance management application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2 mt-4">2.1 Personal Information</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Name (first and last name)</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2.2 Financial Data</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You voluntarily provide financial information including:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Transaction details (amounts, dates, descriptions)</li>
              <li>Account names and balances</li>
              <li>Categories and custom labels</li>
              <li>Notes and additional transaction information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2.3 Authentication Data</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you sign up using Google OAuth:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Google account email</li>
              <li>Name from Google profile</li>
              <li>Google account ID (for authentication purposes)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2.4 Usage Information</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Login timestamps</li>
              <li>Device information</li>
              <li>Browser type and version</li>
              <li>IP address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Provide and maintain the Service</li>
              <li>Authenticate your identity and manage your account</li>
              <li>Process and store your financial data</li>
              <li>Generate financial reports and analytics</li>
              <li>Send important notifications about your account</li>
              <li>Improve and optimize the Service</li>
              <li>Respond to your support requests</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>All data transmission is encrypted using SSL/TLS</li>
              <li>Passwords are hashed using bcrypt</li>
              <li>Database connections are secured and encrypted</li>
              <li>JWT tokens for secure authentication</li>
              <li>Regular security updates and monitoring</li>
              <li>Access controls and authentication requirements</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect
              your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Storage</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your data is stored on secure cloud servers (Neon PostgreSQL) with automated backups. We use
              AWS Lambda for serverless computing and implement encryption at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
              <li><strong>Service Providers:</strong> With trusted third-party services (Google OAuth, AWS, Neon) necessary to operate the Service</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Security:</strong> To protect against fraud, security threats, or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We integrate with the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Google OAuth:</strong> For authentication (subject to Google&apos;s Privacy Policy)</li>
              <li><strong>AWS (Amazon Web Services):</strong> For hosting and infrastructure</li>
              <li><strong>Neon Database:</strong> For data storage</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Export:</strong> Download your financial data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain your personal and financial data for as long as your account is active. If you delete
              your account, we will remove your personal information within 30 days, except where retention is
              required by law or for legitimate business purposes (such as resolving disputes or enforcing agreements).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Cookies and Tracking</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use essential cookies and local storage to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-3">
              <li>Maintain your login session</li>
              <li>Remember your preferences (theme, language)</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              We do not use third-party advertising or analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Children&apos;s Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Service is not intended for users under 18 years of age. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child, please contact
              us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. International Data Transfers</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your data may be transferred to and processed in countries other than your country of residence.
              We ensure appropriate safeguards are in place to protect your information in accordance with this
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Changes to Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage
              you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">14. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us
              through the application or at the contact information provided in the Service.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By using My Accounting, you acknowledge that you have read and understood this Privacy Policy
              and agree to our collection, use, and disclosure of your information as described herein.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

