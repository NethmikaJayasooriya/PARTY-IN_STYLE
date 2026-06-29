"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ============================================================
   KIDS-FIRST themed categories. Each drives the accent colour
   (data-jewel), the full-bleed hero image, dynamic copy and
   theme suggestions. Swap `img` for new client photos anytime.
   ============================================================ */
const EVENT_CATEGORIES = [
  {
    id: "superheroes",
    label: "Superheroes",
    icon: "shield",
    jewel: "heroblue",
    imgDesktop: "/images/hero-superhero-ls.webp",
    imgMobile: "/images/hero-superhero.webp",
    tagline: "Melbourne · Themed Kids Parties & Celebrations",
    heading: <>Themed kids parties Melbourne <span className="gradient-text">go wild for</span></>,
    description: "From Spider-Man and Batman to Avengers and custom hero themes — we design, style, and run the ultimate action-packed celebration. Custom backdrops, balloon garlands, prop hire, and full party coordination.",
    themeGroups: [
      { groupName: "Boys Favorites", themes: ["Spider-Man", "Batman", "Superman", "Avengers", "Ninja Turtles"] },
      { groupName: "Girls & Co-ed", themes: ["Spider-Gwen", "Miraculous Ladybug", "Superhero Girls", "Custom Hero Theme"] },
    ],
  },
  {
    id: "princess",
    label: "Princess & Barbie",
    icon: "diamond",
    jewel: "heropink",
    imgDesktop: "/images/hero-barbie-ls.webp",
    imgMobile: "/images/hero-barbie.webp",
    tagline: "Melbourne · Fairytale Kids Parties",
    heading: <>Magical princess & Barbie parties <span className="gradient-text">styled to perfection</span></>,
    description: "Step into a world of pink magic and fairytale dreams. From Barbie dreamhouses to Disney princesses and enchanted fairy gardens, we create picture-perfect luxury setups that make dreams come true.",
    themeGroups: [
      { groupName: "Girls Favorites", themes: ["Barbie Dreamhouse", "Disney Princess", "Frozen Fairytale", "Fairy Garden", "Unicorn & Rainbow"] },
      { groupName: "Co-ed & Neutral", themes: ["Mermaid Lagoon", "Alice in Wonderland", "Custom Princess Theme"] },
    ],
  },
  {
    id: "birthday",
    label: "1st Birthdays",
    icon: "cake",
    jewel: "blush",
    imgDesktop: "/images/hero-1stbday-ls.webp",
    imgMobile: "/images/hero-1stbday.webp",
    tagline: "Melbourne · Milestone Celebrations",
    heading: <>Bespoke milestone first birthdays <span className="gradient-text">to cherish forever</span></>,
    description: "Celebrate your little one's very first milestone with breathtaking pastel arches, elegant backdrops, and custom details. We handle every detail so you can focus on making memories.",
    themeGroups: [
      { groupName: "Boys Themes", themes: ["Little Prince", "Safari Adventure", "Teddy Bear Picnic", "Blue & Gold Luxe"] },
      { groupName: "Girls Themes", themes: ["Little Princess", "Floral Meadow", "Boho Rainbow", "Pink & Gold Luxe"] },
      { groupName: "Neutral / Unisex", themes: ["Pastel Luxe", "Boho Neutral", "Jungle Safari", "Custom Milestone"] },
    ],
  },
  {
    id: "themed",
    label: "Themed & Custom",
    icon: "palette",
    jewel: "amethyst",
    imgDesktop: "/images/hero-themed-ls.webp",
    imgMobile: "/images/hero-themed.webp",
    tagline: "Melbourne · Bespoke Event Styling",
    heading: <>Any theme they dream up, <span className="gradient-text">we bring to life</span></>,
    description: "Jungle safaris, magical mermaids, prehistoric dinosaurs, or out-of-this-world space adventures — if they can dream it, we can style it. Fully bespoke luxury party styling for all ages.",
    themeGroups: [
      { groupName: "Boys Themes", themes: ["Dinosaur World", "Outer Space", "Jungle Safari", "Under the Sea"] },
      { groupName: "Girls Themes", themes: ["Mermaid Magic", "Candyland", "Butterfly Garden", "Disco Party"] },
      { groupName: "Neutral / Co-ed", themes: ["Carnival / Circus", "Movie Night", "Farmyard", "Custom Theme Idea"] },
    ],
  },
  {
    id: "wedding",
    label: "Weddings",
    icon: "favorite",
    jewel: "emerald",
    imgDesktop: "/images/hero-wedding-ls.webp",
    imgMobile: "/images/hero-wedding.webp",
    tagline: "Melbourne · Luxury Wedding Styling",
    heading: <>Elegant luxury weddings <span className="gradient-text">crafted with love</span></>,
    description: "From intimate ceremonies to lavish receptions, we design sophisticated floral arrangements, stunning backdrops, and luxury table styling tailored to your unique love story.",
    themeGroups: [
      { groupName: "Wedding Styles", themes: ["Modern Luxe", "Classic White & Gold", "Rustic Romance", "Bohemian Chic", "Bespoke Styling"] },
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: "business_center",
    jewel: "gold",
    imgDesktop: "/images/hero-corporate-ls.webp",
    imgMobile: "/images/hero-corporate.webp",
    tagline: "Melbourne · Premium Corporate Events",
    heading: <>Polished corporate events <span className="gradient-text">that make an impact</span></>,
    description: "Elevate your brand with premium corporate event styling, EOFY celebrations, gala dinners, and product launches. Sophisticated, seamless, and tailored to your brand identity.",
    themeGroups: [
      { groupName: "Corporate Styling", themes: ["Gala Dinner Luxe", "EOFY Celebration", "Brand Launch", "Cocktail Party", "Custom Corporate Theme"] },
    ],
  },
];

const CYCLE_INTERVAL = 4500;

/* Decorative confetti + balloons (pure CSS, no images). */
const CONFETTI = [
  { l: "6%", d: 7, delay: 0, c: "#E86A8E" }, { l: "14%", d: 9, delay: 1.5, c: "#3C7DD6" },
  { l: "23%", d: 8, delay: 0.8, c: "#E6C766" }, { l: "34%", d: 10, delay: 2.2, c: "#9A6FD0" },
  { l: "44%", d: 7.5, delay: 0.4, c: "#4F9E82" }, { l: "55%", d: 9.5, delay: 1.1, c: "#E84C9A" },
  { l: "64%", d: 8.5, delay: 2.6, c: "#E6C766" }, { l: "73%", d: 7, delay: 0.6, c: "#3C7DD6" },
  { l: "82%", d: 10, delay: 1.9, c: "#E86A8E" }, { l: "91%", d: 8, delay: 0.2, c: "#9A6FD0" },
];
const BALLOONS = [
  { l: "8%", d: 22, delay: 0, c: "#F4A6BE" }, { l: "30%", d: 26, delay: 4, c: "#9CC2F0" },
  { l: "60%", d: 24, delay: 2, c: "#F3D98C" }, { l: "85%", d: 28, delay: 6, c: "#C2A3E8" },
];

export default function HeroForm({ settings = {} }) {
  const activeCategories = EVENT_CATEGORIES.map((cat) => ({
    ...cat,
    themeGroups: cat.themeGroups.map((g) => ({ ...g, themes: [...g.themes] })),
    img: settings[`heroImage_${cat.id}`] || cat.img,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formState, setFormState] = useState("idle"); // idle | sending | success
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    eventType: EVENT_CATEGORIES[0].label,
    theme: "",
    message: "",
  });
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const timerRef = useRef(null);
  const resumeRef = useRef(null);
  const eventDropdownRef = useRef(null);

  const active = activeCategories[activeIndex];
  const selectedCategory = activeCategories.find((c) => c.label === formData.eventType) || activeCategories[0];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeCategories.length);
    }, CYCLE_INTERVAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target)) setIsEventDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!hasInteracted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, eventType: activeCategories[activeIndex].label, theme: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, hasInteracted]);

  const pauseCycle = () => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setIsPaused(false), 15000);
  };

  const handleCategoryClick = (index) => {
    setActiveIndex(index);
    setFormData((prev) => ({ ...prev, eventType: activeCategories[index].label, theme: "" }));
    pauseCycle();
  };

  const handleChange = (e) => {
    setHasInteracted(true);
    setErrorMsg("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEventTypeChange = (e) => {
    const label = e.target.value;
    const idx = activeCategories.findIndex((c) => c.label === label);
    setHasInteracted(true);
    setErrorMsg("");
    if (idx >= 0) {
      setActiveIndex(idx);
      pauseCycle();
    }
    setFormData((prev) => ({ ...prev, eventType: label, theme: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { name, contact, location, eventType, theme, message } = formData;

    if (name.trim().length < 2) {
      setErrorMsg("Please enter a valid name.");
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[\d\s\+\-\(\)]{8,15}$/.test(contact);
    if (!isEmail && !isPhone) {
      setErrorMsg("Please enter a valid email or phone number.");
      return;
    }
    if (location.trim().length === 1) {
      setErrorMsg("Please enter a valid suburb, or leave it blank.");
      return;
    }

    setFormState("sending");
    try {
      await addDoc(collection(db, "inquiries"), {
        name: name.trim(),
        contact: contact.trim(),
        location: location.trim(),
        eventType,
        theme: theme || "",
        message: message || "",
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save inquiry:", err);
    }

    setTimeout(() => {
      setFormState("success");
      const text = `Hello Party in Style! 🎉
I would like to inquire about an event booking.

*Full Name:* ${name}
*Contact:* ${contact}
*Suburb:* ${location}
*Event Type:* ${eventType}${theme ? `\n*Theme:* ${theme}` : ""}
*Brief Details:* ${message || "N/A"}`;
      const whatsappUrl = `https://wa.me/61494334934?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        setFormState("idle");
        setHasInteracted(false);
        setFormData({ name: "", contact: "", location: "", eventType: active.label, theme: "", message: "" });
      }, 3000);
    }, 800);
  };

  return (
    <header
      data-jewel={active.jewel}
      className="hero-light hero-dynamic relative w-full min-h-screen flex items-center overflow-hidden -mt-20 pt-20"
    >
      {/* ===== FULL-BLEED CINEMATIC BACKGROUND (themed images cross-fade + ken-burns) ===== */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {activeCategories.map((cat, idx) => (
          <div
            key={cat.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${idx === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            {/* Desktop Landscape Image */}
            <Image
              src={cat.imgDesktop}
              alt={`${cat.label} party styling in Melbourne by Party in Style`}
              fill
              priority={idx < 2}
              sizes="100vw"
              quality={100}
              unoptimized
              className="object-cover hidden lg:block"
            />
            {/* Mobile Portrait/Original Image */}
            <Image
              src={cat.imgMobile}
              alt={`${cat.label} party styling in Melbourne by Party in Style`}
              fill
              priority={idx < 2}
              sizes="100vw"
              quality={100}
              unoptimized
              className="object-cover block lg:hidden"
            />
          </div>
        ))}
        {/* Premium legibility scrims - dark gradient so images pop and white text is readable */}
        {/* Base dark overlay for mobile to ensure text is always readable */}
        <div className="absolute inset-0 bg-black/20 lg:bg-transparent" />
        
        {/* Desktop legibility scrim (Left to right) */}
        <div className="hidden lg:block absolute inset-0" style={{ background: "linear-gradient(102deg, rgba(20,14,8,0.9) 0%, rgba(20,14,8,0.7) 35%, rgba(20,14,8,0.1) 60%, transparent 100%)" }} />
        
        {/* Mobile legibility scrim (Top to bottom, stronger at bottom where text is) */}
        <div className="block lg:hidden absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(20,14,8,0.6) 40%, rgba(20,14,8,0.95) 100%)" }} />

        {/* Seamless transition into the next section (Champagne Cream) */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, transparent 78%, #DDCEAE 100%)" }} />
        
        {/* Jewel tone overlay */}
        <div className="absolute inset-0 transition-[background] duration-700" style={{ background: "linear-gradient(115deg, color-mix(in srgb, var(--jewel) 35%, transparent), transparent 60%)" }} />
      </div>

      {/* Confetti + balloons (subtle, over the photo) */}
      <div className="confetti-layer z-[1]" aria-hidden="true">
        {CONFETTI.map((p, i) => (
          <span key={`c${i}`} className="confetti" style={{ left: p.l, background: p.c, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />
        ))}
        {BALLOONS.map((b, i) => (
          <span key={`b${i}`} className="balloon" style={{ left: b.l, background: b.c, animationDuration: `${b.d}s`, animationDelay: `${b.delay}s` }} />
        ))}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 md:px-margin-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-24 lg:pb-0">

          {/* LEFT — branding + dynamic copy + pills */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div key={activeIndex} className="animate-hero-reveal">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
                <span className="font-label-sm text-[11px] md:text-xs uppercase tracking-[0.32em] font-semibold text-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {active.tagline}
                </span>
              </div>

              <p className="brand-wordmark champagne-text text-glow-gold text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] mb-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Party in Style
              </p>

              <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.1] text-white font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                {active.heading}
              </h1>

              <p className="font-body-lg text-sm md:text-base text-white/95 max-w-xl mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-medium">
                {active.description}
              </p>
            </div>

            {/* Theme pills */}
            <div className="hidden lg:block animate-fade-up delay-200">
              <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0 md:flex-wrap md:overflow-visible gap-2.5 hide-scrollbar snap-x">
                {activeCategories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(i)}
                    data-jewel={cat.jewel}
                    className={`hero-category-pill whitespace-nowrap snap-start flex-shrink-0 ${i === activeIndex ? "active shadow-lg" : ""}`}
                    type="button"
                    aria-label={`Select ${cat.label}`}
                    aria-pressed={i === activeIndex}
                    suppressHydrationWarning
                  >
                    <span className="material-symbols-outlined text-base">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 animate-fade-up delay-300">
              {[
                { icon: "verified", t: "Free consultation" },
                { icon: "schedule", t: "24-hr response" },
                { icon: "celebration", t: "500+ events styled" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                  <span className="font-label-sm text-xs text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{b.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — highlighted enquiry form floating over the photo */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:flex lg:justify-end mt-12 lg:mt-0">
            <div className="bg-[#0C0805]/85 backdrop-blur-xl border border-[#C9A24B]/30 shadow-[0_0_50px_rgba(201,162,75,0.15)] rounded-3xl p-6 md:p-8 relative overflow-hidden w-full lg:max-w-md animate-fade-up delay-200">
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A24B]/30 to-[#C9A24B]/5 flex items-center justify-center flex-shrink-0 shadow-inner border border-[#C9A24B]/20">
                    <span className="material-symbols-outlined text-[#EAD08A] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
                  </div>
                  <div className="pt-1">
                    <h2 className="font-headline-md text-[22px] text-white leading-snug">Get a free quote</h2>
                    <p className="font-body-md text-xs text-[#C8BDA5] mt-1.5 leading-relaxed">Quick details — we reply within 24 hours. No obligation to book.</p>
                  </div>
                </div>

                {formState === "success" ? (
                  <div role="alert" aria-live="polite" className="flex flex-col items-center justify-center py-10 gap-4" style={{ animation: "scaleIn 0.5s ease both" }}>
                    <div className="w-16 h-16 rounded-full bg-emerald/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h3 className="font-headline-md text-xl text-white">Thank you!</h3>
                    <p className="font-body-md text-sm text-[#C8BDA5] text-center max-w-xs">We&#39;ve received your enquiry and opened WhatsApp so you can send it instantly. We&#39;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Quick enquiry form">
                    <div className="relative" ref={eventDropdownRef}>
                      <label className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#C8BDA5] mb-1.5 ml-1 block">Event Type</label>
                      <div
                        className="relative cursor-pointer w-full flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-[#C9A24B]/30 rounded-xl transition-all duration-300 hover:border-[#C9A24B]/60 hover:bg-white/10"
                        onClick={() => setIsEventDropdownOpen((o) => !o)}
                        role="button" aria-haspopup="listbox" aria-expanded={isEventDropdownOpen} tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsEventDropdownOpen((o) => !o); } }}
                        style={{ borderColor: isEventDropdownOpen ? "#EAD08A" : "", boxShadow: isEventDropdownOpen ? "0 0 0 4px rgba(201,162,75,0.15)" : "" }}
                        suppressHydrationWarning
                      >
                        <span className="material-symbols-outlined text-[#EAD08A] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{selectedCategory.icon}</span>
                        <span className="font-label-sm text-sm text-white font-semibold flex-1">{selectedCategory.label}</span>
                        <span className={`material-symbols-outlined text-[#EAD08A]/60 text-xl transition-transform duration-300 ${isEventDropdownOpen ? "rotate-180" : ""}`}>expand_more</span>
                      </div>
                      <div className={`absolute left-0 right-0 z-50 mt-2 bg-[#1A130D] border border-[#C9A24B]/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${isEventDropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`} role="listbox">
                        <div className="py-2 max-h-60 overflow-y-auto">
                          {activeCategories.map((c) => {
                            const isSel = c.label === formData.eventType;
                            return (
                              <div key={c.id} role="option" aria-selected={isSel}
                                className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center gap-3 ${isSel ? "text-[#EAD08A] bg-[#C9A24B]/10 font-bold" : "text-[#C8BDA5] hover:bg-white/5 hover:text-[#EAD08A] font-medium"}`}
                                onClick={() => { handleEventTypeChange({ target: { value: c.label } }); setIsEventDropdownOpen(false); }}>
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isSel ? "'FILL' 1" : "'FILL' 0" }}>{c.icon}</span>
                                {c.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-name" className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#C8BDA5] mb-1.5 ml-1 block">Your Name *</label>
                      <input type="text" name="name" id="hero-name" value={formData.name} onChange={handleChange} required placeholder="e.g. Sarah Williams" className="w-full px-4 py-3.5 bg-white/5 border border-[#C9A24B]/30 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 placeholder:font-medium focus:outline-none focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 transition-all duration-300" suppressHydrationWarning />
                    </div>
                    <div>
                      <label htmlFor="hero-contact" className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#C8BDA5] mb-1.5 ml-1 block">Email or Phone *</label>
                      <input type="text" name="contact" id="hero-contact" value={formData.contact} onChange={handleChange} required placeholder="e.g. 04XX XXX XXX" className="w-full px-4 py-3.5 bg-white/5 border border-[#C9A24B]/30 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 placeholder:font-medium focus:outline-none focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 transition-all duration-300" suppressHydrationWarning />
                    </div>
                    <div>
                      <label htmlFor="hero-location" className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#C8BDA5] mb-1.5 ml-1 block">Suburb (Optional)</label>
                      <input type="text" name="location" id="hero-location" value={formData.location} onChange={handleChange} placeholder="e.g. Cranbourne, Berwick" className="w-full px-4 py-3.5 bg-white/5 border border-[#C9A24B]/30 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 placeholder:font-medium focus:outline-none focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 transition-all duration-300" suppressHydrationWarning />
                    </div>

                    <div className="flex flex-col gap-3 mt-3">
                      {errorMsg && (<p className="text-red-500 font-label-sm text-xs text-center bg-red-500/10 py-2.5 rounded-lg border border-red-500/20">{errorMsg}</p>)}
                      <button type="submit" disabled={formState === "sending"}
                        className="bg-gradient-to-r from-[#C9A24B] to-[#EAD08A] text-[#140E08] font-label-sm text-[13px] font-bold px-8 py-4 rounded-xl uppercase tracking-[0.2em] hover:brightness-110 hover:shadow-[0_15px_30px_rgba(201,162,75,0.4)] transition-all duration-300 flex justify-center items-center gap-3 w-full disabled:opacity-60 shadow-[0_10px_20px_rgba(201,162,75,0.25)] relative overflow-hidden"
                        suppressHydrationWarning>
                        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] hover:animate-[sheen_2s_ease-in-out_infinite]" />
                        {formState === "sending" ? (<><span className="hero-spinner border-[#140E08] border-t-transparent" />SENDING...</>) : (<><span className="material-symbols-outlined text-base">send</span>GET MY FREE QUOTE</>)}
                      </button>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <p className="text-center font-label-sm text-[10.5px] text-[#C8BDA5] font-medium">Instant WhatsApp reply from our team.</p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-1" style={{ animation: "scroll-hint 2s ease-in-out infinite" }}>
          <span className="font-label-sm text-[10px] uppercase tracking-[0.3em] pl-[0.3em]" style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.75)" }}>Scroll</span>
          <span className="material-symbols-outlined text-lg" style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.75)" }}>expand_more</span>
        </div>
      </div>
    </header>
  );
}
