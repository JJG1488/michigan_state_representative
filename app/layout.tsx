import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Candace Calloway for State Representative | Lead with Hope",
    template: "%s | Candace Calloway for State Representative",
  },
  description:
    "Candace Calloway for Michigan State House Representative — Lead with Hope. Fighting for affordability, education, and safe infrastructure in NW Detroit, Oak Park, and Royal Oak Township.",
  keywords: [
    "Candace Calloway",
    "Michigan State Representative",
    "NW Detroit",
    "Oak Park",
    "Royal Oak Township",
    "Democratic candidate",
    "Lead with Hope",
    "affordability",
    "education",
    "infrastructure",
  ],
  openGraph: {
    title: "Candace Calloway for State Representative | Lead with Hope",
    description:
      "Fighting for affordability, education, and safe infrastructure in NW Detroit, Oak Park, and Royal Oak Township.",
    url: "https://votecandacecalloway.com",
    siteName: "Vote Candace Calloway",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candace Calloway for State Representative",
    description:
      "Lead with Hope — Fighting for affordability, education, and safe infrastructure.",
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
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="pt-16 sm:pt-20 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
