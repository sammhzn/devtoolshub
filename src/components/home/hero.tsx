'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { navigate } = useNav();

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mb-4 inline-flex items-center rounded-full border border-[#334155] bg-[#1E293B] px-4 py-1.5 text-sm text-[#94A3B8]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
          50+ tools — 100% free, no sign-up
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-[#E2E8F0]">50+ Free Developer Tools</span>
          <br />
          <span className="text-[#00D9FF]">Online &amp; Instant</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#94A3B8] sm:text-lg">
          No sign-up, no ads on first load, zero data collection. Format JSON,
          encode Base64, generate hashes, and more — all running in your
          browser.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate({ type: 'tools' })}
            className="flex items-center gap-2 rounded-lg bg-[#00D9FF] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] active:scale-[0.98]"
          >
            Explore Tools
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate({ type: 'about' })}
            className="rounded-lg border border-[#334155] px-6 py-3 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-[#00D9FF] hover:text-[#00D9FF]"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
