# Party in Style — Redesign Plan

**Prepared:** 23 June 2026
**Stack:** Next.js 16 / React 19 / Tailwind v4 / Firebase
**Goal:** Lift the site to a premium, "wow" standard — stronger visual identity (colour + fonts that match the gold champagne logo), a faster booking flow, an added *Others* services line, and SEO/AEO/GEO at the highest level.

---

## 1. Direction at a glance

The brand already has a clear asset: a **gold champagne-glass "P" monogram** on a light ground. The current site is cold near-black + a single gold. It reads "dark template," not "luxury celebration." The redesign keeps the luxury feel but **adds warmth and colour that flows from the logo**, fixes the font pairing, makes the hero booking instant, and adds the missing service line.

Decisions confirmed with client:
- **Colour:** match the industry + logo, make it *wow* (my call on execution).
- **Reviews:** no Google reviews exist — do the best-practice thing (keep authentic written testimonials, drop any fake star/rating schema).

---

## 2. New colour system — "Champagne Noir + Jewel"

Moving from one-gold-on-black to a layered, warmer luxury palette. More colour, still high-end, anchored to the logo gold.

| Role | Now | New | Why |
|---|---|---|---|
| Base | `#0c0d0e` cold black | `#15101a` warm plum-black + subtle gradient to `#1a1422` | Warmer, richer, less "template" |
| Primary | `#d4af37` gold | `#d4af37` → `#e8c876` champagne gradient | Pulls straight from the logo |
| Accent 1 | — | **Emerald** `#1f8a6b` | Weddings / nature / fresh |
| Accent 2 | — | **Blush / Rose-gold** `#e0a4a4` → `#c75b7a` | Birthdays / celebration warmth |
| Accent 3 | — | **Amethyst** `#7a5ca8` | Themed / festival / night |
| Surface | flat dark | glass panels with faint jewel tint per section | Depth + colour without clutter |

**How colour is used (so it stays luxury, not loud):**
- Each event category gets a signature jewel hue (corporate = gold, wedding = emerald, birthday = blush, themed/festival = amethyst). This colour-codes the hero pills, service cards, and category badges — instant "more colourful" feel with meaning behind it.
- Gold stays the hero/CTA colour everywhere for consistency.
- Backgrounds gain soft multi-stop gradients + the existing ambient orbs re-tinted to jewel tones (very low opacity).

---

## 3. Typography fix

**Problem:** Playfair Display (very high-contrast display serif) + Outfit (geometric sans) clash — the "galapenne na" feeling. The serif is sharp/cold, the sans is plain.

**New pairing — warm luxe:**
- **Display / headings:** **Fraunces** (soft, modern "old-style" serif with optical sizing) — luxurious but friendlier than Playfair. *Alt if preferred: Cormorant Garamond.*
- **Body / UI:** **Manrope** (warm geometric sans, pairs cleanly with Fraunces) — or keep Outfit if you want minimal change.
- **Accent script (sparingly):** a tasteful script (e.g. *Tangerine* / *Italianno*) for one or two flourish words like *"Extraordinary"* — adds the "wow" without looking cheap.

Type scale tightened for rhythm; line-heights and letter-spacing tuned per role. All via `next/font` (no layout shift, preloaded).

---

## 4. Hero — instant booking

The hero already carries the enquiry form (good). Refinements for speed + wow:
- Make the form the visual anchor on mobile (it currently sits below the fold on small screens) — surface a compact 3-field "quick quote" (Name, Contact, Event) above the fold, with details optional.
- Reduce required fields to the minimum needed to act; everything else optional.
- Category pills get the new jewel colour-coding + clearer active state.
- Re-tint hero gradients to warm plum so text contrast improves and the imagery feels richer.
- **Fix:** hero images currently use `unoptimized` + are large (one is 457 KB). Switch to optimised `next/image` + properly sized variants → faster LCP, the single biggest speed win.

---

## 5. "Others" services line

Add a new offering covering the extra work the client does:
- **Table styling & decoration**, **party favours & gift styling**, **balloon & backdrop installations**, **hire items / props**, **on-the-day styling**.

Where it appears:
- New card in the homepage *Expertise* preview and on `/services` (with its own jewel accent + icon).
- Added to the `EventPlanningBusiness` → `makesOffer` schema and a dedicated `Service` schema block (helps SEO + AEO surface it).
- Optional sub-anchor so it can rank for "table decoration / party hire Melbourne" searches.

---

## 6. Custom cursor — "moon orbit"

Client's idea: cursor like a moon/orbit. Redesign the existing `CursorTrail` into an elegant **gold ring with a small "moon" dot orbiting it**, smooth follow with easing.
- Hover state: ring expands + moon speeds up over links/buttons.
- Desktop only (`pointer: fine`); hidden for touch and respects `prefers-reduced-motion`.
- Lightweight (rAF, transform-only) so it doesn't cost performance.

---

## 7. Testimonials / social proof (no fake reviews)

- **Keep** the written client testimonials as elegant quote cards (authentic, no invented ratings).
- **Remove** any aggregateRating / "Google reviews" star schema so we never claim ratings that don't exist (protects trust + avoids Google penalty).
- **Add** real social proof instead: an Instagram strip / live gallery showcase pulling actual event photos — stronger than fake stars.

---

## 8. SEO / AEO / GEO — to the top tier

The technical base is already good (metadata, sitemap, robots, 6 schema types). Gaps to close:

**SEO**
- Fix `/gallery` — it's fully client-rendered (`"use client"` + Firebase), so it's near-invisible to crawlers. Add a server wrapper with metadata + a static SSR fallback of image alts/captions.
- Reconcile geography: site says "Australia-wide" but schema lists only Melbourne/VIC — align messaging + `areaServed`.
- Per-page canonical tags on every subpage (only root has one now).
- Add `Service` schema for each offering incl. the new *Others* line.

**AEO (answer engines)**
- Expand the FAQ set (4 → 10–12) and add answer-first Q&A blocks on the services page.
- Add `Speakable` schema + `HowTo` where natural (e.g. "How to plan a Melbourne wedding").

**GEO (ChatGPT / Gemini / Perplexity recommend you)**
- Add real **author bios / E-E-A-T** signals (named planner, experience) instead of "Organization" author.
- Add citable, factual, entity-rich content: stats, comparisons, named suburbs/venues — the structured facts LLMs quote.
- Grow the blog from **3 → 8–10** substantial, well-structured guides for topical authority.

---

## 9. Performance & polish

- Replace `unoptimized` hero images; generate responsive sizes.
- Trim the heavy effect stack (preloader, cursor, scroll progress, magnetic hover, animated borders) so it enhances rather than slows — keep the moon cursor + ambient glow, lighten the rest.
- Verify `prefers-reduced-motion` covers all new animations.
- Target: green Lighthouse (Performance / SEO / Accessibility / Best Practices).

---

## 10. Suggested build order

1. **Foundation** — new colour tokens + font system in `globals.css` / `layout.js` (everything inherits this).
2. **Hero** — booking-first layout, jewel pills, image optimisation.
3. **Moon-orbit cursor.**
4. **Services** — add *Others* line + jewel colour-coding + schema.
5. **Testimonials/social-proof** swap.
6. **SEO/AEO/GEO** — gallery SSR fix, canonicals, expanded FAQ/schema, author E-E-A-T, blog expansion.
7. **Performance pass + Lighthouse verification.**

---

*Next step: confirm this plan (or tweak the colour/font picks), then I start on the foundation layer — colour + fonts — so you can see the new look before we build the rest.*
