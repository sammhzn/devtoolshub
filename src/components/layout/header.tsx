'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNav, type Page } from '@/lib/navigation';
import { allTools } from '@/lib/tools-data';
import { Search, ChevronDown, Menu, X, Wrench } from 'lucide-react';

export default function Header() {
  const { navigate, goHome, currentPage } = useNav();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allTools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (toolId: string) => {
    navigate({ type: 'tool', toolId });
    setSearchQuery('');
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (page: Page) => {
    navigate(page);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isActive = (type: string) => currentPage.type === type;

  return (
    <header className="sticky top-0 z-50 border-b border-[#334155] bg-[#0F172A]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={goHome}
          className="flex items-center gap-2 transition-colors hover:text-[#00D9FF]"
        >
          <Wrench className="h-6 w-6 text-[#00D9FF]" />
          <span className="text-lg font-bold tracking-tight">
            Dev<span className="text-[#00D9FF]">Tools</span>Hub
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* All Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#00D9FF] ${
                isActive('tools') ? 'text-[#00D9FF]' : 'text-[#94A3B8]'
              }`}
            >
              All Tools
              <ChevronDown
                className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-[#334155] bg-[#1A1F3A] p-2 shadow-xl">
                {['Text & Encoding', 'Hash & Security', 'Utilities'].map((cat) => (
                  <div key={cat}>
                    <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                      {cat}
                    </div>
                    {allTools
                      .filter((t) => t.category === cat)
                      .slice(0, 5)
                      .map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleNavClick({ type: 'tool', toolId: tool.id })}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#F1F5F9] transition-colors hover:bg-[#334155] hover:text-[#00D9FF]"
                        >
                          <tool.icon className="h-3.5 w-3.5" />
                          {tool.name}
                        </button>
                      ))}
                  </div>
                ))}
                <button
                  onClick={() => handleNavClick({ type: 'tools' })}
                  className="mt-1 w-full rounded-md border border-[#334155] px-2 py-1.5 text-center text-sm text-[#00D9FF] transition-colors hover:bg-[#334155]"
                >
                  View All Tools →
                </button>
              </div>
            )}
          </div>

          {/* Blog */}
          <button
            onClick={() => handleNavClick({ type: 'blog' })}
            className={`text-sm font-medium transition-colors hover:text-[#00D9FF] ${
              isActive('blog') || isActive('blog-post')
                ? 'text-[#00D9FF]'
                : 'text-[#94A3B8]'
            }`}
          >
            Blog
          </button>

          {/* About */}
          <button
            onClick={() => handleNavClick({ type: 'about' })}
            className={`text-sm font-medium transition-colors hover:text-[#00D9FF] ${
              isActive('about') ? 'text-[#00D9FF]' : 'text-[#94A3B8]'
            }`}
          >
            About
          </button>

          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  className="w-64 rounded-lg border border-[#334155] bg-[#1A1F3A] py-1.5 pl-9 pr-8 text-sm text-[#F1F5F9] placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F1F5F9]"
                >
                  <X className="h-4 w-4" />
                </button>
                {searchResults.length > 0 && (
                  <div className="absolute left-0 top-full mt-1 w-full rounded-lg border border-[#334155] bg-[#1A1F3A] py-1 shadow-xl">
                    {searchResults.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSearchSelect(tool.id)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#F1F5F9] transition-colors hover:bg-[#334155] hover:text-[#00D9FF]"
                      >
                        <tool.icon className="h-4 w-4" />
                        <div className="text-left">
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-[#94A3B8]">{tool.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-[#334155] bg-[#1A1F3A] px-1.5 text-xs text-[#94A3B8]">
                  /
                </kbd>
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#94A3B8] hover:text-[#00D9FF] md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#334155] bg-[#0F172A] px-4 pb-4 md:hidden">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] py-2 pl-9 pr-4 text-sm text-[#F1F5F9] placeholder-[#94A3B8] outline-none focus:border-[#00D9FF]"
            />
          </div>
          {searchResults.length > 0 && (
            <div className="mt-1 rounded-lg border border-[#334155] bg-[#1A1F3A] py-1">
              {searchResults.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSearchSelect(tool.id)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#F1F5F9] hover:bg-[#334155] hover:text-[#00D9FF]"
                >
                  <tool.icon className="h-4 w-4" />
                  {tool.name}
                </button>
              ))}
            </div>
          )}
          <div className="mt-3 space-y-1">
            <button
              onClick={() => handleNavClick({ type: 'tools' })}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#F1F5F9] hover:bg-[#1A1F3A] hover:text-[#00D9FF]"
            >
              All Tools
            </button>
            <button
              onClick={() => handleNavClick({ type: 'blog' })}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#F1F5F9] hover:bg-[#1A1F3A] hover:text-[#00D9FF]"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick({ type: 'about' })}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#F1F5F9] hover:bg-[#1A1F3A] hover:text-[#00D9FF]"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}