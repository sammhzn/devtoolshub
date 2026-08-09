'use client';

import { useNav } from '@/lib/navigation';
import { blogPosts } from '@/lib/tools-data';
import { ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';

export default function BlogListing() {
  const { navigate } = useNav();

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#334155] bg-[#0F172A]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#334155] bg-[#1E293B] px-4 py-1.5 text-sm text-[#94A3B8]">
              <Tag className="h-3.5 w-3.5 text-[#A78BFA]" />
              Developer Resources
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#E2E8F0] sm:text-5xl">
              Developer{' '}
              <span className="bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
              Tutorials, guides, and deep dives into the tools developers use every day.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#334155] bg-[#1E293B] transition-all duration-300 hover:border-[#00D9FF]/40 hover:shadow-lg hover:shadow-[#00D9FF]/5"
            >
              {/* Category bar */}
              <div className="flex items-center justify-between border-b border-[#334155] px-5 py-3">
                <span className="inline-flex items-center rounded-full bg-[#00D9FF]/10 px-3 py-0.5 text-xs font-medium text-[#00D9FF]">
                  {post.category}
                </span>
                <Clock className="h-4 w-4 text-[#94A3B8]" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-semibold leading-snug text-[#E2E8F0] group-hover:text-[#00D9FF] transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#94A3B8]">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-5 flex items-center gap-4 border-t border-[#334155] pt-4 text-xs text-[#94A3B8]">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => navigate({ type: 'blog-post', slug: post.slug })}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00D9FF]/10 px-4 py-2.5 text-sm font-medium text-[#00D9FF] transition-all duration-200 hover:bg-[#00D9FF]/20"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
