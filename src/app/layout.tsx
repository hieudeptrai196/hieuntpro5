import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

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
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  keywords: [
    "Backend Developer", "Node.js", "NestJS", "PHP", "Laravel",
    "Nguyễn Thọ Hiếu", "Software Engineer",
    "VNPT - Vietnam Posts and Telecommunications Group", "Newwave Solutions",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.summary,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#010a13",
  width: "device-width",
  initialScale: 1,
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
      <body className="min-h-screen">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
