import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://devtoolshub-gamma.vercel.app"),

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
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 400,
        alt: "DevToolsHub - Free Developer Tools",
      },
    ],
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

  verification: {
    google: "opnSBkMTfuV7bTgd9fDnuAj48fQxvrOV8TYE5npHmvE",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevToolsHub",
  url: "https://devtoolshub-gamma.vercel.app",
  description:
    "50+ free developer tools that work instantly in your browser.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevToolsHub",
  url: "https://devtoolshub-gamma.vercel.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2417922947310859"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}