"use client";
import Link from "next/link";
import RevealSection from "./components/RevealSection";

const STATS = [
  { value: "500+", label: "Events Delivered" },
  { value: "12", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3", label: "Cities Across AU" },
];

const SERVICES_PREVIEW = [
  { icon: "favorite", title: "Weddings", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80" },
  { icon: "business_center", title: "Corporate Events", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80" },
  { icon: "celebration", title: "Private Parties", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80" },
];

const TESTIMONIALS = [
  { name: "Sarah & James", role: "Wedding, Sydney", text: "Absolutely beyond our wildest dreams. Every detail was perfect — from the floral installations to the surprise fireworks. Truly once in a lifetime." },
  { name: "Michael Torres", role: "CEO, Nexus Group", text: "Our annual gala was the talk of the industry. The team's attention to detail and creative vision transformed our event into something extraordinary." },
  { name: "Priya Sharma", role: "40th Birthday, Melbourne", text: "They turned my birthday into a magazine-worthy celebration. The venue styling was breathtaking and the coordination was seamless." },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Gala"
            className="w-full h-full object-cover"
            style={{ animation: "slowZoom 20s ease-in-out alternate infinite" }}
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="sparkle-overlay" />
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-6">
          <img
            src="/logo.png"
            alt="Party in Style"
            className="h-28 md:h-36 w-auto mb-2 animate-hero-reveal"
            style={{ filter: "drop-shadow(0 2px 12px rgba(212,175,55,0.4))" }}
          />
          <h1 className="font-display-xl text-5xl md:text-7xl lg:text-8xl animate-hero-reveal delay-200 leading-tight">
            <span className="gradient-text-white">Unforgettable Events,</span>
            <br />
            <span className="gradient-text italic font-light">Styled to Perfection.</span>
          </h1>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl font-light tracking-wide animate-fade-up delay-400">
            Australia&#39;s premier event planners. Curating exclusive, high-octane experiences for a discerning clientele.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-up delay-600">
            <Link
              href="/contact"
              className="bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors flex items-center gap-3"
            >
              <span>Plan Your Event</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/gallery"
              className="border border-primary/30 text-primary font-label-sm text-xs px-10 py-4 rounded-sm uppercase tracking-[0.2em] hover:bg-primary/10 transition-colors flex items-center gap-3"
            >
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2" style={{ animation: "scroll-hint 2s ease-in-out infinite" }}>
          <span className="font-label-sm text-[10px] text-primary/60 uppercase tracking-[0.3em]">Scroll</span>
          <span className="material-symbols-outlined text-primary/40 text-lg">expand_more</span>
        </div>
      </header>

      {/* ===== STATS ===== */}
      <RevealSection>
        <div className="relative py-16 border-y border-outline/30">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-x flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <div className="stat-divider hidden md:block mr-4" />}
                <div className="text-center md:text-left">
                  <div className="font-headline-lg text-4xl md:text-5xl gradient-text font-light">{s.value}</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-[0.2em] mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ===== SERVICE PREVIEWS ===== */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">What We Do</p>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <div className="gold-line-left mt-4" />
          </div>
          <Link href="/services" className="text-primary font-label-sm text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
            View All Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_PREVIEW.map((s, i) => (
            <RevealSection key={i} delay={i * 120}>
              <Link href="/services" className="block">
                <div className="glass-panel rounded-xl glow-hover group relative overflow-hidden h-80 md:h-96 flex flex-col justify-end image-hover-zoom animated-border">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-[1]" />
                  <div className="relative z-10 p-8 md:p-10">
                    <span className="material-symbols-outlined text-3xl text-primary mb-3 block">{s.icon}</span>
                    <h3 className="font-headline-md text-2xl md:text-3xl text-on-surface">{s.title}</h3>
                  </div>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Testimonials</p>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">What Our Clients <span className="gradient-text">Say</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <RevealSection key={i} delay={i * 150}>
              <div className="glass-panel p-8 md:p-10 rounded-xl glow-hover animated-border flex flex-col gap-6 h-full">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface-variant font-light leading-relaxed italic flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-outline/30 pt-4">
                  <p className="font-label-sm text-sm text-on-surface font-medium">{t.name}</p>
                  <p className="font-label-sm text-xs text-primary/70 uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ===== CTA ===== */}
      <RevealSection>
        <section className="py-stack-lg relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center flex flex-col items-center gap-6">
            <h2 className="font-display-xl text-4xl md:text-6xl text-on-surface leading-tight">
              Ready to Create Something<br /><span className="gradient-text italic">Extraordinary?</span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant font-light max-w-lg">
              Let&#39;s bring your vision to life. Connect with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact" className="bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">mail</span>
                Get In Touch
              </Link>
              <a
                href="https://wa.me/61290000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500/40 text-green-400 font-label-sm text-xs px-10 py-4 rounded-sm uppercase tracking-[0.2em] hover:bg-green-500/10 transition-colors flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </RevealSection>
    </>
  );
}