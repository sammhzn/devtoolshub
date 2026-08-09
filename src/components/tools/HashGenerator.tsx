'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useNav } from '@/lib/navigation';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/tools-data';
import {
  Hash,
  Copy,
  ChevronDown,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

// Inline MD5 implementation
function md5(input: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binlMD5(x: number[], len: number) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const oa = a, ob = b, oc = c, od = d;
      a = md5ff(a,b,c,d,x[i],7,-680876936); d = md5ff(d,a,b,c,x[i+1],12,-389564586); c = md5ff(c,d,a,b,x[i+2],17,606105819); b = md5ff(b,c,d,a,x[i+3],22,-1044525330);
      a = md5ff(a,b,c,d,x[i+4],7,-176418897); d = md5ff(d,a,b,c,x[i+5],12,1200080426); c = md5ff(c,d,a,b,x[i+6],17,-1473231341); b = md5ff(b,c,d,a,x[i+7],22,-45705983);
      a = md5ff(a,b,c,d,x[i+8],7,1770035416); d = md5ff(d,a,b,c,x[i+9],12,-1958414417); c = md5ff(c,d,a,b,x[i+10],17,-42063); b = md5ff(b,c,d,a,x[i+11],22,-1990404162);
      a = md5ff(a,b,c,d,x[i+12],7,1804603682); d = md5ff(d,a,b,c,x[i+13],12,-40341101); c = md5ff(c,d,a,b,x[i+14],17,-1502002290); b = md5ff(b,c,d,a,x[i+15],22,1236535329);
      a = md5gg(a,b,c,d,x[i+1],5,-165796510); d = md5gg(d,a,b,c,x[i+6],9,-1069501632); c = md5gg(c,d,a,b,x[i+11],14,643717713); b = md5gg(b,c,d,a,x[i],20,-373897302);
      a = md5gg(a,b,c,d,x[i+5],5,-701558691); d = md5gg(d,a,b,c,x[i+10],9,38016083); c = md5gg(c,d,a,b,x[i+15],14,-660478335); b = md5gg(b,c,d,a,x[i+4],20,-405537848);
      a = md5gg(a,b,c,d,x[i+9],5,568446438); d = md5gg(d,a,b,c,x[i+14],9,-1019803690); c = md5gg(c,d,a,b,x[i+3],14,-187363961); b = md5gg(b,c,d,a,x[i+8],20,1163531501);
      a = md5gg(a,b,c,d,x[i+13],5,-1444681467); d = md5gg(d,a,b,c,x[i+2],9,-51403784); c = md5gg(c,d,a,b,x[i+7],14,1735328473); b = md5gg(b,c,d,a,x[i+12],20,-1926607734);
      a = md5hh(a,b,c,d,x[i+5],4,-378558); d = md5hh(d,a,b,c,x[i+8],11,-2022574463); c = md5hh(c,d,a,b,x[i+11],16,1839030562); b = md5hh(b,c,d,a,x[i+14],23,-35309556);
      a = md5hh(a,b,c,d,x[i+1],4,-1530992060); d = md5hh(d,a,b,c,x[i+4],11,1272893353); c = md5hh(c,d,a,b,x[i+7],16,-155497632); b = md5hh(b,c,d,a,x[i+10],23,-1094730640);
      a = md5hh(a,b,c,d,x[i+13],4,681279174); d = md5hh(d,a,b,c,x[i],11,-358537222); c = md5hh(c,d,a,b,x[i+3],16,-722521979); b = md5hh(b,c,d,a,x[i+6],23,76029189);
      a = md5hh(a,b,c,d,x[i+9],4,-640364487); d = md5hh(d,a,b,c,x[i+12],11,-421815835); c = md5hh(c,d,a,b,x[i+15],16,530742520); b = md5hh(b,c,d,a,x[i+2],23,-995338651);
      a = md5ii(a,b,c,d,x[i],6,-198630844); d = md5ii(d,a,b,c,x[i+7],10,1126891415); c = md5ii(c,d,a,b,x[i+14],15,-1416354905); b = md5ii(b,c,d,a,x[i+5],21,-57434055);
      a = md5ii(a,b,c,d,x[i+12],6,1700485571); d = md5ii(d,a,b,c,x[i+3],10,-1894986606); c = md5ii(c,d,a,b,x[i+10],15,-1051523); b = md5ii(b,c,d,a,x[i+1],21,-2054922799);
      a = md5ii(a,b,c,d,x[i+8],6,1873313359); d = md5ii(d,a,b,c,x[i+15],10,-30611744); c = md5ii(c,d,a,b,x[i+6],15,-1560198380); b = md5ii(b,c,d,a,x[i+13],21,1309151649);
      a = md5ii(a,b,c,d,x[i+4],6,-145523070); d = md5ii(d,a,b,c,x[i+11],10,-1120210379); c = md5ii(c,d,a,b,x[i+2],15,718787259); b = md5ii(b,c,d,a,x[i+9],21,-343485551);
      a = safeAdd(a, oa); b = safeAdd(b, ob); c = safeAdd(c, oc); d = safeAdd(d, od);
    }
    return [a, b, c, d];
  }
  function str2binl(str: string) {
    const bin: number[] = [];
    const mask = (1 << 8) - 1;
    for (let i = 0; i < str.length * 8; i += 8) bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
    return bin;
  }
  function binl2hex(binarray: number[]) {
    const hexTab = '0123456789abcdef';
    let str = '';
    for (let i = 0; i < binarray.length * 4; i++) str += hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) + hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    return str;
  }
  const utf8 = unescape(encodeURIComponent(input));
  return binl2hex(binlMD5(str2binl(utf8), utf8.length * 8));
}

async function computeSha(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

type Algorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

const faqItems = [
  {
    question: 'What is the difference between MD5 and SHA hashes?',
    answer:
      'MD5 produces a 128-bit (32 hex character) hash, SHA-1 produces 160-bit, SHA-256 produces 256-bit, and SHA-512 produces 512-bit hashes. SHA-256 and SHA-512 are considered cryptographically secure, while MD5 and SHA-1 have known collision vulnerabilities and should not be used for security purposes.',
  },
  {
    question: 'Which hash algorithm should I use?',
    answer:
      'For security-sensitive applications like password hashing or digital signatures, use SHA-256 or SHA-512. MD5 is still useful for non-security purposes like checksums, cache keys, or deduplication. SHA-1 is deprecated for security but still used in some legacy systems.',
  },
  {
    question: 'Are these hashes salted?',
    answer:
      'No, this tool computes plain hashes without salting. Salting is used in password storage to prevent rainbow table attacks. If you are hashing passwords for storage, use a dedicated password hashing algorithm like bcrypt (see our Bcrypt Hash Generator tool).',
  },
  {
    question: 'Can I hash files with this tool?',
    answer:
      'Currently, this tool works with text input only. You can paste file contents as text. For very large files, we recommend using a command-line tool like sha256sum or md5sum which can handle files of any size efficiently.',
  },
];

export default function HashGenerator() {
  const { navigate } = useNav();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [algorithms, setAlgorithms] = useState<Record<Algorithm, boolean>>({
    md5: true,
    sha1: true,
    sha256: true,
    sha512: true,
  });
  const [results, setResults] = useState<Record<Algorithm, string>>({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const relatedTools = getRelatedTools('hash-generator', 3);

  const toggleAlgorithm = (algo: Algorithm) => {
    setAlgorithms((prev) => ({ ...prev, [algo]: !prev[algo] }));
  };

  const generateHashes = useCallback(
    async (text: string, algos: Record<Algorithm, boolean>) => {
      if (!text.trim()) {
        setResults({ md5: '', sha1: '', sha256: '', sha512: '' });
        return;
      }
      const newResults: Record<Algorithm, string> = { md5: '', sha1: '', sha256: '', sha512: '' };
      if (algos.md5) newResults.md5 = md5(text);
      if (algos.sha1) newResults.sha1 = await computeSha('SHA-1', text);
      if (algos.sha256) newResults.sha256 = await computeSha('SHA-256', text);
      if (algos.sha512) newResults.sha512 = await computeSha('SHA-512', text);
      setResults(newResults);
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateHashes(input, algorithms);
    }, 200);
    return () => clearTimeout(timeout);
  }, [input, algorithms, generateHashes]);

  const handleCopy = async (algo: Algorithm) => {
    const hash = results[algo];
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(algo);
    toast({ title: 'Copied!', description: `${algo.toUpperCase()} hash copied.` });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerate = () => {
    if (!input.trim()) {
      toast({ title: 'No input', description: 'Enter some text to hash.' });
      return;
    }
    generateHashes(input, algorithms);
    toast({ title: 'Generated', description: 'Hashes generated successfully.' });
  };

  const algoLabels: { key: Algorithm; label: string; bits: string }[] = [
    { key: 'md5', label: 'MD5', bits: '128-bit' },
    { key: 'sha1', label: 'SHA-1', bits: '160-bit' },
    { key: 'sha256', label: 'SHA-256', bits: '256-bit' },
    { key: 'sha512', label: 'SHA-512', bits: '512-bit' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F1F5F9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#00D9FF]/10">
              <Hash className="h-6 w-6 text-[#00D9FF]" />
            </div>
            <h1 className="text-3xl font-bold">Hash Generator</h1>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input. Results update in real-time as you type.
          </p>
        </div>

        {/* Tool Area */}
        <div className="space-y-4 mb-8">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate hashes..."
              className="w-full rounded-lg border border-[#334155] bg-[#1A1F3A] p-4 text-sm text-[#F1F5F9] font-mono placeholder-[#94A3B8] outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] resize-y min-h-[200px]"
              spellCheck={false}
            />
          </div>

          {/* Algorithm Toggles + Generate Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {algoLabels.map(({ key, label, bits }) => (
                <button
                  key={key}
                  onClick={() => toggleAlgorithm(key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 ${
                    algorithms[key]
                      ? 'bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF]'
                      : 'bg-[#1A1F3A] border-[#334155] text-[#94A3B8] hover:border-[#94A3B8]'
                  }`}
                >
                  {algorithms[key] && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {label}
                  <span className="text-xs opacity-60">({bits})</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              className="bg-[#00D9FF] text-[#0F172A] font-semibold rounded-lg px-4 py-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2 ml-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Generate
            </button>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {algoLabels.map(({ key, label, bits }) => {
              if (!algorithms[key]) return null;
              return (
                <div
                  key={key}
                  className="border border-[#334155] rounded-lg bg-[#1A1F3A] overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#334155]">
                    <div className="flex items-center gap-2">
                      <Hash className="h-3.5 w-3.5 text-[#A78BFA]" />
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-xs text-[#94A3B8]">{bits}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(key)}
                      className="text-xs text-[#94A3B8] hover:text-[#00D9FF] transition-colors flex items-center gap-1"
                    >
                      {copiedIndex === key ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                          <span className="text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-mono text-[#F1F5F9] break-all leading-relaxed">
                      {results[key] || (
                        <span className="text-[#94A3B8]">Waiting for input...</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learn More */}
        <div className="mb-10">
          <button
            onClick={() => navigate({ type: 'blog-post', slug: 'hash-algorithms-explained' })}
            className="text-[#00D9FF] hover:underline text-sm font-medium"
          >
            Learn More: Hash Algorithms Explained →
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
