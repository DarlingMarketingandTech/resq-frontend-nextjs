// components/journal/JournalContentRenderer.tsx
// React Server Component — editorial prose renderer for Wellness Journal articles.
//
// Receives pre-parsed content segments from `parseJournalContent()` and renders them
// as a seamless editorial document: rich HTML prose interleaved with shoppable
// product callout cards.
//
// SAFETY NOTE (audit flag RF-14):
//   All `html` segment payloads have already been processed by `stripDangerousTags()`
//   in the parser. We apply a second defensive strip here at the render boundary
//   to guard against any segment payloads constructed outside the parser path.
//   This double-fence approach means a single bypass in either layer cannot result
//   in a script injection reaching `dangerouslySetInnerHTML`.

import { stripDangerousTags } from '@/lib/journal-content-parser';
import type { ContentSegment } from '@/types/journal';

// ---------------------------------------------------------------------------
// ArticleProductCallout placeholder
// ---------------------------------------------------------------------------
// This is a structural placeholder for Phase 3, Task 3.5 which implements the
// full RSC data-fetching component. It renders a visually distinct slot so
// editors can verify callout placement during development without needing live
// product data wired up.
//
// When Task 3.5 is complete, replace this with:
//   import { ArticleProductCallout } from '@/components/journal/ArticleProductCallout';

interface ArticleProductCalloutProps {
  productSlug: string;
}

function ArticleProductCallout({ productSlug }: ArticleProductCalloutProps) {
  return (
    <aside
      className="my-8 rounded-xl border border-[#E8E4DC] bg-[#F5F0E8] px-6 py-5 shadow-sm"
      aria-label={`Product callout: ${productSlug}`}
    >
      <p className="font-cabinet text-sm font-semibold uppercase tracking-widest text-[#888]">
        Featured Product
      </p>
      <p className="mt-1 font-cabinet text-base font-bold text-[#1A1A18]">
        {/* Slug surfaced as-is until ArticleProductCallout RSC is wired up in Phase 3.5 */}
        {productSlug}
      </p>
      <p className="mt-1 text-xs text-[#666660]">
        Product data loads via <code>ArticleProductCallout</code> in Phase 3.5
      </p>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface JournalContentRendererProps {
  /** Ordered segments produced by parseJournalContent() */
  segments: ContentSegment[];
}

// ---------------------------------------------------------------------------
// Renderer — React Server Component (no 'use client' directive)
// ---------------------------------------------------------------------------

export default function JournalContentRenderer({
  segments,
}: JournalContentRendererProps) {
  if (!segments || segments.length === 0) {
    return null;
  }

  return (
    <div className="journal-content-root">
      {segments.map((segment, index) => {
        if (segment.type === 'product-callout') {
          return (
            <ArticleProductCallout
              key={`callout-${index}-${segment.payload}`}
              productSlug={segment.payload}
            />
          );
        }

        // type === 'html'
        // Apply a second-pass strip at the render boundary (audit RF-14 double-fence).
        const safeHtml = stripDangerousTags(segment.payload);

        return (
          <div
            key={`prose-${index}`}
            className="prose prose-stone max-w-none font-sans text-stone-800 leading-relaxed
              prose-headings:font-cabinet prose-headings:text-[#1A1A18]
              prose-h2:text-[1.75rem] prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-[1.25rem] prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[1.0625rem] prose-p:leading-[1.875]
              prose-a:text-[#C8963E] prose-a:underline prose-a:underline-offset-2
                hover:prose-a:text-[#A07530]
              prose-blockquote:border-l-4 prose-blockquote:border-[#C8963E]
                prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-[#3D3D3A]
              prose-img:rounded-lg prose-img:shadow-sm
              prose-figcaption:text-center prose-figcaption:text-[0.8125rem]
                prose-figcaption:text-[#888] prose-figcaption:mt-2
              prose-hr:border-[#E8E4DC]
              prose-strong:font-semibold prose-strong:text-[#1A1A18]
              prose-code:text-[0.875rem] prose-code:bg-[#F5F0E8]
                prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-code:before:content-none prose-code:after:content-none"
            // RF-14: safeHtml has passed through stripDangerousTags() twice —
            // once in the parser (source) and once above (render boundary).
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        );
      })}
    </div>
  );
}
