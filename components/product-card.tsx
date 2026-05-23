import Image from "next/image";
import Link from "next/link";

import { stripHtml } from "@/lib/text";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

// ─── Category Badge ────────────────────────────────────────────────────────────
function getCategoryLabel(text: string): { label: string; color: string } | null {
  const lower = text.toLowerCase();
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat") || lower.includes("horse")) {
    return { label: "Pets", color: "bg-brand-mint text-brand-forest" };
  }
  if (lower.includes("baby") || lower.includes("newborn")) {
    return { label: "Baby", color: "bg-brand-amber-light text-brand-honey" };
  }
  if (lower.includes("cbd") || lower.includes("cannabidiol") || lower.includes("hemp")) {
    return { label: "CBD", color: "bg-brand-forest text-white" };
  }
  if (lower.includes("women") || lower.includes("anti-aging") || lower.includes("wrinkle")) {
    return { label: "For Her", color: "bg-brand-amber-light text-brand-honey" };
  }
  if (/\bmen\b/.test(lower)) {
    return { label: "For Him", color: "bg-brand-mint text-brand-forest" };
  }
  return null;
}

// ─── Leaf / Botanical icon for placeholder ─────────────────────────────────────
function BotanicalPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-brand-warm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12 text-brand-sage opacity-50"
      >
        <path d="M12 22V12" />
        <path d="M12 12C12 8 15 5 19 4c0 4-2 7-5 8" />
        <path d="M12 12C12 8 9 5 5 4c0 4 2 7 5 8" />
      </svg>
      <span className="text-[11px] font-medium tracking-widest text-brand-muted uppercase">
        ResQ Organics
      </span>
    </div>
  );
}

// ─── Price Display ─────────────────────────────────────────────────────────────
function PriceDisplay({
  price,
  regularPrice,
  salePrice,
}: {
  price: string | null | undefined;
  regularPrice: string | null | undefined;
  salePrice: string | null | undefined;
}) {
  const cleanPrice = stripHtml(price);
  const cleanRegular = stripHtml(regularPrice);
  const cleanSale = stripHtml(salePrice);
  const isOnSale = Boolean(cleanSale && cleanRegular && cleanSale !== cleanRegular);

  if (!cleanPrice) {
    return (
      <span className="text-sm font-medium tracking-wide text-brand-muted">
        Price on request
      </span>
    );
  }

  if (isOnSale) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-brand-forest">{cleanSale}</span>
        <span className="text-sm font-normal text-brand-muted line-through">{cleanRegular}</span>
      </div>
    );
  }

  return (
    <span className="text-base font-bold text-brand-forest">{cleanPrice}</span>
  );
}

// ─── ProductCard ───────────────────────────────────────────────────────────────
export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image?.sourceUrl;
  const categorySource = `${product.name} ${product.shortDescription ?? ""}`;
  const category = getCategoryLabel(categorySource);
  const isOnSale = Boolean(
    product.salePrice &&
      product.regularPrice &&
      stripHtml(product.salePrice) !== stripHtml(product.regularPrice),
  );

  const shortDesc = stripHtml(product.shortDescription);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-sage/10">
      {/* ── Image Zone ── */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="block"
        tabIndex={-1}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.image?.altText ?? product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <BotanicalPlaceholder />
          )}

          {/* Gradient scrim — subtle depth at bottom of image */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {/* Sale badge */}
          {isOnSale && (
            <span className="absolute right-3 top-3 rounded-full bg-brand-honey px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm">
              SALE
            </span>
          )}

          {/* Category badge */}
          {category && (
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm ${category.color}`}
            >
              {category.label}
            </span>
          )}
        </div>
      </Link>

      {/* ── Card Body ── */}
      <div className="flex flex-1 flex-col px-5 py-4">
        {/* Ingredient accent line */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className="h-px flex-1 bg-brand-border" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3 text-brand-sage"
          >
            <path d="M8 1a.75.75 0 0 1 .75.75v.756a5.001 5.001 0 0 1 3.494 3.494h.756a.75.75 0 0 1 0 1.5h-.756A5.001 5.001 0 0 1 8.75 11.494v.756a.75.75 0 0 1-1.5 0v-.756A5.001 5.001 0 0 1 3.756 8h-.756a.75.75 0 0 1 0-1.5h.756A5.001 5.001 0 0 1 7.25 2.506V1.75A.75.75 0 0 1 8 1Zm0 3a4 4 0 1 0 0 8A4 4 0 0 0 8 4Zm0 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
          </svg>
          <div className="h-px flex-1 bg-brand-border" />
        </div>

        {/* Product name */}
        <Link href={`/products/${product.slug}`} className="group/title">
          <h2 className="text-sm font-semibold leading-snug tracking-tight text-brand-dark line-clamp-2 group-hover/title:text-brand-forest transition-colors duration-200">
            {product.name}
          </h2>
        </Link>

        {/* Short description */}
        {shortDesc && (
          <p className="mt-1.5 text-[12px] leading-relaxed text-brand-muted line-clamp-2">
            {shortDesc}
          </p>
        )}

        {/* ── Footer: price + CTA ── */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <PriceDisplay
            price={product.price}
            regularPrice={product.regularPrice}
            salePrice={product.salePrice}
          />

          <Link
            href={`/products/${product.slug}`}
            className="flex-shrink-0 rounded-full bg-brand-forest px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white transition-all duration-200 hover:bg-brand-forest-dark hover:shadow-md active:scale-95"
          >
            View
          </Link>
        </div>
      </div>

      {/* ── Medical-grade bottom accent bar ── */}
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-sage via-brand-honey to-brand-sage opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
