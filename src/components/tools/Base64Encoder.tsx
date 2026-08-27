'use client';

import React, { useRef, useState } from 'react';
import { useNav } from '@/lib/navigation';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/tools-data';
import {
  Binary,
  Copy,
  Trash2,
  Upload,
  ArrowLeftRight,
  ChevronDown,
  Lock,
  Unlock,
} from 'lucide-react';

const faqItems = [
  {
    question: 'What is Base64 encoding?',
    answer:
      'Base64 is a binary-to-text encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, and /). It is commonly used to represent binary data as text for transmission or storage in text-based formats such as JSON, HTML, CSS, and email.',
  },
  {
    question: 'Is Base64 encryption?',
    answer:
      'No. Base64 is encoding, not encryption. It is a reversible transformation and does not use a secret key. Anyone with the Base64 value can decode it. Do not use Base64 to protect passwords, secrets, or confidential information.',
  },
  {
    question: 'Why does my decoded Base64 look like gibberish?',
    answer:
      'If the Base64 value represents binary data such as an image, PDF, compressed file, or other non-text content, decoding it as text may produce unreadable characters. This is expected because the decoded data contains raw binary bytes rather than normal text.',
  },
  {
    question: 'What file types can I upload for Base64 encoding?',
    answer:
      'You can upload most file types up to 5 MB. The file is read locally in your browser and converted into a Base64 string. Your uploaded file is not sent to our servers by this tool.',
  },
];

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

function decodeBase64(base64: string): string {
  const cleaned = base64.replace(/\s/g, '');

  if (!cleaned) {
    throw new Error('Empty Base64 input');
  }

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
    throw new Error('Invalid Base64 characters');
  }

  if (cleaned.length % 4 !== 0) {
    throw new Error('Invalid Base64 length');
  }

  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export default function Base64Encoder() {
  const { navigate } = useNav();
  const { toast } = useToast();

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [status, setStatus] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const relatedTools = getRelatedTools('base64-encoder', 3);

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: 'No input',
        description: 'Enter some text to process.',
      });
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeBase64(input);

        setOutput(encoded);
        setStatus(
          `Encoded ${input.length} characters → ${encoded.length} characters`
        );

        toast({
          title: 'Encoded!',
          description: 'Text encoded to Base64 successfully.',
        });
      } else {
        const cleanedInput = input.replace(/\s/g, '');
        const decoded = decodeBase64(input);

        setOutput(decoded);
        setStatus(
          `Decoded ${cleanedInput.length} Base64 characters → ${decoded.length} characters`
        );

        toast({
          title: 'Decoded!',
          description: 'Base64 decoded to text successfully.',
        });
      }
    } catch {
      setOutput('');
      setStatus('');

      toast({
        title: 'Invalid input',
        description:
          mode === 'decode'
            ? 'Invalid Base64 string or the decoded data is not valid UTF-8.'
            : 'Failed to encode the supplied text.',
      });
    }
  };

  const handleCopy = async () => {
    if (!output) {
      toast({
        title: 'Nothing to copy',
        description: 'Process some text first.',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      toast({
        title: 'Copied!',
        description: 'Output copied to clipboard.',
      });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Your browser prevented clipboard access.',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStatus('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload files under 5 MB.',
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result;

        if (typeof result !== 'string') {
          throw new Error('Unable to read file');
        }

        const base64 = result.split(',')[1] || '';

        setMode('encode');
        setInput(`[File: ${file.name}]`);
        setOutput(base64);
        setStatus(
          `Encoded file "${file.name}" (${(file.size / 1024).toFixed(1)} KB) → ${base64.length} characters`
        );

        toast({
          title: 'File encoded',
          description: `${file.name} was encoded to Base64.`,
        });
      } catch {
        toast({
          title: 'File error',
          description: 'Unable to encode this file.',
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: 'File error',
        description: 'Unable to read the selected file.',
      });
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';

    setMode(newMode);
    setInput(output);
    setOutput(input);
    setStatus('');
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F1F5F9]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-[#00D9FF]/10 p-2">
              <Binary className="h-6 w-6 text-[#00D9FF]" />
            </div>

            <h1 className="text-3xl font-bold">
              Base64 Encoder / Decoder
            </h1>
          </div>

          <p className="max-w-2xl text-lg text-[#94A3B8]">
            Encode text to Base64 or decode Base64 strings back to text.
            Supports file uploads and UTF-8 text.
          </p>
        </div>

        {/* Tool Area */}
        <div className="mb-8 space-y-4">

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleProcess}
              className="flex items-center gap-2 rounded-lg bg-[#00D9FF] px-4 py-2 font-semibold text-[#0F172A] transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
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
              className="flex items-center gap-2 rounded-lg border border-[#334155] bg-[#1A1F3A] px-4 py-2 font-semibold text-[#F1F5F9] transition-all hover:border-[#00D9FF]"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-[#334155] bg-[#1A1F3A] px-4 py-2 font-semibold text-[#F1F5F9] transition-all hover:border-[#00D9FF]"
            >
              <Copy className="h-4 w-4" />
              Copy Output
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 rounded-lg border border-[#334155] bg-[#1A1F3A] px-4 py-2 font-semibold text-[#F1F5F9] transition-all hover:border-[#00D9FF]"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>

            {mode === 'encode' && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-lg border border-[#334155] bg-[#1A1F3A] px-4 py-2 font-semibold text-[#F1F5F9] transition-all hover:border-[#00D9FF]"
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </button>
              </>
            )}
          </div>

          {/* Status */}
          {status && (
            <div className="flex items-center gap-2 rounded-lg border border-[#A78BFA]/20 bg-[#A78BFA]/10 px-3 py-2 text-sm text-[#A78BFA]">
              {mode === 'encode' ? (
                <Lock className="h-4 w-4 shrink-0" />
              ) : (
                <Unlock className="h-4 w-4 shrink-0" />
              )}

              <span>{status}</span>
            </div>
          )}

          {/* Mode Indicator */}
          <div className="flex gap-1">
            <div
              className={`rounded-l-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === 'encode'
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF]'
                  : 'bg-[#1A1F3A] text-[#94A3B8]'
              }`}
            >
              Encode (Text → Base64)
            </div>

            <div
              className={`rounded-r-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === 'decode'
                  ? 'bg-[#A78BFA]/20 text-[#A78BFA]'
                  : 'bg-[#1A1F3A] text-[#94A3B8]'
              }`}
            >
              Decode (Base64 → Text)
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">
                {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
              </label>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? 'Enter text to encode...'
                    : 'Enter Base64 string to decode...'
                }
                className="min-h-[200px] w-full resize-y rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 font-mono text-sm text-[#F1F5F9] outline-none placeholder-[#94A3B8] focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                spellCheck={false}
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
              </label>

              <textarea
                value={output}
                readOnly
                placeholder={
                  mode === 'encode'
                    ? 'Base64 output will appear here...'
                    : 'Decoded text will appear here...'
                }
                className="min-h-[200px] w-full resize-y rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 font-mono text-sm text-[#F1F5F9] outline-none placeholder-[#94A3B8]"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() =>
              navigate({
                type: 'blog-post',
                slug: 'understanding-base64-encoding',
              })
            }
            className="text-sm font-medium text-[#00D9FF] hover:underline"
          >
            Learn More: Understanding Base64 Encoding in Web Development →
          </button>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-[#334155]"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1A1F3A]"
                >
                  <span className="text-sm font-medium">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-[#94A3B8] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="border-t border-[#334155] px-4 pb-4 text-sm text-[#94A3B8]">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div>
          <h2 className="mb-4 text-xl font-bold">
            Related Tools
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => {
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
                  className="group rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-left transition-all hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.1)]"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-md bg-[#00D9FF]/10 p-2 transition-colors group-hover:bg-[#00D9FF]/20">
                      <Icon className="h-4 w-4 text-[#00D9FF]" />
                    </div>

                    <h3 className="text-sm font-semibold transition-colors group-hover:text-[#00D9FF]">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="line-clamp-2 text-xs text-[#94A3B8]">
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
