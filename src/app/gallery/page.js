"use client";
import { useState } from "react";
import RevealSection from "../components/RevealSection";

const CATEGORIES = ["All", "Weddings", "Corporate", "Private", "Festivals"];

const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80", alt: "Elegant Wedding Setup", cat: "Weddings" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80", alt: "Grand Ballroom Gala", cat: "Corporate" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80", alt: "Confetti Celebration", cat: "Private" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80", alt: "Festival Fireworks", cat: "Festivals" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80", alt: "Venue Styling", cat: "Weddings" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80", alt: "Corporate Conference", cat: "Corporate" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80", alt: "Candlelit Dinner", cat: "Private" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80", alt: "Music Festival Stage", cat: "Festivals" },
  { src: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=600&auto=format&fit=crop&q=80", alt: "Luxury Table Setting", cat: "Weddings" },
  { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80", alt: "Cocktail Evening", cat: "Corporate" },
  { src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&auto=format&fit=crop&q=80", alt: "Sparkler Celebration", cat: "Private" },
  { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&auto=format&fit=crop&q=80", alt: "Party Atmosphere", cat: "Festivals" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === active);

  return (
    <>
      {/* Hero */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Portfolio</p>
        <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
          Our <span className="gradient-text italic">Work</span>
        </h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">
          A curated selection of events we&#39;ve had the privilege to design and deliver.
        </p>
      </section>

      {/* Filter tabs */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-x mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`font-label-sm text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                active === c
                  ? "bg-primary text-on-primary-container"
                  : "glass-panel text-on-surface-variant hover:text-primary hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-x pb-stack-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g, i) => (
            <RevealSection key={`${g.src}-${active}`} delay={i * 60}>
              <div className="relative rounded-xl overflow-hidden group cursor-pointer image-hover-zoom aspect-[4/3]">
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1">{g.cat}</span>
                  <span className="font-headline-md text-lg text-on-surface">{g.alt}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-on-surface-variant py-20 font-body-md">No items in this category yet.</p>
        )}
      </section>
    </>
  );
}
