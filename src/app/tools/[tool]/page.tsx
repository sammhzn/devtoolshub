import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { NavigationProvider } from '@/lib/navigation';

import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Encoder from '@/components/tools/Base64Encoder';
import HashGenerator from '@/components/tools/HashGenerator';
import UrlEncoder from '@/components/tools/UrlEncoder';
import UuidGenerator from '@/components/tools/UuidGenerator';

const tools = {
  'json-formatter': {
    title: 'JSON Formatter & Validator Online | DevToolsHub',
    description:
      'Format, validate, beautify, and minify JSON online for free. Check JSON syntax and make JSON easier to read directly in your browser.',
    Component: JsonFormatter,
  },

  'base64-encoder': {
    title: 'Base64 Encoder & Decoder Online | DevToolsHub',
    description:
      'Encode text to Base64 or decode Base64 strings online for free. Supports UTF-8 text and file encoding.',
    Component: Base64Encoder,
  },

  'hash-generator': {
    title: 'Hash Generator Online | DevToolsHub',
    description:
      'Generate secure hashes online with our free hash generator. Quickly create hashes for your development and security workflows.',
    Component: HashGenerator,
  },

  'url-encoder': {
    title: 'URL Encoder & Decoder Online | DevToolsHub',
    description:
      'Encode and decode URLs online for free. Handle special characters, query parameters, and URL-safe text directly in your browser.',
    Component: UrlEncoder,
  },

  'uuid-generator': {
    title: 'UUID Generator Online | DevToolsHub',
    description:
      'Generate UUIDs online for free. Create unique identifiers quickly for applications, databases, APIs, and development projects.',
    Component: UuidGenerator,
  },
} as const;

type ToolSlug = keyof typeof tools;

export function generateStaticParams() {
  return Object.keys(tools).map((tool) => ({
    tool,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;

  if (!(tool in tools)) {
    return {};
  }

  const data = tools[tool as ToolSlug];

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/tools/${tool}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `/tools/${tool}`,
      type: 'website',
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;

  if (!(tool in tools)) {
    notFound();
  }

  const { Component } = tools[tool as ToolSlug];

  return (
    <NavigationProvider>
      <Component />
    </NavigationProvider>
  );
}