'use client';

import { FileText, CheckCircle, Scale, AlertTriangle, Info, RefreshCw, Landmark, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#00D9FF]/5 border border-[#334155]">
            <FileText className="h-8 w-8 text-[#00D9FF]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#E2E8F0]">Terms of Service</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">Last updated: August 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-[#94A3B8] leading-relaxed">
              Welcome to DevToolsHub. These Terms of Service ("Terms") govern your use of our
              website and the developer tools we provide. By accessing or using DevToolsHub, you
              agree to be bound by these Terms. If you do not agree with any part of these Terms,
              you should not use our services.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <CheckCircle className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Acceptance of Terms</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                By accessing and using DevToolsHub, you acknowledge that you have read, understood,
                and agree to be bound by these Terms of Service, as well as our Privacy Policy,
                which is incorporated herein by reference. These Terms apply to all visitors,
                users, and others who access or use the Service. If you are using the Service on
                behalf of an organization, you represent and warrant that you have the authority
                to bind that organization to these Terms.
              </p>
            </div>
          </section>

          {/* Use of Service */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <Scale className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Use of Service</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                You may use DevToolsHub and its tools for lawful purposes and in accordance with
                these Terms. You agree not to use the Service in any way that violates any
                applicable federal, state, local, or international law or regulation. You must not
                attempt to gain unauthorized access to any portion of the Service, other accounts,
                computer systems, or networks connected to the Service. You must not interfere
                with or disrupt the Service or servers or networks connected to the Service. You
                must not use the Service to transmit any malware, viruses, or other harmful code.
                We reserve the right to terminate or restrict your access to the Service at our
                sole discretion, without notice, for conduct that we believe violates these Terms
                or is harmful to other users or the Service.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Info className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Intellectual Property</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                The Service and its original content, features, and functionality are and will
                remain the exclusive property of DevToolsHub and its licensors. The Service is
                protected by copyright, trademark, and other laws of both the United States and
                foreign countries. Our trademarks and trade dress may not be used in connection
                with any product or service without the prior written consent of DevToolsHub. You
                retain all rights to any data you input into our tools. We do not claim ownership
                of your input data or the output generated by our tools based on your input.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <AlertTriangle className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Limitation of Liability</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                In no event shall DevToolsHub, its directors, employees, partners, agents,
                suppliers, or affiliates be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses, resulting from your access to or
                use of or inability to access or use the Service. This includes any conduct or
                content of any third party on the Service, any content obtained from the Service,
                and unauthorized access, use, or alteration of your transmissions or content,
                whether based on warranty, contract, tort (including negligence), or any other
                legal theory, whether or not we have been informed of the possibility of such
                damage.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <AlertTriangle className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Disclaimer</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                The Service is provided on an "as is" and "as available" basis without any
                warranties of any kind, either express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular purpose,
                non-infringement, or course of performance. DevToolsHub does not warrant that the
                Service will be uninterrupted, timely, secure, or error-free. While we strive for
                accuracy in all our tools, we do not guarantee that the results produced by our
                tools are free from errors. Users are responsible for verifying the output of any
                tool before using it in production environments or for critical purposes.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <RefreshCw className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Changes to These Terms</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                We reserve the right to modify or replace these Terms at any time at our sole
                discretion. If a revision is material, we will provide at least 30 days' notice
                prior to any new terms taking effect. What constitutes a material change will be
                determined at our sole discretion. By continuing to access or use our Service
                after those revisions become effective, you agree to be bound by the revised
                terms. If you do not agree to the new Terms, you are no longer authorized to use
                the Service.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Landmark className="h-4 w-4 text-[#00D9FF]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Governing Law</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the
                United States, without regard to its conflict of law provisions. Our failure to
                enforce any right or provision of these Terms will not be considered a waiver of
                those rights. If any provision of these Terms is held to be invalid or
                unenforceable by a court, the remaining provisions of these Terms will remain in
                effect. These Terms constitute the entire agreement between us regarding our
                Service and supersede any prior agreements we might have had.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA]/10">
                <Mail className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <h2 className="text-xl font-bold text-[#E2E8F0]">Contact Us</h2>
            </div>
            <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
              <p className="text-[#94A3B8] leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at
                contact@devtoolshub.com. We will do our best to respond to all inquiries promptly.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
