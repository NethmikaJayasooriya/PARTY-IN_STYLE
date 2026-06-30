"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            barRef.current.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial call
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-chrome fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div
        ref={barRef}
        className="h-full"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #d4af37, #f2ca50, #d4af37)",
          boxShadow: "0 0 10px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.2)",
          transition: "width 0.1s ease-out"
        }}
      />
    </div>
  );
}
