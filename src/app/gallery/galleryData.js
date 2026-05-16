/**
 * Gallery Data Configuration
 * ===========================
 * To add new media, simply add a new object to the array below.
 * 
 * Fields:
 *   src     — Path to the image or video (place files in /public/gallery/)
 *   alt     — Description for accessibility & SEO
 *   cat     — Category name (must match one in CATEGORIES below)
 *   type    — "image" or "video"
 *   poster  — (videos only) Thumbnail image path
 *   aspect  — (optional) "tall", "wide", or leave empty for standard
 * 
 * Categories:
 *   Update the CATEGORIES array if you add new category names.
 */

export const CATEGORIES = ["All", "Weddings", "Corporate", "Private", "Proposals"];

export const GALLERY_ITEMS = [
  // ── Weddings ──
  { src: "/images/wedding.png",   alt: "Bespoke luxury wedding ceremony setup in Victoria",        cat: "Weddings",   type: "image", aspect: "tall" },
  { src: "/images/venue.png",     alt: "Intimate elopement and engagement venue styling",           cat: "Weddings",   type: "image" },
  { src: "/images/table.png",     alt: "Luxury wedding banquet table with gold cutlery",            cat: "Weddings",   type: "image", aspect: "wide" },

  // ── Corporate ──
  { src: "/images/hero.png",      alt: "Premium corporate gala and function in Melbourne",          cat: "Corporate",  type: "image" },
  { src: "/images/corporate.png", alt: "EOFY celebration and high-end office party decor",          cat: "Corporate",  type: "image", aspect: "tall" },
  { src: "/images/cocktail.png",  alt: "Corporate cocktail evening and executive dinner styling",   cat: "Corporate",  type: "image" },

  // ── Private ──
  { src: "/images/party.png",     alt: "Lux Hens Night and exclusive private party styling",        cat: "Private",    type: "image", aspect: "wide" },
  { src: "/images/candles.png",   alt: "Elegant table styling for a milestone birthday",            cat: "Private",    type: "image" },
  { src: "/images/sparklers.png", alt: "Bespoke celebration with sparklers and festive lighting",    cat: "Private",    type: "image", aspect: "tall" },

  // ── Proposals ──
  { src: "/images/proposal.png",  alt: "Romantic private proposal setup with candles and roses",    cat: "Proposals",  type: "image", aspect: "tall" },
  { src: "/images/atmosphere.png",alt: "Intimate gathering and romantic evening atmosphere",        cat: "Proposals",  type: "image" },
  { src: "/images/styling.png",   alt: "Beautiful floral styling for intimate events",              cat: "Proposals",  type: "image", aspect: "wide" },
];
