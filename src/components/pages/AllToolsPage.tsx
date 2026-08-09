'use client';

import { useState, useMemo } from 'react';
import { useNav } from '@/lib/navigation';
import { categories, allTools } from '@/lib/tools-data';
import { Search, ArrowRight } from 'lucide-react';

export default function AllToolsPage() {
  const { navigate } = useNav();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return categories
      .map((cat) => {
        const filteredTools = cat.tools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
        return { ...cat, tools: filteredTools };
      })
      .filter(
        (cat) =>
          cat.tools.length > 0 &&
          (activeCategory === null || cat.name === activeCategory)
      );
  }, [searchQuery, activeCategory]);

  const totalResults = useMemo(
    () => filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0),
    [filteredCategories]
  );

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#E2E8F0] sm:text-5xl">
            All{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#94A3B8]">
            Browse our complete collection of free, browser-based developer utilities.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full rounded-xl border border-[#334155] bg-[#1E293B] py-3.5 pl-12 pr-4 text-[#E2E8F0] placeholder-[#94A3B8] outline-none transition-colors focus:border-[#00D9FF]"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-[#00D9FF] text-[#0F172A]'
                : 'border border-[#334155] bg-[#1E293B] text-[#94A3B8] hover:border-[#00D9FF]/40 hover:text-[#E2E8F0]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? 'bg-[#00D9FF] text-[#0F172A]'
                  : 'border border-[#334155] bg-[#1E293B] text-[#94A3B8] hover:border-[#00D9FF]/40 hover:text-[#E2E8F0]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-[#94A3B8]">
          Showing <span className="text-[#E2E8F0] font-medium">{totalResults}</span>{' '}
          tool{totalResults !== 1 ? 's' : ''}
          {searchQuery && (
            <>
              {' '}for &ldquo;<span className="text-[#00D9FF]">{searchQuery}</span>&rdquo;
            </>
          )}
        </p>
      </div>

      {/* Tools Grid by Category */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        {filteredCategories.length === 0 ? (
          <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-12 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-[#94A3B8]" />
            <h3 className="text-lg font-semibold text-[#E2E8F0]">No tools found</h3>
            <p className="mt-2 text-[#94A3B8]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.name} className="mb-12 last:mb-0">
              <h2 className="mb-5 text-xl font-bold text-[#E2E8F0]">{category.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => navigate({ type: 'tool', toolId: tool.id })}
                      className="group flex flex-col items-start rounded-xl border border-[#334155] bg-[#1E293B] p-5 text-left transition-all duration-200 hover:border-[#00D9FF]/40 hover:shadow-lg hover:shadow-[#00D9FF]/5"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D9FF]/10 to-[#A78BFA]/10 border border-[#334155]">
                        <Icon className="h-5 w-5 text-[#00D9FF]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#E2E8F0] group-hover:text-[#00D9FF] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm text-[#94A3B8] leading-relaxed">
                        {tool.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#00D9FF] opacity-0 transition-opacity group-hover:opacity-100">
                        Open tool <ArrowRight className="h-3 w-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
