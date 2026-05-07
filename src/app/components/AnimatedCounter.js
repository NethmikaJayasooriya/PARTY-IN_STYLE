"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

  function animateValue(target) {
    const numericPart = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    const duration = 2000;
    const steps = 60;
    const increment = numericPart / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericPart);
      setDisplay(current + suffix);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-headline-lg text-4xl md:text-5xl gradient-text font-light">
        {display}
      </div>
      <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-[0.2em] mt-1">
        {label}
      </div>
    </div>
  );
}
