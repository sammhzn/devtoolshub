import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtoolshub.tk';
  const tools = [
    'json-formatter', 'base64-encoder', 'hash-generator', 'url-encoder', 'uuid-generator',
    'html-encoder', 'markdown-preview', 'text-diff', 'word-counter', 'case-converter',
    'regex-tester', 'text-wrapper', 'password-generator', 'password-strength', 'hmac-generator',
    'bcrypt-generator', 'timestamp-converter', 'date-calculator', 'color-converter',
    'base-converter', 'percentage-calculator', 'json-to-csv', 'qr-code-generator',
    'url-parser', 'jwt-decoder', 'image-to-base64', 'email-validator', 'lorem-ipsum', 'minify-json',
  ];
  
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog/complete-guide-to-json-formatting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/understanding-base64-encoding`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...toolPages,
  ];
}