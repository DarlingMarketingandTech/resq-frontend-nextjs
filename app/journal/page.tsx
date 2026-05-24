// app/journal/page.tsx
// Journal index page — RSC, ISR at 1-hour cadence.
//
// CURRENT STATE (Phase 2 stub):
//   - Renders the editorial shell and a placeholder grid.
//   - Data fetching via `getJournalPosts()` (lib/journal-api.ts) is wired in
//     Phase 1, Task 1.4. Until that module exists, this page renders a static
//     placeholder section so the route is visitable and the layout is confirmed.
//
// PHASE 3 INTEGRATION:
//   - Uncomment the `getJournalPosts` import and replace the placeholder grid
//     with `<JournalGrid posts={posts} />` once lib/journal-api.ts lands.

import type { Metadata } from 'next';

// ---------------------------------------------------------------------------
// ISR — editorial content changes hourly, not in real-time
// ---------------------------------------------------------------------------
export const revalidate = 3600;

// ---------------------------------------------------------------------------
// Static metadata (spec Section 5.2, index variant)
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Wellness Journal | ResQ Organics — Natural Skincare & Pet Wellness Education',
  description:
    'Explore in-depth guides on Manuka Honey science, CBD education, and holistic pet wellness. Evidence-based editorial from the ResQ Organics team.',
  openGraph: {
    title: 'Wellness Journal | ResQ Organics',
    description:
      'In-depth guides on Manuka Honey, CBD, and holistic pet wellness.',
    type: 'website',
    images: [
      {
        url: '/og-journal-index.jpg',
        width: 1200,
        height: 630,
        alt: 'The ResQ Organics Wellness Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Journal | ResQ Organics',
    description: 'In-depth guides on Manuka Honey, CBD, and holistic pet wellness.',
  },
  alternates: {
    canonical: '/journal',
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function JournalIndexPage() {
  // TODO (Phase 1.4): Replace with live data once lib/journal-api.ts is built.
  // const posts = await getJournalPosts({ first: 12 });

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-12 md:px-10 lg:py-16">

      {/* ---- Journal Masthead ---- */}
      <header className="mb-12 border-b border-[#E8E4DC] pb-10">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#C8963E]">
          The Wellness Journal
        </p>
        <h1 className="font-cabinet text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-[#1A1A18]">
          Learn. Understand. Heal.
        </h1>
        <p className="mt-4 max-w-[600px] font-sans text-lg text-[#666660]">
          Evidence-based guides on Manuka Honey science, CBD education, and
          holistic wellness — written for the curious, not the credentialed.
        </p>

        {/* Topic filter pills */}
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter by topic">
          {[
            { label: 'All Topics', href: '/journal', active: true },
            { label: 'Manuka Honey', href: '/journal/topic/manuka-honey' },
            { label: 'CBD Education', href: '/journal/topic/cbd-education' },
            { label: 'Pet Wellness', href: '/journal/topic/pet-wellness' },
            { label: 'Skin Science', href: '/journal/topic/skin-science' },
            { label: 'Ingredient Deep-Dives', href: '/journal/topic/ingredient-deep-dive' },
            { label: 'Wellness Lifestyle', href: '/journal/topic/wellness-lifestyle' },
          ].map(({ label, href, active }) => (
            <a
              key={href}
              href={href}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? 'bg-[#1A1A18] text-white'
                  : 'bg-[#F0EDE6] text-[#3D3D3A] hover:bg-[#1A1A18] hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ---- Article Grid (Phase 2 placeholder — replaced with <JournalGrid /> in Phase 1.4) ---- */}
      <section aria-label="Journal articles">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Skeleton placeholder cards shown until real data is wired */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#E8E4DC] bg-white"
              aria-hidden="true"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/9] w-full animate-pulse bg-[#F0EDE6]" />
              {/* Content placeholder */}
              <div className="p-5">
                <div className="mb-3 h-5 w-24 animate-pulse rounded-full bg-[#F0EDE6]" />
                <div className="mb-2 h-6 w-full animate-pulse rounded bg-[#F0EDE6]" />
                <div className="mb-1 h-4 w-full animate-pulse rounded bg-[#F5F2EE]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#F5F2EE]" />
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-[#F0EDE6]" />
                  <div className="h-4 w-28 animate-pulse rounded bg-[#F5F2EE]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wire-up notice — visible only in development */}
        {process.env.NODE_ENV === 'development' && (
          <p className="mt-10 rounded-lg bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
            <strong>Phase 2 stub:</strong> Article cards will populate once{' '}
            <code className="rounded bg-amber-100 px-1">lib/journal-api.ts</code> is
            implemented in Phase 1, Task 1.4.
          </p>
        )}
      </section>
    </div>
  );
}
