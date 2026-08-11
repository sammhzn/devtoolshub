import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevToolsHub - 50+ Free Developer Tools Online",
  description:
    "Free online developer tools including JSON formatter, Base64 encoder, hash generator, URL encoder, UUID generator and more. No sign-up required.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "Base64 encoder",
    "hash generator",
    "URL encoder",
    "UUID generator",
    "online tools",
    "free developer utilities",
    "web development tools",
  ],
  authors: [{ name: "DevToolsHub Team" }],
  openGraph: {
    title: "DevToolsHub - 50+ Free Developer Tools Online",
    description:
      "Free online developer tools including JSON formatter, Base64 encoder, hash generator, URL encoder, UUID generator and more. No sign-up required.",
    url: "https://devtoolshub-gamma.vercel.app",
    siteName: "DevToolsHub",
    type: "website",
    images: [{ url: "https://devtoolshub-gamma.vercel.app/og-image.png", width: 800, height: 400, alt: "DevToolsHub - Free Developer Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolsHub - 50+ Free Developer Tools Online",
    description:
      "Free online developer tools. JSON formatter, Base64 encoder, hash generator and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://devtoolshub-gamma.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="opnSBkMTfuV7bTgd9fDnuAj48fQxvrOV8TYE5npHmvE" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2417922947310859"
     crossorigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DevToolsHub",
              url: "https://devtoolshub-gamma.vercel.app",
              description: "50+ free developer tools that work instantly in your browser.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevToolsHub",
              url: "https://devtoolshub-gamma.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://devtoolshub-gamma.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
