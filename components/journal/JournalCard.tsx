// components/journal/JournalCard.tsx
// Editorial grid card for the Wellness Journal.
//
// Accepts a JournalListItem (list-view shape — no `content` field).
// Used by JournalGrid on the /journal index and topic/category pages.
//
// Visual stack (top → bottom):
//   1. Featured image banner — 16:9, Next.js Image, graceful placeholder
//   2. Topic pill badge (JournalTopicPill)
//   3. Headline — Cabinet Grotesk, clamp to 2 lines
//   4. Excerpt — Inter, clamp to 2 lines
//   5. Byline — author · formatted date · read time
//   6. "Read Article →" link (fills entire card via absolute overlay for hit area)

import Image from 'next/image';
import Link from 'next/link';
import type { JournalListItem } from '@/types/journal';
import JournalTopicPill from './JournalTopicPill';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format an ISO 8601 date string to a human-readable short form.
 * e.g. "2026-05-23T00:00:00" → "May 23, 2026"
 * Safe to call on the server — uses Intl.DateTimeFormat (no locale mismatch
 * because we pass `timeZone: 'UTC'` and an explicit locale).
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month:    'long',
    day:      'numeric',
    year:     'numeric',
    timeZone: 'UTC',
  }).format(date);
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface JournalCardProps {
  post: JournalListItem;
  /** Optional priority hint — pass true for above-the-fold cards (LCP). */
  priority?: boolean;
  /** Additional Tailwind classes for external layout overrides. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JournalCard({
  post,
  priority = false,
  className = '',
}: JournalCardProps) {
  const articleHref = `/journal/${post.slug}`;

  return (
    <article
      className={[
        // Card shell
        'group relative flex flex-col',
        'rounded-2xl overflow-hidden',
        'bg-white border border-[#EFEFEC]',
        // Lift on hover — editorial feel
        'transition-shadow duration-300 ease-out',
        'hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Featured image — 16:9 aspect ratio                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full aspect-[16/9] bg-[#F0EDE8] flex-shrink-0 overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.sourceUrl}
            alt={post.featuredImage.altText ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          // Placeholder — warm brand-tinted gradient when no image is set
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#F5EEE4] via-[#EDE8DF] to-[#E2DDD4]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2–6. Card body                                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Topic pill */}
        <div>
          <JournalTopicPill topic={post.topic} asLink={false} />
        </div>

        {/* Headline — Cabinet Grotesk, clamped to 2 lines */}
        <h2 className="font-cabinet text-[1.0625rem] font-bold leading-snug text-[#1A1A18] line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt — clamped to 2 lines */}
        <p className="font-sans text-[0.875rem] leading-relaxed text-[#555552] line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          {/* Author avatar */}
          {post.author.avatarUrl ? (
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              width={24}
              height={24}
              className="rounded-full flex-shrink-0 object-cover"
              sizes="24px"
            />
          ) : (
            // Initials fallback
            <span
              className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#C8A96E] text-white text-[0.5625rem] font-semibold flex-shrink-0"
              aria-hidden="true"
            >
              {post.author.name.charAt(0).toUpperCase()}
            </span>
          )}

          <span className="font-sans text-[0.75rem] text-[#888885] leading-none">
            {post.author.name}
          </span>

          {/* Dot separator */}
          <span className="text-[#CCCCC8] text-[0.75rem] leading-none" aria-hidden="true">·</span>

          <time
            dateTime={post.date}
            className="font-sans text-[0.75rem] text-[#888885] leading-none"
          >
            {formatDate(post.date)}
          </time>

          <span className="text-[#CCCCC8] text-[0.75rem] leading-none" aria-hidden="true">·</span>

          <span className="font-sans text-[0.75rem] text-[#888885] leading-none">
            {post.readTimeMinutes} min read
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Absolute overlay link — full card is the click target               */}
      {/* Visible "Read Article →" label is in the bottom-right corner       */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-5 pb-5">
        <span className="inline-flex items-center gap-1 font-sans text-[0.8125rem] font-semibold text-[#C8963E] transition-colors duration-150 group-hover:text-[#A87530]">
          Read Article
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            <path
              d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Full-card anchor overlay — sits on top of all content */}
      <Link
        href={articleHref}
        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8963E] focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`Read article: ${post.title}`}
      />
    </article>
  );
}
