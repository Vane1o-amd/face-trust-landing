import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "A face worth trusting in 11 weeks",
  description:
    "A personal program for men who want to look expensive, confident and make a strong first impression.",
  openGraph: {
    title: "A face worth trusting in 11 weeks",
    description:
      "A personal program for men who want to look expensive, confident and make a strong first impression.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "A face worth trusting in 11 weeks",
    description:
      "A personal program for men who want to look expensive, confident and make a strong first impression.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
