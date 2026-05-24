// components/journal/JournalTopicPill.tsx
// Reusable topic badge for the Wellness Journal.
//
// Renders as an <a> anchor when `href` is provided (navigable pill link)
// or a plain <span> when used as a purely presentational label.
//
// Each JournalTopic value maps to a distinct warm, wellness-coded color pair
// (background + text) as defined in spec Section 3.4.

import Link from 'next/link';
import type { JournalTopic } from '@/types/journal';

// ---------------------------------------------------------------------------
// Topic → color token map
// ---------------------------------------------------------------------------
// Colors are inlined as Tailwind arbitrary values so they match the spec
// tokens exactly without requiring a Tailwind config extension.
// Each entry: [bgClass, textClass, hoverBgClass, activeBorderClass]

interface TopicStyle {
  bg: string;
  text: string;
  hoverBg: string;
  dot: string;          // small accent dot color
  label: string;        // human-readable display label
}

const TOPIC_STYLES: Record<JournalTopic, TopicStyle> = {
  'manuka-honey': {
    bg:      'bg-[#FBF3E4]',
    text:    'text-[#8A6420]',
    hoverBg: 'hover:bg-[#F5E7C8]',
    dot:     'bg-[#C8963E]',
    label:   'Manuka Honey',
  },
  'cbd-education': {
    bg:      'bg-[#EDF4EF]',
    text:    'text-[#3A6344]',
    hoverBg: 'hover:bg-[#D9ECDE]',
    dot:     'bg-[#6B8F71]',
    label:   'CBD Education',
  },
  'pet-wellness': {
    bg:      'bg-[#FAF0EC]',
    text:    'text-[#7A3E2A]',
    hoverBg: 'hover:bg-[#F5E0D8]',
    dot:     'bg-[#B5654A]',
    label:   'Pet Wellness',
  },
  'skin-science': {
    bg:      'bg-[#EAF2F5]',
    text:    'text-[#2A5C6E]',
    hoverBg: 'hover:bg-[#D4E8EF]',
    dot:     'bg-[#4A7B8F]',
    label:   'Skin Science',
  },
  'ingredient-deep-dive': {
    bg:      'bg-[#ECF1EE]',
    text:    'text-[#2A4038]',
    hoverBg: 'hover:bg-[#D8E5DC]',
    dot:     'bg-[#3D5A4C]',
    label:   'Ingredient Deep-Dive',
  },
  'wellness-lifestyle': {
    bg:      'bg-[#F5EEF0]',
    text:    'text-[#5C3A42]',
    hoverBg: 'hover:bg-[#EBDDE2]',
    dot:     'bg-[#8F6B72]',
    label:   'Wellness Lifestyle',
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface JournalTopicPillProps {
  topic: JournalTopic;
  /**
   * When provided, the pill renders as a Next.js <Link>.
   * Defaults to `/journal/topic/{topic}` if `href` is omitted but
   * `asLink` is true.
   */
  href?: string;
  /** Render as a clickable link. Defaults to true when `href` is provided. */
  asLink?: boolean;
  /** Mark this pill as the currently active/selected topic filter. */
  active?: boolean;
  /** Additional Tailwind classes for layout overrides. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JournalTopicPill({
  topic,
  href,
  asLink = !!href,
  active = false,
  className = '',
}: JournalTopicPillProps) {
  const style = TOPIC_STYLES[topic];
  const resolvedHref = href ?? `/journal/topic/${topic}`;

  const pillClasses = [
    // Layout
    'inline-flex items-center gap-1.5',
    // Shape & spacing
    'rounded-full px-3 py-1',
    // Typography — spec: Inter SemiBold, 0.75rem, uppercase, tracked
    'font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
    // Colors
    style.bg,
    style.text,
    // Active ring
    active ? 'ring-1 ring-current ring-offset-1' : '',
    // Transitions
    'transition-all duration-150 ease-in-out',
    // Hover (only meaningful when asLink)
    asLink ? `${style.hoverBg} cursor-pointer` : 'cursor-default',
    // Focus visible (accessibility)
    asLink ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {/* Accent dot — matches topic brand color */}
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 ${style.dot}`}
        aria-hidden="true"
      />
      {style.label}
    </>
  );

  if (asLink) {
    return (
      <Link href={resolvedHref} className={pillClasses}>
        {inner}
      </Link>
    );
  }

  return (
    <span className={pillClasses} aria-label={`Topic: ${style.label}`}>
      {inner}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Named export of the style map — used by JournalCard for dot-only rendering
// ---------------------------------------------------------------------------
export { TOPIC_STYLES };
export type { TopicStyle };
