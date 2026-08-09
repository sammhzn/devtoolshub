'use client';

import React, { useState } from 'react';
import { useNav } from '@/lib/navigation';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/tools-data';
import {
  Fingerprint,
  Copy,
  Download,
  RefreshCw,
  ChevronDown,
  Layers,
  Minus,
  Zap,
} from 'lucide-react';

function generateUUIDv4(): string {
  // Use crypto.randomUUID if available, otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback using crypto.getRandomValues
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateUUIDv1(): string {
  // Generate a UUID v1 (time-based) using ArrayBuffer to avoid BigInt
  const now = Date.now();
  const uuidEpochOffset = 122192928000000;
  // UUID timestamp = (unix_ms - offset) * 10_000 → fits in 60 bits
  // Use string arithmetic to avoid precision loss
  const diffStr = String(now - uuidEpochOffset);
  // Multiply by 10000 using string math to avoid Number precision loss
  let carry = 0;
  const timeChars = diffStr.split('').map(Number).reverse();
  const result: number[] = [];
  for (let i = 0; i < timeChars.length; i++) {
    const product = timeChars[i] * 10000 + carry;
    result.push(product % 10);
    carry = Math.floor(product / 10);
  }
  while (carry > 0) {
    result.push(carry % 10);
    carry = Math.floor(carry / 10);
  }
  // Now result has the digits in reverse. Convert to a string.
  const timeStr = result.reverse().join('');
  // Parse lower 32 bits for time_low, next 16 for time_mid, next 12 for time_hi
  const timeLow = parseInt(timeStr.slice(-8), 10) || 0;
  const timeMid = parseInt(timeStr.slice(-12, -8), 10) || 0;
  const timeHi = (parseInt(timeStr.slice(-16, -12), 10) || 0) & 0x0fff;
  const timeHiAndVersion = timeHi | 0x1000; // version 1

  const clockSeqBytes = new Uint8Array(2);
  crypto.getRandomValues(clockSeqBytes);
  const clockSeq = ((clockSeqBytes[0] & 0x3f) << 8) | clockSeqBytes[1]; // variant 1

  const nodeBytes = new Uint8Array(6);
  crypto.getRandomValues(nodeBytes);
  // Set multicast bit
  nodeBytes[0] = (nodeBytes[0] | 0x01) & 0xfe;
  const node = Array.from(nodeBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const timeLowHex = timeLow.toString(16).padStart(8, '0');
  const timeMidHex = timeMid.toString(16).padStart(4, '0');
  const timeHiHex = timeHiAndVersion.toString(16).padStart(4, '0');
  const clockSeqHex = clockSeq.toString(16).padStart(4, '0');

  return `${timeLowHex}-${timeMidHex}-${timeHiHex}-${clockSeqHex}-${node}`;
}

const faqItems = [
  {
    question: 'What is the difference between UUID v1 and v4?',
    answer:
      'UUID v1 is time-based and incorporates a timestamp and a random node identifier, making it sortable by generation time. UUID v4 is purely random. v4 is recommended for most use cases because it does not leak timing information. v1 is useful when you need sortability or want to know when the UUID was generated.',
  },
  {
    question: 'Are UUIDs guaranteed to be unique?',
    answer:
      'UUIDs are practically unique but not mathematically guaranteed. The probability of a UUID v4 collision is astronomically low — you would need to generate about 2.71 quintillion UUIDs before having a 50% chance of a collision. For all practical purposes, UUIDs can be treated as unique.',
  },
  {
    question: 'Should I store UUIDs with or without hyphens?',
    answer:
      'Both formats are valid. The hyphenated format (with dashes) is the standard representation defined by RFC 4122 and is more human-readable. The format without hyphens saves 4 characters and is sometimes preferred for database storage or URL usage where brevity matters.',
  },
  {
    question: 'Can UUIDs be used as primary keys in databases?',
    answer:
      'Yes, UUIDs are commonly used as primary keys, especially in distributed systems where you need to generate unique IDs without coordination between nodes. However, note that random UUIDs (v4) can cause index fragmentation in some databases. If you need sortable IDs, consider UUID v1 or ULIDs.',
  },
];

export default function UuidGenerator() {
  const { navigate } = useNav();
  const { toast } = useToast();
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [uuids, setUuids] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState('10');
  const [withoutHyphens, setWithoutHyphens] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const relatedTools = getRelatedTools('uuid-generator', 3);

  const formatUuid = (uuid: string) => {
    return withoutHyphens ? uuid.replace(/-/g, '') : uuid;
  };

  const handleGenerateSingle = () => {
    const uuid = version === 'v4' ? generateUUIDv4() : generateUUIDv1();
    setUuids([formatUuid(uuid)]);
    toast({ title: 'Generated', description: `UUID ${version} generated.` });
  };

  const handleGenerateBulk = () => {
    const count = Math.min(Math.max(parseInt(bulkCount) || 10, 1), 1000);
    setBulkCount(count.toString());
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      const uuid = version === 'v4' ? generateUUIDv4() : generateUUIDv1();
      newUuids.push(formatUuid(uuid));
    }
    setUuids(newUuids);
    toast({ title: 'Generated', description: `${count} UUIDs generated.` });
  };

  const handleCopySingle = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    toast({ title: 'Copied!', description: 'UUID copied to clipboard.' });
  };

  const handleCopyAll = async () => {
    if (uuids.length === 0) {
      toast({ title: 'Nothing to copy', description: 'Generate some UUIDs first.' });
      return;
    }
    const text = uuids.join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    toast({ title: 'Copied!', description: `${uuids.length} UUIDs copied.` });
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    if (uuids.length === 0) {
      toast({ title: 'Nothing to download', description: 'Generate some UUIDs first.' });
      return;
    }
    const text = uuids.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded', description: 'UUIDs saved as uuids.txt' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#00D9FF]/10">
              <Fingerprint className="h-6 w-6 text-[#00D9FF]" />
            </div>
            <h1 className="text-3xl font-bold">UUID Generator</h1>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Generate UUID v1 (time-based) and v4 (random) identifiers. Create single or bulk UUIDs with optional formatting options.
          </p>
        </div>

        {/* Tool Area */}
        <div className="space-y-5 mb-8">
          {/* Version Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">UUID Version</label>
            <div className="flex gap-2">
              <button
                onClick={() => setVersion('v4')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  version === 'v4'
                    ? 'bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF]'
                    : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-[#94A3B8]'
                }`}
              >
                <Zap className="h-4 w-4" />
                UUID v4 (Random)
              </button>
              <button
                onClick={() => setVersion('v1')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  version === 'v1'
                    ? 'bg-[#A78BFA]/10 border border-[#A78BFA] text-[#A78BFA]'
                    : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-[#94A3B8]'
                }`}
              >
                <Fingerprint className="h-4 w-4" />
                UUID v1 (Time-based)
              </button>
            </div>
          </div>

          {/* Hyphen Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWithoutHyphens(!withoutHyphens)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                withoutHyphens
                  ? 'bg-[#A78BFA]/10 border-[#A78BFA] text-[#A78BFA]'
                  : 'bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:border-[#94A3B8]'
              }`}
            >
              <Minus className="h-4 w-4" />
              {withoutHyphens ? 'Without Hyphens' : 'With Hyphens'}
            </button>
          </div>

          {/* Generate Single */}
          <button
            onClick={handleGenerateSingle}
            className="bg-[#00D9FF] text-[#0F172A] font-semibold rounded-lg px-4 py-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate Single UUID
          </button>

          {/* Bulk Generation */}
          <div className="border border-[#334155] rounded-lg p-4 bg-[#1E293B] space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#A78BFA]" />
              Bulk Generation
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-[#94A3B8]">Count:</label>
                <input
                  type="number"
                  value={bulkCount}
                  onChange={(e) => setBulkCount(e.target.value)}
                  min="1"
                  max="1000"
                  className="w-24 rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-[#E2E8F0] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                />
                <span className="text-xs text-[#94A3B8]">(1–1000)</span>
              </div>
              <button
                onClick={handleGenerateBulk}
                className="bg-[#00D9FF] text-[#0F172A] font-semibold rounded-lg px-4 py-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
              >
                <Layers className="h-4 w-4" />
                Generate Bulk
              </button>
            </div>
          </div>

          {/* Results */}
          {uuids.length > 0 && (
            <div className="space-y-3">
              {/* Bulk actions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">
                  Generated <span className="text-[#E2E8F0] font-semibold">{uuids.length}</span> UUID{uuids.length !== 1 ? 's' : ''}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyAll}
                    className="bg-[#1E293B] text-[#E2E8F0] font-semibold rounded-lg px-3 py-1.5 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-1.5 text-sm"
                  >
                    {copiedAll ? (
                      <span className="text-green-400">Copied All!</span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy All
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-[#1E293B] text-[#E2E8F0] font-semibold rounded-lg px-3 py-1.5 border border-[#334155] hover:border-[#00D9FF] transition-all flex items-center gap-1.5 text-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download .txt
                  </button>
                </div>
              </div>

              {/* UUID List */}
              <div className="border border-[#334155] rounded-lg bg-[#1E293B] overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                  {uuids.map((uuid, index) => (
                    <div
                      key={`${uuid}-${index}`}
                      className="flex items-center justify-between px-4 py-2.5 border-b border-[#334155] last:border-b-0 hover:bg-[#0F172A]/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs text-[#94A3B8] w-8 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <span className="text-sm font-mono text-[#E2E8F0] truncate">
                          {uuid}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopySingle(uuid)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-[#334155] flex-shrink-0 ml-2"
                        title="Copy"
                      >
                        <Copy className="h-3.5 w-3.5 text-[#94A3B8] hover:text-[#00D9FF]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() => navigate({ type: 'blog-post', slug: 'uuid-guide' })}
            className="text-[#00D9FF] hover:underline text-sm font-medium"
          >
            Learn More: A Developer's Guide to UUIDs →
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
