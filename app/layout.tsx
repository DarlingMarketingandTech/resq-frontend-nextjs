import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResQ Organics | Natural Healing Skincare",
  description: "Premium Manuka Honey and holistic wellness solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAFA] text-[#1A1A18] antialiased flex flex-col min-h-screen">
        {/* The global sticky header sits permanently at the top */}
        <Header />

        {/* Main layout container pushes down so content isn't hidden under fixed header */}
        <main className="flex-1 pt-24">
          {children}
        </main>

        {/* Cart Drawer - accessible from anywhere */}
        <CartDrawer />

        {/* Preserved the existing footer */}
        <SiteFooter />

        {/* Toast notifications for user feedback */}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
