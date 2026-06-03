"use client";
import { useEffect, useRef, useCallback, useState } from "react";

const GOLD       = "212, 175, 55";
const GOLD_LIGHT = "242, 202, 80";
const GOLD_DIM   = "180, 148, 30";

export default function CursorTrail() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const canvasRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsTouch(true);
    }
  }, []);

  const mouse   = useRef({ x: -400, y: -400 });
  const ring    = useRef({ x: -400, y: -400 });
  const angle   = useRef(0);
  const raf     = useRef(null);
  const isHover = useRef(false);
  const visible = useRef(false);

  // ── Click burst ──────────────────────────────────────────────
  const burst = useCallback((x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pts = Array.from({ length: 20 }, (_, i) => {
      const a = (i / 20) * Math.PI * 2;
      const s = Math.random() * 4 + 2;
      return { x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
               life: 1, r: Math.random() * 3 + 1,
               col: Math.random() > 0.5 ? GOLD : GOLD_LIGHT };
    });

    const go = () => {
      // don't clearRect here — main loop handles it
      let alive = false;
      for (const p of pts) {
        p.life -= 0.028; p.x += p.vx; p.y += p.vy;
        p.vx *= 0.9;     p.vy *= 0.9;
        if (p.life > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col}, ${p.life})`;
          ctx.fill();
        }
      }
      if (alive) requestAnimationFrame(go);
    };
    go();
  }, []);

  // ── Main render loop ──────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const dot    = dotRef.current;
    const ringEl = ringRef.current;
    if (!canvas || !dot || !ringEl) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ring lag
    ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.1;

    // Rotation speed — slower on hover for a "pull-in" feel
    angle.current += isHover.current ? 0.04 : 0.06;

    const { x, y } = mouse.current;

    // ── Hypnotic Spiral ───────────────────────────────────────
    // Drawn in two offset arms with alternating opacity bands → illusion of depth
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle.current);

    const ARMS   = 3;       // 3-arm spiral
    const TURNS  = 3;       // how many revolutions
    const STEPS  = 360;     // resolution
    const SCALE  = 2.4;     // tightness

    for (let arm = 0; arm < ARMS; arm++) {
      const armOffset = (arm / ARMS) * Math.PI * 2;

      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= STEPS; i++) {
        const t    = i / STEPS;
        const a    = t * Math.PI * 2 * TURNS + armOffset;
        const r    = t * SCALE * TURNS * 4;     // radius grows with t
        const sx   = r * Math.cos(a);
        const sy   = r * Math.sin(a);
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else           { ctx.lineTo(sx, sy); }
      }

      // Gradient stroke along the spiral
      const maxR = SCALE * TURNS * 4;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
      grad.addColorStop(0,   `rgba(${GOLD_LIGHT}, 1)`);
      grad.addColorStop(0.4, `rgba(${GOLD}, 0.8)`);
      grad.addColorStop(0.75,`rgba(${GOLD_DIM},  0.4)`);
      grad.addColorStop(1,   `rgba(${GOLD}, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth   = isHover.current ? 2.0 : 1.4;
      ctx.lineCap     = "round";

      // glow
      ctx.shadowBlur  = isHover.current ? 18 : 10;
      ctx.shadowColor = `rgba(${GOLD}, 0.7)`;
      ctx.stroke();
    }

    // Counter-rotating inner vortex — creates depth illusion
    ctx.rotate(-angle.current * 2.5);
    for (let arm = 0; arm < 2; arm++) {
      const armOffset = arm * Math.PI;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 120; i++) {
        const t  = i / 120;
        const a  = t * Math.PI * 2 * 2 + armOffset;
        const r  = t * 7;
        const sx = r * Math.cos(a);
        const sy = r * Math.sin(a);
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else           { ctx.lineTo(sx, sy); }
      }
      ctx.strokeStyle = `rgba(${GOLD_LIGHT}, 0.5)`;
      ctx.lineWidth   = 1;
      ctx.shadowBlur  = 4;
      ctx.stroke();
    }

    // Pulsing center dot
    const pulse = 0.6 + 0.4 * Math.sin(angle.current * 4);
    ctx.beginPath();
    ctx.arc(0, 0, 3 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${pulse})`;
    ctx.shadowBlur  = 12 * pulse;
    ctx.shadowColor = `rgba(${GOLD}, 0.9)`;
    ctx.fill();

    ctx.restore();

    // ── DOM cursor elements ───────────────────────────────────
    dot.style.transform =
      `translate(${x - 4}px, ${y - 4}px)`;

    const rs = isHover.current ? 34 : 22;
    ringEl.style.transform =
      `translate(${ring.current.x - rs / 2}px, ${ring.current.y - rs / 2}px)`;
    ringEl.style.width  = `${rs}px`;
    ringEl.style.height = `${rs}px`;
    ringEl.style.borderColor = isHover.current
      ? `rgba(${GOLD_LIGHT}, 0.9)` : `rgba(${GOLD}, 0.5)`;
    ringEl.style.boxShadow = isHover.current
      ? `0 0 24px rgba(${GOLD}, 0.6), 0 0 48px rgba(${GOLD}, 0.2)`
      : `0 0 10px rgba(${GOLD}, 0.2)`;
    ringEl.style.opacity = visible.current ? (isHover.current ? "1" : "0.55") : "0";

    raf.current = requestAnimationFrame(draw);
  }, []);

  // ── Setup ─────────────────────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const dot    = dotRef.current;
    const ringEl = ringRef.current;
    if (!canvas || !dot || !ringEl) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
      }
    };

    const onLeave  = () => { visible.current = false; dot.style.opacity = "0"; };
    const onEnter  = () => { visible.current = true;  dot.style.opacity = "1"; };

    const HOVER_SEL = "a, button, [role='button'], input, textarea, select, label, .hero-category-pill, .magnetic-hover";
    const onOver = (e) => { if (e.target.closest(HOVER_SEL)) isHover.current = true; };
    const onOut  = (e) => { if (e.target.closest(HOVER_SEL)) isHover.current = false; };
    const onClick = (e) => burst(e.clientX, e.clientY);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("click",      onClick);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    raf.current = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("click",      onClick);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [draw, burst, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Spiral canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          pointerEvents: "none",
          zIndex: 9999999,
          mixBlendMode: "screen",
        }}
      />

      {/* Tiny precise dot under spiral */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 8, height: 8, borderRadius: "50%",
          background: `rgb(${GOLD_LIGHT})`,
          boxShadow: `0 0 10px rgba(${GOLD}, 1)`,
          pointerEvents: "none",
          zIndex: 9999998,
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Lagging outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 28, height: 28, borderRadius: "50%",
          border: `1.5px solid rgba(${GOLD}, 0.5)`,
          pointerEvents: "none",
          zIndex: 9999997,
          opacity: 0,
          transition: "width .3s ease, height .3s ease, border-color .3s ease, box-shadow .3s ease, opacity .3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
