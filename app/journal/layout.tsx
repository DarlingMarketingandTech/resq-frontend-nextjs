// app/journal/layout.tsx
// Editorial layout shell for the Wellness Journal subtree (/journal/**).
//
// SCOPE:
//   - Applies the warm off-white journal background (#FAFAF7) to all journal routes.
//   - Loads the Lora serif font via next/font/google and scopes it as a CSS variable
//     (`--font-lora`) available to all children and to the Tailwind v4 theme layer.
//   - Defines the max-width prose container class for editorial reading width.
//   - Does NOT modify the root app/layout.tsx — this is purely additive.
//   - The global <Header>, <CartDrawer>, and <SiteFooter> are inherited from
//     the root layout and render unchanged.

import type { ReactNode } from 'react';
import { Lora } from 'next/font/google';

// ---------------------------------------------------------------------------
// Lora web font — serif body for editorial reading mode
// ---------------------------------------------------------------------------
// Subsets: latin only (keeps bundle small; all ResQ content is English).
// Variable font axes: weight 400–700, supports normal + italic styles.
// CSS variable scoped to the journal subtree root element.

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

interface JournalLayoutProps {
  children: ReactNode;
}

export default function JournalLayout({ children }: JournalLayoutProps) {
  return (
    /*
     * The outer div:
     *   - Applies --font-lora CSS variable scope (consumed by Tailwind font-lora utility
     *     and inline `font-family: var(--font-lora)` declarations in prose overrides).
     *   - Sets the editorial background (#FAFAF7 — warm off-white, slightly warmer than
     *     the storefront's #FAFAFA to signal a distinct reading environment).
     *   - min-h-screen ensures the background fills short pages.
     */
    <div
      className={`${lora.variable} min-h-screen bg-[#FAFAF7]`}
      data-journal-layout="true"
    >
      {children}
    </div>
  );
}
