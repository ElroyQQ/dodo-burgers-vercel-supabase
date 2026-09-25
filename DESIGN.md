---
name: Dodo Burgers
description: A precision-engineered product launch for a fictional Singapore burger restaurant, told in the confident, dark, single-accent register of a hardware company reveal.
colors:
  navy-950: "#020b14"
  navy-card: "#0a1622"
  navy-card-alt: "#0f2233"
  paper: "#ffffff"
  paper-alt: "#eef2f6"
  line-light: "#e2e8f0"
  line-dark: "rgba(255,255,255,0.14)"
  ink: "#0a1420"
  ink-muted: "#4d5f70"
  on-dark: "#f5f7fa"
  on-dark-muted: "#9fb3c8"
  accent: "#6699cc"
  accent-strong: "#3f6f9c"
  accent-strong-hover: "#345f86"
  accent-tint: "rgba(102,153,204,0.14)"
typography:
  display:
    fontFamily: "Space Grotesk, Manrope, sans-serif"
    fontSize: "clamp(2.3rem, 6vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Space Mono, SF Mono, monospace"
    fontSize: "0.7rem"
    letterSpacing: "0.1em"
rounded:
  2xs: "6px"
  xs: "7px"
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  pill: "999px"
spacing:
  section-block: "88px"
  section-inline: "20px"
  card-padding: "22px"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
  tag-pill:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.accent-strong}"
    rounded: "{rounded.pill}"
---

# Design System: Dodo Burgers

## Overview

**Creative North Star: "The Engineered Reveal"**

Dodo Burgers plays its own absurd premise — an extinct flightless bird that quietly evolved gills and got rediscovered off a Singapore container port — completely straight, with the visual confidence of a hardware company unveiling a flagship product. The world is a near-black navy stage that alternates with clean white content bands, one restrained steel-blue accent carrying every call to action and data point, and real, dramatically-lit photography standing in for the "product shots" a robotics or device launch would use. Nothing is illustrated except one standing, explicitly-scoped exception (the animated SVG burger-preview graphic in the builder); everything else is a real photograph, treated with cooler, darker, more deliberate lighting than a typical cheerful food site would use.

This design replaced an earlier light/cream, teal-and-coral, illustration-adjacent "friendly mascot" treatment. That look is kept only as evidence of what the brand's facts are (the menu, the backstory, the Singaporean voice), never as an aesthetic to extend. The confirmed rejection: no cream backgrounds, no dual teal/coral accent system, no eyebrow labels sitting above headings, no colored glow shadows.

**2026-09-24 addendum**: the site moved from a normal vertical scroll to a full horizontal-scroll layout (see Layout), and a second illustration exception was approved — not a static background motif (an earlier line-art dodo/patty background pattern was tried and rejected as inaccurate) but a small **chase animation**: a chef icon and a dodo icon fixed to the bottom of the viewport, sliding left-to-right in lockstep with scroll progress across the entire site (0% scroll = both icons near the left edge; 100% = both near the right edge, at the footer). This is a named, scoped override of the real-photo-only policy for one decorative element (recorded in PRODUCT.md); it does not license illustration in any content-bearing image (menu, hero, builder photography all stay real photographs).

**Key Characteristics:**
- Near-black navy (`#020b14`) and clean white/off-white bands, alternating section by section, never blended.
- One accent hue family (steel blue) at two values: a lighter tone for on-dark text/highlights, a deeper tone for solid button fills that need to hold contrast on either background.
- A heavy geometric display face (Space Grotesk, weight 700) standing in for the confidence a hardware brand's wordmark would carry.
- Real photography only, re-graded cooler and darker, cropped tighter so the subject dominates the frame the way a product shot does — never a distant, cheerful establishing shot.
- Flat, hairline-bordered surfaces over heavy drop-shadow cards; shadows are neutral and soft, never colored glows.

## Colors

The palette is deliberately narrow: two neutral "grounds" (near-black navy, white) that sections alternate between, and exactly one accent hue used at two values for contrast-safe pairing.

### Primary
- **Steel Blue** (`#6699cc`): the accent wherever it sits on a dark ground — hero stat numerals, the "now" emphasis word, links and highlights inside dark sections, the animated builder-preview's ambient glow. Never used at more than accent scale; it never fills a large surface.
- **Steel Blue Deep** (`#3f6f9c`): the same hue, deepened for the one job the lighter value can't do safely — solid button fills carrying white text (`See the menu`, `Add to order`, `Send to kitchen`, the header's `Order` pill), and accent text sitting on a *light* ground (tag pills, stat labels, field-log data) where the lighter value would fail contrast.

### Neutral
- **Navy Ground** (`#020b14`): the dark section background — hero, "Find the shop", and the "field log" story section. Also the fixed dark surface for small solid UI chips (the cart badge) regardless of section.
- **Navy Card** (`#0a1622`) / **Navy Card Alt** (`#0f2233`): panel and muted-panel backgrounds *inside* dark sections (the field-log dossier card, its stat readouts) — one step lighter than the ground so panels read as layered, not flat-pasted.
- **Paper** (`#ffffff`) / **Paper Alt** (`#eef2f6`): the light section grounds, alternating for rhythm (menu and FAQ sit on the alt tone; "why us" and the builder sit on pure white).
- **Ink** (`#0a1420`) / **Ink Muted** (`#4d5f70`): primary and secondary text on light grounds.
- **On-Dark** (`#f5f7fa`) / **On-Dark Muted** (`#9fb3c8`): primary and secondary text on dark grounds.

### Named Rules
**The One Hue Rule.** Every accent moment in this system — buttons, links, numerals, glows, the stamp graphic — comes from the same steel-blue hue at one of exactly two values. A second accent hue (the old system's coral) never returns; if a moment needs more visual weight, reach for size, weight, or contrast, not a second color.

**The Scoped Token Rule.** `--ink-900`, `--ink-600`, `--card`, `--card-alt`, and `--line` are not fixed colors — they are re-declared per section (`header`, `.hero`, `#story`, `#visit` override them to their dark-ground values) so every component built against them automatically re-themes for whichever ground it's placed on. A new component should be built against these role tokens, never against a literal hex, so it inherits this behavior for free.

## Typography

**Display Font:** Space Grotesk (weight 700), falling back to Manrope
**Body Font:** Manrope (400/500/700/800), falling back to the system sans stack
**Label/Mono Font:** Space Mono (400/700)

**Character:** A heavy, geometric, slightly technical display face paired with a clean, warm-neutral body sans and a monospace reserved strictly for data (prices, stats, measurements) — never used as a "technical" costume.

### Hierarchy
- **Display** (700, `clamp(2.3rem, 6vw, 4.1rem)`, line-height 1.05): the hero headline only.
- **Headline** (700, `clamp(1.7rem, 3.4vw, 2.4rem)`): section headings (`h2`).
- **Title** (700, ~1.1–1.3rem): card and dossier headings (`h3`).
- **Body** (400, 1rem, line-height 1.5): paragraph copy; hero lede and FAQ answers are capped near 50–65ch.
- **Label** (400/700, 0.65–0.78rem, letter-spacing 0.08–0.14em, uppercase): tags, field-log data lines, choice-group labels — always in Space Mono, always representing an actual data point or control label, never decorative.

### Named Rules
**The No-Kicker Rule.** No small pill or eyebrow label ever sits above a heading. Every section heading carries its own weight; where the old design used an eyebrow chip for flavor text, that text was either folded into a heading/subhead or dropped, never re-added as a label-above-title pattern.

## Layout

**2026-09-24, photo-density pass**: on request (referencing mosburger.com.sg for density, not palette), the Visit, Why-us, Field-log, Menu, and FAQ panels were filled with large real photography to remove empty negative space: `.panel-media`/`.panel-scrim` (a reusable, non-animated version of the hero's full-bleed-photo-plus-scrim treatment) for the two dark panels, and `.split-grid`/`.split-photo` (a text-column-plus-framed-photo pattern) for the two light panels; the menu panel got an added wide banner photo above its existing card grid. The builder/order panel was explicitly excluded and stays photo-free. Finding this exposed a real bug: `--header-h` was a static `72px`, but the header wraps to up to 3 lines on narrow viewports (measured 135px) — panel content above 720px-breakpoint reserved too little top clearance and rendered partly under the fixed header. Fixed by measuring `header.offsetHeight` in JS on load/resize (`ResizeObserver`) and writing it to `--header-h`, rather than hand-tuning a static value again.

**2026-09-24: converted from vertical to horizontal-scroll**, revised twice more the same day. The page is a single fixed-height (`100vh`) flex row (`.track`) of full-viewport (`100vw`) panels; the site advances sideways, not down. A fixed header overlays every panel; a bottom chase-bar (see Components) doubles as the progress indicator. Current panel order: hero → "Find the shop" (address/hours/live map) → "why us" → field-log/story → menu → FAQ → builder — one final panel with ingredient picks and the live-updating summary/preview side by side. There is no longer a footer panel: legal/photo credits live in a small `<details>` disclosure in the fixed header ("Credits", ~11px, closed by default) rather than in the horizontal scroll, per an explicit request to keep that content out of the track entirely. (The builder was briefly split into a pick panel and a separate summary panel, since a horizontal panel has to fit its content in one viewport; it was merged back on request once that split broke the live "watch it build" feedback the picker depends on. The two-column layout — a 2×2 pick grid plus a summary sidebar — keeps both in one viewport.) Mouse wheel input is redirected from vertical to horizontal scroll (`deltaY` drives `scrollLeft`); trackpad/touch horizontal swipes pass through natively; arrow/Page/Home/End keys move panel-to-panel; nav links and the logo scroll via a direct `track.scrollTo({left: el.offsetLeft})` rather than `scrollIntoView`, which was found unreliable (lands one panel short) in this nested-scroll/scroll-snap setup. Every panel's content sits in a `.panel-inner` with `overflow-y:auto` as a safety net (normally invisible/inactive) for any viewport short enough that a panel's content doesn't fit — the wheel handler checks this before hijacking, so a genuinely tall panel still scrolls vertically in place before advancing horizontally.

Sections alternate ground color for rhythm: dark hero → dark navy ("Find the shop") → white ("why us") → dark navy ("field log") → paper-alt (menu) → paper-alt (FAQ) → white (builder). The hero is the one full-bleed exception: it carries zero panel padding so its photo reaches true edges. Component grids (menu cards, builder choice columns, the three-column "why us" spec list) collapse to fewer columns under `780–860px` breakpoints, same as before.

### Named Rules
**The One-Viewport Panel Rule.** A panel is authored to fit one viewport without needing its own scroll. When content doesn't fit, split it into another panel (as the builder was) rather than growing the panel's height or silently relying on the `.panel-inner` overflow fallback — that fallback is a safety net for edge-case viewport sizes, not a design tool.

## Elevation & Depth

Mostly flat. Cards and panels are distinguished by a hairline border (`1px`, light or dark per section) rather than a drop shadow; the "why us" list uses a `2px` accent top-rule instead of a card container at all. Soft, neutral, non-colored shadows appear only on genuinely floating UI — the cart drawer, the toast, and hover lift on menu/item cards (`0 16–34px` soft blur, always a neutral navy-tinted shadow, never the accent hue).

### Named Rules
**The Neutral Shadow Rule.** No shadow in this system is tinted with the accent color, on any background. A colored, blurred glow behind a control is the single most common "AI-generated interface" tell this system explicitly refuses; every shadow value resolves to a neutral dark (`rgba(2,11,20,…)`), never `rgba(63,111,156,…)` or similar.

## Shapes

Buttons and pill chips (cart badge, tag pills, CTAs) are fully rounded (`999px`). Cards, panels, and photo containers use a moderate `10–16px` radius. No sharp/square system exists and no neobrutalist hard-offset shadow is used anywhere.

## Components

### Buttons
- **Shape:** fully rounded pill (`999px`).
- **Primary:** `{colors.accent-strong}` fill, white text, `14px 26px` padding, neutral soft shadow; hover deepens to `{colors.accent-strong-hover}` with a small lift.
- **Ghost:** transparent, no border, text-only in the section's ink color, with a trailing `→` glyph (CSS `::after`, not part of the copy string) that shifts right on hover. Used exactly once (the hero's secondary CTA) — this system does not have a bordered-ghost variant.
- **Icon-badge chip** (cart count): fixed navy-950 fill regardless of section, white text — the one color that intentionally never re-themes, since it always sits on the accent-filled cart button.

### Tags / Chips
- **Style:** `{colors.accent-tint}` background, `{colors.accent-strong}` text, fully rounded, uppercase Space Mono label. The "veg" variant swaps to a neutral muted panel + hairline border instead of the accent tint.

### Cards / Containers
- **Corner style:** `14–16px` radius (menu items, the builder panel, the field-log dossier); swatches use `12px`.
- **Background:** `{colors.paper}` / `{colors.navy-card}` per section (via the scoped tokens, never hardcoded).
- **Shadow strategy:** hairline border by default; neutral soft shadow only on hover (menu items) or for genuinely floating UI (drawer).
- **Border:** `1px solid {colors.line-light}` or `{colors.line-dark}`, resolved per section.
- **Internal padding:** `22–32px` depending on density.

### Inputs / Selectable Swatches
- **Style:** the burger-builder's ingredient pickers are photo swatches, not form inputs — `2px` border, `12px` radius, selected state adds an `{colors.accent-strong}` border plus a soft accent-tint ring (`0 0 0 3px {colors.accent-tint}`) and a filled accent-strong checkmark badge.
- **Focus:** all interactive elements share one global `:focus-visible` ring (`2px solid {colors.accent-strong}`, `3px` offset).

### Navigation
- **Style:** a single sticky bar, semi-transparent dark navy with a blur, persists across every section (light or dark) beneath it. Logo wordmark in the display face; a small mono caption beneath it uses ink-muted, never the accent hue, since it must stay legible over both the photographic hero and plain light sections as the bar scrolls. The single primary action (`Order`) is the one nav element that always carries the solid accent-strong pill treatment.

### Signature component: the Field Log dossier
A "declassified document" card (dark navy panel, monospace data rows, a rotated accent-outlined stamp) that carries the brand's whimsical backstory with total visual composure — the clearest expression of the North Star: the joke is played straight, through confident, engineered presentation rather than illustration or whimsy in the chrome itself.

### Signature component: the chase bar
A fixed strip along the bottom of the viewport (dark gradient scrim, independent of whichever panel is showing behind it) carrying two small solid-silhouette icons — a chef (the "Cook" icon by Delapouite, game-icons.net, CC BY 3.0) mid-chase, a dodo just ahead of him — that slide left-to-right in lockstep with horizontal scroll progress across the whole site, plus a continuous small idle "run bob" so they never look frozen. On reaching the last panel the chase pays off: the dodo fades out and a burger silhouette fades in at the same spot, scroll-reversibly. It doubles as the site's progress indicator (position = how far through the site you are) and as a literal sight gag (the whole brand is "the dodo that got away — into a bun"). One of the two named illustration exceptions to the real-photo policy.

### Order status widget and pickup alert (added 2026-09-25, Vercel/Supabase fork only)
Two components supporting the persistent pickup-order feature (see the fork's `CLAUDE.md`), built to extend the system rather than introduce a new one:
- **Order status widget** (`#orderStatusBox`) reuses the header's existing `.credits`/`<details>` disclosure pattern exactly — same summary/panel shape, same scoped tokens — rather than inventing a new dropdown component. Its only new mark is `.order-dot`: an 8px circle, hollow (`accent-strong` outline) while "preparing," filled with a soft pulse (`box-shadow` breathing, not a colored glow — the pulse is the same accent hue at low opacity, staying inside the Neutral Shadow Rule's spirit of never faking depth with a tinted blur) once "ready." No second color for status — state is carried by fill and motion, not a red/amber/green system, keeping the One Hue Rule intact.
- **Pickup alert** (`.pickup-alert`) is the one moment in this system that fills a large surface with the accent color — a deliberate, scoped exception: it's a rare, genuinely time-sensitive event (your food is ready), which is exactly the "brief's own words can earn any default back" case the craft floor allows. White text and a white inverse button on `accent-strong` carry enough contrast without a second hue. It slides down from below the header (`translateY` + opacity, one authored motion, matching the toast's slide-up so the system has exactly two entrance moments, not a library of them) and stays until dismissed or resolved — unlike the ephemeral `.toast`, because "your order is ready" is worth more than 2.2 seconds of attention.

## Do's and Don'ts

### Do:
- **Do** keep every image a real, licensed photograph — this is a durable brand commitment (see `PRODUCT.md`), not just a style choice, and it survived this redesign unchanged.
- **Do** build new components against the scoped role tokens (`--ink-900`, `--card`, `--line`, etc.) rather than literal colors, so they inherit correct light/dark theming automatically when placed in any section.
- **Do** use Space Mono exclusively for actual data or measurement (prices, stats, field-log readouts) — never as a generic "technical-looking" label font.

### Don't:
- **Don't** introduce a second accent hue. One steel-blue family, two values, is the whole system.
- **Don't** put a kicker/eyebrow label above a heading. Let the heading carry its own weight.
- **Don't** add a colored, blurred glow shadow to any element on a dark background — use the neutral shadow token instead.
- **Don't** use a system/platform default font (Arial, system-ui, Impact) as a display voice — the display face is always the self-hosted Space Grotesk.
