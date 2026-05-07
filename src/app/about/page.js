import Link from "next/link";
import RevealSection from "../components/RevealSection";

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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-stack-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1600&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">About Us</p>
          <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
            Where Vision Meets <span className="gradient-text italic">Elegance</span>
          </h1>
          <div className="gold-line-left mx-auto mt-4" />
        </div>
      </section>

      {/* Story */}
      <section className="py-stack-sm max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealSection>
            <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px] image-hover-zoom animated-border">
              <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop&q=80" alt="Event styling" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Story</p>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-6">A Decade of Creating Magic</h2>
            <div className="gold-line-left mb-8" />
            <p className="font-body-lg text-base text-on-surface-variant font-light leading-relaxed mb-6">
              Founded in Sydney in 2014, Party in Style began with a simple belief: every celebration deserves to be extraordinary. What started as a boutique styling service has grown into one of Australia&#39;s most sought-after event planning firms.
            </p>
            <p className="font-body-md text-base text-on-surface-variant font-light leading-relaxed mb-8">
              Our team of creative directors, stylists, and coordinators bring an unmatched level of artistry to every event. From intimate soirées on the harbour to grand ballroom galas, we don&#39;t just plan events — we create memories that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-6">
              {[{ icon: "verified", text: "Fully Insured" }, { icon: "workspace_premium", text: "Award Winning" }, { icon: "groups", text: "30+ Team Members" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x"><div className="gold-line my-stack-md" /></div>

      {/* Values */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x">
        <RevealSection className="text-center mb-16">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Values</p>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">What Drives <span className="gradient-text">Us</span></h2>
          <div className="gold-line-left mx-auto mt-4" />
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="glass-panel p-8 rounded-xl glow-hover animated-border text-center h-full flex flex-col items-center gap-4">
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

      {/* CTA */}
      <RevealSection>
        <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Let&#39;s Create Together</h2>
          <p className="font-body-lg text-base text-on-surface-variant font-light mb-8 max-w-xl mx-auto">
            Ready to bring your vision to life? Our concierge team is here for you.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-10 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors">
            Get In Touch <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
