"use client";
import Link from "next/link";
import RevealSection from "./components/RevealSection";
import AnimatedCounter from "./components/AnimatedCounter";
import MarqueeTicker from "./components/MarqueeTicker";
import HeroForm from "./components/HeroForm";

const STATS = [
  { value: "500+", label: "Events Delivered" },
  { value: "12", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "100%", label: "Melbourne Focus" },
];

const SERVICES_PREVIEW = [
  { icon: "favorite", title: "Weddings", img: "/images/wedding.jpg" },
  { icon: "business_center", title: "Corporate Events", img: "/images/corporate.jpg" },
  { icon: "celebration", title: "Private Parties", img: "/images/party.jpg" },
];

const TESTIMONIALS = [
  { name: "Sarah & James", role: "Wedding, Melbourne", text: "Absolutely beyond our wildest dreams. Every detail was perfect — from the floral installations to the surprise fireworks. Truly once in a lifetime." },
  { name: "Michael Torres", role: "CEO, Nexus Group", text: "Our annual gala was the talk of the industry. The team's attention to detail and creative vision transformed our event into something extraordinary." },
  { name: "Priya Sharma", role: "40th Birthday, Melbourne", text: "They turned my birthday into a magazine-worthy celebration. The venue styling was breathtaking and the coordination was seamless." },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO WITH DYNAMIC BACKGROUNDS + QUICK FORM ===== */}
      <HeroForm />

      {/* ===== MARQUEE TICKER ===== */}
      <MarqueeTicker />

      {/* ===== STATS with animated counters ===== */}
      <RevealSection>
        <div className="relative py-16 border-b border-outline/30">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-x flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <div className="stat-divider hidden md:block mr-4" />}
                <AnimatedCounter value={s.value} label={s.label} />
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
          <Link href="/services" className="text-primary font-label-sm text-xs uppercase tracking-widest flex items-center gap-1 underline-reveal">
            View All Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_PREVIEW.map((s, i) => (
            <RevealSection key={i} delay={i * 120}>
              <Link href="/services" className="block">
                <div className="glass-panel rounded-xl magnetic-hover group relative overflow-hidden h-80 md:h-96 flex flex-col justify-end image-hover-zoom animated-border">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" loading="lazy" />
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
              <div className="glass-panel p-8 md:p-10 rounded-xl magnetic-hover animated-border flex flex-col gap-6 h-full icon-spin-hover">
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
            <img src="/images/festival.jpg" alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
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
              <Link href="/contact" className="bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors flex items-center gap-3 magnetic-hover">
                <span className="material-symbols-outlined text-sm">mail</span>
                Get In Touch
              </Link>
              <a
                href="https://wa.me/61494334934?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500/40 text-green-400 font-label-sm text-xs px-10 py-4 rounded-sm uppercase tracking-[0.2em] hover:bg-green-500/10 transition-colors flex items-center gap-3 magnetic-hover"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </RevealSection>
    </>
  );
}