'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { categories } from '@/lib/tools-data';
import { Search, ArrowRight } from 'lucide-react';

const availableTools = new Set([
  'json-formatter',
  'base64-encoder',
  'hash-generator',
  'url-encoder',
  'uuid-generator',
]);

export default function AllTools() {
  const { navigate } = useNav();
  const [filter, setFilter] = React.useState('');

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
      id="all-tools"
    >
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Available Developer Tools
        </h2>

        <p className="mt-2 text-[#94A3B8]">
          Free, browser-based developer tools that are ready to use.
        </p>

        <div className="relative mx-auto mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />

          <input
            type="text"
            placeholder="Filter tools..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] py-2.5 pl-9 pr-4 text-sm text-[#F1F5F9] placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
          />
        </div>
      </div>

      {categories.map((cat) => {
        const filtered = cat.tools.filter(
          (tool) =>
            availableTools.has(tool.id) &&
            (!filter ||
              tool.name.toLowerCase().includes(filter.toLowerCase()) ||
              tool.description.toLowerCase().includes(filter.toLowerCase()))
        );

        if (filtered.length === 0) return null;

        return (
          <div key={cat.name} className="mb-12">
            <h3 className="mb-4 text-lg font-semibold text-[#A78BFA]">
              {cat.name}
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => {
                const Icon = tool.icon;

                return (
                  <button
                    key={tool.id}
                    onClick={() =>
                      navigate({
                        type: 'tool',
                        toolId: tool.id,
                      })
                    }
                    className="tool-card group flex items-center gap-3 rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-left transition-all"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#00D9FF]/10">
                      <Icon className="h-4 w-4 text-[#00D9FF]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[#F1F5F9] group-hover:text-[#00D9FF]">
                        {tool.name}
                      </div>

                      <div className="truncate text-xs text-[#94A3B8]">
                        {tool.description}
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-[#94A3B8] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[#00D9FF]" />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}