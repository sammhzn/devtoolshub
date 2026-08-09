'use client';

import React from 'react';
import { Shield, UserX, WifiOff, Code2 } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: '100% Free - No Hidden Charges',
    description:
      'Every tool is completely free to use. No premium tiers, no trial periods, no credit card required. Just open and use.',
  },
  {
    icon: UserX,
    title: 'No Sign-Up Required',
    description:
      'Jump straight into the tool you need. No accounts, no passwords, no email verification. Your workflow stays uninterrupted.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description:
      'Once loaded, all tools run entirely in your browser. No server calls, no internet required. Works on a plane or in a tunnel.',
  },
  {
    icon: Code2,
    title: 'Open Source Friendly',
    description:
      'Built by developers for developers. View the source, report bugs, or contribute new tools. Transparency is our default.',
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-[#334155] bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          Why Developers Choose Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-xl border border-[#334155] bg-[#1E293B] p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                  <Icon className="h-5 w-5 text-[#00D9FF]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#E2E8F0]">{b.title}</h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
