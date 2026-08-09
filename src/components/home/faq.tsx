'use client';

import React from 'react';
import { faqItems } from '@/lib/tools-data';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-[#334155] bg-[#1A1F3A]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="pr-4 text-sm font-medium text-[#F1F5F9]">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#94A3B8] transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="border-t border-[#334155] px-5 py-4">
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
