import {
  Braces,
  Lock,
  Fingerprint,
  Link2,
  Hash,
  FileText,
  Code2,
  Binary,
  Clock,
  Calendar,
  Regex,
  Palette,
  Image,
  Table,
  Type,
  Mail,
  Shield,
  KeyRound,
  QrCode,
  Diff,
  Asterisk,
  Percent,
  WrapText,
  CaseSensitive,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  url: string;
  popular?: boolean;
}

export interface ToolCategory {
  name: string;
  tools: Tool[];
}

export const categories: ToolCategory[] = [
  {
    name: "Text & Encoding",
    tools: [
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format, validate, and minify JSON data instantly with syntax highlighting",
        icon: Braces,
        category: "Text & Encoding",
        url: "/json-formatter",
        popular: true,
      },
      {
        id: "base64-encoder",
        name: "Base64 Encoder/Decoder",
        description: "Encode text to Base64 or decode Base64 strings back to text",
        icon: Binary,
        category: "Text & Encoding",
        url: "/base64-encoder",
        popular: true,
      },
      {
        id: "url-encoder",
        name: "URL Encoder/Decoder",
        description: "Encode and decode URLs with special character handling",
        icon: Link2,
        category: "Text & Encoding",
        url: "/url-encoder",
        popular: true,
      },
      {
        id: "html-encoder",
        name: "HTML Entity Encoder",
        description: "Encode and decode HTML entities for safe web content",
        icon: Code2,
        category: "Text & Encoding",
        url: "/html-encoder",
      },
      {
        id: "markdown-preview",
        name: "Markdown Preview",
        description: "Write and preview Markdown content with live rendering",
        icon: FileText,
        category: "Text & Encoding",
        url: "/markdown-preview",
      },
      {
        id: "text-diff",
        name: "Text Diff Checker",
        description: "Compare two texts and highlight differences side by side",
        icon: Diff,
        category: "Text & Encoding",
        url: "/text-diff",
      },
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, sentences, and paragraphs in text",
        icon: Type,
        category: "Text & Encoding",
        url: "/word-counter",
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text between camelCase, snake_case, PascalCase and more",
        icon: CaseSensitive,
        category: "Text & Encoding",
        url: "/case-converter",
      },
      {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test and debug regular expressions with real-time matching",
        icon: Regex,
        category: "Text & Encoding",
        url: "/regex-tester",
      },
      {
        id: "text-wrapper",
        name: "Text Wrapper",
        description: "Wrap text to a specific line length for readability",
        icon: WrapText,
        category: "Text & Encoding",
        url: "/text-wrapper",
      },
    ],
  },
  {
    name: "Hash & Security",
    tools: [
      {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text",
        icon: Hash,
        category: "Hash & Security",
        url: "/hash-generator",
        popular: true,
      },
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate strong, random passwords with custom criteria",
        icon: KeyRound,
        category: "Hash & Security",
        url: "/password-generator",
      },
      {
        id: "password-strength",
        name: "Password Strength Checker",
        description: "Check password strength and get improvement suggestions",
        icon: Shield,
        category: "Hash & Security",
        url: "/password-strength",
      },
      {
        id: "hmac-generator",
        name: "HMAC Generator",
        description: "Generate HMAC signatures using various hash algorithms",
        icon: Lock,
        category: "Hash & Security",
        url: "/hmac-generator",
      },
      {
        id: "bcrypt-generator",
        name: "Bcrypt Hash Generator",
        description: "Generate and verify Bcrypt password hashes",
        icon: Lock,
        category: "Hash & Security",
        url: "/bcrypt-generator",
      },
    ],
  },
  {
    name: "Utilities",
    tools: [
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate UUID v1 and v4 identifiers in bulk",
        icon: Fingerprint,
        category: "Utilities",
        url: "/uuid-generator",
        popular: true,
      },
      {
        id: "timestamp-converter",
        name: "Timestamp Converter",
        description: "Convert between Unix timestamps and human-readable dates",
        icon: Clock,
        category: "Utilities",
        url: "/timestamp-converter",
      },
      {
        id: "date-calculator",
        name: "Date Calculator",
        description: "Calculate date differences and add or subtract dates",
        icon: Calendar,
        category: "Utilities",
        url: "/date-calculator",
      },
      {
        id: "color-converter",
        name: "Color Converter",
        description: "Convert colors between HEX, RGB, HSL, and other formats",
        icon: Palette,
        category: "Utilities",
        url: "/color-converter",
      },
      {
        id: "base-converter",
        name: "Base Converter",
        description: "Convert numbers between binary, octal, decimal, and hex",
        icon: Asterisk,
        category: "Utilities",
        url: "/base-converter",
      },
      {
        id: "percentage-calculator",
        name: "Percentage Calculator",
        description: "Calculate percentages, increases, decreases, and ratios",
        icon: Percent,
        category: "Utilities",
        url: "/percentage-calculator",
      },
      {
        id: "json-to-csv",
        name: "JSON to CSV",
        description: "Convert JSON data to CSV format for spreadsheet use",
        icon: Table,
        category: "Utilities",
        url: "/json-to-csv",
      },
      {
        id: "qr-code-generator",
        name: "QR Code Generator",
        description: "Generate QR codes from text, URLs, or data",
        icon: QrCode,
        category: "Utilities",
        url: "/qr-code-generator",
      },
      {
        id: "url-parser",
        name: "URL Parser",
        description: "Parse URLs into components: protocol, host, path, query, hash",
        icon: Link2,
        category: "Utilities",
        url: "/url-parser",
      },
      {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode and inspect JSON Web Tokens without verification",
        icon: Lock,
        category: "Utilities",
        url: "/jwt-decoder",
      },
      {
        id: "image-to-base64",
        name: "Image to Base64",
        description: "Convert images to Base64 encoded strings for embedding",
        icon: Image,
        category: "Utilities",
        url: "/image-to-base64",
      },
      {
        id: "email-validator",
        name: "Email Validator",
        description: "Validate email addresses and check format compliance",
        icon: Mail,
        category: "Utilities",
        url: "/email-validator",
      },
      {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text for design and development",
        icon: FileText,
        category: "Utilities",
        url: "/lorem-ipsum",
      },
      {
        id: "minify-json",
        name: "JSON Minifier",
        description: "Minify JSON to reduce file size for production use",
        icon: Braces,
        category: "Utilities",
        url: "/minify-json",
      },
    ],
  },
];

export const allTools: Tool[] = categories.flatMap((c) => c.tools);
export const featuredTools: Tool[] = allTools.filter((t) => t.popular);

export const faqItems = [
  {
    question: "Why is there no sign-up required?",
    answer:
      "We believe developer tools should be instantly accessible. Creating an account adds friction and delays your workflow. All our tools run entirely in your browser, so there is no server-side data to protect with authentication.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. All processing happens client-side in your browser. We never send your data to any server, never store it, and never log it. When you close the tab, your data is gone. This is by design.",
  },
  {
    question: "Can I use an API to access the tools?",
    answer:
      "Currently, our tools are browser-based utilities. We are exploring API access for popular tools like the Hash Generator and UUID Generator. Join our GitHub to track progress on API endpoints.",
  },
  {
    question: "Which tools are most popular?",
    answer:
      "JSON Formatter, Base64 Encoder/Decoder, and Hash Generator are our top three most-used tools. Developers love them for quick debugging and data transformation tasks.",
  },
  {
    question: "Do the tools work offline?",
    answer:
      "Yes! Once the page loads, all tools work completely offline. The JavaScript code runs in your browser, so no internet connection is needed after the initial page load.",
  },
  {
    question: "Is this open source?",
    answer:
      "Yes, DevToolsHub is open source. You can view the source code, report issues, or contribute new tools on our GitHub repository. We welcome community contributions.",
  },
  {
    question: "How accurate are the hash calculations?",
    answer:
      "Our hash generator uses the Web Crypto API, which is the same cryptographic library used by modern browsers for HTTPS. The results are cryptographically accurate and match standard implementations.",
  },
  {
    question: "Can I request a new tool?",
    answer:
      "Of course! Open an issue on our GitHub repository with the tool name, description, and expected behavior. We review all requests and prioritize based on community demand.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "All modern browsers are supported including Chrome, Firefox, Safari, and Edge. We use standard Web APIs so compatibility is excellent across platforms.",
  },
  {
    question: "Is there a limit on input size?",
    answer:
      "There is no strict limit for most tools. However, extremely large inputs (multiple megabytes) may cause browser slowdown. For optimal performance, we recommend inputs under 1MB.",
  },
];

export const blogPosts = [
  {
    slug: "complete-guide-to-json-formatting",
    title: "Complete Guide to JSON Formatting",
    excerpt:
      "Learn everything about JSON formatting, validation, and best practices for working with JSON data in web development.",
    date: "2025-08-01",
    author: "DevToolsHub Team",
    readTime: "8 min read",
    category: "Guides",
    relatedToolId: "json-formatter",
  },
  {
    slug: "understanding-base64-encoding",
    title: "Understanding Base64 Encoding in Web Development",
    excerpt:
      "A deep dive into Base64 encoding: how it works, when to use it, and common pitfalls developers should avoid.",
    date: "2025-07-25",
    author: "DevToolsHub Team",
    readTime: "10 min read",
    category: "Deep Dives",
    relatedToolId: "base64-encoder",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find((t) => t.id === slug);
}

export function getRelatedTools(toolId: string, count: number = 3): Tool[] {
  const tool = getToolBySlug(toolId);
  if (!tool) return [];
  return allTools
    .filter((t) => t.id !== toolId && t.category === tool.category)
    .slice(0, count);
}
