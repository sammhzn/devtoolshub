'use client';

import React, { useEffect } from 'react';
import { NavigationProvider, useNav, type Page } from '@/lib/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Breadcrumb from '@/components/layout/breadcrumb';
import Hero from '@/components/home/hero';
import FeaturedTools from '@/components/home/featured-tools';
import AllToolsHome from '@/components/home/all-tools';
import Benefits from '@/components/home/benefits';
import FAQ from '@/components/home/faq';
import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Encoder from '@/components/tools/Base64Encoder';
import HashGenerator from '@/components/tools/HashGenerator';
import UrlEncoder from '@/components/tools/UrlEncoder';
import UuidGenerator from '@/components/tools/UuidGenerator';
import BlogListing from '@/components/blog/BlogListing';
import BlogPost from '@/components/blog/BlogPost';
import AboutPage from '@/components/pages/AboutPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';
import AllToolsPage from '@/components/pages/AllToolsPage';
import { FileText } from 'lucide-react';

const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': JsonFormatter,
  'base64-encoder': Base64Encoder,
  'hash-generator': HashGenerator,
  'url-encoder': UrlEncoder,
  'uuid-generator': UuidGenerator,
};

function PlaceholderTool({ toolId }: { toolId: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00D9FF]/10">
        <FileText className="h-8 w-8 text-[#00D9FF]" />
      </div>
      <h1 className="mb-3 text-2xl font-bold">
        {toolId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </h1>
      <p className="text-[#94A3B8]">
        This tool is coming soon. Check back later or explore our other tools.
      </p>
    </div>
  );
}

function PageRouter() {
  const { currentPage } = useNav();

  switch (currentPage.type) {
    case 'home':
      return (
        <>
          <Hero />
          <FeaturedTools />
          <AllToolsHome />
          <Benefits />
          <FAQ />
        </>
      );
    case 'tool': {
      const ToolComponent = toolComponents[currentPage.toolId];
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          {ToolComponent ? <ToolComponent /> : <PlaceholderTool toolId={currentPage.toolId} />}
        </div>
      );
    }
    case 'blog':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <BlogListing />
        </div>
      );
    case 'blog-post':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <BlogPost slug={currentPage.slug} />
        </div>
      );
    case 'about':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <AboutPage />
        </div>
      );
    case 'privacy':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <PrivacyPage />
        </div>
      );
    case 'terms':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <TermsPage />
        </div>
      );
    case 'tools':
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Breadcrumb />
          <AllToolsPage />
        </div>
      );
    default:
      return null;
  }
}

function KeyboardShortcutListener() {
  const { navigate } = useNav();
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        document.querySelector('input[placeholder*="Search"]')?.focus();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  return null;
}

export default function Home() {
  return (
    <NavigationProvider>
      <div className="flex min-h-screen flex-col bg-[#0F172A]">
        <KeyboardShortcutListener />
        <Header />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  );
}
