"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const EVENT_CATEGORIES = [
  {
    id: "birthday",
    label: "Birthdays",
    icon: "cake",
    img: "/images/hero-birthday.webp",
    tagline: "Make Their Special Day Magical",
    themes: ["Premium Gold", "Midnight Black", "Rose Gold Elegance", "Tropical Luxe", "Custom Theme"],
  },
  {
    id: "themed",
    label: "Themed Parties",
    icon: "theater_comedy",
    img: "/images/hero-themed.webp",
    tagline: "Unique Themes, Unforgettable Moments",
    themes: ["Neon Night", "Classic Elegance", "Festival Luxe", "Custom Theme"],
  },
  {
    id: "wedding",
    label: "Weddings",
    icon: "favorite",
    img: "/images/hero-wedding-user.webp",
    tagline: "Your Dream Day, Perfectly Styled",
    themes: [],
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: "business_center",
    img: "/images/hero-corporate-user.webp",
    tagline: "Impress. Engage. Elevate.",
    themes: [],
  },
  {
    id: "festival",
    label: "Festivals",
    icon: "nightlife",
    img: "/images/hero-festival.webp",
    tagline: "Grand-Scale Celebrations",
    themes: [],
  },
];

const CYCLE_INTERVAL = 5000;

export default function HeroForm({ settings = {} }) {
  // Use dynamic settings from CMS if available
  const activeCategories = EVENT_CATEGORIES.map(cat => {
    const dynamicImg = settings[`heroImage_${cat.id}`];
    // Fallback to legacy single heroImage for birthday if dynamicImg isn't set yet
    if (cat.id === "birthday" && !dynamicImg && settings.heroImage) {
      return { ...cat, themes: [...cat.themes], img: settings.heroImage };
    }
    return { ...cat, themes: [...cat.themes], img: dynamicImg || cat.img };
  });
  
  if (settings.eventThemesNew) {
    activeCategories.forEach(cat => {
      if (cat.id === "birthday") {
        cat.themes = settings.eventThemesNew.birthday || cat.themes;
      } else if (cat.id === "themed") {
        cat.themes = settings.eventThemesNew.party || cat.themes;
      }
    });
  } else if (settings.eventThemes && settings.eventThemes.length > 0) {
    // Fallback for older data format
    activeCategories.forEach(cat => {
      if (cat.id === "birthday" || cat.id === "themed") {
        cat.themes = settings.eventThemes;
      }
    });
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formState, setFormState] = useState("idle"); // idle | sending | success
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    eventType: activeCategories[0].label,
    theme: "",
    message: "",
  });
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const timerRef = useRef(null);
  const resumeRef = useRef(null);
  const dropdownRef = useRef(null);

  const active = activeCategories[activeIndex];
  const selectedCategory = activeCategories.find(c => c.label === formData.eventType) || activeCategories[0];

  // Auto-cycle
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeCategories.length);
    }, CYCLE_INTERVAL);
  }, []);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync event type when category changes
  useEffect(() => {
    if (!hasInteracted) {
      setFormData((prev) => ({
        ...prev,
        eventType: activeCategories[activeIndex].label,
        theme: "",
      }));
    }
  }, [activeIndex, hasInteracted]);

  const handleCategoryClick = (index) => {
    setActiveIndex(index);
    setFormData((prev) => ({
      ...prev,
      eventType: activeCategories[index].label,
      theme: "",
    }));
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setIsPaused(false), 15000);
  };

  const handleChange = (e) => {
    setHasInteracted(true);
    setErrorMsg("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { name, contact, location, eventType, theme, message } = formData;
    
    // Strict Validation
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

    if (location.trim().length < 2) {
      setErrorMsg("Please enter a valid suburb.");
      return;
    }

    setFormState("sending");
    
    // Save inquiry to Firestore
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
      // Continue to WhatsApp even if Firestore fails
    }

    setTimeout(() => {
      setFormState("success");
      
      // Construct WhatsApp Message
      const text = `Hello Party in Style! 🎉
I would like to inquire about an event booking.

*Full Name:* ${name}
*Contact:* ${contact}
*Suburb:* ${location}
*Event Type:* ${eventType}${theme ? `\n*Theme:* ${theme}` : ""}
*Brief Details:* ${message || "N/A"}`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/61494334934?text=${encodedText}`;
      
      // Redirect to WhatsApp
      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        setFormState("idle");
        setHasInteracted(false);
        setFormData({
          name: "",
          contact: "",
          location: "",
          eventType: active.label,
          theme: "",
          message: "",
        });
      }, 3000);
    }, 800);
  };

  return (
    <header
      className="hero-dynamic relative w-full min-h-screen flex items-center justify-center overflow-hidden -mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ===== BACKGROUND IMAGES ===== */}
      {activeCategories.map((cat, i) => (
        <div
          key={cat.id}
          className="absolute inset-0 z-0"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "opacity",
            backfaceVisibility: "hidden",
            backgroundColor: "#0c0d0e",
          }}
        >
          <Image
            alt={`Luxury ${cat.label.toLowerCase()} event styling and design in Melbourne`}
            className="w-full h-full object-cover"
            style={{
              animation: i === activeIndex ? "slowZoom 20s ease-in-out alternate infinite" : "none",
              filter: "brightness(0.5) contrast(1.1)",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
            src={cat.img}
            fill
            sizes="100vw"
            priority={i < 2}
            loading={i < 2 ? "eager" : "lazy"}
            unoptimized
          />
        </div>
      ))}

      {/* Darker gradient overlays to ensure text readability */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(12,13,14,0.75) 0%, rgba(12,13,14,0.4) 40%, rgba(12,13,14,0.85) 85%, rgba(12,13,14,1) 100%)"
      }} />
      <div className="absolute inset-0 z-[1] hidden lg:block" style={{
        background: "linear-gradient(to right, rgba(12,13,14,0.95) 0%, rgba(12,13,14,0.7) 40%, rgba(12,13,14,0.2) 65%, transparent 85%)"
      }} />
      <div className="sparkle-overlay" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 w-full max-w-container-max mx-auto px-6 md:px-margin-x pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh]">
          {/* LEFT — Branding + Category Tabs */}
          <div className="flex flex-col gap-6">
            <div className="animate-hero-reveal">
              <h1 className="font-display-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                <span className="text-white font-bold tracking-wide">Unforgettable Events,</span>
                <br />
                <span className="gradient-text italic font-medium">Styled to Perfection.</span>
              </h1>
              <p className="font-body-lg text-sm md:text-base text-[#f0eeeb] max-w-lg font-medium tracking-wide mt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 p-2 rounded-lg backdrop-blur-sm -ml-2">
                Australia&#39;s premier event planners — from kids&#39; themed birthdays to grand galas. Tell us what you need, we&#39;ll make it happen.
              </p>
            </div>

            {/* Step indicator: 1 → Select Event, 2 → Fill Form */}
            <div className="animate-fade-up delay-200 flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 drop-shadow-md">
              <div className="flex items-center gap-2">
                <span className="hero-step-number bg-primary/20 border border-primary/40 text-primary font-bold">1</span>
                <span className="font-label-sm text-[11px] text-[#f0eeeb] uppercase tracking-wider font-semibold">Pick your event</span>
              </div>
              <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
              <div className="flex items-center gap-2">
                <span className="hero-step-number bg-primary/20 border border-primary/40 text-primary font-bold">2</span>
                <span className="font-label-sm text-[11px] text-[#f0eeeb] uppercase tracking-wider font-semibold">Quick enquiry</span>
              </div>
              <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
              <div className="flex items-center gap-2">
                <span className="hero-step-number bg-primary/20 border border-primary/40 text-primary font-bold">3</span>
                <span className="font-label-sm text-[11px] text-[#f0eeeb] uppercase tracking-wider font-semibold">We call you</span>
              </div>
            </div>

            <div className="animate-fade-up delay-300 mt-2">
              <div className="flex flex-wrap gap-2">
                {activeCategories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(i)}
                    className={`hero-category-pill ${i === activeIndex ? "active" : ""}`}
                    type="button"
                    aria-label={`Select ${cat.label} category`}
                    aria-pressed={i === activeIndex}
                    suppressHydrationWarning
                  >
                    <span className="material-symbols-outlined text-base">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active category tagline */}
            <div className="animate-fade-up delay-400 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="gold-line-left" />
                <p
                  className="font-headline-md text-lg text-on-surface-variant/80 italic transition-all duration-500"
                  key={active.id}
                  style={{ animation: "fadeInUp 0.5s ease both" }}
                >
                  {active.tagline}
                </p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 items-center animate-fade-up delay-500">
              {activeCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleCategoryClick(i)}
                  className="relative rounded-full overflow-hidden transition-all duration-500 py-5"
                  style={{
                    width: i === activeIndex ? "32px" : "12px",
                  }}
                  type="button"
                  aria-label={`Go to ${activeCategories[i].label}`}
                  suppressHydrationWarning
                >
                  <span 
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full transition-colors duration-500 overflow-hidden"
                    style={{
                      backgroundColor: i === activeIndex ? "rgba(212,175,55,0.6)" : "rgba(212,175,55,0.15)",
                    }}
                  >
                    {i === activeIndex && !isPaused && (
                      <span
                        className="absolute inset-0 bg-primary rounded-full"
                        style={{ animation: `progressFill ${CYCLE_INTERVAL}ms linear` }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Quick Inquiry Form */}
          <div className="animate-fade-up delay-400 lg:flex lg:justify-end">
            <div className="hero-form-panel rounded-2xl p-6 md:p-8 relative overflow-hidden animated-border w-full lg:max-w-md">
              <div className="sparkle-overlay opacity-10" />
              <div className="relative z-10">
                {/* Form header — clear purpose */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-xl text-on-surface leading-snug">Plan Your Event</h2>
                    <p className="font-body-md text-xs text-on-surface-variant/60 mt-1">
                      Fill in the basics — we&#39;ll get back within 24 hours with a free quote.
                    </p>
                  </div>
                </div>

                {formState === "success" ? (
                  <div role="alert" aria-live="polite" className="flex flex-col items-center justify-center py-10 gap-4" style={{ animation: "scaleIn 0.5s ease both" }}>
                    <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h3 className="font-headline-md text-xl text-on-surface">Thank You!</h3>
                    <p className="font-body-md text-sm text-on-surface-variant text-center max-w-xs">
                      We&#39;ve received your enquiry. Our team will reach out shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Quick enquiry form">
                    {/* Event type — clear label above */}
                    <div>
                      <label className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-[0.15em] mb-1.5 block">
                        Event Type
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-primary/20 bg-primary/5">
                        <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{selectedCategory.icon}</span>
                        <span className="font-label-sm text-sm text-primary font-medium flex-1">{selectedCategory.label}</span>
                        <span className="font-label-sm text-[9px] text-on-surface-variant/40 uppercase tracking-wider bg-primary/8 px-2 py-0.5 rounded-full">
                          {hasInteracted ? "Selected" : "Auto-selected"}
                        </span>
                      </div>
                    </div>

                    {/* Theme selector (only for categories with themes) */}
                    {selectedCategory.themes.length > 0 && (
                      <div className="hero-form-field" ref={dropdownRef}>
                        <label className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-[0.15em] mb-1.5 block">
                          Preferred Theme
                        </label>
                        <div 
                          className="relative cursor-pointer w-full bg-transparent border-0 border-b border-outline/30 text-on-surface font-body-md text-sm py-2.5 px-0 transition-colors flex justify-between items-center"
                          onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                          style={{ borderBottomColor: isThemeDropdownOpen ? '#d4af37' : '' }}
                        >
                          <span className={formData.theme ? "text-on-surface" : "text-on-surface-variant"}>
                            {formData.theme || "e.g. Batman, Princess, Spiderman…"}
                          </span>
                          <span className={`material-symbols-outlined text-primary/40 text-lg transition-transform duration-300 ${isThemeDropdownOpen ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </div>
                        
                        <div 
                          className={`absolute left-0 right-0 z-50 mt-2 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${isThemeDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                        >
                          <div className="max-h-60 overflow-y-auto py-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.3) transparent' }}>
                            {selectedCategory.themes.map((t) => (
                              <div 
                                key={t}
                                className="px-5 py-3 text-sm text-on-surface hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group"
                                onClick={() => {
                                  setHasInteracted(true);
                                  setFormData((prev) => ({ ...prev, theme: t }));
                                  setIsThemeDropdownOpen(false);
                                }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-transform duration-300" />
                                {t}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Name */}
                    <div className="hero-form-field relative">
                      <input
                        type="text"
                        name="name"
                        id="hero-name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="hero-input peer placeholder-transparent"
                        suppressHydrationWarning
                      />
                      <label htmlFor="hero-name" className="hero-label">
                        Your Name *
                      </label>
                    </div>

                    {/* Contact */}
                    <div className="hero-form-field relative">
                      <input
                        type="text"
                        name="contact"
                        id="hero-contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        placeholder="Email or Phone"
                        className="hero-input peer placeholder-transparent"
                        suppressHydrationWarning
                      />
                      <label htmlFor="hero-contact" className="hero-label">
                        Email or Phone *
                      </label>
                    </div>

                    {/* Location */}
                    <div className="hero-form-field relative">
                      <input
                        type="text"
                        name="location"
                        id="hero-location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Suburb (Melbourne Only)"
                        className="hero-input peer placeholder-transparent"
                        suppressHydrationWarning
                      />
                      <label htmlFor="hero-location" className="hero-label">
                        Suburb (Melbourne Only) *
                      </label>
                    </div>

                    {/* Quick message */}
                    <div className="hero-form-field relative">
                      <textarea
                        name="message"
                        id="hero-message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your vision..."
                        rows="2"
                        className="hero-input peer placeholder-transparent resize-none"
                        suppressHydrationWarning
                      />
                      <label htmlFor="hero-message" className="hero-label">
                        Quick Message (Optional)
                      </label>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-2">
                      {errorMsg && (
                        <p className="text-red-400 font-label-sm text-xs text-center bg-red-400/10 py-2 rounded-sm border border-red-400/20">
                          {errorMsg}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={formState === "sending"}
                        className="bg-primary text-on-primary-container font-label-sm text-xs font-bold px-8 py-3.5 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-all flex justify-center items-center gap-3 w-full disabled:opacity-60"
                        suppressHydrationWarning
                      >
                        {formState === "sending" ? (
                          <>
                            <span className="hero-spinner" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">send</span>
                            Get Free Quote
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust signals */}
                    <div className="flex items-center justify-center gap-5 mt-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary/40 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant/50">Free Consultation</span>
                      </div>
                      <div className="w-px h-3 bg-outline/20" />
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary/40 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant/50">24hr Response</span>
                      </div>
                      <div className="w-px h-3 bg-outline/20" />
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary/40 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant/50">No Obligation</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 z-20 w-full flex justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-2" style={{ animation: "scroll-hint 2s ease-in-out infinite" }}>
          <span className="font-label-sm text-[10px] text-primary/60 uppercase tracking-[0.3em]" style={{ paddingLeft: "0.3em" }}>Scroll</span>
          <span className="material-symbols-outlined text-primary/40 text-lg">expand_more</span>
        </div>
      </div>
    </header>
  );
}
