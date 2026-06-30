import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import RevealSection from "../../components/RevealSection";
import JsonLd from "../../components/JsonLd";
import { themes, getTheme } from "@/lib/themesData";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = getTheme(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/themes/${t.slug}` },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `https://partyinstyle.com.au/themes/${t.slug}`,
      images: [{ url: t.img, width: 1200, height: 630, alt: t.h1 }],
    },
  };
}

export default async function ThemePage({ params }) {
  const { slug } = await params;
  const t = getTheme(slug);
  if (!t) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Themes", item: "https://partyinstyle.com.au/themes" },
      { "@type": "ListItem", position: 3, name: t.name, item: `https://partyinstyle.com.au/themes/${t.slug}` },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${t.name} Styling Melbourne`,
    description: t.metaDescription,
    provider: { "@id": "https://partyinstyle.com.au/#business" },
    areaServed: { "@type": "City", name: "Melbourne" },
    serviceType: "Themed kids birthday party styling",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-x py-stack-md grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealSection>
            <div>
              <p className="font-label-sm text-xs uppercase tracking-[0.3em] mb-3" style={{ color: t.accent }}>
                Melbourne · Themed Kids Parties
              </p>
              <h1 className="font-display-xl text-4xl md:text-6xl text-on-surface leading-tight mb-5">{t.h1}</h1>
              <div className="h-1 w-16 rounded-full mb-6" style={{ background: t.accent }} />
              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl">{t.intro}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-8 py-4 rounded-lg uppercase tracking-[0.18em] metallic-sheen">
                  <span className="material-symbols-outlined text-sm">send</span>Get a Free Quote
                </Link>
                <a href="https://wa.me/61494334934" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-green-600/50 text-green-700 font-label-sm text-xs px-8 py-4 rounded-lg uppercase tracking-[0.18em] hover:bg-green-600/10 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="relative rounded-3xl overflow-hidden h-[360px] md:h-[480px] image-hover-zoom border-4 border-white shadow-[0_30px_70px_rgba(70,48,12,0.20)]">
              <Image src={t.img} alt={`${t.name} styling in Melbourne by Party in Style`} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${t.accent}33, transparent 55%)` }} />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="max-w-container-max mx-auto px-6 md:px-12 my-8 rounded-[36px] py-stack-md" style={{ background: "rgba(255,255,255,0.34)", backdropFilter: "blur(6px)", boxShadow: "0 10px 40px rgba(70,48,12,0.06)" }}>
        <RevealSection className="text-center mb-12">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">What's Included</p>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">Your {t.name}, <span className="gradient-text">styled start to finish</span></h2>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.inclusions.map((inc, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div className="h-full bg-white rounded-2xl p-6 border border-[#C9A24B]/25 shadow-[0_14px_36px_rgba(70,48,12,0.10)] flex flex-col gap-3">
                <span className="material-symbols-outlined text-white text-xl rounded-xl p-2 w-fit" style={{ background: t.accent }}>check</span>
                <p className="font-body-md text-sm text-on-surface font-medium leading-snug">{inc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-margin-x py-stack-md">
        <RevealSection className="text-center mb-10">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">{t.name} <span className="gradient-text">FAQs</span></h2>
        </RevealSection>
        <div className="flex flex-col gap-4">
          {t.faqs.map((f, i) => (
            <RevealSection key={i} delay={i * 80}>
              <details className="group glass-panel rounded-xl overflow-hidden">
                <summary className="font-headline-md text-lg text-on-surface p-6 cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant font-body-md text-sm leading-relaxed border-t border-outline/20 pt-5">{f.a}</div>
              </details>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* OTHER THEMES + CTA */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-x py-stack-md text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">More Themes</p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {themes.filter((x) => x.slug !== t.slug).map((x) => (
            <Link key={x.slug} href={`/themes/${x.slug}`} className="px-5 py-2.5 rounded-full bg-white border border-[#C9A24B]/30 text-sm text-on-surface hover:border-primary hover:text-gold-deep transition-colors shadow-sm">
              {x.name}
            </Link>
          ))}
        </div>
        <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Ready to plan the <span className="gradient-text">{t.name}</span>?</h2>
        <p className="font-body-lg text-base text-on-surface-variant mb-8 max-w-xl mx-auto">Tell us your child's favourite theme, date and suburb - we'll send a free quote within 24 hours.</p>
        <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-10 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen">
          Get a Free Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </section>
    </>
  );
}
