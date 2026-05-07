"use client";
import { useEffect, useRef } from "react";

export default function RevealSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        // Add class when visible, remove when not — animation replays every scroll
        if (e.isIntersecting) {
          el.classList.add("revealed");
        } else {
          el.classList.remove("revealed");
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-section ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
