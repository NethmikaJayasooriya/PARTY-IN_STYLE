import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";

export const metadata = {
  title: "About",
  description: "Learn about Party in Style — over a decade of luxury event planning excellence across Australia.",
};

const VALUES = [
  { icon: "diamond", title: "Excellence", desc: "We pursue perfection in every detail, from concept to execution." },
  { icon: "handshake", title: "Trust", desc: "Discretion and reliability are the foundation of every client relationship." },
  { icon: "palette", title: "Creativity", desc: "We push boundaries to deliver events that are truly one-of-a-kind." },
  { icon: "eco", title: "Sustainability", desc: "We prioritise eco-conscious practices without compromising on luxury." },
];

import { getSettings } from "@/lib/getSettings";

export default async function AboutPage() {
  const settings = (await getSettings()) || {};
  const featureImage = settings.aboutImage || "/images/styling.webp";
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://partyinstyle.com.au/about" }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <section className="relative py-stack-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={featureImage} alt="" fill sizes="100vw" className="object-cover opacity-15" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">About Us</p>
          <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">Where Vision Meets <span className="gradient-text italic">Elegance</span></h1>
          <div className="gold-line-left mx-auto mt-4" />
        </div>
      </section>

      <section className="py-stack-sm max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealSection>
            <div className="relative">
              {/* Decorative gold frame behind */}
              <div className="absolute -top-5 -left-5 w-full h-full rounded-xl border-2 border-primary/15 z-0 hidden md:block" />
              
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-primary/30 z-10 hidden md:block" />
              <div className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full bg-primary/30 z-10 hidden md:block" />

              {/* Main image */}
              <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[540px] image-hover-zoom z-[1]">
                <Image 
                  src={featureImage} 
                  alt="Event styling by Party in Style" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>

              {/* Floating "Since" badge */}
              <div className="absolute -bottom-5 left-6 md:left-10 z-10 glass-panel rounded-xl px-5 py-4 flex items-center gap-3 shadow-xl shadow-background/50 border border-primary/10">
                <span className="font-display-xl text-2xl gradient-text font-bold">2014</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider leading-tight">Est. in<br/>Sydney</span>
              </div>

              {/* Floating award badge — top right */}
              <div className="absolute -top-3 right-6 md:right-10 z-10 glass-panel rounded-full px-4 py-2.5 flex items-center gap-2 shadow-xl shadow-background/50 border border-primary/10">
                <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Award Winning</span>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Story</p>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-6">A Decade of Creating Magic</h2>
            <div className="gold-line-left mb-8" />
            <p className="font-body-lg text-base text-on-surface-variant font-light leading-relaxed mb-6">
              Founded in Sydney in 2014, Party in Style began with a simple belief: every celebration deserves to be extraordinary. What started as a boutique styling service has grown into one of Australia&#39;s most sought-after event planning firms.
            </p>
            <p className="font-body-md text-base text-on-surface-variant font-light leading-relaxed mb-6">
              Our team of creative directors, stylists, and coordinators bring an unmatched level of artistry to every event. From intimate soirées on the harbour to grand ballroom galas, we don&#39;t just plan events — we create memories that last a lifetime.
            </p>
            <p className="font-body-md text-base text-on-surface-variant font-light leading-relaxed mb-8">
              With deep-rooted local expertise, we seamlessly navigate Victoria&#39;s most exclusive venues and perfectly understand the unique vibe of Melbourne&#39;s corporate and social scene, ensuring your event feels authentically local yet world-class.
            </p>
            <div className="flex flex-wrap gap-6">
              {[{ icon: "verified", text: "Fully Insured" }, { icon: "workspace_premium", text: "Award Winning" }, { icon: "groups", text: "30+ Team Members" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2 icon-spin-hover">
                  <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Values</p>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">What Drives <span className="gradient-text">Us</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="glass-panel p-8 rounded-xl magnetic-hover animated-border text-center h-full flex flex-col items-center gap-4 icon-spin-hover">
                <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">{v.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl text-on-surface">{v.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant font-light">{v.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      <RevealSection>
        <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Let&#39;s Create Together</h2>
          <p className="font-body-lg text-base text-on-surface-variant font-light mb-8 max-w-xl mx-auto">Ready to bring your vision to life? Our concierge team is here for you.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors magnetic-hover">
            Get In Touch <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
