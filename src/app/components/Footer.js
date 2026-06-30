import Link from "next/link";
import { getSettings } from "@/lib/getSettings";

const EXPLORE = [
  { label: "Services", href: "/services" },
  { label: "Themes", href: "/themes" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const POPULAR = [
  { label: "Spider-Man Parties", href: "/themes/spiderman-party-melbourne" },
  { label: "Barbie & Princess", href: "/themes/barbie-party-melbourne" },
  { label: "1st Birthdays", href: "/themes/first-birthday-melbourne" },
  { label: "All Party Themes", href: "/themes" },
];

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(230,199,102,0.25)" }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </a>
  );
}

export default async function Footer() {
  const settings = (await getSettings()) || {};
  const phone = settings.phone || "+61 494 334 934";
  const email = settings.email || "Kosatheman@gmail.com";

  return (
    <footer
      id="main-footer"
      className="relative w-full overflow-hidden text-white"
      style={{
        backgroundColor: "#171009",
        backgroundImage:
          "radial-gradient(900px 400px at 85% -20%, rgba(230,199,102,0.16), transparent 60%), radial-gradient(700px 360px at 0% 120%, rgba(232,106,142,0.10), transparent 55%)",
      }}
    >
      <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, #C9A24B, #E6C766, #C9A24B, transparent)" }} />

      <div className="max-w-container-max mx-auto px-6 md:px-margin-x py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="Party in Style" width={64} height={64} className="h-16 w-auto" loading="lazy" style={{ filter: "drop-shadow(0 0 8px rgba(230,199,102,0.35))" }} />
              <span className="champagne-text font-headline-md text-2xl font-bold">Party in Style</span>
            </div>
            <p className="font-body-md text-sm text-white/65 max-w-xs leading-relaxed">
              Melbourne&#39;s themed kids&#39; party &amp; event stylists — Spider-Man to Barbie, 1st birthdays to weddings. We design, style and run the whole celebration.
            </p>
            <div className="flex gap-3 items-center mt-1">
              <Social href={settings.facebook || "https://www.facebook.com/groups/1440866676676461/user/61586600203536/"} label="Facebook">
                <path d="M14 8h2V5h-2a3 3 0 00-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 011-1z" fill="currentColor" stroke="none" />
              </Social>
              <Social href={settings.instagram || "https://www.instagram.com/partyinstyle111"} label="Instagram">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="3.8" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </Social>
              <Social href="https://wa.me/61494334934" label="WhatsApp">
                <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3z" />
                <path d="M8.5 9.5c0 4 3 6.5 6 6.5.7 0 1.3-.6 1.3-1.1 0-.3-1.6-1-1.9-.8-.4.4-.7.7-1.4.3-1-.5-1.8-1.6-2-2.2-.1-.4.4-.7.6-1 .2-.3-.6-1.8-.9-1.8-.5 0-1.2.5-1.3 1.3z" fill="currentColor" stroke="none" />
              </Social>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3 className="font-label-sm text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#E6C766" }}>Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div className="md:col-span-3">
            <h3 className="font-label-sm text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#E6C766" }}>Popular Themes</h3>
            <ul className="flex flex-col gap-2.5">
              {POPULAR.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-label-sm text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#E6C766" }}>Get in Touch</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-base" style={{ color: "#E6C766" }}>call</span><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{phone}</a></li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-base" style={{ color: "#E6C766" }}>mail</span><a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">{email}</a></li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-base" style={{ color: "#E6C766" }}>location_on</span><span>Cranbourne, Berwick, Pakenham &amp; all Melbourne</span></li>
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2 mt-5 bg-primary text-on-primary-container font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-[0.15em] metallic-sheen hover:bg-primary-light transition-colors">
              <span className="material-symbols-outlined text-sm">event_available</span>Book Now
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderTop: "1px solid rgba(230,199,102,0.15)" }}>
          <p className="font-body-md text-xs text-white/50 uppercase tracking-widest">&copy; 2026 Party in Style. All rights reserved.</p>
          <p className="font-body-md text-xs text-white/50">Melbourne&#39;s premier themed party stylists</p>
        </div>
      </div>
    </footer>
  );
}
