import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-outline/20 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Party in Style"
              className="h-16 w-auto"
              style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.2))" }}
            />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-on-surface-variant/60 text-xs uppercase tracking-wider hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="gold-line mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-xs text-on-surface-variant/40 uppercase tracking-widest">
            &copy; 2026 Party in Style. All rights reserved.
          </p>
          <p className="font-body-md text-xs text-on-surface-variant/40">
            Sydney &bull; Melbourne &bull; Perth
          </p>
        </div>
      </div>
    </footer>
  );
}
