'use client';

import React, { useState } from 'react';
import { useNav } from '@/lib/navigation';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/tools-data';
import {
  Link2,
  Copy,
  Trash2,
  ArrowLeftRight,
  ChevronDown,
  BookOpen,
  Lock,
  Unlock,
} from 'lucide-react';

const faqItems = [
  {
    question: 'What is URL encoding?',
    answer:
      'URL encoding (also called percent encoding) converts special characters in a URL into a format that can be safely transmitted over the internet. For example, spaces become %20, and < becomes %3C. This ensures that URLs with special characters, non-ASCII text, or reserved characters are interpreted correctly by servers and browsers.',
  },
  {
    question: 'What is the difference between encodeURI and encodeURIComponent?',
    answer:
      'encodeURI() is designed to encode full URLs and does not encode characters like :, /, ?, &, =, and # which have special meaning in URLs. encodeURIComponent() encodes all special characters including these, making it suitable for encoding individual query parameter values. Our tool uses encodeURIComponent for maximum safety.',
  },
  {
    question: 'Why does my decoded URL look different from the original?',
    answer:
      'Some characters may be encoded in multiple equivalent ways. For example, a space can be %20 or + in query strings. The decoded result is functionally identical to the original even if it looks slightly different. The browser will treat them the same way.',
  },
  {
    question: 'Should I encode the entire URL or just the parameters?',
    answer:
      'Typically, you only need to encode the individual parameter values, not the entire URL structure. Encoding the whole URL would also encode :// and / which are needed for the URL to work. Use this tool on specific query parameter values for best results.',
  },
];

const encodingTable = [
  { char: 'Space', encoded: '%20' },
  { char: '!', encoded: '%21' },
  { char: '"', encoded: '%22' },
  { char: '#', encoded: '%23' },
  { char: '$', encoded: '%24' },
  { char: '%', encoded: '%25' },
  { char: '&', encoded: '%26' },
  { char: "'", encoded: '%27' },
  { char: '(', encoded: '%28' },
  { char: ')', encoded: '%29' },
  { char: '+', encoded: '%2B' },
  { char: ',', encoded: '%2C' },
  { char: '/', encoded: '%2F' },
  { char: ':', encoded: '%3A' },
  { char: ';', encoded: '%3B' },
  { char: '<', encoded: '%3C' },
  { char: '=', encoded: '%3D' },
  { char: '>', encoded: '%3E' },
  { char: '?', encoded: '%3F' },
  { char: '@', encoded: '%40' },
  { char: '[', encoded: '%5B' },
  { char: ']', encoded: '%5D' },
  { char: '{', encoded: '%7B' },
  { char: '|', encoded: '%7C' },
  { char: '}', encoded: '%7D' },
  { char: '~', encoded: '%7E' },
];

export default function UrlEncoder() {
  const { navigate } = useNav();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const relatedTools = getRelatedTools('url-encoder', 3);

  const handleProcess = () => {
    if (!input.trim()) {
      toast({ title: 'No input', description: 'Enter a URL or text to process.' });
      return;
    }
    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input);
        setOutput(encoded);
        toast({ title: 'Encoded!', description: 'Text encoded to URL-safe format.' });
      } else {
        const decoded = decodeURIComponent(input);
        setOutput(decoded);
        toast({ title: 'Decoded!', description: 'URL decoded successfully.' });
      }
    } catch {
      toast({
        title: 'Error',
        description:
          mode === 'decode'
            ? 'Invalid encoded URL string. Check for malformed percent-encoding.'
            : 'Failed to encode. Check your input.',
      });
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) {
      toast({ title: 'Nothing to copy', description: 'Process some text first.' });
      return;
    }
    await navigator.clipboard.writeText(output);
    toast({ title: 'Copied!', description: 'Output copied to clipboard.' });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    const oldInput = input;
    const oldOutput = output;
    setInput(oldOutput);
    setOutput(oldInput);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#00D9FF]/10">
              <Link2 className="h-6 w-6 text-[#00D9FF]" />
            </div>
            <h1 className="text-3xl font-bold">URL Encoder / Decoder</h1>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Encode and decode URLs with proper percent-encoding. Handles special characters, non-ASCII text, and query parameters.
          </p>
        </div>

        {/* Tool Area */}
        <div className="space-y-4 mb-8">
          {/* Buttons Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleProcess}
              className="bg-[#00D9FF] text-[#0F172A] font-semibold rounded-lg px-4 py-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
            >
              {mode === 'encode' ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
            <button
              onClick={toggleMode}
              className="bg-[#1E293B] text-[#E2E8F0] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
            <button
              onClick={handleCopy}
              className="bg-[#1E293B] text-[#E2E8F0] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Output
            </button>
            <button
              onClick={handleClear}
              className="bg-[#1E293B] text-[#E2E8F0] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>

          {/* Mode indicator */}
          <div className="flex gap-1">
            <div
              className={`px-3 py-1.5 rounded-l-lg text-xs font-semibold transition-colors ${
                mode === 'encode'
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF]'
                  : 'bg-[#1E293B] text-[#94A3B8]'
              }`}
            >
              Encode (Text → URL)
            </div>
            <div
              className={`px-3 py-1.5 rounded-r-lg text-xs font-semibold transition-colors ${
                mode === 'decode'
                  ? 'bg-[#A78BFA]/20 text-[#A78BFA]'
                  : 'bg-[#1E293B] text-[#94A3B8]'
              }`}
            >
              Decode (URL → Text)
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">
                {mode === 'encode' ? 'Text / URL Input' : 'Encoded URL Input'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? 'Enter text or URL to encode...'
                    : 'Enter encoded URL to decode...'
                }
                className="w-full rounded-lg border border-[#334155] bg-[#1E293B] p-4 text-sm text-[#E2E8F0] font-mono placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] resize-y min-h-[200px]"
                spellCheck={false}
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">
                {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
              </label>
              <textarea
                value={output}
                readOnly
                placeholder={
                  mode === 'encode'
                    ? 'Encoded URL will appear here...'
                    : 'Decoded text will appear here...'
                }
                className="w-full rounded-lg border border-[#334155] bg-[#1E293B] p-4 text-sm text-[#E2E8F0] font-mono placeholder-[#94A3B8] outline-none resize-y min-h-[200px]"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Character Encoding Reference Table */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-[#A78BFA]" />
            <h2 className="text-xl font-bold">Character Encoding Reference</h2>
          </div>
          <p className="text-sm text-[#94A3B8] mb-3">
            Common characters and their URL-encoded equivalents:
          </p>
          <div className="border border-[#334155] rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
              {/* Header */}
              <div className="px-3 py-2 bg-[#1E293B] text-xs font-semibold text-[#94A3B8] border-b border-r border-[#334155]">
                Character
              </div>
              <div className="px-3 py-2 bg-[#1E293B] text-xs font-semibold text-[#94A3B8] border-b border-r border-[#334155]">
                Encoded
              </div>
              {encodingTable.slice(0, 5).map((entry, i) => (
                <React.Fragment key={i}>
                  <div className="px-3 py-2 bg-[#1E293B] text-xs font-semibold text-[#94A3B8] border-b border-r border-[#334155]">
                    Character
                  </div>
                  <div className="px-3 py-2 bg-[#1E293B] text-xs font-semibold text-[#94A3B8] border-b border-r border-[#334155]">
                    Encoded
                  </div>
                </React.Fragment>
              ))}
              {/* Rows */}
              {encodingTable.map((entry, i) => (
                <React.Fragment key={i}>
                  <div className="px-3 py-2 text-xs font-mono text-[#E2E8F0] border-b border-r border-[#334155] hover:bg-[#1E293B] transition-colors">
                    {entry.char === 'Space' ? '␣' : entry.char}
                  </div>
                  <div className="px-3 py-2 text-xs font-mono text-[#00D9FF] border-b border-r border-[#334155] hover:bg-[#1E293B] transition-colors">
                    {entry.encoded}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() => navigate({ type: 'blog-post', slug: 'url-encoding-guide' })}
            className="text-[#00D9FF] hover:underline text-sm font-medium"
          >
            Learn More: URL Encoding Guide for Developers →
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-[#334155] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E293B] transition-colors"
                >
                  <span className="font-medium text-sm">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#94A3B8] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-[#94A3B8] border-t border-[#334155]">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div>
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => navigate({ type: 'tool', toolId: tool.id })}
                  className="p-4 rounded-lg border border-[#334155] bg-[#1E293B] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 transition-colors">
                      <Icon className="h-4 w-4 text-[#00D9FF]" />
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-[#00D9FF] transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    {tool.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
