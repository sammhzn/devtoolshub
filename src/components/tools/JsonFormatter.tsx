'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNav } from '@/lib/navigation';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/tools-data';
import {
  Braces,
  Copy,
  Trash2,
  Download,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const faqItems = [
  {
    question: 'What is JSON formatting?',
    answer:
      'JSON formatting (also called pretty-printing) takes a compact JSON string and adds indentation and line breaks to make it human-readable. It structures the data with 2-space indentation by default, making nested objects and arrays easy to visually parse.',
  },
  {
    question: 'What does JSON minification do?',
    answer:
      'Minification removes all unnecessary whitespace, line breaks, and indentation from JSON, producing the smallest possible valid JSON string. This is useful for reducing file sizes in production APIs, reducing network bandwidth, and optimizing storage.',
  },
  {
    question: 'How does JSON validation work?',
    answer:
      'JSON validation parses your input using the native JSON.parse() method. If the string is valid JSON, it parses successfully. If not, it throws a syntax error with details about where the problem occurs, which we display to help you fix the issue.',
  },
  {
    question: 'Is my data sent to any server?',
    answer:
      'No. All JSON formatting, minification, and validation happens entirely in your browser using JavaScript. Your data never leaves your device, making it safe for sensitive configuration files and API payloads.',
  },
];

export default function JsonFormatter() {
  const { navigate } = useNav();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [validationMsg, setValidationMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const relatedTools = getRelatedTools('json-formatter', 3);

  const getLineCount = (text: string) => {
    if (!text) return 0;
    return text.split('\n').length;
  };

  const formatJson = useCallback((raw: string) => {
    if (!raw.trim()) {
      setOutput('');
      setValidationStatus('idle');
      setValidationMsg('');
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setValidationStatus('valid');
      setValidationMsg('Valid JSON');
    } catch (e: any) {
      setValidationStatus('invalid');
      setValidationMsg(e.message);
      // Keep previous output or clear
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      formatJson(input);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, formatJson]);

  const handleMinify = () => {
    if (!input.trim()) {
      toast({ title: 'No input', description: 'Enter some JSON first.' });
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setInput(minified);
      setValidationStatus('valid');
      setValidationMsg('Minified successfully');
      toast({ title: 'Minified', description: 'JSON has been minified.' });
    } catch (e: any) {
      setValidationStatus('invalid');
      setValidationMsg(e.message);
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      toast({ title: 'No input', description: 'Enter some JSON to validate.' });
      return;
    }
    try {
      JSON.parse(input);
      setValidationStatus('valid');
      setValidationMsg('Valid JSON!');
      toast({ title: 'Valid JSON', description: 'Your JSON is syntactically correct.' });
    } catch (e: any) {
      setValidationStatus('invalid');
      setValidationMsg(e.message);
      toast({ title: 'Invalid JSON', description: e.message });
    }
  };

  const handleCopy = async () => {
    if (!output) {
      toast({ title: 'Nothing to copy', description: 'Format some JSON first.' });
      return;
    }
    await navigator.clipboard.writeText(output);
    toast({ title: 'Copied!', description: 'Output copied to clipboard.' });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setValidationStatus('idle');
    setValidationMsg('');
  };

  const handleDownload = () => {
    if (!output) {
      toast({ title: 'Nothing to download', description: 'Format some JSON first.' });
      return;
    }
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded', description: 'File saved as formatted.json' });
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#00D9FF]/10">
              <Braces className="h-6 w-6 text-[#00D9FF]" />
            </div>
            <h1 className="text-3xl font-bold">JSON Formatter</h1>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Format, validate, and minify JSON data instantly. Paste your JSON and see it formatted in real-time with syntax validation.
          </p>
        </div>

        {/* Tool Area */}
        <div className="space-y-4 mb-8">
          {/* Buttons Bar */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => formatJson(input)}
              className="bg-[#00D9FF] text-[#0F172A] font-semibold rounded-lg px-4 py-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Format
            </button>
            <button
              onClick={handleMinify}
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Minify
            </button>
            <button
              onClick={handleValidate}
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              {validationStatus === 'valid' ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : validationStatus === 'invalid' ? (
                <XCircle className="h-4 w-4 text-red-400" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Validate
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
            <button
              onClick={handleDownload}
              className="bg-[#1A1F3A] text-[#F1F5F9] font-semibold rounded-lg px-4 py-2 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download .json
            </button>
          </div>

          {/* Validation Status */}
          {validationStatus !== 'idle' && (
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                validationStatus === 'valid'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {validationStatus === 'valid' ? (
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 flex-shrink-0" />
              )}
              <span>{validationMsg}</span>
            </div>
          )}

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#94A3B8]">Input</label>
                <span className="text-xs text-[#94A3B8]">{getLineCount(input)} lines</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your JSON here...'
                className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-sm text-[#F1F5F9] font-mono placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] resize-y min-h-[200px]"
                spellCheck={false}
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#94A3B8]">Output</label>
                <span className="text-xs text-[#94A3B8]">{getLineCount(output)} lines</span>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder='Formatted JSON will appear here...'
                className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-sm text-[#F1F5F9] font-mono placeholder-[#94A3B8] outline-none resize-y min-h-[200px]"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() => navigate({ type: 'blog-post', slug: 'complete-guide-to-json-formatting' })}
            className="text-[#00D9FF] hover:underline text-sm font-medium"
          >
            Learn More: Complete Guide to JSON Formatting →
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
