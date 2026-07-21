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
  "Lighting",
];

export const GALLERY_ITEMS = [
  { src: "/images/20260613_202406.mp4", alt: "Party Video 5", cat: "Themed", type: "video", aspect: "tall" },
  { src: "/images/20260613_203834.mp4", alt: "Party Video 6", cat: "Themed", type: "video", aspect: "tall" },
  { src: "/images/1img.webp", alt: "Pink Floral Setup 24th", cat: "Themed", type: "image", aspect: "tall" },
  { src: "/images/2img.webp", alt: "Pink Floral Pillars", cat: "Weddings", type: "image", aspect: "wide" },
  { src: "/images/3img.webp", alt: "Teal Floral Setup 24th", cat: "Themed", type: "image", aspect: "tall" },
  { src: "/images/4img.webp", alt: "White Heart Floral Birthday", cat: "Weddings", type: "image", aspect: "tall" },
  { src: "/images/5img.webp", alt: "White Heart Floral Arch", cat: "Weddings", type: "image", aspect: "wide" },
  { src: "/images/6img.webp", alt: "Boy or Girl Gender Reveal", cat: "Corporate", type: "image", aspect: "tall" },
  { src: "/images/7img.webp", alt: "Neon Glow Party", cat: "Themed", type: "image", aspect: "tall" },
  { src: "/images/8img.webp", alt: "Disco Neon Setup", cat: "Corporate", type: "image", aspect: "tall" },
  {
    src: "/images/10.webp",
    alt: "Harry Potter Theme",
    cat: "Superheroes",
    type: "carousel",
    aspect: "square",
    images: [
      { src: "/images/10.webp", alt: "Harry Potter Theme 1" },
      { src: "/images/23.webp", alt: "Harry Potter Setup" },
      { src: "/images/24.webp", alt: "Harry Potter Arch" }
    ]
  },
  { src: "/images/11.webp", alt: "Unicorn Birthday Setup", cat: "Princess & Barbie", type: "image", aspect: "tall" },
  { src: "/images/12.webp", alt: "Elegant Black Backdrop", cat: "Lighting", type: "image", aspect: "tall" },
  { src: "/images/13.webp", alt: "Unicorn Birthday Display", cat: "Princess & Barbie", type: "image", aspect: "tall" },
  { src: "/images/14.webp", alt: "Fast One 1st Birthday", cat: "1st Birthdays", type: "image", aspect: "wide" },
  { src: "/images/15.webp", alt: "Race Car Theme", cat: "Superheroes", type: "image", aspect: "tall" },
  { src: "/images/_n.webp", alt: "Party Styling 15", cat: "Lighting", type: "image", aspect: "tall" },

  { src: "/images/16img.jpg", alt: "Sports Car Happy Birthday", cat: "Superheroes", type: "image", aspect: "tall" },
  { src: "/images/17img.jpg", alt: "Boy or Girl Sign", cat: "Corporate", type: "image", aspect: "tall" },
  { src: "/images/18.webp", alt: "Number 1 Pink Balloons", cat: "1st Birthdays", type: "image", aspect: "wide" },
  { src: "/images/19.webp", alt: "Pink and Blue Balloon Arch", cat: "1st Birthdays", type: "image", aspect: "tall" },
  { src: "/images/20.webp", alt: "Unicorn Happy Birthday", cat: "Princess & Barbie", type: "image", aspect: "tall" },
  { src: "/images/21.webp", alt: "Pink Floral 24", cat: "Themed", type: "image", aspect: "tall" },
  { src: "/images/22.webp", alt: "Pink Floral 24 Alternate", cat: "Themed", type: "image", aspect: "wide" },

  { src: "/images/25.webp", alt: "Game On Birthday", cat: "Themed", type: "image", aspect: "wide" },
  { src: "/images/26.webp", alt: "Here Comes The Son", cat: "1st Birthdays", type: "image", aspect: "tall" },
  { src: "/images/cand1.webp", alt: "Candles Display", cat: "Lighting", type: "image", aspect: "tall" },
  { src: "/images/candel.webp", alt: "Candle Setup", cat: "Lighting", type: "image", aspect: "wide" },
  { src: "/VID-20260315-WA0042.mp4", alt: "Party Video", cat: "Themed", type: "video", aspect: "tall" },
  { src: "/images/received_1503279054753699.mp4", alt: "Party Video 2", cat: "Themed", type: "video", aspect: "tall" },
  { src: "/images/VID-20260425-WA0005.mp4", alt: "Party Video 3", cat: "Themed", type: "video", aspect: "tall" },
  { src: "/images/20260609_231839.mp4", alt: "Party Video 4", cat: "Themed", type: "video", aspect: "tall" },
];
