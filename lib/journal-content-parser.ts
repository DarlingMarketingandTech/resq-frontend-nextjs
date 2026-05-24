// lib/journal-content-parser.ts
// Server-safe, dependency-free HTML content parser for the Wellness Journal.
//
// PURPOSE:
//   WordPress Gutenberg emits an HTML string for each article. Editors can
//   embed product callout markers using a custom ACF block that renders as:
//     <div data-product-callout="product-slug-here"></div>
//
//   This module splits the raw HTML string into an ordered array of segments
//   so the <JournalContentRenderer> RSC can interleave React-rendered product
//   cards into the prose flow — without any client-side JS or browser APIs.
//
// CONSTRAINTS (audit RF-14 compliance):
//   - Zero browser APIs: no DOMParser, document, window, etc.
//   - Zero heavy dependencies: no cheerio, parse5, or html-parser packages.
//   - Pure TypeScript, runs in Node.js / Edge runtime.
//   - All html segment payloads are stripped of <script> and <iframe> tags
//     before the caller receives them (defense-in-depth sanitization).

import type { ContentSegment } from '@/types/journal';

/**
 * Regex that matches the product callout marker emitted by the WordPress ACF block.
 * Captures the product slug in group 1.
 *
 * Matches:
 *   <div data-product-callout="some-product-slug"></div>
 *   <div data-product-callout="slug-with-numbers-123"></div>
 *
 * Does NOT match malformed variants without a closing tag — those pass through
 * as raw HTML and are sanitized by `stripDangerousTags`.
 */
const PRODUCT_CALLOUT_REGEX =
  /<div\s+data-product-callout="([^"]+)"\s*><\/div>/gi;

/**
 * Strip script and iframe tags (and their content) from an HTML string.
 * This is a server-side defense-in-depth measure (audit flag RF-14).
 *
 * Addresses the specific risk of a compromised WordPress post containing
 * injected `<script>` tags that would execute via `dangerouslySetInnerHTML`.
 *
 * Note: This is intentionally narrow — it targets the two highest-risk tag
 * types. For a hardened production deployment, consider adding a full
 * server-side sanitizer (e.g., `sanitize-html` as a server-only dep) in
 * Phase 5 hardening.
 */
export function stripDangerousTags(html: string): string {
  return html
    // Remove <script ...>...</script> blocks (including multiline content)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    // Remove <iframe ...>...</iframe> blocks
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '')
    // Remove bare <script .../> self-closing variants
    .replace(/<script\b[^>]*\/>/gi, '')
    // Remove javascript: protocol in href/src attributes
    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}

/**
 * Split raw Gutenberg HTML into an ordered array of typed content segments.
 *
 * Algorithm:
 *   1. Use PRODUCT_CALLOUT_REGEX with the global flag to find all callout
 *      markers in the string, recording their index positions.
 *   2. Build segments by slicing the string between matches:
 *      - Text between the start (or previous match end) and the current match
 *        start → { type: 'html', payload: sanitized html slice }
 *      - The match itself → { type: 'product-callout', payload: slug }
 *   3. After the last match, append any remaining HTML tail.
 *   4. Filter out empty html segments (e.g. back-to-back callouts).
 *
 * @param rawHtml - The raw `content` string from WPGraphQL.
 * @returns An ordered array of ContentSegment objects ready for rendering.
 */
export function parseJournalContent(rawHtml: string): ContentSegment[] {
  if (!rawHtml || rawHtml.trim() === '') {
    return [];
  }

  const segments: ContentSegment[] = [];
  let lastIndex = 0;

  // Reset the regex lastIndex in case it was used previously (global flag)
  PRODUCT_CALLOUT_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null;

  while ((match = PRODUCT_CALLOUT_REGEX.exec(rawHtml)) !== null) {
    const matchStart = match.index;
    const matchEnd = match.index + match[0].length;
    const productSlug = match[1];

    // Capture the HTML fragment BEFORE this callout marker
    if (matchStart > lastIndex) {
      const htmlFragment = rawHtml.slice(lastIndex, matchStart);
      const sanitized = stripDangerousTags(htmlFragment);
      if (sanitized.trim()) {
        segments.push({ type: 'html', payload: sanitized });
      }
    }

    // Capture the product callout itself
    if (productSlug.trim()) {
      segments.push({ type: 'product-callout', payload: productSlug.trim() });
    }

    lastIndex = matchEnd;
  }

  // Capture any remaining HTML after the last callout (or the entire string
  // if no callouts were found)
  if (lastIndex < rawHtml.length) {
    const tail = rawHtml.slice(lastIndex);
    const sanitized = stripDangerousTags(tail);
    if (sanitized.trim()) {
      segments.push({ type: 'html', payload: sanitized });
    }
  }

  return segments;
}
