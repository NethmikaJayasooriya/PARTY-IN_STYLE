"use client";
import { useEffect } from "react";

// Cursor-follow jewel glow on any element with .spotlight-card.
// Sets --mx / --my (in %) on the hovered card; CSS draws the glow.
export default function CardSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let el = null;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      raf = 0;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      el.style.setProperty("--mx", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((cy - r.top) / r.height) * 100}%`);
    };

    const onMove = (e) => {
      const card = e.target.closest && e.target.closest(".spotlight-card");
      if (!card) return;
      el = card;
      cx = e.clientX;
      cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // Only start AFTER the page has loaded so we never mutate --mx/--my
    // during React's hydration window (which would cause a hydration mismatch).
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      document.addEventListener("mousemove", onMove, { passive: true });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      document.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
