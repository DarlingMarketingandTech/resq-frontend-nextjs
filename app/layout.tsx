import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "ResQ Organics — Therapeutic Skincare for Humans & Pets",
  description:
    "Premium natural skincare powered by Medical-Grade Manuka Honey, Organic Aloe Vera, and Full-Spectrum CBD. Healing for the whole family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-text">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
