"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ src, alt, children }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer h-full w-full">
        {children}
      </div>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors z-10"
            onClick={() => setOpen(false)}
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl cursor-default relative z-10"
            style={{ animation: "card-enter 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 text-on-surface-variant font-label-sm text-sm uppercase tracking-widest z-10">{alt}</p>
        </div>,
        document.body
      )}
    </>
  );
}
