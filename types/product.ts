export interface ProductImage {
  sourceUrl?: string | null;
  altText?: string | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  image?: ProductImage | null;
}
