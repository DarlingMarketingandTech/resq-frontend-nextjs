'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/product-grid';

interface ProductListClientProps {
  products: Product[];
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name';
type CategoryFilter = 'all' | 'humans' | 'pets' | 'bundles';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'humans', label: 'Humans' },
  { id: 'pets', label: 'Pets' },
  { id: 'bundles', label: 'Bundles' },
] as const;

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A to Z' },
] as const;

function categorizeProduct(product: Product): CategoryFilter {
  const name = product.name.toLowerCase();

  if (name.includes('bundle')) return 'bundles';
  if (name.includes('pet') || name.includes('dog') || name.includes('cat') || name.includes('animal')) {
    return 'pets';
  }
  return 'humans';
}

function getProductPrice(product: Product): number {
  const price = product.salePrice || product.price || product.regularPrice;
  if (!price) return 0;
  return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    case 'price-high':
      return sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted; // Return in original order
  }
}

export function ProductListClient({ products }: ProductListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = (searchParams.get('category') as CategoryFilter) || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'featured';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (category !== 'all') {
      filtered = products.filter((product) => categorizeProduct(product) === category);
    }

    // Apply sort
    return sortProducts(filtered, sort);
  }, [products, category, sort]);

  const handleCategoryChange = (newCategory: CategoryFilter) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    router.push(`/products?${params.toString()}`);
    setMobileFilterOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    const params = new URLSearchParams(searchParams);
    if (newSort === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Filter Tabs (Desktop) */}
        <div className="hidden md:flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as CategoryFilter)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                category === cat.id
                  ? 'bg-brand-forest text-white'
                  : 'bg-brand-warm text-brand-text hover:bg-brand-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-forest rounded-md"
          >
            {category === 'all' ? 'All Products' : CATEGORIES.find(c => c.id === category)?.label}
          </button>
        </div>

        {/* Sort Control */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-brand-muted">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="px-3 py-2 text-sm border border-brand-border rounded-md bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Category Filter Dropdown */}
      {mobileFilterOpen && (
        <div className="md:hidden bg-brand-warm p-4 rounded-md space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as CategoryFilter)}
              className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                category === cat.id
                  ? 'bg-brand-forest text-white'
                  : 'bg-white text-brand-text hover:bg-brand-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Result Count */}
      <div className="text-sm text-brand-muted">
        Showing {filteredAndSortedProducts.length} of {products.length} products
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <ProductGrid products={filteredAndSortedProducts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-brand-muted">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
