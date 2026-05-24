// components/journal/JournalGrid.tsx
// Responsive article grid for the Wellness Journal.
//
// Wraps a JournalListItem[] array and renders a JournalCard for each item
// in a 1-col → 2-col → 3-col responsive Tailwind grid.
//
// Includes:
//   - Empty state (no articles in this topic/category)
//   - Optional section heading (used on topic and category pages)
//   - First two cards receive `priority` for LCP optimization

import type { JournalListItem } from '@/types/journal';
import JournalCard from './JournalCard';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface JournalGridProps {
  posts: JournalListItem[];
  /**
   * Optional heading rendered above the grid.
   * When omitted the grid renders with no header (used on the index page
   * where the heading lives in the parent layout).
   */
  heading?: string;
  /**
   * Additional Tailwind classes for external layout overrides (e.g. max-w).
   */
  className?: string;
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
      {/* Decorative leaf icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="text-[#D4C9B8] opacity-80"
      >
        <path
          d="M24 6C24 6 10 14 10 28c0 7.732 6.268 14 14 14s14-6.268 14-14C38 14 24 6 24 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M24 6v36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p className="font-cabinet text-[1.125rem] font-semibold text-[#888885]">
        No articles here yet
      </p>
      <p className="font-sans text-[0.875rem] text-[#AAAAAA] max-w-xs">
        Check back soon — new content is added regularly.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JournalGrid({
  posts,
  heading,
  className = '',
}: JournalGridProps) {
  return (
    <section className={['w-full', className].filter(Boolean).join(' ')}>
      {heading && (
        <h2 className="font-cabinet text-[1.75rem] font-bold text-[#1A1A18] mb-8 leading-tight">
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          posts.map((post, index) => (
            <JournalCard
              key={post.id}
              post={post}
              // First two cards are likely above the fold on desktop — prioritize
              priority={index < 2}
            />
          ))
        )}
      </div>
    </section>
  );
}
