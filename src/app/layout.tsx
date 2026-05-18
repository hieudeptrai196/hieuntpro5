import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { FramerProvider } from "@/components/providers/FramerProvider";
import { Analytics } from "@vercel/analytics/react";

const display = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-stack",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-spiegel",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"], // mono font — không cần Vietnamese subset
  variable: "--font-jetbrains",
  display: "swap",
});

const ogTitle = `${siteConfig.name} — ${siteConfig.title}`;
const ogDescription = siteConfig.summary;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: ogTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: ogDescription,
  keywords: [
    "Backend Developer", "Node.js", "NestJS", "PHP", "Laravel",
    "Nguyễn Thọ Hiếu", "Software Engineer", "PostgreSQL", "Redis",
    "RabbitMQ", "High-performance systems", "Fullstack",
    "VNPT - Vietnam Posts and Telecommunications Group", "Newwave Solutions",
    "hieunt.site",
  ],
  verification: {
    google: "PASTE_YOUR_VERIFICATION_CODE_HERE", // ← thay bằng code từ Search Console
  },
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    url: siteConfig.siteUrl,
    title: ogTitle,
    description: ogDescription,
    siteName: siteConfig.name,
    firstName: "Hiếu",
    lastName: "Nguyễn Thọ",
    username: "hieunt",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/opengraph-image"],
    creator: "@hieunt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "msapplication-TileImage", url: "/logo.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#010a13",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD Person schema — helps Google understand this is a developer profile */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Backend Developer",
  description: siteConfig.summary,
  url: siteConfig.siteUrl,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  image: "https://cdn.hieunt.site/avatar.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanoi",
    addressCountry: "VN",
  },
  sameAs: [siteConfig.linkedin],
  worksFor: {
    "@type": "Organization",
    name: "VNPT - Vietnam Posts and Telecommunications Group",
    url: "https://vnpt.com.vn",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Electric Power University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hanoi",
      addressCountry: "VN",
    },
  },
  knowsAbout: [
    "Node.js", "NestJS", "PHP", "Laravel", "CakePHP",
    "PostgreSQL", "MySQL", "Redis", "RabbitMQ",
    "ReactJS", "Next.js", "Angular",
    "RESTful API", "GraphQL", "WebSocket",
    "System Design", "High-performance Systems",
    "AI Chatbot Integration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        {/* Apple PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="NTH Dev" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Tắt auto-detect số điện thoại trên iOS — tránh gạch chân số ngẫu nhiên */}
        <meta name="format-detection" content="telephone=no" />
        {/* Windows pin to taskbar */}
        <meta name="msapplication-TileColor" content="#010a13" />
        {/* CDN preconnect — giảm latency cho mọi request đến cdn.hieunt.site */}
        <link rel="preconnect" href="https://cdn.hieunt.site" />
        {/* Preload ảnh hero (LCP element) — browser tải trước khi render */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.hieunt.site/avatar.jpg"
          // @ts-expect-error fetchpriority is valid HTML but not yet in TS lib
          fetchpriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <div className="grain" aria-hidden />
        <FramerProvider>{children}</FramerProvider>
        <Analytics />
      </body>
    </html>
  );
}
