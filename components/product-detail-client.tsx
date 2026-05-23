'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { stripHtml } from '@/lib/text';
import type { Product } from '@/types/product';

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.image?.sourceUrl);

  const price = stripHtml(product.price) || 'Price available on request';
  const regularPrice = stripHtml(product.regularPrice);
  const salePrice = stripHtml(product.salePrice);
  const isOnSale = Boolean(salePrice && regularPrice && salePrice !== regularPrice);

  const images = product.image?.sourceUrl ? [product.image.sourceUrl] : [];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <a href="/" className="text-stone-500 hover:text-stone-700">Home</a>
          <span className="text-stone-300">/</span>
          <a href="/products" className="text-stone-500 hover:text-stone-700">Products</a>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.image?.altText ?? product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="w-16 h-16 text-stone-300"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === img
                        ? 'border-brand-forest'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8">
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-2">
                {isOnSale ? (
                  <>
                    <span className="text-3xl font-bold text-brand-forest">
                      {salePrice}
                    </span>
                    <span className="text-xl text-stone-400 line-through">
                      {regularPrice}
                    </span>
                    <span className="ml-2 inline-block px-3 py-1 bg-brand-honey text-white text-sm font-semibold rounded-full">
                      Sale
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-stone-900">
                    {price}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div className="border-t border-b border-stone-200 py-4">
                <p className="text-stone-600 leading-relaxed">
                  {stripHtml(product.shortDescription)}
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <AddToCartButton product={product} />
              <p className="text-xs text-stone-500 text-center">
                Free shipping on orders over $75
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 bg-stone-50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-brand-forest mt-0.5"
                  >
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Natural Ingredients</p>
                  <p className="text-xs text-stone-600">Pure botanical formulas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-brand-forest mt-0.5"
                  >
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Lab Tested</p>
                  <p className="text-xs text-stone-600">Quality assured</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-brand-forest mt-0.5"
                  >
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Eco-Friendly</p>
                  <p className="text-xs text-stone-600">Sustainable packaging</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-brand-forest mt-0.5"
                  >
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Ships Fast</p>
                  <p className="text-xs text-stone-600">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              About this product
            </h2>
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
                className="space-y-4"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
