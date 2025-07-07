import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./design-variables.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { WebsiteStructuredData } from '@/components/StructuredData'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Mono-Logue - 技術と日常をつなぐブログ",
  description: "技術の視点から日常を見つめ直し、新しい発見や学びを共有するブログです。プログラミング、テクノロジー、そして生活の中の気づきをお届けします。",
  keywords: ["ブログ", "テクノロジー", "プログラミング", "日常", "技術", "学び", "発見"],
  authors: [{ name: "Mono-Logue", url: "http://localhost:3000" }],
  creator: "Mono-Logue",
  publisher: "Mono-Logue",
  openGraph: {
    title: "Mono-Logue - 技術と日常をつなぐブログ",
    description: "技術の視点から日常を見つめ直し、新しい発見や学びを共有するブログです。",
    url: "http://localhost:3000",
    siteName: "Mono-Logue",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Mono-Logue - 技術と日常をつなぐブログ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mono-Logue - 技術と日常をつなぐブログ",
    description: "技術の視点から日常を見つめ直し、新しい発見や学びを共有するブログです。",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/icon.svg?v=2', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{backgroundColor: 'var(--color-background)'}}
      >
        <WebsiteStructuredData 
          url="http://localhost:3000"
          name="Mono-Logue - 技術と日常をつなぐブログ"
          description="技術の視点から日常を見つめ直し、新しい発見や学びを共有するブログです。"
        />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
