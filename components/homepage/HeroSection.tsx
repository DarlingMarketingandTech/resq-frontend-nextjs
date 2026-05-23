import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <div className="w-full h-full bg-stone-800" />
        {/* Replace with actual image later */}
        {/* <Image 
          src="/images/hero-bg.jpg" 
          alt="Natural skincare ingredients" 
          fill 
          className="object-cover object-center"
          priority 
        /> */}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FAFAFA] font-medium leading-tight mb-6 tracking-wide">
          Cellular Healing Driven by Science.
        </h1>
        <p className="text-stone-300 text-lg md:text-xl max-w-2xl mb-10 font-light tracking-wide">
          Premium grade Manuka Honey, formulated with bio-active botanicals. 
          Clinically proven relief for both you and your pets.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/shop/humans"
            className="px-8 py-4 bg-[#FAFAFA] text-stone-900 text-sm tracking-widest uppercase font-semibold hover:bg-stone-200 transition-colors w-full sm:w-auto text-center"
          >
            Shop Humans
          </Link>
          <Link 
            href="/shop/pets"
            className="px-8 py-4 bg-transparent border border-[#FAFAFA] text-[#FAFAFA] text-sm tracking-widest uppercase font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
          >
            Shop Pets
          </Link>
        </div>
      </div>
    </section>
  );
}
