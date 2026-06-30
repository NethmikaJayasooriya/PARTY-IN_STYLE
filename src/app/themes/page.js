import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";
import { themes } from "@/lib/themesData";

export const metadata = {
  title: "Kids Party Themes Melbourne | Spider-Man, Barbie, Princess & More",
  description:
    "Browse our themed kids birthday parties in Melbourne - Spider-Man, Batman, Barbie, princess, unicorn and 1st birthday styling with balloon garlands, backdrops and full setup across the south-east suburbs. Free quote.",
  alternates: { canonical: "/themes" },
  keywords: ["kids party themes Melbourne", "themed birthday party Melbourne", "superhero party Melbourne", "Barbie party Melbourne", "princess party Melbourne", "unicorn party Melbourne"],
};

export default function ThemesHubPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Themes", item: "https://partyinstyle.com.au/themes" },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <section className="max-w-container-max mx-auto px-6 md:px-margin-x py-stack-md text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Specialty</p>
        <h1 className="font-display-xl text-4xl md:text-6xl text-on-surface mb-4">Kids Party Themes <span className="gradient-text">in Melbourne</span></h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant max-w-2xl mx-auto">
          From Spider-Man and Batman to Barbie, princesses and unicorns - we design, style and run the whole themed celebration across Melbourne and the south-east suburbs.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-6 md:px-margin-x pb-stack-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((t, i) => (
            <RevealSection key={t.slug} delay={i * 100}>
              <Link href={`/themes/${t.slug}`} className="block group">
                <article className="relative rounded-2xl overflow-hidden h-72 md:h-80 flex flex-col justify-end image-hover-zoom border-2 shadow-[0_18px_44px_rgba(70,48,12,0.14)]" style={{ borderColor: `${t.accent}66` }}>
                  <Image src={t.img} alt={`${t.name} styling in Melbourne`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.accent}E6 0%, ${t.accent}66 42%, transparent 75%)` }} />
                  <div className="relative z-10 p-6">
                    <h2 className="font-headline-md text-2xl text-white">{t.name}</h2>
                    <span className="font-label-sm text-[11px] text-white/85 uppercase tracking-wider inline-flex items-center gap-1 mt-1">
                      View theme <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </article>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Custom / any-theme CTA — we are not limited to the themes above */}
      <section className="max-w-container-max mx-auto px-6 md:px-12 pb-stack-lg">
        <div className="rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden border border-[#C9A24B]/30" style={{ background: "linear-gradient(135deg, #2A2014 0%, #14100A 100%)", boxShadow: "0 30px 70px rgba(0,0,0,0.30), 0 0 60px rgba(201,162,75,0.06)" }}>
          <p className="font-label-sm text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "#E6C766" }}>Any Theme, Fully Custom</p>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-white mb-4">Don&#39;t see your child&#39;s theme?</h2>
          <p className="font-body-lg text-base text-[#D8CBB5] max-w-2xl mx-auto mb-8">
            These are just our most-requested themes &mdash; we design and style <span style={{ color: "#E6C766" }}>any</span> theme your child can dream up. Dinosaurs, Minecraft, mermaids, space, jungle safari, Bluey, candyland or a completely one-of-a-kind idea &mdash; tell us what they love and we&#39;ll bring it to life across Melbourne.
          </p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-10 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen">
            Tell Us Your Theme <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
