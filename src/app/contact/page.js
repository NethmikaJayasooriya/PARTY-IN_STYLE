import RevealSection from "../components/RevealSection";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Party in Style. Book your luxury event consultation in Sydney, Melbourne, or Perth.",
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
          Connect with our concierges to discuss your vision. Discretion and excellence are guaranteed.
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
                    { icon: "location_on", label: "Offices", text: "Sydney | Melbourne | Perth" },
                    { icon: "mail", label: "Email", text: "concierge@partyinstyle.com.au" },
                    { icon: "call", label: "Phone", text: "+61 2 9000 0000" },
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
                href="https://wa.me/61290000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-panel p-6 rounded-xl glow-hover animated-border"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-green-400 text-xl">chat</span>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.5765498725!2d150.85194209847027!3d-33.84735599014552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
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
