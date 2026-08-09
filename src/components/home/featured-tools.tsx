'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { featuredTools } from '@/lib/tools-data';
import { ArrowRight } from 'lucide-react';

export default function FeaturedTools() {
  const { navigate } = useNav();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Featured Tools
        </h2>
        <p className="mt-2 text-[#94A3B8]">
          The most-used tools by developers worldwide
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {featuredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => navigate({ type: 'tool', toolId: tool.id })}
              className="tool-card group flex flex-col rounded-xl border border-[#334155] bg-[#1E293B] p-5 text-left transition-all"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <Icon className="h-5 w-5 text-[#00D9FF]" />
              </div>
              <h3 className="mb-1 font-semibold text-[#E2E8F0] group-hover:text-[#00D9FF]">
                {tool.name}
              </h3>
              <p className="mb-4 flex-1 text-sm text-[#94A3B8]">
                {tool.description}
              </p>
              <span className="flex items-center gap-1 text-sm font-medium text-[#00D9FF] opacity-0 transition-opacity group-hover:opacity-100">
                Open Tool <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
