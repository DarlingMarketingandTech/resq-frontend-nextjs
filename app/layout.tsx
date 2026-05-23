import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "RESQ Headless WooCommerce Storefront",
  description: "Production-ready Next.js 16 + WooCommerce + WPGraphQL starter storefront.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
