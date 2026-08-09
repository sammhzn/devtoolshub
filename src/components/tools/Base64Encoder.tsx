'use client';

import React, { useState, useRef } from 'react';
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
      'Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters (A-Z, a-z, 0-9, +, /). It is commonly used to encode binary data like images or files into text so they can be safely transmitted over text-based protocols like email or HTTP.',
  },
  {
    question: 'Is Base64 encryption?',
    answer:
      'No, Base64 is encoding, not encryption. It is a reversible transformation with no secret key. Anyone can decode Base64 data. If you need actual encryption, look at our Hash Generator or HMAC Generator tools for cryptographic operations.',
  },
  {
    question: 'Why does my decoded Base64 look like gibberish?',
    answer:
      'If the original Base64 string was encoding binary data (like an image or compressed file), decoding it to text will produce unreadable characters. This is expected behavior — the decoded output is the raw binary bytes represented as text.',
  },
  {
    question: 'What file types can I upload for Base64 encoding?',
    answer:
      'You can upload any file type. The file contents will be read as binary data and converted to a Base64 string. This is commonly used for embedding small images directly in HTML/CSS or sending binary data in JSON payloads.',
  },
];

export default function Base64Encoder() {
  const { navigate } = useNav();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [status, setStatus] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const relatedTools = getRelatedTools('base64-encoder', 3);

  const handleProcess = () => {
    if (!input.trim()) {
      toast({ title: 'No input', description: 'Enter some text to process.' });
      return;
    }
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        setStatus(`Encoded ${input.length} characters → ${encoded.length} characters`);
        toast({ title: 'Encoded!', description: 'Text encoded to Base64 successfully.' });
      } else {
        const decoded = decodeURIComponent(escape(atob(input.trim())));
        setOutput(decoded);
        setStatus(`Decoded ${input.trim().length} characters → ${decoded.length} characters`);
        toast({ title: 'Decoded!', description: 'Base64 decoded to text successfully.' });
      }
    } catch {
      toast({
        title: 'Error',
        description: mode === 'decode'
          ? 'Invalid Base64 string. Please check your input.'
          : 'Failed to encode. Please check your input.',
      });
      setOutput('');
      setStatus('');
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
    setStatus('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload files under 5MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setMode('encode');
      setInput(`[File: ${file.name}]`);
      setOutput(base64 || '');
      setStatus(`Encoded file "${file.name}" (${(file.size / 1024).toFixed(1)} KB) → ${base64?.length || 0} characters`);
      toast({ title: 'File encoded', description: `${file.name} encoded to Base64.` });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Swap input/output
    const oldInput = input;
    const oldOutput = output;
    setInput(oldOutput);
    setOutput(oldInput);
    setStatus('');
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#00D9FF]/10">
              <Binary className="h-6 w-6 text-[#00D9FF]" />
            </div>
            <h1 className="text-3xl font-bold">Base64 Encoder / Decoder</h1>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Encode text to Base64 or decode Base64 strings back to text. Supports file uploads and handles UTF-8 correctly.
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
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
            <button
              onClick={handleCopy}
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Output
            </button>
            <button
              onClick={handleClear}
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
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
                  className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </button>
              </>
            )}
          </div>

          {/* Status */}
          {status && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
              {mode === 'encode' ? <Lock className="h-4 w-4 flex-shrink-0" /> : <Unlock className="h-4 w-4 flex-shrink-0" />}
              <span>{status}</span>
            </div>
          )}

          {/* Mode indicator */}
          <div className="flex gap-1">
            <div
              className={`px-3 py-1.5 rounded-l-lg text-xs font-semibold transition-colors ${
                mode === 'encode'
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF]'
                  : 'bg-[#1A1F3A] text-[#94A3B8]'
              }`}
            >
              Encode (Text → Base64)
            </div>
            <div
              className={`px-3 py-1.5 rounded-r-lg text-xs font-semibold transition-colors ${
                mode === 'decode'
                  ? 'bg-[#A78BFA]/20 text-[#A78BFA]'
                  : 'bg-[#1A1F3A] text-[#94A3B8]'
              }`}
            >
              Decode (Base64 → Text)
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">
                {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-sm text-[#F1F5F9] font-mono placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] resize-y min-h-[200px]"
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
                placeholder={mode === 'encode' ? 'Base64 output will appear here...' : 'Decoded text will appear here...'}
                className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-sm text-[#F1F5F9] font-mono placeholder-[#94A3B8] outline-none resize-y min-h-[200px]"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() => navigate({ type: 'blog-post', slug: 'understanding-base64-encoding' })}
            className="text-[#00D9FF] hover:underline text-sm font-medium"
          >
            Learn More: Understanding Base64 Encoding in Web Development →
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
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1A1F3A] transition-colors"
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
                  className="p-4 rounded-lg border border-[#334155] bg-[#1A1F3A] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all text-left group"
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
