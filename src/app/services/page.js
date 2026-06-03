import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";

export const metadata = {
  title: "Services",
  description: "Luxury event planning services — Weddings, Corporate Events, Private Parties, & Intimate Proposals across Australia.",
};

const SERVICES = [
  {
    id: "wedding",
    icon: "favorite", title: "Bespoke Weddings",
    desc: "Bespoke bridal experiences tailored to your unique love story. From intimate harbour-side ceremonies to grand ballroom celebrations, we handle every detail with grace.",
    features: ["Venue Selection", "Floral Design", "Catering Coordination", "Entertainment", "Day-of Coordination"],
    img: "/images/wedding.webp",
    stat: "Dream",
    statLabel: "Weddings",
  },
  {
    id: "corporate",
    icon: "business_center", title: "Corporate Events & EOFY Celebrations",
    desc: "High-impact galas, Premium Chrissy Functions, EOFY Celebrations, and executive retreats that elevate your brand. We deliver polished, professional events that leave lasting impressions.",
    features: ["Brand Integration", "AV Production", "Keynote Setup", "VIP Hospitality", "Post-Event Analytics"],
    img: "/images/corporate.webp",
    stat: "50+",
    statLabel: "Corporate Clients",
  },
  {
    id: "private",
    icon: "celebration", title: "Private Parties & Milestone Birthdays",
    desc: "Exclusive gatherings designed for maximum impact — Kids Theme Parties, Milestone Birthdays, Lux Hens Nights, and anniversaries tailored to your personal style.",
    features: ["Theme Development", "Custom Décor", "DJ & Live Music", "Bespoke Menus", "Photography"],
    img: "/images/kids-party.webp",
    stat: "300+",
    statLabel: "Parties Styled",
  },
  {
    id: "proposal",
    icon: "nightlife", title: "Marriage Proposals & Intimate Soirées",
    desc: "Breathtaking setups for the perfect moment. From private rooftop dinners to candlelit beach proposals, we manage everything to ensure an unforgettable \"Yes\".",
    features: ["Location Scouting", "Romantic Styling", "Hidden Photography", "Musicians", "Champagne Service"],
    img: "/images/proposal.webp",
    stat: "100%",
    statLabel: "Said Yes",
  },
];

import { getSettings } from "@/lib/getSettings";

export default async function ServicesPage() {
  const settings = (await getSettings()) || {};
  const bgImage = settings.servicesImage || "/images/venue.webp";

  const activeServices = (settings.servicesList && settings.servicesList.length > 0) ? settings.servicesList : SERVICES;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://partyinstyle.com.au/services" }
    ]
  };

  const serviceSchemas = SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.desc,
    provider: { "@id": "https://partyinstyle.com.au/#business" },
    areaServed: { "@type": "City", name: "Melbourne" }
  }));

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      {serviceSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <section className="relative py-stack-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={bgImage} alt="" fill sizes="100vw" className="object-cover opacity-15" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Services</p>
          <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">What We <span className="gradient-text italic">Do</span></h1>
          <div className="gold-line-left mx-auto mt-4 mb-6" />
          <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">Meticulously crafted experiences, designed with precision and executed with flawless grace.</p>
        </div>
      </section>

      <section className="py-stack-sm max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="flex flex-col gap-28 md:gap-36">
          {activeServices.map((s, i) => (
            <RevealSection key={s.id || i}>
              <article className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`}>
                {/* IMAGE PRESENTATION */}
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {/* Gold accent frame — offset behind */}
                  <div className="absolute -top-4 -left-4 w-full h-full rounded-xl border-2 border-primary/20 z-0 hidden md:block" />
                  
                  {/* Decorative corner dots */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-primary/40 z-10 hidden md:block" />
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-primary/40 z-10 hidden md:block" />
                  
                  {/* Main image */}
                  <div className="relative rounded-xl overflow-hidden h-[350px] md:h-[480px] image-hover-zoom z-[1]">
                    <Image 
                      src={s.img || "/images/wedding.webp"} 
                      alt={s.title || "Service"} 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating stat badge */}
                  <div className="absolute -bottom-6 right-4 md:right-8 z-10 glass-panel rounded-xl px-5 py-4 flex items-center gap-3 shadow-xl shadow-background/50 border border-primary/10">
                    <span className="font-display-xl text-2xl md:text-3xl gradient-text font-bold">{s.stat || "New"}</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider leading-tight">{s.statLabel || "Service"}</span>
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-primary">{s.icon || "star"}</span>
                    </div>
                    <div className="h-px w-12 bg-gradient-to-r from-primary/40 to-transparent" />
                  </div>
                  <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">{s.title || "Untitled Service"}</h2>
                  {(settings.servicesPricing && settings.servicesPricing[s.id]) || s.price ? (
                    <div className="inline-flex flex-col mb-8 border-l-[3px] border-primary pl-5 py-1">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-1">Estimated Investment</span>
                      <span className="font-headline-lg text-4xl text-on-surface font-light tracking-tight">
                        <span className="text-primary font-medium mr-1">$</span>{settings.servicesPricing ? (settings.servicesPricing[s.id] || s.price) : s.price} <span className="text-sm font-body-md text-on-surface-variant/60 font-light ml-1 lowercase tracking-normal">upwards</span>
                      </span>
                    </div>
                  ) : null}
                  <div className="gold-line-left mb-6" />
                  <p className="font-body-lg text-base text-on-surface-variant font-light leading-relaxed mb-8">{s.desc || "A beautifully styled service tailored to your needs."}</p>
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {(s.features || []).map((f, fIdx) => (
                      <span key={fIdx} className="glass-panel px-4 py-2 rounded-full text-xs text-on-surface-variant uppercase tracking-wider font-label-sm border border-outline/10 hover:border-primary/30 hover:text-primary transition-colors duration-300">{f}</span>
                    ))}
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-8 py-3 rounded-sm uppercase tracking-[0.15em] metallic-sheen hover:bg-primary-light transition-colors magnetic-hover">
                    Enquire Now <span className="material-symbols-outlined lowercase normal-case text-sm">arrow_forward</span>
                  </Link>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      <RevealSection>
        <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Have something unique in mind?</h2>
          <p className="font-body-lg text-base text-on-surface-variant font-light mb-8 max-w-xl mx-auto">We specialise in one-of-a-kind events. Tell us your vision and we&#39;ll make it happen.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors magnetic-hover">
            Start Planning <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
