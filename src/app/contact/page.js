import RevealSection from "../components/RevealSection";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Party in Style. Book your luxury event consultation in Melbourne.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Get In Touch</p>
        <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
          Begin Your <span className="gradient-text italic">Journey</span>
        </h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">
          Connect with our concierges to discuss your vision in Melbourne, Victoria. Discretion and excellence are guaranteed.
        </p>
      </section>

      {/* Contact Grid */}
      <section className="pb-stack-lg max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Column */}
          <RevealSection>
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-headline-md text-2xl text-on-surface mb-6">Contact Details</h2>
                <div className="gold-line-left mb-8" />
                <div className="space-y-5">
                  {[
                    { icon: "location_on", label: "Location", text: "Cranbourne East, Melbourne, Victoria 3977, Australia" },
                    { icon: "mail", label: "Email", text: "concierge@partyinstyle.com.au" },
                    { icon: "call", label: "Phone", text: "+61 494 334 934" },
                    { icon: "schedule", label: "Hours", text: "Mon – Sat, 9 AM – 6 PM AEST" },
                  ].map((c) => (
                    <div key={c.icon} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-primary text-lg">{c.icon}</span>
                      </div>
                      <div>
                        <p className="font-label-sm text-[11px] text-primary uppercase tracking-widest mb-0.5">{c.label}</p>
                        <p className="font-body-md text-sm text-on-surface-variant">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/61494334934?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-panel p-6 rounded-xl glow-hover animated-border"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-label-sm text-sm text-on-surface font-medium">Chat on WhatsApp</p>
                  <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Quick response guaranteed</p>
                </div>
                <span className="material-symbols-outlined text-primary ml-auto">arrow_forward</span>
              </a>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-52 border border-outline/20">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Cranbourne+East+VIC+3977,+Australia&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </RevealSection>

          {/* Form Column */}
          <RevealSection delay={200}>
            <div className="glass-panel p-8 md:p-12 rounded-xl animated-border relative overflow-hidden">
              <div className="sparkle-overlay opacity-20" />
              <h2 className="font-headline-md text-2xl text-on-surface mb-2 relative z-10">Send an Enquiry</h2>
              <p className="font-body-md text-sm text-on-surface-variant mb-8 relative z-10">We&#39;ll get back to you within 24 hours.</p>
              <form className="flex flex-col gap-7 relative z-10">
                {[
                  { id: "name", label: "Full Name", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                  { id: "phone", label: "Phone Number", type: "tel" },
                  { id: "location", label: "Suburb (Melbourne Only)", type: "text" },
                  { id: "eventType", label: "Event Type", type: "text" },
                ].map((f) => (
                  <div key={f.id} className="relative group">
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors peer placeholder-transparent"
                      id={f.id}
                      placeholder={f.label}
                      required
                      type={f.type}
                    />
                    <label
                      className="absolute left-0 top-3 text-on-surface-variant/60 font-body-md text-sm transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
                      htmlFor={f.id}
                    >
                      {f.label}
                    </label>
                  </div>
                ))}
                <div className="relative group">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors [color-scheme:dark]"
                    id="date"
                    required
                    type="date"
                  />
                  <label className="absolute left-0 -top-4 text-[11px] text-on-surface-variant/60 uppercase tracking-widest pointer-events-none" htmlFor="date">
                    Estimated Date
                  </label>
                </div>
                <div className="relative group">
                  <textarea
                    className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors resize-none peer placeholder-transparent"
                    id="message"
                    placeholder="Tell us about your vision"
                    rows="3"
                  />
                  <label
                    className="absolute left-0 top-3 text-on-surface-variant/60 font-body-md text-sm transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
                    htmlFor="message"
                  >
                    Tell Us About Your Vision
                  </label>
                </div>
                <button
                  className="mt-2 bg-primary text-on-primary-container font-label-sm text-xs font-bold px-8 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors flex justify-center items-center gap-3 w-full"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Send Enquiry
                </button>
              </form>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
