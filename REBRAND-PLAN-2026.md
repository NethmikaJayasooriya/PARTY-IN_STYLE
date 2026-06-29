# Party in Style — Full Rebrand + SEO/AEO/GEO Plan (v2)

**Prepared:** 28 June 2026
**Stack:** Next.js 16 · React 19 · Tailwind v4 · Firebase
**Supersedes:** `REDESIGN-PLAN.md` (23 Jun) — that plan went *dark* "Champagne Noir". This v2 pivots to a **bright White + Gold luxe** look and repositions the brand around **kids' themed birthday parties** as the hero offering.

---

## 0. The 4 confirmed decisions

1. **Colour direction:** Bright **White + Gold luxe** (move away from the current dark plum-black).
2. **Hero media:** **Real client photos** in a smooth, cinematic (Ken-Burns/video-like) hero — built so a real `.mp4` can be dropped in later. No AI-generated images of children (trust + safety + SEO authenticity).
3. **Positioning:** **Kids' themed birthdays primary** (Spiderman / Batman / Barbie etc.), weddings + corporate secondary.
4. **Process:** This plan first → approve → then build in phases.

---

## 1. The problem with the site today (audit)

The codebase is genuinely strong: Next.js 16, server components, 4 schema types, sitemap, robots, metadata, a working hero enquiry form → WhatsApp + Firestore. The issues are **positioning, look, and a few SEO gaps**, not the foundation.

**Brand / look**
- The whole theme is **cold dark** (`#15101a` plum-black). It reads "moody nightclub template," not "joyful premium kids' celebration." You asked for bright — correct call.
- Positioning is **weddings/corporate first**. Copy says *"premier luxury event planners," "discerning clientele," "high-octane experiences."* That language actively pushes away the parents who are the real buyers.
- Hero cycles **4 background images** with a heavy dark overlay (`brightness(0.5)`) — the photos are barely visible, which is the "images look broken / colour not set" feeling you flagged.

**UI / UX**
- Hero images are dimmed so far they look muddy; on a white theme the photos should *shine*.
- Heavy effect stack (preloader, custom cursor, scroll progress, magnetic hover, animated borders, 5 ambient orbs) — costs performance and adds noise.
- Mobile: the enquiry form sits below a tall branding block — buyers scroll past the thing that earns the lead.

**SEO / AEO / GEO gaps**
- `/gallery` is fully client-rendered (Firebase in `"use client"`) → near-invisible to crawlers and AI.
- Geography mismatch: copy says "Australia-wide," schema says Melbourne/VIC only.
- Only the homepage has a canonical tag.
- No **theme-specific pages** (Spiderman party, Barbie party…) — this is exactly what competitors rank for and what parents search.
- FAQ is thin (4 Q&A); no `HowTo` / `Speakable` for answer engines.
- Blog has only 3 posts, all luxury/wedding/corporate angled — wrong topical authority for a kids-party brand.
- No author / E-E-A-T signals (named planner, real experience) — the structured, citable facts that make ChatGPT/Gemini/Perplexity recommend you.

---

## 2. The market we're competing in (Melbourne)

Research shows two competitor types, and a clear gap between them:

- **Character entertainers** — Little Party Faces, EE Kids Parties, Kids Party Heroes, Dreamscape, Fly By Fun. They send a costumed Spiderman/Batman for ~$240/hr. They do *performance*, not styling.
- **Party stylists / hire** — Studio Royale, Balloon Girl Co., Tru Style Events, The Backdrop Station, Evviva. They do balloons, backdrops, props.

**The gap = our position:** *Party in Style is the one-stop **themed styling + full planning** service* — we design and run the whole themed party (decor, balloons, backdrop, props, coordination), themed exactly to what the child loves. Most competitors do only one half. That's the wedge, and it's also the SEO story.

Melbourne kids' party budgets run roughly **$300 → $1,000+**, so a "free consultation + bespoke quote" CTA fits buyer expectations.

---

## 3. New brand system — "Champagne Daylight"

Bright, premium, joyful. Gold stays (it's in the logo), but now sits on light, airy surfaces with playful jewel pops per theme.

### Colour tokens
| Role | New value | Use |
|---|---|---|
| Base background | `#FBF8F3` warm ivory | Whole site — bright, clean, premium |
| Surface / cards | `#FFFFFF` + soft shadow | Glass → solid white panels |
| Ink (text) | `#2A2320` warm near-black | High-contrast, readable (accessibility) |
| Primary | `#C9A24B → #E6C766` champagne gold | CTAs, accents, logo match |
| Gold deep (text on light) | `#A07C2C` | Gold text that passes contrast |
| Birthday / kids | Blush `#E86A8E` | Primary accent — this is the hero category |
| Boys / superhero | Hero blue `#3C7DD6` + red pop `#E5483D` | Spiderman/Batman energy |
| Girls / Barbie | Barbie pink `#E84C9A` + lilac `#B58AD9` | Girls themes |
| Weddings | Sage/emerald `#5FA98C` | Secondary |
| Corporate | Gold/charcoal | Secondary |

**Rule so it stays premium, not loud:** white + gold is the constant; the bright theme colours appear only as *accents* (category pills, badges, theme cards, hover states), never as full backgrounds. Soft pastel tints + gentle shadows give depth instead of dark glass.

### Typography
- **Display / headings:** Fraunces (already loaded) — warm, premium serif. Keep.
- **Body / UI:** Manrope (already loaded). Keep.
- **Accent script:** Italianno, sparingly, for one flourish word.
- Tune for light bg: headings in warm ink, gold reserved for emphasis words.

### Logo
- Keep the gold champagne-glass "P" monogram. Add a **light-background lockup** (the current one is built for dark). Provide a horizontal wordmark version for the navbar on white.

---

## 4. Hero redesign — bright, real photos, lead-first

**Layout:** Left = punchy headline + theme pills + trust line. Right = the enquiry form (the lead engine), visible above the fold on desktop **and** mobile.

**Media:** Showcase **real client event photos** in a smooth cinematic loop:
- Crossfade + slow Ken-Burns zoom between real photos (Spiderman setup → Barbie party → 1st birthday → … ) so it *feels* like a 10-second video without a video file.
- Light, bright treatment: remove the heavy dark overlay; use a soft gold/white bottom gradient only where text sits, so photos stay vivid.
- **Video-ready:** a `<video>` slot wired in — when the client supplies a real edited `.mp4` (the "birth → milestones → themed parties" story you described), it drops straight in and the image loop becomes the fallback poster. *(We script/storyboard that video from their footage; we don't AI-generate children.)*

**Theme storytelling:** the pills become **kid-theme led** — *Superheroes (Spiderman/Batman), Princess & Barbie, 1st Birthdays, Themed & Custom, Weddings, Corporate* — each pill tints the accent colour so the "for boys / for girls / by age" idea you described shows instantly.

**Form:** keep the WhatsApp + Firestore flow (it works). Reduce to 3 quick fields above the fold (Name, Contact, Event) with theme + details optional. Add a sticky "Get Free Quote" on mobile scroll.

---

## 5. "Others" / styling services line

Add the work the client actually does so it ranks and converts:
**Table styling & decoration, balloon garlands & installations, themed backdrops, party props & hire, party favours, on-the-day styling.**
- New service card + jewel accent + icon, on home preview and `/services`.
- Added to `makesOffer` schema + a dedicated `Service` schema block.

---

## 6. SEO — top of Melbourne

**Technical**
- Fix `/gallery`: server wrapper with metadata + SSR fallback (alts/captions crawlable); keep the live Firebase grid for users.
- Per-page canonical tags on every route.
- Reconcile geography: lead with **Melbourne** everywhere; `areaServed` = Melbourne + key suburbs + VIC; mention Australia-wide only as capability.
- Image perf: drop `unoptimized`, ship responsive `next/image` sizes (biggest LCP win).

**Content / keyword architecture** (the real growth lever)
Build **theme landing pages** — what parents actually search and competitors own:
- `/themes/spiderman-party-melbourne`
- `/themes/batman-party-melbourne`
- `/themes/barbie-party-melbourne`
- `/themes/princess-party-melbourne`
- `/themes/1st-birthday-melbourne`
- plus a `/themes` hub.
Each: hero, what's included, gallery, price-from, FAQ, CTA, `Service` + `FAQ` schema.

**Suburb intent:** a "Areas we serve" section / light suburb pages (Cranbourne, Berwick, Pakenham, Narre Warren, SE Melbourne) for "kids party planner [suburb]" searches.

**Target keyword themes:** *themed kids birthday party Melbourne · Spiderman/Batman/Barbie party Melbourne · kids party stylist Melbourne · balloon backdrop hire Melbourne · 1st birthday party planner Melbourne · superhero party Melbourne*.

## 7. AEO — answer engines (featured snippets, voice)
- Expand FAQ to **10–12** answer-first Q&As (cost, how far ahead to book, what's included, do you do venue or at-home, age ranges, themes offered, suburbs).
- Add a `HowTo`: "How to plan a themed kids' birthday party in Melbourne."
- Add `Speakable` schema on key answers.
- Answer-first formatting (question as H2/H3, 40–55 word direct answer, then detail).

## 8. GEO — get recommended by ChatGPT / Gemini / Perplexity
- **E-E-A-T:** real named planner bio, years of experience, real event count, Melbourne base — replace "Organization" author with a real person.
- **Citable facts:** entity-rich content — named suburbs, themes, typical price ranges, package inclusions, turnaround times. LLMs quote structured facts.
- **Grow the blog 3 → 8–10** kids-party-led guides ("Best superhero party ideas Melbourne," "How much does a kids' party cost in Melbourne," "1st birthday styling checklist," "Barbie party ideas"). Topical authority is what makes AI name you.
- Consistent NAP + real reviews path (no fake star schema — keep authentic testimonials; add Instagram/real gallery as social proof).

---

## 9. Performance & polish
- Trim the effect stack (keep a light gold cursor accent + subtle reveals; drop the heaviest orbs/borders).
- Verify `prefers-reduced-motion`.
- Target green Lighthouse (Perf / SEO / A11y / Best Practices).

---

## 10. Build order (phased)

1. **Foundation** — White+Gold tokens + light-mode typography in `globals.css` / `layout.js`. *(See the whole new look before anything else.)*
2. **Hero** — bright real-photo cinematic hero, kid-theme pills, lead-first form, video-ready slot.
3. **Home + copy** — reposition copy kids-first; bright cards; stats/testimonials restyle; add styling/"Others" line.
4. **Services + theme pages** — `/services` refresh + `/themes/*` landing pages with schema.
5. **Gallery SSR fix + canonicals + geography reconcile.**
6. **AEO/GEO** — expanded FAQ, HowTo/Speakable, author E-E-A-T, blog expansion.
7. **Performance pass + Lighthouse verification.**

**Suggested first build slice (after you approve):** Phase 1 + 2 — the bright theme + new hero — so you can see and approve the new feel before we roll it across every page.

---

## 11. What I need from the client
- 8–15 **real high-res event photos** (themed parties, balloon/backdrop setups, smiling-but-shareable moments) for hero + gallery.
- Real **business facts** for E-E-A-T: planner name/bio, years active, number of events, exact suburbs served, typical "price from" per package.
- Optional: any **video footage** of past events → we storyboard/edit the hero video.
- Confirm: real testimonials we can publish (names/initials OK).

---

*Next step: approve this plan (or tweak colours/scope), and I'll start Phase 1 — the bright White + Gold foundation — then the new hero, so you see the new look fast.*
