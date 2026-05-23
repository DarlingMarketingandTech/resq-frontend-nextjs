import Link from "next/link";
import Image from "next/link"; // Not actually used for image placeholder right now, to keep it simple

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export default function CollectionTeaser() {
  const featuredProducts: Product[] = [
    { id: "p1", name: "Intensive Skin Repair Balm", category: "Human", price: 45 },
    { id: "p2", name: "Advanced Pet Relief Cream", category: "Pet", price: 38 },
    { id: "p3", name: "Daily Nourish Manuka Lotion", category: "Human", price: 52 },
  ];

  return (
    <section className="py-24 bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          
          <div className="relative h-[500px] bg-stone-100 group overflow-hidden flex items-end p-10">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-stone-300 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            
            <div className="relative z-10 w-full">
              <h3 className="font-serif text-4xl text-white mb-4 tracking-wide">
                Shop Human Solutions
              </h3>
              <Link 
                href="/shop/humans" 
                className="inline-block border-b border-white text-white tracking-widest uppercase text-sm pb-1 hover:text-stone-200 hover:border-stone-200 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] bg-stone-200 group overflow-hidden flex items-end p-10">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-stone-400 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            
            <div className="relative z-10 w-full">
              <h3 className="font-serif text-4xl text-white mb-4 tracking-wide">
                Shop Pet Wellness
              </h3>
              <Link 
                href="/shop/pets" 
                className="inline-block border-b border-white text-white tracking-widest uppercase text-sm pb-1 hover:text-stone-200 hover:border-stone-200 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>

        </div>

        {/* Featured Essentials Strip */}
        <div>
          <div className="flex justify-between items-end mb-10 border-b border-stone-200 pb-4">
            <h2 className="font-serif text-2xl tracking-wide">Featured Essentials</h2>
            <Link href="/shop/all" className="text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-stone-100 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-stone-200 transition-transform duration-500 group-hover:scale-105"></div>
                </div>
                
                <div className="flex flex-col text-center">
                  <span className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    {product.category}
                  </span>
                  <h4 className="text-base tracking-wide text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h4>
                  <span className="text-sm text-stone-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
