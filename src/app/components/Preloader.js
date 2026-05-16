"use client";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState("loading"); // loading -> revealing -> done

  useEffect(() => {
    // 1. Fast loading phase (0.6 seconds — just enough for logo reveal)
    const revealTimer = setTimeout(() => {
      setPhase("revealing");
    }, 600);

    // 2. Completely unmount after reveal animation (0.6s + 0.6s = 1.2s total)
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 1200);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const isRevealing = phase === "revealing";

  return (
    <div className={`fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden ${isRevealing ? "pointer-events-none" : ""}`}>
      {/* Cinematic Split Doors */}
      <div 
        className={`absolute top-0 left-0 w-full h-1/2 bg-[#0c0d0e] transition-transform duration-[600ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "-translate-y-full" : "translate-y-0"
        }`} 
      />
      <div 
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#0c0d0e] transition-transform duration-[600ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "translate-y-full" : "translate-y-0"
        }`} 
      />

      {/* Content Container */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isRevealing ? "opacity-0 scale-[1.8] blur-md" : "opacity-100 scale-100 blur-0"
        }`}
        style={{ animation: "fadeInUp 0.8s ease-out both" }}
      >
        {/* Massive Luxury Glow */}
        <div 
          className="absolute inset-0 bg-primary/20 blur-[40px] md:blur-[80px] rounded-full scale-[2]" 
          style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} 
        />
        
        {/* Larger Logo */}
        <img
          src="/logo.png"
          alt="Party in Style"
          className="h-28 sm:h-40 md:h-56 lg:h-64 w-auto relative z-10"
          style={{ 
            filter: "drop-shadow(0 4px 20px rgba(212,175,55,0.4)) md:drop-shadow(0 4px 40px rgba(212,175,55,0.6))",
          }}
        />
        
        {/* Elegant loading line */}
        <div className="w-48 sm:w-56 md:w-72 h-[1px] bg-outline/20 mt-10 md:mt-12 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full" 
            style={{ 
              width: "100%", 
              animation: "progressFill 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards" 
            }} 
          />
        </div>
      </div>
    </div>
  );
}
