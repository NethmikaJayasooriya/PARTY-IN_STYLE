"use client";
import { useState, useMemo, useEffect } from "react";
import RevealSection from "../components/RevealSection";
import Lightbox from "../components/Lightbox";
import JsonLd from "../components/JsonLd";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { GALLERY_ITEMS, CATEGORIES } from "./galleryData";

function isVideo(src) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [mediaType, setMediaType] = useState("all"); // "all", "image", "video"
  const [items, setItems] = useState(GALLERY_ITEMS); // curated fallback shown instantly
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        // Only override the curated set if Firestore actually has items
        if (!snap.empty) {
          setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        // Permissions/offline — keep the curated fallback, no crash
        console.warn("Gallery: using curated fallback set.", err?.code || err);
      }
    };
    fetchGallery();
  }, []);

  const filtered = useMemo(() => {
    let result = items;
    if (active !== "All") {
      result = result.filter(g => g.cat === active);
    }
    if (mediaType === "video") {
      result = result.filter(g => isVideo(g.src));
    } else if (mediaType === "image") {
      result = result.filter(g => !isVideo(g.src));
    }
    return result;
  }, [active, items, mediaType]);

  const visibleItems = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  // Count per category
  const counts = useMemo(() => {
    const c = {};
    let baseItems = items;
    if (mediaType === "video") baseItems = items.filter(g => isVideo(g.src));
    if (mediaType === "image") baseItems = items.filter(g => !isVideo(g.src));

    CATEGORIES.forEach((cat) => {
      c[cat] = cat === "All" ? baseItems.length : baseItems.filter((g) => g.cat === cat).length;
    });
    return c;
  }, [items, mediaType]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Gallery", item: "https://partyinstyle.com.au/gallery" }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      {/* ── Hero Header ── */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Portfolio</p>
        <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
          Our <span className="gradient-text italic">Work</span>
        </h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">
          A curated collection of events we&#39;ve had the privilege to design and deliver. Click any piece to explore.
        </p>
      </section>

      {/* ── Instagram-Style Media Tabs ── */}
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <div className="flex justify-center border-t border-outline/20">
          <button
            onClick={() => { setMediaType("all"); setVisibleCount(12); }}
            className={`px-8 md:px-12 py-4 transition-colors duration-300 flex justify-center items-center flex-col gap-1 -mt-[1px] ${
              mediaType === "all" ? "text-primary border-t-[3px] border-primary" : "text-on-surface-variant hover:text-on-surface border-t-[3px] border-transparent"
            }`}
            title="All Posts"
          >
            <span className="material-symbols-outlined text-[32px]">grid_on</span>
          </button>
          <button
            onClick={() => { setMediaType("image"); setVisibleCount(12); }}
            className={`px-8 md:px-12 py-4 transition-colors duration-300 flex justify-center items-center flex-col gap-1 -mt-[1px] ${
              mediaType === "image" ? "text-primary border-t-[3px] border-primary" : "text-on-surface-variant hover:text-on-surface border-t-[3px] border-transparent"
            }`}
            title="Photos"
          >
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </button>
          <button
            onClick={() => { setMediaType("video"); setVisibleCount(12); }}
            className={`px-8 md:px-12 py-4 transition-colors duration-300 flex justify-center items-center flex-col gap-1 -mt-[1px] ${
              mediaType === "video" ? "text-primary border-t-[3px] border-primary" : "text-on-surface-variant hover:text-on-surface border-t-[3px] border-transparent"
            }`}
            title="Videos"
          >
            <span className="material-symbols-outlined text-[32px]">movie</span>
          </button>
        </div>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-x mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setActive(c); setVisibleCount(12); }}
              className={`font-label-sm text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                active === c
                  ? "bg-primary text-on-primary-container shadow-lg shadow-primary/20"
                  : "glass-panel text-on-surface-variant hover:text-primary hover:border-primary/30"
              }`}
            >
              {c}
              <span className={`text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center ${
                active === c ? "bg-on-primary-container/20 text-on-primary-container" : "bg-outline/20 text-on-surface-variant/60"
              }`}>
                {counts[c]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Masonry Gallery Grid ── */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-x pb-stack-md">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant font-light">No items found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
              {visibleItems.map((g, i) => (
                <RevealSection key={`${g.id || g.src}-${active}`} delay={i * 60}>
                  <Lightbox src={g.src} alt={g.alt} galleryItems={g.type === "carousel" ? g.images : filtered} currentIndex={g.type === "carousel" ? 0 : i}>
                    <div className="relative rounded-xl overflow-hidden group aspect-square">
                      {/* Image or Video thumbnail */}
                      {isVideo(g.src) ? (
                        <video
                          src={g.src}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onMouseOver={(e) => e.target.play()}
                          onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                          poster={g.poster}
                        />
                      ) : (
                        <img
                          src={g.src}
                          alt={g.alt}
                          width={800}
                          height={g.aspect === "tall" ? 1067 : g.aspect === "wide" ? 450 : 600}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                        <span className="font-label-sm text-[10px] text-primary uppercase tracking-[0.2em] mb-1">{g.cat}</span>
                        <span className="font-body-md text-sm text-on-surface leading-snug line-clamp-2">{g.alt}</span>
                      </div>

                      {/* Top-right action icon */}
                      <div className={`absolute top-3 right-3 transition-all duration-300 ${isVideo(g.src) || g.type === "carousel" ? "opacity-100" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"}`}>
                        {g.type === "carousel" ? (
                          <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border border-primary/20 shadow-md">
                            <span className="material-symbols-outlined text-primary text-lg">photo_library</span>
                          </div>
                        ) : isVideo(g.src) ? (
                          <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border border-primary/20 shadow-md">
                            <span className="material-symbols-outlined text-primary text-lg">play_arrow</span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-lg">zoom_in</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Lightbox>
                </RevealSection>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-16 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="bg-transparent border border-primary/30 text-primary font-label-sm text-xs font-semibold px-8 py-3 rounded-full uppercase tracking-[0.15em] hover:bg-primary/10 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Lightbox Component ── */}
      <Lightbox items={filtered} />
    </>
  );
}
