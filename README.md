# Dodo Burgers

**Preview: https://dodo-burgers-vercel-supabase-git-docs-read-18ba0a-ai-upskilling.vercel.app/**

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

There is no npm install needed to run the site — it's plain HTML/CSS/JS. See [CLAUDE.md](CLAUDE.md) for the code architecture if you're editing this with an AI coding agent.

## CI

Every push/PR runs lint (`htmlhint`), a build-equivalent check (confirms every `images/...` reference in `index.html` resolves to a real file), and a Playwright smoke test (page loads with no console errors, auth widget renders, menu/builder panels present — it deliberately doesn't call `supabase.auth.signUp`, since preview and production share one real Supabase project). Run them yourself with:

```bash
npm install
npm run lint
node scripts/check-assets.js
npx playwright install --with-deps chromium && npm test
```

A `Claude Code Review` workflow also runs on every PR, but needs an `ANTHROPIC_API_KEY` repo secret added under Settings → Secrets and variables → Actions before it'll work.

## What's on the page

The site is a single **horizontal-scroll** track of full-viewport panels (mouse wheel, trackpad swipe, and arrow/Page/Home/End keys all move sideways through it), not a normal vertical page:

- **Hero** — headline, copy, and a composited photo of the dodo swimming at the Tuas waterfront at sunset.
- **Find the shop** — address/hours and a live OpenStreetMap embed.
- **"Why us, specifically"** — three short cards making the differentiation pitch (unique species, not a commodity, locally "reclaimed").
- **Field log** — a short in-universe "declassified" backstory section, styled as a dossier card.
- **Menu** — four burgers, each with a real product photo, description, and an "Add to order" button that adds to the cart.
- **FAQ** — accordion, including a taste comparison to Singaporean dishes and a halal-certification question.
- **Assemble your own Dodo** (Build Your Own) — fully photo-driven picker: click a photo of a patty/bun/sauce/topping to select it (single-select for patty/bun/sauce, multi-select for toppings), with a live running total and a summary panel side by side in the same viewport.
- **Cart drawer** — slide-out panel with running total and a "Send to kitchen" action (front-end only — see [Scope and limitations](#scope-and-limitations)).
- **Chase bar** — a fixed strip along the bottom with a chef icon chasing a dodo icon, sliding in lockstep with scroll progress; on reaching the last panel the dodo becomes a burger. Doubles as the site's progress indicator.

There's no separate footer — legal/photo credits live in a small "Credits" disclosure in the fixed header instead.

## Design system

- **Theme**: dark navy (`#020b14`) and white/off-white bands, alternating section by section — not the light/cream look this project started with. One steel-blue accent (`#6699cc` / `#3f6f9c`) carries every button, link, and data point; no second accent color.
- **Type**: Space Grotesk (hero headline), Manrope (body), Space Mono (labels/prices/data), all loaded from Google Fonts.
- **Imagery policy**: every image on the site is a real photograph, licensed for free/commercial use, edited as needed (cropped, color-graded, composited) — no illustrations or AI-generated imagery, with two named exceptions: the animated SVG [builder preview](#your-build-preview) below, and the chase-bar's chef/dodo/burger icons. See [Image credits](#image-credits) for everything else, and [DESIGN.md](DESIGN.md) for the full design system.

## Image credits

All photos are either [Pexels License](https://www.pexels.com/license/) (free for commercial use, no attribution legally required) or CC0 public domain. Credited here anyway as good practice; also summarized in the "Credits" disclosure in the site header.

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

## Accounts (login / signup)

This variant has real, working authentication — the one part of the site that isn't just front-end simulation. It's a fork of [`dodo-burgers/`](https://github.com/ElroyQQ/dodo_burgers_POC), which does the same thing on Cloudflare Pages + D1 with hand-rolled password hashing; this one delegates entirely to **Supabase Auth**, called directly from the browser via `supabase-js` (loaded from `esm.sh`, no build step) — no serverless functions, no custom users table:

- Sign up / log in from the account widget in the header.
- Sessions persist across reloads (Supabase manages this itself).
- To run your own copy, create a free [Supabase](https://supabase.com) project and paste its URL + anon key into the placeholders near the top of the auth `<script type="module">` block in `index.html`.
- To see a signed-up account, go to the Supabase dashboard → **Authentication → Users**. To see the password hash (bcrypt, managed entirely by Supabase), use the **SQL Editor**: `select id, email, encrypted_password, created_at from auth.users;`

## Scope and limitations

Everything except login/signup is still a front-end demo/prototype, not a working ordering system:
- The cart is in-memory JavaScript state — it resets on page reload and is not shared between visitors.
- "Send to kitchen" clears the cart and shows a confirmation toast; it does not submit anywhere or process any payment.
- There is no real menu/pricing system and no real restaurant behind this — it's a fictional brand built for the exercise of designing and building a full interactive site.

## Deployment

Production deploys via Vercel from this repo's `main` branch — no build command or output directory needed, it's served as static files as-is. (Production URL intentionally not listed here — see the preview link at the top of this file.)

**Preview deployments**: every other branch or open PR gets its own Vercel preview URL automatically — no manual step. Vercel's GitHub integration builds it on every push and posts the URL as a comment on the PR. The URL is derived from the branch name, e.g. branch `docs/readme-auth-and-deployment` deployed as `dodo-burgers-vercel-supabase-git-docs-read-18ba0a-ai-upskilling.vercel.app`. Previews use the exact same `index.html` (and the same Supabase project) as production — there's no separate staging config, so a signup on a preview creates a real account, same as on production. Preview URLs are only reachable while their branch still exists; once a PR merges and its branch is deleted, that URL stops resolving. (Deployment Protection is off for this project, so preview links are publicly viewable without a Vercel login — needed for sharing a preview with someone outside the team to review.)

The site is also published as a Claude Artifact for easy sharing/preview: https://claude.ai/artifact/UhUgz4eWVWqZ5nwshgQxX6 (private by default — only accessible to people it's been explicitly shared with). Note the Artifact version predates the Supabase auth feature.

To host it yourself, `index.html` plus the `images/` folder is everything that's needed — any static host (Vercel, Netlify, GitHub Pages, S3, etc.) will work as-is, no build step required (aside from filling in your own Supabase credentials if you want auth to work).
