"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (navRef.current)
            navRef.current.classList.toggle("nav-scrolled", window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        id="main-navbar"
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-transparent border-b border-transparent transition-all duration-500"
      >
        <div className="flex justify-between items-center px-6 md:px-margin-x py-3 w-full max-w-container-max mx-auto min-h-[5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.webp"
              alt="Party in Style"
              width={80}
              height={80}
              className="h-16 md:h-20 w-auto"
              priority
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  pathname === l.href
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-7 py-3 rounded-sm uppercase tracking-[0.15em] metallic-sheen hover:bg-primary-light transition-colors"
          >
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-surface-container-low border-l border-outline/20 p-8 pt-24 flex flex-col gap-6 transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-lg font-medium tracking-wide transition-colors ${
                pathname === l.href
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-outline/20">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-label-sm text-xs font-semibold px-7 py-3 rounded-sm uppercase tracking-[0.15em] metallic-sheen w-full justify-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
