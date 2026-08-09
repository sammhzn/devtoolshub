'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const { currentPage, navigate } = useNav();

  if (currentPage.type === 'home') return null;

  const crumbs: { label: string; onClick?: () => void }[] = [
    { label: 'Home', onClick: () => navigate({ type: 'home' }) },
  ];

  switch (currentPage.type) {
    case 'tool': {
      crumbs.push(
        { label: 'Tools', onClick: () => navigate({ type: 'tools' }) },
        { label: getToolBySlug(currentPage.toolId)?.name ?? currentPage.toolId }
      );
      break;
    }
    case 'blog': {
      crumbs.push({ label: 'Blog' });
      break;
    }
    case 'blog-post': {
      const title = currentPage.slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      crumbs.push(
        { label: 'Blog', onClick: () => navigate({ type: 'blog' }) },
        { label: title }
      );
      break;
    }
    case 'about':
      crumbs.push({ label: 'About' });
      break;
    case 'privacy':
      crumbs.push({ label: 'Privacy Policy' });
      break;
    case 'terms':
      crumbs.push({ label: 'Terms of Service' });
      break;
    case 'tools':
      crumbs.push({ label: 'All Tools' });
      break;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[#94A3B8]">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {crumb.onClick ? (
              <button
                onClick={crumb.onClick}
                className="transition-colors hover:text-[#00D9FF]"
              >
                {i === 0 && <Home className="inline h-3.5 w-3.5 mr-1" />}
                {crumb.label}
              </button>
            ) : (
              <span className="text-[#F1F5F9]">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
