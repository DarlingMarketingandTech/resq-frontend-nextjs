import type { Product } from "@/types/product";
import { ProductDetailClient } from "./product-detail-client";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return <ProductDetailClient product={product} />;
}
