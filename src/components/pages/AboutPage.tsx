'use client';

import { useNav } from '@/lib/navigation';
import {
  Shield,
  Zap,
  Globe,
  Code2,
  Github,
  Heart,
  Lock,
  Mail,
} from 'lucide-react';

export default function AboutPage() {
  const { navigate } = useNav();

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {/* Hero */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#A78BFA]/20 border border-[#334155]">
            <Code2 className="h-8 w-8 text-[#00D9FF]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F1F5F9] sm:text-5xl">
            About{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] bg-clip-text text-transparent">
              DevToolsHub
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94A3B8] leading-relaxed">
            We believe developer tools should be fast, free, and respect your privacy.
            DevToolsHub provides a curated collection of browser-based utilities that
            help developers work smarter, not harder.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Our Mission</h2>
          <div className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 sm:p-8">
            <p className="text-[#94A3B8] leading-relaxed">
              Developer tools are essential to the software development workflow, yet too many
              of them require sign-ups, store your data on remote servers, or hide critical features
              behind paywalls. We built DevToolsHub to be different. Our mission is to provide
              high-quality, instantly accessible developer utilities that run entirely in your
              browser. No accounts, no data collection, no nonsense. Just the tools you need,
              when you need them.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-6">What We Offer</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Zap,
                title: 'Instant Access',
                description:
                  'No sign-ups, no waiting. Open a tool and start using it immediately. Every tool loads in under a second.',
                color: 'text-[#00D9FF]',
                bg: 'from-[#00D9FF]/10 to-[#00D9FF]/5',
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description:
                  'All processing happens in your browser. Your data never leaves your device. We do not track, store, or log anything.',
                color: 'text-[#A78BFA]',
                bg: 'from-[#A78BFA]/10 to-[#A78BFA]/5',
              },
              {
                icon: Globe,
                title: 'Works Offline',
                description:
                  'Once loaded, every tool works without an internet connection. Your tools are available wherever you are.',
                color: 'text-[#00D9FF]',
                bg: 'from-[#00D9FF]/10 to-[#00D9FF]/5',
              },
              {
                icon: Lock,
                title: 'No Data Collection',
                description:
                  'We have no servers processing your data. Everything runs client-side using modern Web APIs.',
                color: 'text-[#A78BFA]',
                bg: 'from-[#A78BFA]/10 to-[#A78BFA]/5',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 transition-all hover:border-[#334155]/80"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.bg}`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-[#F1F5F9]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">How It Works</h2>
          <div className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 sm:p-8">
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              Every tool on DevToolsHub is built using modern web technologies and runs
              entirely on the client side. When you use a tool, the processing happens
              in your browser using JavaScript and standard Web APIs such as the Web Crypto
              API for hash generation, TextEncoder/TextDecoder for encoding operations,
              and the Canvas API for image processing.
            </p>
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              This architecture means there is no server-side component for the tools
              themselves. Your data is never transmitted over the network, never stored in
              a database, and never accessible to anyone but you. When you close the browser
              tab, your data is completely gone.
            </p>
            <p className="text-[#94A3B8] leading-relaxed">
              We leverage modern browser capabilities to deliver functionality that
              previously required server-side processing. This approach delivers better
              performance, stronger privacy guarantees, and the ability to work offline.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Tech Stack</h2>
          <div className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  label: 'Frontend Framework',
                  value: 'Next.js with React',
                },
                {
                  label: 'Styling',
                  value: 'Tailwind CSS',
                },
                {
                  label: 'Language',
                  value: 'TypeScript',
                },
                {
                  label: 'Icons',
                  value: 'Lucide React',
                },
                {
                  label: 'Cryptography',
                  value: 'Web Crypto API',
                },
                {
                  label: 'Deployment',
                  value: 'Edge-optimized hosting',
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-base text-[#F1F5F9]">{item.value}</dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Open Source</h2>
          <div className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A78BFA]/20 to-[#A78BFA]/5 border border-[#A78BFA]/20">
                <Github className="h-6 w-6 text-[#A78BFA]" />
              </div>
              <div>
                <p className="text-[#94A3B8] leading-relaxed mb-3">
                  DevToolsHub is open source and community-driven. We believe in transparency
                  and welcome contributions from developers around the world. Whether you want
                  to report a bug, request a feature, fix a typo in our documentation, or
                  contribute an entirely new tool, we would love to have your help.
                </p>
                <p className="text-[#94A3B8] leading-relaxed">
                  You can view the source code, open issues, and submit pull requests on our
                  GitHub repository. We review all contributions promptly and are always looking
                  for ways to make our tools better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Get in Touch</h2>
          <div className="rounded-xl border border-[#334155] bg-[#1A1F3A] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#00D9FF]/5 border border-[#00D9FF]/20">
                <Mail className="h-6 w-6 text-[#00D9FF]" />
              </div>
              <div>
                <p className="text-[#94A3B8] leading-relaxed mb-3">
                  Have a question, suggestion, or just want to say hello? We would love to hear
                  from you. The best way to reach us is by opening an issue on GitHub. For
                  general inquiries, you can also email us at contact@devtoolshub.com.
                </p>
                <p className="text-[#94A3B8] leading-relaxed">
                  We read every message and do our best to respond within 48 hours. Your feedback
                  helps us build better tools for the developer community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <p className="text-[#94A3B8] mb-4">Built with</p>
          <Heart className="inline h-5 w-5 text-[#A78BFA]" />
          <p className="text-[#94A3B8]">for developers, by developers.</p>
        </div>
      </div>
    </div>
  );
}
