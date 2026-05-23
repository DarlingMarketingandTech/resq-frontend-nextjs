export default function ClinicalHighlights() {
  const pillars = [
    {
      title: "Medical-Grade Manuka",
      description: "Sourced directly from New Zealand. Its unique methylglyoxal (MGO) rating provides unmatched antibacterial and anti-inflammatory properties for deep cellular repair.",
      icon: "01",
    },
    {
      title: "Broad-Spectrum CBD",
      description: "Organically grown and carefully extracted to preserve the full range of therapeutic cannabinoids. Modulates inflammation and provides lasting relief without psychoactive effects.",
      icon: "02",
    },
    {
      title: "Bio-Active Botanicals",
      description: "A meticulously curated blend of natural ingredients designed to synergize with our active compounds, accelerating the skin's natural regeneration process.",
      icon: "03",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide mb-6">
            The Structural Pillars of Healing
          </h2>
          <div className="w-12 h-[1px] bg-stone-900 mx-auto opacity-40 mb-6"></div>
          <p className="text-stone-600 leading-relaxed">
            We don't compromise on ingredients. Our formulations rely on clinically-studied 
            natural compounds that work in harmony with the body's native biological systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-sm font-medium tracking-widest text-stone-400 mb-6 font-mono">
                {pillar.icon}
              </span>
              <h3 className="text-xl font-medium tracking-wide mb-4 text-stone-900">
                {pillar.title}
              </h3>
              <p className="text-stone-600 leading-relaxed font-light text-sm md:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
