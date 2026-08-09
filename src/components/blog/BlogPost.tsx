'use client';

import { useNav, type Page } from '@/lib/navigation';
import { blogPosts } from '@/lib/tools-data';
import { getToolBySlug } from '@/lib/tools-data';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ExternalLink,
  ChevronRight,
  List,
} from 'lucide-react';
import { useMemo } from 'react';

interface BlogPostProps {
  slug?: string;
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0B1120] border border-[#334155] rounded-lg p-4 font-mono text-sm text-[#F1F5F9] overflow-x-auto">
      {children}
    </div>
  );
}

const jsonPostContent = {
  slug: 'complete-guide-to-json-formatting',
  title: 'Complete Guide to JSON Formatting',
  date: '2025-08-01',
  author: 'DevToolsHub Team',
  readTime: '8 min read',
  category: 'Guides',
  relatedToolId: 'json-formatter',
  sections: [
    {
      heading: 'What is JSON?',
      id: 'what-is-json',
      content: `JavaScript Object Notation, commonly known as JSON, is a lightweight data-interchange format that has become the de facto standard for data exchange on the web. Originally derived from JavaScript object literal syntax, JSON is now a language-independent format specified by RFC 8259. It is easy for humans to read and write, and easy for machines to parse and generate.

JSON supports four primitive data types: strings (enclosed in double quotes), numbers (integers and floating-point), booleans (true and false), and null. It also supports two composite types: objects (unordered collections of key-value pairs) and arrays (ordered lists of values). This simplicity is what makes JSON so universally adopted.

Unlike XML, which carries significant overhead with opening and closing tags, JSON is compact and straightforward. A typical JSON object representing a user might look like this:`,
      code: `{
  "name": "Jane Cooper",
  "email": "jane@example.com",
  "age": 28,
  "isVerified": true,
  "roles": ["admin", "editor"],
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA"
  }
}`,
    },
    {
      heading: 'Why Formatting Matters',
      id: 'why-formatting-matters',
      content: `Proper JSON formatting is not just about aesthetics. It plays a critical role in development workflows, debugging, code reviews, and collaboration. When JSON data is well-formatted, it becomes significantly easier to spot errors, understand data structures, and communicate with team members.

Consider the difference between a minified JSON response from an API and the same data beautifully formatted with proper indentation. The minified version might save a few kilobytes in transmission, but the formatted version saves developers minutes or even hours of debugging time. In production environments, you will almost always want to minify JSON to reduce payload size. But during development, testing, and debugging, pretty-printed JSON is invaluable.

Formatting also impacts version control. When JSON configuration files are committed to Git repositories, consistent formatting ensures that diffs are meaningful. Without consistent formatting, an entire file might appear as changed when only values were modified, making code reviews much more difficult.`,
    },
    {
      heading: 'Common JSON Errors and How to Fix Them',
      id: 'common-errors',
      content: `Even experienced developers encounter JSON errors regularly. Understanding the most common pitfalls can save you significant debugging time.

**Trailing commas** are perhaps the most frequent mistake. Unlike JavaScript object literals, JSON does not allow trailing commas after the last item in an object or array. This is a strict requirement of the specification and will cause parsing to fail:

The first example below is invalid JSON due to the trailing comma after the last property. The second example is valid:`,
      code: `// Invalid - trailing comma
{
  "name": "Alice",
  "age": 30,
}

// Valid - no trailing comma
{
  "name": "Alice",
  "age": 30
}`,
    },
    {
      heading: 'How to Validate JSON',
      id: 'validate-json',
      content: `JSON validation is the process of ensuring that a string of text conforms to the JSON specification. There are several approaches to validation, ranging from built-in browser methods to specialized tools.

The simplest way to validate JSON in a browser environment is to use the built-in JSON.parse() method. If the string is valid JSON, it will return a JavaScript object. If not, it will throw a SyntaxError with a descriptive message indicating where the error occurred:

For more robust validation, especially in production applications, you should use JSON Schema. JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It provides a powerful way to define the expected structure, data types, and constraints of your JSON data.`,
      code: `function validateJSON(str) {
  try {
    const result = JSON.parse(str);
    console.log("Valid JSON:", result);
    return true;
  } catch (error) {
    console.error("Invalid JSON:", error.message);
    return false;
  }
}

validateJSON('{"key": "value"}'); // true
validateJSON('{key: "value"}');  // false - unquoted keys`,
    },
    {
      heading: 'Pretty-Printing vs Minified JSON',
      id: 'pretty-vs-minified',
      content: `JSON can be represented in two primary formats: pretty-printed (also called formatted or beautified) and minified (also called compacted or compressed). Each format serves a specific purpose in the development lifecycle.

Pretty-printed JSON uses indentation (typically 2 or 4 spaces) and line breaks to make the structure visually apparent. This is the format you want when reading configuration files, debugging API responses, writing documentation, or reviewing code. In JavaScript, you can pretty-print using JSON.stringify() with the space parameter:`,
      code: `const data = { name: "Bob", age: 25, active: true };

// Pretty-print with 2-space indentation
const pretty = JSON.stringify(data, null, 2);
console.log(pretty);
// {
//   "name": "Bob",
//   "age": 25,
//   "active": true
// }

// Minified (no extra whitespace)
const minified = JSON.stringify(data);
console.log(minified);
// {"name":"Bob","age":25,"active":true}`,
    },
    {
      heading: 'JSON in APIs',
      id: 'json-in-apis',
      content: `JSON has become the dominant data format for RESTful APIs and is widely used in GraphQL as well. When building or consuming APIs, understanding how JSON is structured and transmitted is essential for any developer.

Most modern APIs return responses in JSON format with a Content-Type header of application/json. When sending data to an API, you typically serialize your JavaScript objects into JSON strings using JSON.stringify() before including them in the request body. On the receiving end, you parse the response body back into objects using JSON.parse() or the .json() method on the Response object in the Fetch API.

A well-designed API response usually includes not just the data but also metadata such as pagination information, error details, and status indicators. Understanding these patterns helps you build more robust applications that handle API responses gracefully.`,
      code: `// Fetching JSON data from an API
async function fetchUsers() {
  const response = await fetch('/api/users');
  const data = await response.json();
  
  console.log(data.users);       // Array of user objects
  console.log(data.total);       // Total count
  console.log(data.page);        // Current page
  return data;
}

// Sending JSON data to an API
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}`,
    },
    {
      heading: 'JSON Schema Basics',
      id: 'json-schema',
      content: `JSON Schema provides a declarative way to define the structure and validation rules for JSON documents. Think of it as a blueprint or contract that describes what valid JSON data should look like. It is an IETF standard (draft-2020-12) and is supported by numerous libraries across virtually every programming language.

With JSON Schema, you can specify required properties, define data types for each field, set minimum and maximum values for numbers, constrain string lengths and patterns using regular expressions, define enumeration values, and specify the structure of nested objects and arrays. This makes it incredibly powerful for API validation, form validation, and configuration file verification.

Here is an example of a JSON Schema that validates a user object. This schema ensures that the name is a string, the email matches a basic email pattern, the age is a number between 0 and 150, and that both name and email are required fields:`,
      code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name":  { "type": "string", "minLength": 1 },
    "email": { 
      "type": "string", 
      "format": "email" 
    },
    "age":   { 
      "type": "integer", 
      "minimum": 0, 
      "maximum": 150 
    }
  },
  "required": ["name", "email"]
}`,
    },
    {
      heading: 'Best Practices for Working with JSON',
      id: 'best-practices',
      content: `After years of working with JSON across countless projects, here are the best practices that will make your life as a developer significantly easier.

First, always validate JSON before parsing it in production code. Never assume that data from an external source is valid JSON. Use try-catch blocks around JSON.parse() calls and provide meaningful error messages to users. Second, use consistent indentation in your project. Whether you prefer 2 spaces or 4 spaces, pick one and stick with it across your entire codebase. Configure your editor and linter to enforce this standard.

Third, avoid putting comments in JSON. The JSON specification does not support comments, and while some parsers tolerate them, relying on non-standard features creates portability issues. If you need to add metadata, use a dedicated field like "_comment" or "description" within your JSON structure. Fourth, prefer snake_case for JSON keys when building public APIs, as it is the most widely recognized convention across different programming languages. CamelCase is acceptable if your API primarily serves JavaScript clients.

Fifth, keep your JSON payloads lean. Only include the fields that the client needs. Large JSON payloads increase bandwidth usage, parsing time, and memory consumption. Sixth, use JSON Schema for API request and response validation. It provides a machine-readable contract that both the server and client can validate against, catching errors early in the development process. Finally, leverage tools like our JSON Formatter for quick validation and formatting during development. It saves time and reduces errors compared to manual formatting.`,
    },
  ],
};

const base64PostContent = {
  slug: 'understanding-base64-encoding',
  title: 'Understanding Base64 Encoding in Web Development',
  date: '2025-07-25',
  author: 'DevToolsHub Team',
  readTime: '10 min read',
  category: 'Deep Dives',
  relatedToolId: 'base64-encoder',
  sections: [
    {
      heading: 'What is Base64?',
      id: 'what-is-base64',
      content: `Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters. It was originally designed to encode binary data for transmission over channels that only reliably support text, such as email systems. The Base64 alphabet consists of the uppercase letters A through Z, the lowercase letters a through z, the digits 0 through 9, and the plus sign (+) and forward slash (/). The equals sign (=) is used as a padding character.

The name "Base64" comes from the fact that it uses a base-64 number system to represent data. In contrast, most text encoding schemes like ASCII and UTF-8 use base-256 (one byte per character). By mapping groups of 3 bytes (24 bits) to 4 Base64 characters (each representing 6 bits), Base64 achieves a 4:3 size ratio. This means Base64-encoded data is approximately 33% larger than the original binary data, a trade-off that is acceptable when you need to ensure data integrity across text-only channels.

Base64 is defined in several RFCs, with the original specification in RFC 1421 and the most commonly used variant in RFC 4648. There are also URL-safe variants that replace + with - and / with _ to avoid characters that have special meaning in URLs.`,
    },
    {
      heading: 'How the Encoding Algorithm Works',
      id: 'how-it-works',
      content: `Understanding the Base64 encoding algorithm at a byte level is essential for debugging encoding issues and understanding why certain edge cases behave the way they do.

The algorithm works by taking the input data as a stream of bytes and processing them in groups of three. Each group of three bytes (24 bits total) is divided into four groups of 6 bits each. Each 6-bit value (ranging from 0 to 63) is then mapped to the corresponding character in the Base64 alphabet. Let us walk through an example encoding the string "Man":`,
      code: `// The string "Man" in ASCII/UTF-8 bytes:
// M = 77 (0x4D) = 01001101
// a = 97 (0x61) = 01100001
// n = 110 (0x6E) = 01101110
//
// Combined 24 bits: 010011010110000101101110
// Split into 6-bit groups:
//   010011 = 19 -> T
//   010110 = 22 -> W
//   000101 = 5  -> F
//   101110 = 46 -> u
//
// Result: "TWFu"

// JavaScript example
const encoded = btoa('Man');
console.log(encoded); // "TWFu"

const decoded = atob('TWFu');
console.log(decoded); // "Man"`,
    },
    {
      heading: 'When to Use Base64 Encoding',
      id: 'when-to-use',
      content: `Base64 encoding has several important use cases in web development. Understanding when to use it, and equally importantly when not to, is a critical skill.

**Data URIs** are one of the most common uses of Base64 in front-end development. Data URIs allow you to embed small images, fonts, or other resources directly in HTML or CSS files using the data: URL scheme. This eliminates additional HTTP requests, which can improve page load performance for small assets. The general syntax is data:[mediatype][;base64],data. This technique is particularly useful for small icons, logos, and placeholder images.

**Email attachments** were the original motivation for Base64. Email protocols like SMTP were designed for text-only communication (specifically 7-bit ASCII). Binary attachments like images, PDFs, and documents must be encoded as text before transmission. MIME (Multipurpose Internet Mail Extensions) uses Base64 encoding to package binary data within email messages. When you receive an email with an attachment, your email client automatically decodes the Base64 data back to the original binary file.

**API authentication tokens** frequently use Base64 encoding. Basic Authentication, for example, encodes the username and password as username:password in Base64 and sends it in the Authorization header. JWT (JSON Web Token) tokens use Base64URL encoding for their three parts: the header, payload, and signature. Note that Base64 encoding is NOT encryption; it is simply a way to represent binary data as text. Anyone can decode Base64 strings, so never use it to obscure sensitive data.

**CSS and JavaScript inlining** for performance optimization sometimes uses Base64. When you want to reduce the number of network requests for small assets, converting them to Base64 and inlining them can be beneficial. However, this should be used judiciously, as Base64 increases data size by 33% and prevents browser caching of individual assets.`,
    },
    {
      heading: 'Performance Implications',
      id: 'performance',
      content: `Base64 encoding has a direct impact on performance that developers must consider. The most significant impact is the 33% size increase. When you encode binary data to Base64, every 3 bytes of input become 4 bytes of output. For a 1 MB image, the Base64-encoded version will be approximately 1.33 MB. This increased size affects network transmission time, storage requirements, and memory usage.

In web development, the size increase means longer download times for Base64-encoded assets compared to their binary counterparts served directly. For large images or files, this can noticeably impact page load performance. The general guideline is to only use Base64 for very small assets, typically under 10 KB. For anything larger, the performance cost of the size increase outweighs the benefit of fewer HTTP requests.

Encoding and decoding operations also consume CPU cycles. While modern JavaScript engines are highly optimized for Base64 operations using built-in functions like btoa() and atob(), processing very large strings can still cause noticeable delays. In Node.js, the Buffer class provides efficient Base64 encoding and decoding methods that handle large data streams effectively.

Another performance consideration is that Base64-encoded data in HTML or CSS cannot be cached independently by the browser. When you inline a Base64 image in CSS, it becomes part of the CSS file. If the image changes, the entire CSS file must be re-downloaded. With separate image files, the browser can cache them independently, leading to better cache hit rates on subsequent visits.`,
    },
    {
      heading: 'Base64 vs Other Encodings',
      id: 'vs-other-encodings',
      content: `While Base64 is the most widely used binary-to-text encoding, there are several alternatives that may be more appropriate depending on your use case.

**Base32** uses a 32-character alphabet (A-Z and 2-7) and maps 5 bits per character. It produces larger output than Base64 (roughly 60% size increase) but is more human-friendly because it is case-insensitive and avoids ambiguous characters like 0/O and 1/I/l. Base32 is commonly used in encoding binary data in contexts where humans need to read or type the encoded values, such as Google Authenticator's TOTP secret keys.

**Base16 (Hexadecimal)** is the simplest encoding, representing each byte as two hexadecimal characters. It doubles the size of the data (100% increase) but is extremely easy to read and debug. Every developer is familiar with hexadecimal, making it ideal for displaying binary data like hashes, color values, and memory addresses. When you see an MD5 hash displayed as a 32-character hexadecimal string, that is Base16 encoding.

**Base58** is used primarily in cryptocurrency and blockchain applications. It excludes the easily confused characters 0, O, I, and l from the Base64 alphabet, resulting in a 58-character set. This makes it suitable for encoding addresses and identifiers that humans need to read and type accurately. Bitcoin addresses, for example, use Base58Check encoding.

**Percent encoding (URL encoding)** is used for encoding special characters in URLs. It represents each non-alphanumeric byte as %XX, where XX is the hexadecimal representation of the byte. While not strictly a binary-to-text encoding like Base64, it serves a similar purpose of making binary or special data safe for transmission through text-based protocols.`,
      code: `// Comparison of encoding sizes for "Hello World" (11 bytes)
const text = "Hello World";

console.log("Original length:", text.length); // 11

console.log("Base64:", btoa(text).length);    // 16 (~45% increase)
console.log("Hex:", [...text].map(c => 
  c.charCodeAt(0).toString(16).padStart(2, '0')
).join('').length); // 22 (100% increase)

// Base64 is the most space-efficient general-purpose encoding`,
    },
    {
      heading: 'Security Considerations',
      id: 'security',
      content: `One of the most dangerous misconceptions about Base64 is that it provides encryption or security. This is completely false. Base64 is an encoding scheme, not an encryption algorithm. It uses no key, no mathematical transformation, and no secret. Anyone with access to a Base64 string can decode it instantly using tools available in every programming language.

A common security anti-pattern is using Base64 to "hide" sensitive data like API keys, passwords, or personal information in client-side code. This provides zero security. Base64-obscured data is essentially plaintext. If an attacker inspects network traffic, views page source, or examines JavaScript bundles, they will see the Base64 strings and can decode them trivially. For actual security, use proper encryption algorithms like AES or RSA, or rely on HTTPS for data in transit.

Base64 can indirectly cause security issues in specific contexts. For example, Base64-encoded data injected into HTML contexts can sometimes bypass input filters that look for raw malicious patterns. Similarly, Base64-encoded URLs in redirect parameters can be used to obscure the actual destination. Security scanners and WAFs (Web Application Firewalls) need to be configured to decode and inspect Base64 content.

When working with Base64 and user input, be aware of injection risks. Always validate and sanitize data before encoding, and never trust Base64-decoded data without validation. Malicious payloads can be hidden in Base64 strings, and decoding them without proper validation can lead to injection attacks such as XSS (Cross-Site Scripting) or SQL injection.`,
    },
    {
      heading: 'Practical Examples in JavaScript',
      id: 'practical-examples',
      content: `Let us explore practical Base64 encoding and decoding examples that you will encounter in real-world web development. These examples cover the most common scenarios and include proper error handling.

Browser environments provide two built-in functions for Base64 operations: btoa() for encoding (Binary to ASCII) and atob() for decoding (ASCII to Binary). These functions work with strings only, so for binary data like images or files, you need to handle the conversion through ArrayBuffer and Uint8Array. Here is a comprehensive example showing common operations:`,
      code: `// Basic string encoding/decoding
const original = "Hello, Developer Tools!";
const encoded = btoa(original);
const decoded = atob(encoded);

console.log(encoded); // "SGVsbG8sIERldmVsb3BlciBUb29scyE="
console.log(decoded); // "Hello, Developer Tools!"

// Encoding a file to Base64 (e.g., for upload preview)
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Decoding Base64 to Uint8Array (for binary data)
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes;
}

// URL-safe Base64 encoding
function toBase64URL(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64URL(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return atob(base64);
}`,
    },
    {
      heading: 'Common Pitfalls and How to Avoid Them',
      id: 'pitfalls',
      content: `Over years of working with Base64 in production systems, several common pitfalls repeatedly cause issues for developers. Being aware of these will save you significant debugging time.

**Unicode handling** is the most frequent source of Base64 errors. The btoa() function in browsers only works with Latin1 characters (single-byte). If you try to encode a string containing Unicode characters like emojis, Chinese characters, or accented letters, btoa() will throw a DOMException. The solution is to first encode the string as UTF-8 bytes before converting to Base64. In modern browsers, you can use TextEncoder for this purpose.

**Padding errors** occur when Base64 strings are truncated or have incorrect padding. Base64 output length must be a multiple of 4, with = characters used as padding. If you strip the padding (as is common with URL-safe Base64), you must add it back before decoding. Missing or incorrect padding will cause atob() to throw an error.

**Line breaks in encoded data** can cause issues when Base64 data is stored or transmitted. Some Base64 implementations insert line breaks every 76 characters (as specified in MIME). These line breaks are not part of the encoded data and must be stripped before decoding. If you encounter decoding errors with data from email or other MIME sources, check for and remove line break characters first.

**Large file handling** can cause memory issues when encoding or decoding large files entirely in memory. For files larger than a few megabytes, consider using streaming approaches that process data in chunks rather than loading everything into memory at once. In Node.js, you can use buffer streams for this purpose.`,
      code: `// Safe Base64 encoding that handles Unicode
function safeBase64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary);
}

function safeBase64Decode(base64: string): string {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// These handle Unicode correctly
console.log(safeBase64Encode("\u{1F680} Rocket!")); // emoji safe
console.log(safeBase64Decode(safeBase64Encode("\u{1F680} Rocket!")));`,
    },
  ],
};

const allPosts = [jsonPostContent, base64PostContent];

export default function BlogPost({ slug: slugProp }: BlogPostProps) {
  const { currentPage, navigate } = useNav();
  const slug = slugProp || (currentPage.type === 'blog-post' ? currentPage.slug : null);

  const postData = useMemo(() => {
    return allPosts.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    return allPosts.filter((p) => p.slug !== slug);
  }, [slug]);

  const relatedTool = useMemo(() => {
    if (!postData) return null;
    return getToolBySlug(postData.relatedToolId);
  }, [postData]);

  const tableOfContents = postData
    ? postData.sections.map((s) => ({ heading: s.heading, id: s.id }))
    : [];

  if (!postData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0E27]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Post Not Found</h1>
          <p className="mt-2 text-[#94A3B8]">The blog post you are looking for does not exist.</p>
          <button
            onClick={() => navigate({ type: 'blog' })}
            className="mt-6 inline-flex items-center gap-2 text-[#00D9FF] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {/* Top Bar */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate({ type: 'blog' })}
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-[#A78BFA]/10 px-3 py-0.5 text-xs font-medium text-[#A78BFA]">
            {postData.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] sm:text-4xl lg:text-5xl">
            {postData.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[#94A3B8]">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {postData.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {postData.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area with Sidebar TOC */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-10 lg:flex-row flex-col">
          {/* Table of Contents - Sidebar on desktop, inline on mobile */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                <List className="h-4 w-4" />
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-md px-3 py-1.5 text-sm text-[#94A3B8] transition-colors hover:bg-[#1A1F3A] hover:text-[#00D9FF]"
                  >
                    {item.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article Body */}
          <article className="min-w-0 flex-1 max-w-3xl">
            {/* Mobile TOC */}
            <div className="mb-8 lg:hidden rounded-lg border border-[#334155] bg-[#1A1F3A] p-4">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                <List className="h-4 w-4" />
                Table of Contents
              </h3>
              <nav className="flex flex-wrap gap-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-md bg-[#0A0E27] px-3 py-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#00D9FF]"
                  >
                    {item.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Sections */}
            {postData.sections.map((section) => (
              <section key={section.id} className="mb-10">
                <h2
                  id={section.id}
                  className="mb-4 text-2xl font-bold text-[#F1F5F9] scroll-mt-24"
                >
                  {section.heading}
                </h2>
                {section.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-base leading-relaxed text-[#94A3B8]"
                    dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F1F5F9]">$1</strong>')
                        .replace(/`(.+?)`/g, '<code class="rounded bg-[#1A1F3A] px-1.5 py-0.5 text-sm font-mono text-[#00D9FF]">$1</code>'),
                    }}
                  />
                ))}
                {section.code && <CodeBlock><pre>{section.code}</pre></CodeBlock>}
              </section>
            ))}

            {/* CTA */}
            {relatedTool && (
              <div className="my-12 rounded-xl border border-[#334155] bg-gradient-to-br from-[#1A1F3A] to-[#0F172A] p-8 text-center">
                <h3 className="text-xl font-bold text-[#F1F5F9]">Try it now</h3>
                <p className="mt-2 text-[#94A3B8]">
                  Put what you learned into practice with our{' '}
                  <span className="text-[#00D9FF]">{relatedTool.name}</span>.
                </p>
                <button
                  onClick={() => navigate({ type: 'tool', toolId: relatedTool.id })}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#00D9FF] px-6 py-2.5 text-sm font-semibold text-[#0F172A] transition-all hover:bg-[#00D9FF]/80"
                >
                  Open {relatedTool.name}
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 border-t border-[#334155] pt-10">
                <h3 className="mb-6 text-xl font-bold text-[#F1F5F9]">Related Posts</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedPosts.map((post) => (
                    <button
                      key={post.slug}
                      onClick={() => navigate({ type: 'blog-post', slug: post.slug })}
                      className="group flex flex-col rounded-lg border border-[#334155] bg-[#1A1F3A] p-5 text-left transition-all hover:border-[#00D9FF]/40"
                    >
                      <span className="text-xs font-medium text-[#A78BFA]">
                        {post.category}
                      </span>
                      <h4 className="mt-1 text-sm font-semibold text-[#F1F5F9] group-hover:text-[#00D9FF] transition-colors">
                        {post.title}
                      </h4>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#94A3B8]">
                        Read more <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
