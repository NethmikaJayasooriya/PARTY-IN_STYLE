"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

function isVideo(src) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
}

export default function Lightbox({ src, alt, children, galleryItems, currentIndex }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex || 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentIndex !== undefined) setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!open) return;
    if (e.key === "Escape") setOpen(false);
    if (galleryItems) {
      if (e.key === "ArrowRight") setActiveIndex((p) => (p + 1) % galleryItems.length);
      if (e.key === "ArrowLeft") setActiveIndex((p) => (p - 1 + galleryItems.length) % galleryItems.length);
    }
  }, [open, galleryItems]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeSrc = galleryItems ? galleryItems[activeIndex]?.src : src;
  const activeAlt = galleryItems ? galleryItems[activeIndex]?.alt : alt;

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer h-full w-full">
        {children}
      </div>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-background/95 backdrop-blur-md"
          style={{ animation: "fade-in 0.3s ease both" }}
          onClick={() => setOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors z-20"
            onClick={() => setOpen(false)}
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Navigation arrows */}
          {galleryItems && galleryItems.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((p) => (p - 1 + galleryItems.length) % galleryItems.length); }}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((p) => (p + 1) % galleryItems.length); }}
                aria-label="Next"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            </>
          )}

          {/* Media content */}
          {isVideo(activeSrc) ? (
            <video
              src={activeSrc}
              controls
              autoPlay
              playsInline
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl cursor-default relative z-10"
              style={{ animation: "card-enter 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={activeSrc}
              alt={activeAlt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl cursor-default relative z-10"
              style={{ animation: "card-enter 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {/* Caption + counter */}
          <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
            <p className="text-on-surface-variant font-label-sm text-sm uppercase tracking-widest text-center max-w-lg px-4">{activeAlt}</p>
            {galleryItems && (
              <p className="text-on-surface-variant/50 font-label-sm text-xs">
                {activeIndex + 1} / {galleryItems.length}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
