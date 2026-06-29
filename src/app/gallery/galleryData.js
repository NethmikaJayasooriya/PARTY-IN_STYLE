/**
 * Gallery Data Configuration
 * ===========================
 * Party in Style mainly does themed KIDS BIRTHDAY parties, plus weddings &
 * corporate. Categories below mirror the Home / Services line-up.
 *
 * Fields:
 *   src    — Path to the image (files live in /public/images/)
 *   alt    — Description for accessibility & SEO
 *   cat    — Category (must match one in CATEGORIES below)
 *   type   — "image" or "video"
 *   aspect — (optional) "tall", "wide", or leave empty for standard
 */

export const CATEGORIES = [
  "All",
  "Superheroes",
  "Princess & Barbie",
  "1st Birthdays",
  "Themed",
  "Weddings",
  "Corporate",
];

export const GALLERY_ITEMS = [
  // ── Superheroes ──
  { src: "/images/hero-superhero-ls.webp", alt: "Spider-Man & Batman superhero birthday party styling in Melbourne", cat: "Superheroes", type: "image", aspect: "wide" },
  { src: "/images/hero-superhero.webp", alt: "Superhero themed balloon arch and backdrop for a kids birthday", cat: "Superheroes", type: "image" },

  // ── Princess & Barbie ──
  { src: "/images/hero-barbie-ls.webp", alt: "Barbie pink princess birthday party setup with balloons", cat: "Princess & Barbie", type: "image", aspect: "wide" },
  { src: "/images/hero-barbie.webp", alt: "Fairytale princess dessert table and pink balloon styling", cat: "Princess & Barbie", type: "image" },

  // ── 1st Birthdays ──
  { src: "/images/hero-1stbday-ls.webp", alt: "First birthday party styling with balloon garland and cake table", cat: "1st Birthdays", type: "image", aspect: "wide" },
  { src: "/images/hero-kids-1.webp", alt: "Kids birthday party celebration styled in Melbourne", cat: "1st Birthdays", type: "image", aspect: "tall" },
  { src: "/images/hero-1stbday.webp", alt: "Milestone first birthday cake table and pastel decor", cat: "1st Birthdays", type: "image" },
  { src: "/images/hero-kids-2.webp", alt: "Children's themed party styling, games and decorations", cat: "1st Birthdays", type: "image", aspect: "tall" },

  // ── Themed / Custom ──
  { src: "/images/hero-themed-ls.webp", alt: "Custom themed party backdrop and prop styling", cat: "Themed", type: "image", aspect: "wide" },
  { src: "/images/hero-kids-3.webp", alt: "Jungle and adventure themed kids party setup", cat: "Themed", type: "image", aspect: "wide" },
  { src: "/images/hero-themed.webp", alt: "Bespoke themed birthday decoration and balloon installation", cat: "Themed", type: "image" },

  // ── Weddings ──
  { src: "/images/hero-wedding-ls.webp", alt: "Elegant luxury wedding reception styling in Melbourne", cat: "Weddings", type: "image", aspect: "wide" },
  { src: "/images/hero-wedding.webp", alt: "Floral wedding ceremony arch and luxury table styling", cat: "Weddings", type: "image" },

  // ── Corporate ──
  { src: "/images/hero-corporate-ls.webp", alt: "Premium corporate gala and EOFY function styling", cat: "Corporate", type: "image", aspect: "wide" },
  { src: "/images/hero-corporate.webp", alt: "Executive corporate event styling and décor in Melbourne", cat: "Corporate", type: "image" },
];
