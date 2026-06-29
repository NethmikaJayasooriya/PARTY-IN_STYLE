import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";

export const metadata = {
  title: "About | Melbourne's Themed Kids Party Stylists",
  description:
    "Party in Style is a Melbourne-based, family-run team of themed kids birthday party stylists with over a decade of experience and 500+ celebrations styled across the south-east suburbs — Cranbourne, Berwick, Pakenham & Narre Warren. Superhero, Barbie, princess & custom themes, plus weddings & corporate events.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Party in Style | Melbourne Themed Party Stylists",
    description:
      "Family-run Melbourne party stylists — 12 years, 500+ celebrations styled. Themed kids birthdays, weddings & corporate events across Melbourne's south-east.",
    url: "https://partyinstyle.com.au/about",
    type: "website",
  },
};

const STATS = [
  { value: "500+", label: "Celebrations Styled" },
  { value: "12", label: "Years of Magic" },
  { value: "98%", label: "Happy Families" },
  { value: "100%", label: "Melbourne Local" },
];

const VALUES = [
  { icon: "celebration", title: "Joy First", desc: "Every party is built around one thing — the look on your child's face when they walk in." },
  { icon: "palette", title: "Creativity", desc: "Spider-Man, Barbie, unicorns or fully custom — we design each theme from scratch, never off a shelf." },
  { icon: "handshake", title: "Reliability", desc: "We deliver, set up and pack down on time, every time, so you can relax and enjoy the day." },
  { icon: "location_on", title: "Local Care", desc: "Born and based in Melbourne's south-east — we know the venues, halls and backyards inside out." },
];

const WHY = [
  { icon: "cake", title: "Themed-party specialists", desc: "Kids' birthdays are our craft, not a sideline — superheroes, princesses, unicorns and bespoke themes." },
  { icon: "groups", title: "Full setup & pack-down", desc: "We arrive early, style every detail and clear it all away — you never lift a balloon." },
  { icon: "verified", title: "Hundreds of happy families", desc: "500+ celebrations across Melbourne, with parents who book us again and again." },
  { icon: "favorite", title: "Beyond birthdays", desc: "Weddings, engagements, christenings, EOFY and corporate events styled with the same care." },
];

const ABOUT_FAQ = [
  {
    q: "Where is Party in Style based?",
    a: "We're a Melbourne-based event styling team in Cranbourne East, servicing the south-east suburbs and greater Melbourne — including Cranbourne, Berwick, Pakenham, Narre Warren and surrounds.",
  },
  {
    q: "How long has Party in Style been styling parties?",
    a: "Over a decade. In that time we've styled 500+ celebrations — from themed kids' birthdays to weddings and corporate events.",
  },
  {
    q: "What do you specialise in?",
    a: "Themed children's birthday parties are our specialty — Spider-Man, Batman and superhero parties, Barbie and princess parties, unicorns, mermaids and fully custom themes, including balloon garlands, backdrops, prop hire and on-the-day styling. We also style weddings, engagements, christenings and corporate events.",
  },
];

import { getSettings } from "@/lib/getSettings";

export default async function AboutPage() {
  const settings = (await getSettings()) || {};
  const featureImage = settings.aboutImage || "/images/hero-1stbday-ls.webp";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://partyinstyle.com.au/about" },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Party in Style",
    url: "https://partyinstyle.com.au/about",
    description:
      "Melbourne-based, family-run themed kids party stylists with over a decade of experience and 500+ celebrations styled across the south-east suburbs.",
    mainEntity: { "@id": "https://partyinstyle.com.au/#business" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ABOUT_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={aboutSchema} />
      <JsonLd schema={faqSchema} />

      {/* ── HERO ── */}
      <section className="relative py-stack-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={featureImage} alt="" fill sizes="100vw" className="object-cover opacity-15" priority style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 150px)", maskImage: "linear-gradient(to bottom, transparent 0, #000 150px)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-background) 55%, transparent) 45%, var(--color-background) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">About Us</p>
          <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
            Melbourne&#39;s Themed Party <span className="gradient-text italic">Stylists</span>
          </h1>
          <div className="gold-line-left mx-auto mt-4 mb-6" />
          <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">
            A family-run styling team turning kids&#39; birthdays — and every celebration — into unforgettable, picture-perfect days across Melbourne.
          </p>
        </div>
      </section>

      {/* ── STORY (dark luxury card, matches Services) ── */}
      <section className="py-stack-sm max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection>
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-3xl p-6 md:p-10 border border-[#C9A24B]/35 relative overflow-hidden" style={{ background: "linear-gradient(150deg, #322817 0%, #1C140C 100%)", boxShadow: "inset 0 1px 0 rgba(230,199,102,0.18), 0 30px 70px rgba(0,0,0,0.30), 0 0 70px rgba(201,162,75,0.07)" }}>
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-xl border-2 border-primary/20 z-0 hidden md:block" />
              <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-primary/40 z-10 hidden md:block" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-primary/40 z-10 hidden md:block" />
              <div className="relative rounded-xl overflow-hidden h-[350px] md:h-[480px] image-hover-zoom z-[1]">
                <Image src={featureImage} alt="Themed kids birthday party styled by Party in Style in Melbourne" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,11,7,0.55) 0%, rgba(15,11,7,0.05) 50%, transparent 100%)" }} />
              </div>
              <div className="absolute -bottom-6 right-4 md:right-8 z-10 rounded-xl px-5 py-4 flex items-center gap-3 shadow-xl border border-[#C9A24B]/45" style={{ background: "linear-gradient(135deg, #2E2413 0%, #15100A 100%)" }}>
                <span className="font-display-xl text-2xl md:text-3xl gradient-text font-bold">12</span>
                <span className="font-label-sm text-[10px] text-[#C8BDA5] uppercase tracking-wider leading-tight">Years<br />of Magic</span>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-primary">auto_awesome</span>
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Story</p>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-white mb-5">A Decade of Creating Magic in Melbourne</h2>
              <div className="gold-line-left mb-6" />
              <p className="font-body-lg text-base text-[#E0D4BC] font-light leading-relaxed mb-5">
                Party in Style is a Melbourne, family-run event styling team based in the city&#39;s south-east. For over a decade we&#39;ve had one belief: every celebration deserves to feel extraordinary — and a child&#39;s birthday most of all.
              </p>
              <p className="font-body-md text-base text-[#D8CBB5] font-light leading-relaxed mb-5">
                From Spider-Man and Batman superhero parties to Barbie, princess, unicorn and fully custom themes, we design, style and run the whole celebration — balloon garlands, themed backdrops, dessert tables, props, setup and pack-down. You just enjoy the day.
              </p>
              <p className="font-body-md text-base text-[#D8CBB5] font-light leading-relaxed mb-8">
                With deep local knowledge of Cranbourne, Berwick, Pakenham, Narre Warren and greater Melbourne, we know the venues, halls and backyards — so your event feels effortless, personal and unmistakably yours. Beyond birthdays, we also style weddings, engagements, christenings and corporate events.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Setup & Pack-down Included", "Local & Reliable", "500+ Families Served"].map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full text-xs text-[#E0D4BC] uppercase tracking-wider font-label-sm border border-[#C9A24B]/30 bg-white/5">{t}</span>
                ))}
              </div>
            </div>
          </article>
        </RevealSection>

        {/* STATS */}
        <RevealSection delay={120}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass-panel rounded-2xl p-6 text-center">
                <p className="font-display-xl text-3xl md:text-4xl gradient-text font-bold">{s.value}</p>
                <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ── WHY FAMILIES CHOOSE US (E-E-A-T) ── */}
      <div className="section-band">
      <section aria-labelledby="why-heading" className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-14">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Why Families Choose Us</p>
          <h2 id="why-heading" className="font-headline-lg text-3xl md:text-4xl text-on-surface">The Party in Style <span className="gradient-text">Difference</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY.map((w, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="glass-panel p-7 rounded-2xl magnetic-hover animated-border h-full flex flex-col gap-3 icon-spin-hover">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(240,215,138,0.30), rgba(201,162,75,0.16))", border: "1.5px solid rgba(201,162,75,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
                  <span className="material-symbols-outlined text-2xl" style={{ color: "#B8901F" }}>{w.icon}</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-medium">{w.title}</h3>
                <p className="font-body-md text-sm about-feature-text font-light leading-relaxed">{w.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      </div>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ── VALUES ── */}
      <section aria-labelledby="values-heading" className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-14">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Values</p>
          <h2 id="values-heading" className="font-headline-lg text-3xl md:text-4xl text-on-surface">What Drives <span className="gradient-text">Us</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="glass-panel p-8 rounded-2xl magnetic-hover animated-border text-center h-full flex flex-col items-center gap-4 icon-spin-hover">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-1" style={{ background: "linear-gradient(135deg, rgba(240,215,138,0.30), rgba(201,162,75,0.16))", border: "1.5px solid rgba(201,162,75,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
                  <span className="material-symbols-outlined text-2xl" style={{ color: "#B8901F" }}>{v.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl text-on-surface font-medium">{v.title}</h3>
                <p className="font-body-md text-sm about-feature-text font-light leading-relaxed">{v.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ── ABOUT FAQ (AEO answer-first) ── */}
      <div className="section-band">
      <section aria-labelledby="about-faq-heading" className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-14">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Good to Know</p>
          <h2 id="about-faq-heading" className="font-headline-lg text-3xl md:text-4xl text-on-surface">About <span className="gradient-text">Party in Style</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {ABOUT_FAQ.map((f, i) => (
            <RevealSection key={i} delay={i * 100}>
              <details className="faq-details group glass-panel rounded-xl animated-border overflow-hidden">
                <summary className="faq-summary font-headline-md text-lg md:text-xl text-on-surface p-6 md:p-8 cursor-pointer list-none flex justify-between items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  {f.q}
                  <span className="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="faq-content px-6 md:px-8 pb-6 md:pb-8 text-on-surface-variant font-body-md text-sm leading-relaxed border-t border-outline/20 mt-2 pt-6">
                  {f.a}
                </div>
              </details>
            </RevealSection>
          ))}
        </div>
      </section>

      </div>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* ── CTA ── */}
      <RevealSection>
        <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Let&#39;s Plan Their Best Day Yet</h2>
          <p className="font-body-lg text-base text-on-surface-variant font-light mb-8 max-w-xl mx-auto">
            Tell us the theme, the date and the dream — we&#39;ll handle the rest, start to finish.
          </p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-10 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen magnetic-hover">
            Get In Touch <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
