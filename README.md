# Dodo Burgers

A single-page, single-file website for **Dodo Burgers** — a fictional Singapore burger restaurant built around a whimsical premise: the dodo didn't go extinct in 1681, it quietly evolved into an aquatic species and was rediscovered in 2019 in the shallows off Singapore's Tuas reclaimed land.

The site is a complete, self-contained deliverable: no build step, no framework, no dependencies. Open `index.html` in a browser and it runs.

## Quick start

```bash
open index.html
```

Or serve it locally (needed if you want relative image paths to behave exactly as they will on a real host):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

There is no npm install, no bundler, and no test suite — see [CLAUDE.md](CLAUDE.md) for the code architecture if you're editing this with an AI coding agent.

## What's on the page

- **Hero** — headline, copy, and a composited photo of the dodo swimming at the Tuas waterfront at sunset.
- **"Why us, specifically"** — three short cards making the differentiation pitch (unique species, not a commodity, locally "reclaimed").
- **Field log** — a short in-universe "declassified" backstory section.
- **Menu** — four burgers, each with a real product photo, description, and an "Add to order" button that adds to the cart.
- **Build Your Own** — fully photo-driven picker: click a photo of a patty/bun/sauce/topping to select it (single-select for patty/bun/sauce, multi-select for toppings), with a live running total and a summary panel.
- **FAQ** — accordion, including a taste comparison to Singaporean dishes and a halal-certification question.
- **Cart drawer** — slide-out panel with running total and a "Send to kitchen" action (front-end only — see [Scope and limitations](#scope-and-limitations)).

## Design system

- **Theme**: light/cream (`--paper` background, white `--card` surfaces), not dark mode. Teal (`--teal-700`) is the brand accent for links/labels; coral (`--coral-500`) is the call-to-action color.
- **Type**: Fredoka (headings), Manrope (body), Space Mono (labels/prices/data), all loaded from Google Fonts.
- **Imagery policy**: every image on the site is a real photograph, licensed for free/commercial use, edited as needed (cropped, color-graded, composited) — no illustrations or AI-generated imagery, with one deliberate exception: see [Your build preview](#your-build-preview) below. See [Image credits](#image-credits) for everything else.

## Image credits

All photos are either [Pexels License](https://www.pexels.com/license/) (free for commercial use, no attribution legally required) or CC0 public domain. Credited here anyway as good practice; also summarized in the site footer.

| File | Subject | Source | License |
|---|---|---|---|
| `images/classic.jpg` | Classic burger | Eduardo Krajan, Pexels | Pexels License |
| `images/sunda.jpg` | Double cheeseburger | Mounir Salah, Pexels | Pexels License |
| `images/deluxe.jpg` | Loaded bacon burger | Natan Machado Fotografia Gastronômica, Pexels | Pexels License |
| `images/kelp.jpg` | Veggie burger | Sylwester Ficek, Pexels | Pexels License |
| `images/bun-sesame.jpg`, `bun-charcoal.jpg`, `bun-lettuce.jpg` | Bun options | Pexels contributors | Pexels License |
| `images/patty-classic.jpg`, `patty-double.jpg`, `patty-veg.jpg` | Patty options | Pexels contributors | Pexels License |
| `images/sauce-lagoon.jpg`, `sauce-sambal.jpg`, `sauce-egg.jpg` | Sauce options | Pexels contributors | Pexels License |
| `images/top-cheddar.jpg`, `top-slaw.jpg`, `top-chips.jpg`, `top-egg.jpg` | Topping options | Pexels contributors | Pexels License |
| `images/logo.jpg` | Header logo (dodo head crop) | Composite — see below | Mixed, both free-use |
| `images/hero.jpg` | Original hero composite (dodo in the water at sunset) | Composite — see below | Mixed, both free-use |
| `images/hero-wide.jpg` | Hero panel background — re-graded, tighter crop of `hero.jpg` (Pillow: cooler grade, darker exposure, vignette) | Derived from the composite above | Mixed, both free-use |
| `images/feature-dark.jpg` | "Find the shop" / field-log panel backgrounds | Ramon Rangel, Pexels | Pexels License |
| `images/feature-board.jpg` | "Why us" panel photo | Natan Machado Fotografia Gastronômica, Pexels | Pexels License |
| `images/feature-handheld.jpg` | FAQ panel photo | Fernando Martinez, Pexels | Pexels License |
| `images/feature-sliced.jpg` | Field-log panel background | Engin Akyurt, Pexels | Pexels License |
| `images/feature-stacked.jpg` | Menu panel banner | Vinícius Caricatte, Pexels | Pexels License |

**`hero.jpg` and `logo.jpg` are original composites**, not stock photos, built with Python/Pillow from two source images:
1. **Background** — a sunset photo of a Singapore container port jetty, by Kharl Anthony Paica (Pexels), standing in for the Tuas waterfront.
2. **Dodo subject** — *"Dronte dodo Raphus cucullatus.jpg"*, a photograph of a real plaster-and-wax dodo reconstruction model held by the Muséum national d'Histoire naturelle, Paris, by Jebulon, via Wikimedia Commons (**CC0 / public domain**). This is a photo of a physical museum model, not an illustration — since no photos of a live dodo exist, this is the most accurate real-photo option.

The compositing (cutting the dodo out of its studio background, scaling it, color-grading it to match the scene's dusk backlighting, adding a waterline fade, reflection, and contact shadow) was done in this session with Pillow/numpy — see the "Session history" section of [CLAUDE.md](CLAUDE.md) for how that pipeline works and what was tried before landing on the current version.

### "Your build" preview

The one deliberate exception to the photo-only policy: the small burger graphic in the "Build Your Own" summary panel is a **generated SVG illustration**, not a photo. It's built in JavaScript (`renderBuilderPreview()` in `index.html`) from the current selections — bun, patty, sauce, and toppings each map to a drawn layer. A static or per-combination photo isn't possible here (there's no photo for every one of the dozens of possible ingredient combinations), so this one spot uses illustration on purpose, per an explicit request.

It redraws on every change, but only the layer(s) that actually changed animate — the function diffs the new selection against the previous one, and just that layer pops in with a quick scale bounce plus a soft glow flash in the color of the option just picked (e.g. picking a red sauce flashes red). Everything unchanged stays static. An earlier version animated every layer on every change with a cumulative per-layer delay, which meant the top bun (last in the stack) could take over a second to appear after any click — it read as broken rather than snappy, hence the diff-based rewrite.

## Scope and limitations

This is a front-end demo/prototype, not a working ordering system:
- The cart is in-memory JavaScript state — it resets on page reload and is not shared between visitors.
- "Send to kitchen" clears the cart and shows a confirmation toast; it does not submit anywhere or process any payment.
- There is no backend, no real menu/pricing system, and no real restaurant behind this — it's a fictional brand built for the exercise of designing and building a full interactive site.

## Deployment

The site is also published as a Claude Artifact for easy sharing/preview: https://claude.ai/artifact/UhUgz4eWVWqZ5nwshgQxX6 (private by default — only accessible to people it's been explicitly shared with).

To host it for real, `index.html` plus the `images/` folder is everything that's needed — any static host (GitHub Pages, Netlify, S3, etc.) will work as-is, no build step required.
