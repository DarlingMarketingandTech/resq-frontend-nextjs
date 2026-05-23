import Link from "next/link";

export default function JournalTeaser() {
  const recentArticles = [
    {
      id: "a1",
      category: "Science",
      title: "Decoding the MGO Rating: What Makes Manuka Honey Medical-Grade?",
      date: "May 18, 2026",
    },
    {
      id: "a2",
      category: "Pet Health",
      title: "Recognizing Hidden Signs of Joint Pain in Senior Dogs",
      date: "May 12, 2026",
    },
    {
      id: "a3",
      category: "Wellness",
      title: "The Synergy of CBD and Aloe Vera in Cellular Repair",
      date: "May 05, 2026",
    },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-stone-200 pb-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide mb-3">Wellness Journal</h2>
            <p className="text-stone-600 font-light max-w-xl">
              Insights, scientific research, and thought-leadership on natural healing.
            </p>
          </div>
          <Link 
            href="/journal" 
            className="text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors mt-6 md:mt-0 inline-block"
          >
            Read All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Feature Article (Takes up 7 columns on desktop) */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="w-full aspect-[4/3] sm:aspect-video bg-stone-200 mb-8 relative overflow-hidden">
               {/* Image Placeholder */}
               <div className="absolute inset-0 bg-stone-300 transition-transform duration-700 group-hover:scale-105"></div>
            </div>
            
            <div className="max-w-2xl">
              <span className="text-xs tracking-widest uppercase text-stone-500 mb-4 block">
                Featured Insight
              </span>
              <h3 className="font-serif text-3xl mb-4 group-hover:text-stone-600 transition-colors leading-tight">
                The New Standard of Clean Beauty is Actually Medical.
              </h3>
              <p className="text-stone-600 font-light leading-relaxed mb-6">
                For decades, the clean beauty industry focused on what wasn't in their products. 
                Today, the focus has shifted to bio-compatibility. We explore how medical-grade 
                naturals are rewriting the rules of cellular regeneration.
              </p>
              <Link 
                href="/journal/featured"
                className="inline-block border-b border-stone-900 text-stone-900 tracking-widest uppercase text-xs pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors"
              >
                Read Article
              </Link>
            </div>
          </div>

          {/* Sidebar Articles (Takes up 5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-10">
              {recentArticles.map((article) => (
                <div key={article.id} className="group cursor-pointer border-b border-stone-200 pb-10 last:border-0 last:pb-0">
                  <span className="text-xs tracking-widest uppercase text-stone-500 mb-3 block">
                    {article.category}
                  </span>
                  <h4 className="font-serif text-xl mb-3 group-hover:text-stone-600 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <span className="text-sm text-stone-400 font-light">
                    {article.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
