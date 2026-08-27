'use client';

import React from 'react';
import { useNav } from '@/lib/navigation';
import { Github, Twitter, Wrench } from 'lucide-react';

export default function Footer() {
  const { navigate } = useNav();

  return (
    <footer className="mt-auto border-t border-[#334155] bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-[#00D9FF]" />
              <span className="font-bold">
                Dev<span className="text-[#00D9FF]">Tools</span>Hub
              </span>
            </div>
            <p className="mt-3 text-sm text-[#94A3B8]">
              Free developer tools that work instantly in your browser. No sign-up,
              no unnecessary complexity, and your data stays in your browser.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {[ 
                { id: 'json-formatter', name: 'JSON Formatter' },
                { id: 'base64-encoder', name: 'Base64 Encoder' },
                { id: 'hash-generator', name: 'Hash Generator' },
                { id: 'url-encoder', name: 'URL Encoder' },
                { id: 'uuid-generator', name: 'UUID Generator' },
              ].map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => navigate({ type: 'tool', toolId: t.id })}
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate({ type: 'about' })}
                  className="text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'blog' })}
                  className="text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'privacy' })}
                  className="text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'terms' })}
                  className="text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#94A3B8] transition-colors hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#94A3B8] transition-colors hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#334155] pt-6 text-center text-sm text-[#94A3B8]">
          © {new Date().getFullYear()} DevToolsHub. All rights reserved. Built for developers, by developers.
        </div>
      </div>
    </footer>
  );
}