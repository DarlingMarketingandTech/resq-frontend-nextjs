import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { stripHtml } from "@/lib/text";
import type { Product } from "@/types/product";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const price = stripHtml(product.price) || "Price available on request";
  const description = stripHtml(product.description) || stripHtml(product.shortDescription);

  return (
    <article className="mx-auto w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
      <p className="mt-2 text-lg font-semibold text-slate-700">{price}</p>
      {description ? <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p> : null}
      <div className="mt-6">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
