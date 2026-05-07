import Link from "next/link";
import RevealSection from "../components/RevealSection";

export const metadata = {
  title: "Services",
  description: "Luxury event planning services — Weddings, Corporate Events, Private Parties, Festivals & Galas across Australia.",
};

const SERVICES = [
  {
    icon: "favorite", title: "Weddings",
    desc: "Bespoke bridal experiences tailored to your unique love story. From intimate harbour-side ceremonies to grand ballroom celebrations, we handle every detail with grace.",
    features: ["Venue Selection", "Floral Design", "Catering Coordination", "Entertainment", "Day-of Coordination"],
    img: "/images/wedding.jpg",
  },
  {
    icon: "business_center", title: "Corporate Events",
    desc: "High-impact galas, product launches, and executive retreats that elevate your brand. We deliver polished, professional events that leave lasting impressions.",
    features: ["Brand Integration", "AV Production", "Keynote Setup", "VIP Hospitality", "Post-Event Analytics"],
    img: "/images/corporate.jpg",
  },
  {
    icon: "celebration", title: "Private Parties",
    desc: "Exclusive gatherings designed for maximum impact — birthdays, engagements, anniversaries, and milestone celebrations tailored to your personal style.",
    features: ["Theme Development", "Custom Décor", "DJ & Live Music", "Bespoke Menus", "Photography"],
    img: "/images/party.jpg",
  },
  {
    icon: "nightlife", title: "Festivals & Galas",
    desc: "Large-scale cultural events and charity galas with world-class production value. We manage logistics, talent, and staging for events of any scale.",
    features: ["Stage Design", "Lighting & FX", "Crowd Management", "Sponsorship Integration", "Live Streaming"],
    img: "/images/festival.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-stack-md overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/venue.jpg" alt="" className="w-full h-full object-cover opacity-15" />
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
        <div className="flex flex-col gap-20">
          {SERVICES.map((s, i) => (
            <RevealSection key={i}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
                <div className={`relative rounded-xl overflow-hidden h-[350px] md:h-[450px] image-hover-zoom animated-border ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="material-symbols-outlined text-4xl text-primary mb-4 block">{s.icon}</span>
                  <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">{s.title}</h2>
                  <div className="gold-line-left mb-6" />
                  <p className="font-body-lg text-base text-on-surface-variant font-light leading-relaxed mb-8">{s.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {s.features.map((f) => (
                      <span key={f} className="glass-panel px-4 py-2 rounded-full text-xs text-on-surface-variant uppercase tracking-wider font-label-sm">{f}</span>
                    ))}
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-8 py-3 rounded-sm uppercase tracking-[0.15em] metallic-sheen hover:bg-primary-light transition-colors magnetic-hover">
                    Enquire Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
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
