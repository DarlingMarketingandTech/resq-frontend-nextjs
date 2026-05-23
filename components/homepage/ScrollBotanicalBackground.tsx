"use client";

import { useEffect, useState, useRef } from "react";

export default function ScrollBotanicalBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Prevent multiple requests per frame
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Calculate progress from 0 to 1
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        
        setScrollProgress(progress);
        rafRef.current = null;
      });
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Map scroll progress to subtle transform values
  // Scale slowly grows by 30%
  const scale = 1 + scrollProgress * 0.3;
  // Rotates slowly
  const rotate = scrollProgress * 15;
  // Moves up slightly
  const translateY = scrollProgress * -40;

  return (
    <div 
      className="fixed bottom-0 right-0 pointer-events-none w-96 h-96 md:w-[800px] md:h-[800px] translate-x-1/4 translate-y-1/4 z-10"
      style={{
        transform: `translate(25%, 25%) scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
        transition: "transform 0.1s ease-out" // subtle smoothing
      }}
      aria-hidden="true"
    >
      {/* 
        A premium inline SVG botanical line-drawing. 
        Using opacity-[0.04] for a faint watermark effect. 
      */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full text-stone-900 opacity-[0.04]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central stem */}
        <path d="M100 200 Q 100 150 95 100 Q 90 50 100 0 Q 110 50 105 100 Q 100 150 100 200" />
        
        {/* Left leaves */}
        <path d="M97 160 C 60 150 20 180 10 160 C 20 130 70 140 96 150" />
        <path d="M96 120 C 50 110 10 130 5 110 C 10 80 60 100 95 110" />
        <path d="M96 80 C 40 70 5 80 0 60 C 10 40 50 60 97 70" />
        <path d="M98 40 C 60 30 30 30 20 10 C 40 5 70 20 99 35" />

        {/* Right leaves */}
        <path d="M102 170 C 140 160 180 190 190 170 C 180 140 130 150 104 160" />
        <path d="M103 130 C 150 120 190 140 195 120 C 190 90 140 110 104 120" />
        <path d="M102 90 C 160 80 195 90 200 70 C 190 50 150 70 102 80" />
        <path d="M101 50 C 140 40 170 40 180 20 C 160 15 130 30 100 45" />
      </svg>
    </div>
  );
}
