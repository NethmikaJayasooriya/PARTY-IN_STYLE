"use client";
import { useState } from "react";

export default function Lightbox({ src, alt, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            style={{ animation: "card-enter 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
          />
          <p className="absolute bottom-8 text-on-surface-variant font-label-sm text-sm uppercase tracking-widest">{alt}</p>
        </div>
      )}
    </>
  );
}
