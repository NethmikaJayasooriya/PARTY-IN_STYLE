"use client";
import { useState } from "react";
import RevealSection from "../components/RevealSection";
import Lightbox from "../components/Lightbox";

const CATEGORIES = ["All", "Weddings", "Corporate", "Private", "Festivals"];

const GALLERY_ITEMS = [
  { src: "/images/wedding.jpg", alt: "Elegant Wedding Setup", cat: "Weddings" },
  { src: "/images/hero.jpg", alt: "Grand Ballroom Gala", cat: "Corporate" },
  { src: "/images/party.jpg", alt: "Confetti Celebration", cat: "Private" },
  { src: "/images/festival.jpg", alt: "Festival Fireworks", cat: "Festivals" },
  { src: "/images/venue.jpg", alt: "Venue Styling", cat: "Weddings" },
  { src: "/images/corporate.jpg", alt: "Corporate Conference", cat: "Corporate" },
  { src: "/images/candles.jpg", alt: "Candlelit Dinner", cat: "Private" },
  { src: "/images/concert.jpg", alt: "Music Festival Stage", cat: "Festivals" },
  { src: "/images/table.jpg", alt: "Luxury Table Setting", cat: "Weddings" },
  { src: "/images/cocktail.jpg", alt: "Cocktail Evening", cat: "Corporate" },
  { src: "/images/sparklers.jpg", alt: "Sparkler Celebration", cat: "Private" },
  { src: "/images/atmosphere.jpg", alt: "Party Atmosphere", cat: "Festivals" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === active);

  return (
    <>
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Portfolio</p>
        <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">Our <span className="gradient-text italic">Work</span></h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">A curated selection of events we&#39;ve had the privilege to design and deliver. Click any image to view full-size.</p>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`font-label-sm text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                active === c ? "bg-primary text-on-primary-container" : "glass-panel text-on-surface-variant hover:text-primary hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-container-max mx-auto px-6 md:px-margin-x pb-stack-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g, i) => (
            <RevealSection key={`${g.src}-${active}`} delay={i * 60}>
              <Lightbox src={g.src} alt={g.alt}>
                <div className="relative rounded-xl overflow-hidden group image-hover-zoom magnetic-hover aspect-[4/3]">
                  <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1">{g.cat}</span>
                    <span className="font-headline-md text-lg text-on-surface">{g.alt}</span>
                    <span className="material-symbols-outlined text-primary/60 absolute top-4 right-4 text-xl">zoom_in</span>
                  </div>
                </div>
              </Lightbox>
            </RevealSection>
          ))}
        </div>
      </section>
    </>
  );
}
