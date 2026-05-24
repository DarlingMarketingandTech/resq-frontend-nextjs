// types/journal.ts
// Data contract for the Wellness Journal editorial system.
// Mirrors the WordPress/WPGraphQL post schema as defined in spec Section 1.2.
// All fields are strict — no `any`. Nullable fields use `| null` explicitly.

export interface PostImage {
  sourceUrl: string;
  altText: string | null;
}

export interface PostAuthor {
  name: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface PostCategory {
  name: string;
  slug: string;
}

export interface PostSEO {
  title: string | null;
  metaDesc: string | null;
  ogImage: string | null;
}

/**
 * The six editorial topic buckets for the Wellness Journal.
 * These map directly to the WordPress ACF `journalMeta.topic` select field.
 * The values are kebab-case to match the WPGraphQL-exposed strings.
 */
export type JournalTopic =
  | 'manuka-honey'
  | 'cbd-education'
  | 'pet-wellness'
  | 'skin-science'
  | 'ingredient-deep-dive'
  | 'wellness-lifestyle';

/**
 * Full article shape — used on single-article pages (/journal/[slug]).
 * Includes `content` (raw Gutenberg HTML) which is omitted from list views.
 */
export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  /** ISO 8601 date string, e.g. "2026-05-23T00:00:00" */
  date: string;
  excerpt: string;
  /**
   * Raw HTML from Gutenberg renderer.
   * Must be passed through `parseJournalContent()` before rendering.
   * Never inject directly into the DOM without sanitization.
   */
  content: string;
  readTimeMinutes: number;
  topic: JournalTopic;
  featuredImage: PostImage | null;
  author: PostAuthor;
  categories: PostCategory[];
  relatedProductSlugs: string[];
  seo: PostSEO;
}

/**
 * Lightweight list-view shape — omits `content` for performance.
 * Used on /journal index, topic pages, category pages, and PDP related articles.
 */
export interface JournalListItem extends Omit<JournalPost, 'content'> {}

/**
 * A single parsed content segment produced by `parseJournalContent()`.
 * - `html`: a raw HTML string to render inside the prose wrapper
 * - `product-callout`: a product slug to hydrate via <ArticleProductCallout />
 */
export interface ContentSegment {
  type: 'html' | 'product-callout';
  payload: string;
}
