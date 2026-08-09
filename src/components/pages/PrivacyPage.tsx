'use client';

import { Shield, Lock, Eye, Database, Server, Users, FileEdit, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A78BFA]/20 to-[#A78BFA]/5 border border-[#334155]">
            <Shield className="h-8 w-8 text-[#A78BFA]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#E2E8F0]">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">Last updated: August 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-[#94A3B8] leading-relaxed">
              At DevToolsHub, we take your privacy seriously. This Privacy Policy explains how
              we handle information when you use our website and tools. We believe in transparency
              and want you to understand our practices. By using DevToolsHub, you agree to the
              practices described in this policy.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Database className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Information We Collect</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                <strong className="text-[#E2E8F0]">We do not collect personal information.</strong> All
                of our tools process data entirely within your browser. We do not have access to,
                do not store, and do not log any data you input into our tools. When you use a
                tool such as the JSON Formatter, Hash Generator, or Base64 Encoder, the processing
                happens locally on your device using JavaScript. No data is transmitted to our
                servers because our tools do not require server-side processing.
              </p>
              <p className="mt-4 text-[#94A3B8] leading-relaxed">
                We may collect anonymous, aggregated analytics data such as page views, tool
                usage counts, and general geographic regions (country or city level only) to help
                us understand how the website is being used and to improve our tools. This data
                cannot be used to identify individual users.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <Eye className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Cookies</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                We use a minimal number of cookies to provide basic website functionality. We do
                not use tracking cookies or advertising cookies. The cookies we use may include
                essential cookies that are necessary for the website to function properly, such
                as remembering your preferences. If you have set your browser to block cookies,
                some features of the website may not work as intended, but all tools will continue
                to function.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Server className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Third-Party Services</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                Our website may use third-party services for analytics or hosting. These services
                may collect anonymous usage data as described above. We carefully select services
                that respect user privacy and comply with applicable data protection regulations.
                We do not sell, rent, or share any personal information with third parties for
                their marketing purposes. If we use any third-party analytics services, they are
                configured with the highest available privacy settings.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <Lock className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Data Security</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                Because all tool processing happens client-side in your browser, your data enjoys
                the highest level of security possible: it never leaves your device. There is no
                server-side storage of tool inputs or outputs. There are no databases containing
                user data to protect, and no risk of data breaches involving your tool inputs.
                This architectural decision is central to our privacy-first approach.
              </p>
              <p className="mt-4 text-[#94A3B8] leading-relaxed">
                The website itself is served over HTTPS, ensuring that all communications between
                your browser and our servers are encrypted. We follow security best practices in
                the development and deployment of our website.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Users className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Children's Privacy</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                Our services are not directed at children under the age of 13. We do not
                knowingly collect personal information from children. Since we do not collect
                personal information from any users, this concern is largely academic. However,
                if you believe that a child has somehow provided personal information through
                our services, please contact us and we will take appropriate action.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <FileEdit className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Changes to This Policy</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or for other operational, legal, or regulatory reasons. When we make
                changes, we will update the "Last updated" date at the top of this page. We
                encourage you to review this Privacy Policy periodically to stay informed about
                how we protect your privacy. Your continued use of the website after any changes
                constitutes your acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Mail className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Contact Us</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                If you have any questions, concerns, or suggestions about this Privacy Policy or
                our privacy practices, please contact us at contact@devtoolshub.com. We take
                privacy seriously and will respond to all inquiries as promptly as possible.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
