import Image from "next/image";
import Link from "next/link";

import { stripHtml } from "@/lib/text";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image?.sourceUrl;
  const price = stripHtml(product.price) || "Price available on request";

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Link href={`/products/${product.slug}`} className="group flex h-full flex-col gap-3">
        <div className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.image?.altText || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-500">No image</div>
          )}
        </div>
        <h2 className="text-base font-semibold text-slate-900">{product.name}</h2>
        <p className="mt-auto text-sm text-slate-600">{price}</p>
      </Link>
    </article>
  );
}
