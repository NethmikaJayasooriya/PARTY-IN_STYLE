"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value); // SSR + crawlers + no-JS see the REAL value
  const hasAnimated = useRef(false);

  function animateValue(target) {
    const numericPart = parseInt(String(target).replace(/[^0-9]/g, ""), 10);
    const suffix = String(target).replace(/[0-9]/g, "");
    if (!numericPart) return; // nothing numeric to animate
    const steps = 60;
    const duration = 2000;
    const increment = numericPart / steps;
    let step = 0;
    setDisplay("0" + suffix);
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.min(Math.round(increment * step), numericPart) + suffix);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Honour reduced-motion: keep the real value, skip the animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(value);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center relative z-10 flex flex-col items-center">
      <div className="font-headline-lg text-4xl md:text-5xl gradient-text font-light">{display}</div>
      <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-[0.2em] mt-1">{label}</div>
    </div>
  );
}
