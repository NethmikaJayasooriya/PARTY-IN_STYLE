"use client";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState("visible"); // visible -> revealing -> done

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    // Start reveal immediately — zero delay to minimize LCP impact
    requestAnimationFrame(() => {
      setPhase("revealing");
    });

    // Remove from DOM after animation completes
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 500);

    return () => clearTimeout(doneTimer);
  }, []);

  if (phase === "done") return null;

  const isRevealing = phase === "revealing";

  return (
    <div className={`site-chrome fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden ${isRevealing ? "pointer-events-none" : ""}`}>
      {/* Cinematic Split Doors */}
      <div 
        className={`absolute top-0 left-0 w-full h-1/2 bg-[#0c0d0e] transition-transform duration-[400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "-translate-y-full" : "translate-y-0"
        }`} 
      />
      <div 
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#0c0d0e] transition-transform duration-[400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "translate-y-full" : "translate-y-0"
        }`} 
      />

      {/* Logo — briefly visible then zooms away */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "opacity-0 scale-[1.8] blur-md" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <div 
          className="absolute inset-0 bg-primary/20 blur-[40px] md:blur-[80px] rounded-full scale-[2]" 
        />
        
        <img
          src="/logo.webp"
          alt="Party in Style"
          width={256}
          height={256}
          className="h-28 sm:h-40 md:h-56 lg:h-64 w-auto relative z-10"
          fetchPriority="high"
          decoding="sync"
          style={{ 
            filter: "drop-shadow(0 4px 20px rgba(212,175,55,0.4))",
          }}
        />
      </div>
    </div>
  );
}
