import Link from "next/link";
import Image from "next/image";
import RevealSection from "./components/RevealSection";
import { HOME_FAQ } from "@/lib/homeFaq";

export const metadata = {
  title: "Melbourne's Premier Luxury Event Planners",
  description: "Melbourne's top luxury event planners with Australia-wide capability. We specialise in bespoke weddings, high-end corporate galas, and immersive private parties.",
};
import dynamic from "next/dynamic";
import HeroForm from "./components/HeroForm";

const MarqueeTicker = dynamic(() => import("./components/MarqueeTicker"));

const AnimatedCounter = dynamic(() => import("./components/AnimatedCounter"));

const STATS = [
  { value: "500+", label: "Parties Styled" },
  { value: "12", label: "Years of Magic" },
  { value: "98%", label: "Happy Families" },
  { value: "100%", label: "Melbourne Local" },
];

const SERVICES_PREVIEW = [
  { icon: "shield", title: "Superhero Parties", jewel: "heroblue", img: "/images/hero-superhero-ls.png", desc: "Spider-Man, Batman & more — styled to the last balloon." },
  { icon: "diamond", title: "Princess & Barbie", jewel: "heropink", img: "/images/hero-barbie-ls.png", desc: "Pretty-in-pink Barbie & fairytale princess setups." },
  { icon: "cake", title: "Milestone Birthdays", jewel: "blush", img: "/images/hero-1stbday-ls.png", desc: "Unforgettable first birthdays & custom themes." },
  { icon: "business_center", title: "Corporate Events", jewel: "gold", img: "/images/hero-corporate-ls.png", desc: "Premium galas, product launches & EOFY parties." },
  { icon: "favorite", title: "Luxury Weddings", jewel: "emerald", img: "/images/hero-wedding-ls.png", desc: "Elegant floral arrangements & reception styling." },
  { icon: "palette", title: "Bespoke Themes", jewel: "amethyst", img: "/images/hero-themed-ls.png", desc: "Jungle safaris, space adventures & more." },
];

const TESTIMONIALS = [
  { name: "Amara P.", role: "Spider-Man Party, Berwick", text: "My son screamed with joy when he saw the setup! The balloon arch, backdrop and props were next level. Every parent asked who did it." },
  { name: "Jess & Tom", role: "Barbie 6th Birthday, Cranbourne", text: "Pure pink magic. They handled everything — styling, balloons, the dessert table — and we just enjoyed the day. Worth every cent." },
  { name: "Nadia K.", role: "1st Birthday, Narre Warren", text: "From the first message they understood exactly what I wanted. The pastel theme was picture-perfect and the coordination was flawless." },
];

import { getSettings } from "@/lib/getSettings";

export default async function Home() {
  const settings = (await getSettings()) || {};

  return (
    <>
      {/* ===== HERO WITH DYNAMIC BACKGROUNDS + QUICK FORM ===== */}
      <HeroForm settings={settings} />

      {/* ===== MARQUEE TICKER ===== */}
      <MarqueeTicker />

      {/* ===== STATS with animated counters ===== */}
      <RevealSection>
        <section aria-label="Our achievements" className="relative py-16">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-x grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="relative bg-white/75 backdrop-blur-xl p-7 md:p-9 rounded-2xl flex flex-col items-center justify-center text-center border border-[#C9A24B]/25 shadow-[0_16px_40px_rgba(120,90,30,0.10)] hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(201,162,75,0.18)] hover:border-[#C9A24B]/50 transition-all duration-500 overflow-hidden group">
                <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #E6C766, #C9A24B, #E6C766)" }} />
                <AnimatedCounter value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ===== SERVICE PREVIEWS ===== */}
      <section aria-labelledby="services-heading" className="relative py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">What We Do</p>
            <h2 id="services-heading" className="font-headline-lg text-4xl md:text-5xl text-on-surface">
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
                <div data-jewel={s.jewel} className="rounded-2xl magnetic-hover group relative overflow-hidden h-80 md:h-96 flex flex-col justify-end image-hover-zoom shadow-[0_18px_44px_rgba(120,90,30,0.14)] border-2" style={{ borderColor: "color-mix(in srgb, var(--jewel) 35%, #ffffff)" }}>
                  <Image
                    src={s.img}
                    alt={`${s.title} styling in Melbourne by Party in Style — balloons, backdrops and décor`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--jewel) 90%, #1a1208) 0%, color-mix(in srgb, var(--jewel) 50%, transparent) 42%, transparent 74%)" }} />
                  <div className="relative z-10 p-7 md:p-8">
                    <span className="material-symbols-outlined text-3xl text-white mb-2 block" style={{ background: "var(--jewel)", borderRadius: "12px", padding: "8px", width: "fit-content" }}>{s.icon}</span>
                    <h3 className="font-headline-md text-2xl md:text-3xl text-white">{s.title}</h3>
                    <p className="font-body-md text-sm text-white/85 mt-1.5 max-w-xs">{s.desc}</p>
                  </div>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ===== CURATED EXPERIENCES (HYPER-LOCAL SEO) ===== */}
      <section aria-labelledby="experiences-heading" className="relative py-stack-md max-w-container-max mx-auto px-6 md:px-12 my-8 rounded-[36px]" style={{ background: "rgba(255,255,255,0.34)", backdropFilter: "blur(6px)", boxShadow: "0 10px 40px rgba(70,48,12,0.06)" }}>
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Specialties</p>
          <h2 id="experiences-heading" className="font-headline-lg text-4xl md:text-5xl text-on-surface">Curated <span className="gradient-text">Experiences</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Superhero Parties — Spider-Man, Batman & Avengers",
            "Princess & Barbie Birthday Styling",
            "1st Birthdays, Christenings & Naming Days",
            "Unicorn, Mermaid, Jungle & Custom Themes",
            "Balloon Garlands, Backdrops & Prop Hire",
            "Weddings, EOFY & Corporate Celebrations"
          ].map((exp, i) => {
            const c = ["#3C7DD6", "#E84C9A", "#E86A8E", "#9A6FD0", "#4F9E82", "#C9A24B"][i % 6];
            const ic = ["shield", "diamond", "cake", "palette", "celebration", "favorite"][i % 6];
            return (
            <RevealSection key={i} delay={i * 100}>
              <article className="relative p-5 md:p-6 rounded-2xl flex items-center gap-4 group h-full border transition-all duration-500 hover:-translate-y-1.5 overflow-hidden" style={{ background: `linear-gradient(150deg, #FFFFFF 0%, color-mix(in srgb, ${c} 14%, #FFFDF8) 100%)`, borderColor: `color-mix(in srgb, ${c} 32%, transparent)`, boxShadow: `0 16px 40px color-mix(in srgb, ${c} 14%, rgba(120,90,30,0.10))` }} suppressHydrationWarning>
                <span className="material-symbols-outlined text-white text-xl rounded-xl p-2.5 shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: c, boxShadow: `0 8px 20px color-mix(in srgb, ${c} 45%, transparent)` }}>{ic}</span>
                <h3 className="font-headline-md text-base md:text-lg text-on-surface leading-snug">{exp}</h3>
              </article>
            </RevealSection>
            );
          })}
        </div>

        {/* SR-Only Hidden SEO Text */}
        <span className="sr-only">
          Party in Style is a kids themed birthday party planner and stylist in Melbourne, Victoria. We specialise in Spider-Man, Batman and superhero parties, Barbie and princess parties, 1st birthdays, christenings, unicorn, mermaid and jungle themes, balloon garlands, backdrops and prop hire — plus weddings, EOFY and corporate events across Melbourne and the south-east suburbs including Cranbourne, Berwick, Pakenham and Narre Warren.
        </span>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ===== TESTIMONIALS ===== */}
      <section aria-labelledby="testimonials-heading" className="relative py-stack-md max-w-container-max mx-auto px-6 md:px-12 my-8 rounded-[36px]" style={{ background: "rgba(201,162,75,0.09)" }}>
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Testimonials</p>
          <h2 id="testimonials-heading" className="font-headline-lg text-4xl md:text-5xl text-on-surface">What Our Clients <span className="gradient-text">Say</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <RevealSection key={i} delay={i * 150}>
              <div data-jewel="amethyst" className="spotlight-card relative glass-panel p-8 md:p-10 rounded-xl magnetic-hover animated-border flex flex-col gap-6 h-full icon-spin-hover" suppressHydrationWarning>
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

      {/* ===== FAQ ===== */}
      <section aria-labelledby="faq-heading" className="relative py-stack-md max-w-container-max mx-auto px-6 md:px-12 my-8 rounded-[36px]" style={{ background: "rgba(255,255,255,0.34)", backdropFilter: "blur(6px)", boxShadow: "0 10px 40px rgba(70,48,12,0.06)" }}>
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Answers</p>
          <h2 id="faq-heading" className="font-headline-lg text-4xl md:text-5xl text-on-surface">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {HOME_FAQ.map((faq, i) => (
            <RevealSection key={i} delay={i * 100}>
              <details data-jewel="blush" className="spotlight-card relative faq-details group glass-panel rounded-xl animated-border overflow-hidden" suppressHydrationWarning>
                <summary className="faq-summary font-headline-md text-lg md:text-xl text-on-surface p-6 md:p-8 cursor-pointer list-none flex justify-between items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  {faq.q}
                  <span className="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="faq-content px-6 md:px-8 pb-6 md:pb-8 text-on-surface-variant font-body-md text-sm leading-relaxed border-t border-outline/20 mt-2 pt-6">
                  {faq.a}
                </div>
              </details>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ===== CTA ===== */}
      <RevealSection>
        <section aria-label="Get in touch" className="py-stack-lg relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-corporate-ls.png"
              alt="Premium event styling and luxury coordination by Party in Style Melbourne"
              fill
              sizes="100vw"
              loading="lazy"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center flex flex-col items-center gap-6">
            <h2 className="font-display-xl text-4xl md:text-6xl text-on-surface leading-tight">
              Ready to Create Something<br /><span className="gradient-text italic">Extraordinary?</span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant font-light max-w-lg">
              Let&#39;s bring your vision to life. Connect with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact" className="btn-gold font-label-sm text-xs font-semibold px-10 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen flex items-center gap-3 magnetic-hover">
                <span className="material-symbols-outlined text-sm">mail</span>
                Get In Touch
              </Link>
              <a
                href="https://wa.me/61494334934?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-600/50 text-green-700 font-label-sm text-xs px-10 py-4 rounded-sm uppercase tracking-[0.2em] hover:bg-green-600/10 transition-colors flex items-center gap-3 magnetic-hover"
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