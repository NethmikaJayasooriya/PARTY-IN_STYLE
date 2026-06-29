import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";

export const metadata = {
  title: "Services - Themed Kids Birthday Parties, Styling & Events Melbourne",
  description: "Themed kids birthday party stylists in Melbourne - Spider-Man, Batman, Barbie, princess, unicorn & custom themes, balloon garlands, backdrops, table styling, custom party favours & personalised gifts, plus weddings, corporate & EOFY events. Free quote.",
  alternates: { canonical: "/services" },
  keywords: ["themed kids party services Melbourne", "balloon garland and backdrop hire", "table styling Melbourne", "party favours", "wedding and corporate styling Melbourne"],
};

const SERVICES = [
  {
    id: "kids-birthday", price: "450",
    icon: "cake", title: "Themed Kids Birthday Parties",
    desc: "Melbourne's go-to themed kids birthday party stylists. From Spider-Man, Batman and superhero parties for boys to Barbie, princess, unicorn and mermaid parties for girls - we design, style and run the whole celebration around whatever your child loves. Custom balloon arches, themed backdrops, dessert tables, props, setup and pack-down.",
    features: ["Spider-Man & Superhero", "Barbie & Princess", "Unicorn & Mermaid", "Any Custom Theme", "Full Setup & Pack-down"],
    img: "/images/hero-superhero-ls.webp",
    stat: "Any",
    statLabel: "Theme They Love",
  },
  {
    id: "styling", price: "350",
    icon: "palette", title: "Table Styling & Event Decoration",
    desc: "Luxury table styling and event decoration across Melbourne - elegant tablescapes, centrepieces, place settings, custom signage and themed decor that turn any venue, hall or backyard into a picture-perfect celebration.",
    features: ["Tablescapes & Centrepieces", "Themed Backdrops", "Custom Signage", "Plinths & Props", "On-the-day Styling"],
    img: "/images/table.webp",
    stat: "Bespoke",
    statLabel: "Styling",
  },
  {
    id: "balloons", price: "250",
    icon: "celebration", title: "Balloon Garlands, Backdrops & Prop Hire",
    desc: "Show-stopping organic balloon garlands, balloon arches, flower walls, themed backdrops and party prop hire across Melbourne and the south-east suburbs - delivered, installed and styled by our team.",
    features: ["Organic Balloon Garlands", "Balloon Arches", "Flower Walls", "Backdrop Hire", "Prop & Plinth Hire"],
    img: "/images/kids-party.webp",
    stat: "Wow",
    statLabel: "Factor",
  },
  {
    id: "gifts", price: "150",
    icon: "sell", title: "Custom Party Favours & Personalised Gifts",
    desc: "Personalised party favours, custom gift boxes, name signage and bespoke keepsakes - thoughtfully designed and branded to your party theme for guests to remember.",
    features: ["Custom Favours", "Personalised Gift Boxes", "Name Signage", "Themed Keepsakes", "Welcome Gifts"],
    img: "/images/party.webp",
    stat: "Personal",
    statLabel: "Touches",
  },
  {
    id: "weddings", price: "1500",
    icon: "favorite", title: "Weddings & Engagements",
    desc: "Elegant wedding and engagement styling in Melbourne - ceremony and reception decor, floral installations, bridal table styling and complete day-of coordination, tailored to your love story.",
    features: ["Ceremony & Reception", "Floral Installations", "Bridal Table Styling", "Coordination", "Day-of Management"],
    img: "/images/hero-wedding-ls.webp",
    stat: "Forever",
    statLabel: "Moments",
  },
  {
    id: "corporate", price: "2000",
    icon: "business_center", title: "Corporate, EOFY & Special Events",
    desc: "Premium corporate event styling in Melbourne - gala dinners, EOFY parties, product launches, christenings, baby showers and milestone celebrations, styled and managed from concept to pack-down.",
    features: ["Gala Dinners", "EOFY Parties", "Product Launches", "Christenings & Showers", "Milestones"],
    img: "/images/hero-corporate-ls.webp",
    stat: "Polished",
    statLabel: "& Professional",
  },
];

import { getSettings } from "@/lib/getSettings";

export default async function ServicesPage() {
  const settings = (await getSettings()) || {};
  const bgImage = settings.servicesImage || "/images/kids-party.webp";

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
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-3xl p-6 md:p-10 border border-[#C9A24B]/35 relative overflow-hidden" style={{ background: "linear-gradient(150deg, #322817 0%, #1C140C 100%)", boxShadow: "inset 0 1px 0 rgba(230,199,102,0.18), 0 30px 70px rgba(0,0,0,0.30), 0 0 70px rgba(201,162,75,0.07)" }}>
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
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,11,7,0.55) 0%, rgba(15,11,7,0.05) 50%, transparent 100%)" }} />
                  </div>

                  {/* Floating stat badge */}
                  <div className="absolute -bottom-6 right-4 md:right-8 z-10 rounded-xl px-5 py-4 flex items-center gap-3 shadow-xl border border-[#C9A24B]/45" style={{ background: "linear-gradient(135deg, #2E2413 0%, #15100A 100%)" }}>
                    <span className="font-display-xl text-2xl md:text-3xl gradient-text font-bold">{s.stat || "New"}</span>
                    <span className="font-label-sm text-[10px] text-[#C8BDA5] uppercase tracking-wider leading-tight">{s.statLabel || "Service"}</span>
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
                  <h2 className="font-headline-lg text-3xl md:text-4xl text-white mb-4">{s.title || "Untitled Service"}</h2>
                  {(settings.servicesPricing && settings.servicesPricing[s.id]) || s.price ? (
                    <div className="inline-flex flex-col mb-8 border-l-[3px] border-primary pl-5 py-1">
                      <span className="font-label-sm text-[10px] text-[#C8BDA5] uppercase tracking-[0.2em] mb-1">Estimated Investment (AUD)</span>
                      <span className="font-headline-lg text-4xl text-white font-light tracking-tight">
                        <span className="text-primary font-medium mr-1">$</span>{settings.servicesPricing ? (settings.servicesPricing[s.id] || s.price) : s.price} <span className="text-sm font-body-md text-[#C8BDA5]/80 font-light ml-1 lowercase tracking-normal">AUD upwards</span>
                      </span>
                    </div>
                  ) : null}
                  <div className="gold-line-left mb-6" />
                  <p className="font-body-lg text-base text-[#D8CBB5] font-light leading-relaxed mb-8">{s.desc || "A beautifully styled service tailored to your needs."}</p>
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {(s.features || []).map((f, fIdx) => (
                      <span key={fIdx} className="px-4 py-2 rounded-full text-xs text-[#E0D4BC] uppercase tracking-wider font-label-sm border border-[#C9A24B]/30 bg-white/5 hover:border-primary hover:text-primary transition-colors duration-300">{f}</span>
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
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-10 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen magnetic-hover">
            Start Planning <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
