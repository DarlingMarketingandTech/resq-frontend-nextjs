/**
 * /test-products — Live WooCommerce Product Test Page
 *
 * Fetches the first 3 published products from the WPGraphQL endpoint defined
 * in WP_GRAPHQL_URL (server-side env var) and renders them with the new
 * premium ProductCard component.
 *
 * ⚠️  STAGING NOTE: The Nexcess staging host (50eacb477d.nxcli.io) is gated
 * behind HTTP Basic Auth at the hosting level. To make live queries work in
 * development, either:
 *   1. Ask the host to whitelist your IP, or
 *   2. Add NEXCESS_HTTP_USER / NEXCESS_HTTP_PASS to .env.local and update
 *      lib/api.ts to include an additional Authorization header, or
 *   3. Point WP_GRAPHQL_URL at the live production domain once it's deployed.
 *
 * The product cards below will show mock data when the API is unreachable,
 * so you can validate the UI immediately.
 */

import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export const revalidate = 0; // No cache on the test page — always fresh

// ─── Mock fallback data (shown when live API is unreachable) ──────────────────
const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-1",
    slug: "resq-manuka-honey-healing-salve",
    name: "ResQ Manuka Honey Healing Salve",
    shortDescription:
      "Therapeutic-grade UMF Manuka Honey & Organic Aloe Vera. Clinically formulated for rapid cellular repair.",
    price: "$38.00",
    regularPrice: "$38.00",
    salePrice: null,
    image: null,
  },
  {
    id: "mock-2",
    slug: "resq-cbd-pet-relief-balm",
    name: "ResQ Pet Relief Balm — Hot Spots & Itching",
    shortDescription:
      "Full-Spectrum CBD with soothing botanicals. Safe for dogs, cats & horses. Vet-reviewed formula.",
    price: "$29.00",
    regularPrice: "$44.00",
    salePrice: "$29.00",
    image: null,
  },
  {
    id: "mock-3",
    slug: "resq-anti-aging-serum",
    name: "ResQ Anti-Aging Renewal Serum",
    shortDescription:
      "Concentrated Manuka Honey peptides & Hyaluronic Acid. Visibly reduces fine lines within 28 days.",
    price: "$54.00",
    regularPrice: "$54.00",
    salePrice: null,
    image: null,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function TestProductsPage() {
  let products: Product[] = [];
  let isLive = false;
  let errorMessage: string | null = null;

  try {
    const all = await getProducts();
    if (all.length > 0) {
      products = all.slice(0, 3);
      isLive = true;
    } else {
      products = MOCK_PRODUCTS;
      errorMessage = "API connected but returned 0 products — check WooCommerce publish status.";
    }
  } catch (err) {
    products = MOCK_PRODUCTS;
    errorMessage =
      err instanceof Error
        ? err.message
        : "Unknown error connecting to WPGraphQL.";
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* ── Hero Header ── */}
      <div className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            {/* Leaf dot */}
            <span className="inline-block h-2 w-2 rounded-full bg-brand-sage" />
            <span className="text-[11px] font-semibold tracking-widest text-brand-sage uppercase">
              Component Test
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Live Product Card Preview
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted">
            Verifying WPGraphQL connection and rendering the premium{" "}
            <code className="rounded bg-brand-warm px-1.5 py-0.5 text-[11px] font-mono text-brand-forest">
              ProductCard
            </code>{" "}
            component against live WooCommerce data.
          </p>
        </div>
      </div>

      {/* ── Status Banner ── */}
      <div className="mx-auto max-w-5xl px-6 pt-6">
        {isLive ? (
          <div className="flex items-center gap-3 rounded-xl border border-brand-sage/30 bg-brand-mint/50 px-4 py-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-forest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-forest">
                ✅ Live WooCommerce data — WPGraphQL connected
              </p>
              <p className="text-xs text-brand-muted">
                Showing first 3 published products from{" "}
                <span className="font-mono">{process.env.WP_GRAPHQL_URL}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-brand-amber/40 bg-brand-amber-light/60 px-4 py-3">
            <p className="text-sm font-semibold text-brand-honey">
              ⚠️ Using mock data — API unreachable
            </p>
            {errorMessage && (
              <p className="mt-1 font-mono text-[11px] text-brand-muted break-all">
                {errorMessage}
              </p>
            )}
            <p className="mt-1.5 text-xs text-brand-text">
              The Nexcess staging host requires HTTP Basic Auth at the hosting
              level. Add <code className="font-mono">WP_GRAPHQL_URL</code> pointing
              to your live or whitelisted domain, or ask Nexcess to whitelist your
              IP. Card design is fully accurate below.
            </p>
          </div>
        )}
      </div>

      {/* ── Product Grid ── */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── Component Spec Footer ── */}
      <div className="mx-auto max-w-5xl border-t border-brand-border px-6 py-8">
        <h2 className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-4">
          Component Spec
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-4">
          {[
            ["File", "components/product-card.tsx"],
            ["Stack", "Next.js 16 · Tailwind v4"],
            ["Image", "next/image · aspect-4/3"],
            ["Sale badge", "Automatic (salePrice ≠ regularPrice)"],
            ["Category", "Auto-detected from name/description"],
            ["CTA", "Links to /products/[slug]"],
            ["Hover FX", "Lift + shadow + accent bar"],
            ["A11y", "aria-label · semantic article"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold text-brand-muted">{label}</dt>
              <dd className="mt-0.5 font-mono text-brand-dark">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
