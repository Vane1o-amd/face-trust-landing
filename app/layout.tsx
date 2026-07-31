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
  title: "Лицо, которому доверяют за 11 недель",
  description:
    "Персональная программа для мужчин, которые хотят выглядеть дорого, уверенно и производить сильное первое впечатление.",
  openGraph: {
    title: "Лицо, которому доверяют за 11 недель",
    description:
      "Персональная программа для мужчин, которые хотят выглядеть дорого, уверенно и производить сильное первое впечатление.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "Лицо, которому доверяют за 11 недель",
    description:
      "Персональная программа для мужчин, которые хотят выглядеть дорого, уверенно и производить сильное первое впечатление.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
