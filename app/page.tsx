import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/types/product";

const sampleProducts: Product[] = [
  {
    id: "338",
    slug: "all-in-one-intensive-skin-treatment-moisturizer-women",
    name: "All in One Intensive Skin Treatment & Moisturizer for Women",
    shortDescription:
      "Effective for eczema, rosacea, psoriasis, shingle pain, and reducing signs of aging. Hydrates & nourishes!",
    price: "From $29.95",
    regularPrice: "$59.95",
    image: null,
  },
  {
    id: "348",
    slug: "anti-aging-night-serum",
    name: "Anti-Aging Night Serum: Age Defying Anti-Wrinkle Face & Eye Serum",
    shortDescription:
      "Restores tone and refines texture, reduces wrinkles, age spots and under eye puffiness — revealing healthy, youthful skin.",
    price: "$60.00",
    regularPrice: "$60.00",
    image: null,
  },
  {
    id: "377",
    slug: "full-spectrum-cbd-oil",
    name: "Full Spectrum CBD Oil",
    shortDescription:
      "Cannabidiol: the Natural Pain Reliever for Digestive Issues, Bone Density/Repair, Anxiety & Inflammation Relief.",
    price: "From $39.95",
    regularPrice: "$89.95",
    image: null,
  },
  {
    id: "400",
    slug: "gentle-baby-face-body-wash",
    name: "Gentle Baby Face & Body Wash",
    shortDescription:
      "pH Balanced, non-irritating hypoallergenic Face & Body Wash — Helps Treat Baby Acne, Baby Eczema, Diaper Rash & More!",
    price: "$39.95",
    regularPrice: "$39.95",
    image: null,
  },
  {
    id: "605",
    slug: "cbd-bath-bomb",
    name: "CBD Bath Bomb",
    shortDescription:
      "Aromatherapy and CBD Infused Bath Bombs Help Relax Tired, Sore Muscles and Eliminates Pain, Discomfort, and Anxiety.",
    price: "$19.95",
    regularPrice: "$19.95",
    image: null,
  },
  {
    id: "494",
    slug: "cbd-for-dogs",
    name: "CBD Hemp Oil for Dogs & Cats",
    shortDescription:
      "CBD for Pets — Organic, Non-GMO, Pesticide-Free Hemp Oil Supplement; Full Spectrum Terpene Rich for Pain & Anxiety Relief!",
    price: "$89.00",
    regularPrice: "$89.00",
    image: null,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <ProductGrid
          products={sampleProducts}
          title="Bestselling Formulas"
          subtitle="Therapeutic-grade skincare powered by Certified UMF Manuka Honey, Organic Aloe Vera, and Full-Spectrum CBD. For humans and pets."
        />
      </div>

      <section className="border-t border-brand-border bg-brand-warm">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-forest">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-brand-dark">Medical-Grade Ingredients</h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                UMF Certified Manuka Honey and pharmaceutical-grade Aloe Vera form the foundation of every formula.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-amber-light">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-honey">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-brand-dark">Pure &amp; Clean</h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                Zero parabens, sulfates, alcohol, or artificial fragrances. Vegan, gluten-free, and hypoallergenic.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-forest">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-brand-dark">For the Whole Family</h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                Gentle enough for newborns, effective enough for chronic conditions. Trusted by pet parents and veterinarians.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
