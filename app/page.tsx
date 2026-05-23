import HeroSection from "@/components/homepage/HeroSection";
import ClinicalHighlights from "@/components/homepage/ClinicalHighlights";
import CollectionTeaser from "@/components/homepage/CollectionTeaser";
import JournalTeaser from "@/components/homepage/JournalTeaser";
import ScrollBotanicalBackground from "@/components/homepage/ScrollBotanicalBackground";

export default function Home() {
  return (
    // Defaulting to a flex column, ensuring nothing breaks out of layout bounds
    <div className="flex flex-col w-full overflow-hidden relative">
      <ScrollBotanicalBackground />
      <HeroSection />
      <ClinicalHighlights />
      <CollectionTeaser />
      <JournalTeaser />
    </div>
  );
}
