'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { navigate } = useNav();

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="hero-grid-pattern absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.06),transparent_60%)]" />
      <div className="page-fade-in relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:py-24">
        <div className="mb-4 inline-flex items-center rounded-full border border-[#334155] bg-[#1A1F3A] px-4 py-1.5 text-sm text-[#94A3B8]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#10B981]" />
          Free tools — no sign-up required
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#F1F5F9] sm:text-4xl md:text-5xl lg:text-6xl">
          Free Developer Tools
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-[#00D9FF] sm:text-3xl md:text-4xl">
          Online &amp; Instant
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#94A3B8] md:text-lg">
          Fast, privacy-friendly developer tools that run directly in your browser.
          Format JSON, encode Base64, generate hashes, and more — with no sign-up required..
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate({ type: 'tools' })}
            className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#00D9FF] px-6 py-3 text-base font-bold text-[#0A0E27] transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Tools
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate({ type: 'about' })}
            className="flex min-h-[44px] items-center rounded-lg border border-[#00D9FF] bg-transparent px-6 py-3 text-base font-semibold text-[#00D9FF] transition-all hover:bg-[rgba(0,217,255,0.1)] active:scale-[0.98]"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
