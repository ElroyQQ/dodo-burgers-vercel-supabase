# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Site visitors browsing a fictional Singapore burger restaurant's website: people scanning the menu, using the "Build Your Own" picker to assemble a custom burger with live pricing, and deciding whether to add items to a cart. Secondarily, this is a portfolio/demo piece — there is no real restaurant behind it, so "success" for a visitor is a convincing, complete ordering experience, not an actual transaction.

## Product Purpose

A complete, self-contained, single-file front-end demo of a burger restaurant's ordering experience: browse a menu, build a custom burger with a fully photo-driven ingredient picker and live running total, add items to a cart, and view a cart drawer with a "Send to kitchen" action. No real backend, payment, or order submission exists or is implied — the front-end experience itself is the deliverable.

## Positioning

Differentiates from a generic burger-site template two ways: (1) a whimsical brand premise — the dodo didn't go extinct in 1681, it quietly evolved into an aquatic species and was rediscovered in 2019 off Singapore's Tuas reclaimed land — carried through copy, a hero image composite, and a "field log" backstory section; (2) deep Singaporean localization (sambal/salted-egg/laksa-inflected menu language, a halal-certification FAQ, Tuas Link MRT references) instead of generic American-diner burger copy. The interactive centerpiece is a fully photo-driven "Build Your Own" picker where every ingredient option (patty/bun/sauce/topping) is a clickable photo swatch, not a text label.

## Operating Context

**This is the Vercel + Supabase variant of the dodo-burgers site**, forked from the Cloudflare Pages + D1 original (`dodo-burgers/`) to test login/signup on a different stack. Still a single `index.html` file plus a flat `images/` folder — no build step, no bundler, no package manager, no serverless functions. The one dependency is the `@supabase/supabase-js` client library, loaded at runtime via the `esm.sh` CDN as an ES module (see `index.html`'s auth script) — this replaces Cloudflare Pages Functions + D1 entirely: Supabase's own hosted Auth (email/password, session cookies, built-in rate limiting) is called directly from the browser with a public anon key, no custom backend code needed. Deployable as-is to Vercel (or any static host) once a Supabase project's URL and anon key are filled in.

## Capabilities and Constraints

- Cart is in-memory JavaScript state only — resets on reload, not shared between visitors. "Send to kitchen" clears the cart and shows a toast; it does not submit anywhere or process payment. This is by design, not a gap to close.
- No automated test suite exists; the composition rules around cart/build totals are currently verified by manual/visual checks only.
- No build step, bundler, or external JS framework is introduced — plain HTML/CSS/JS stays the delivery format. The `supabase-js` client is the one exception, loaded at runtime via CDN `<script type="module">` rather than installed as a package.
- **CI-only dev tooling (added 2026-09-25)**: `package.json`/`package-lock.json` exist solely for GitHub Actions (`htmlhint` for lint, Playwright for a smoke-test suite, plus a small Node script that checks every `images/...` reference in `index.html` resolves to a real file). None of this ships to the deployed site or is needed to run it locally — `npm install` is only relevant if you want to run CI checks yourself.
- **Exception, added 2026-09-24**: the "Find the shop" panel embeds a live OpenStreetMap iframe (the site's first and only external network dependency). Chosen over Google Maps to avoid an API key and Google's branding/tracking. The panel's address/hours/directions text is not inside the iframe and stays fully readable if the map fails to load or is blocked; a plain "Open in OpenStreetMap" link is provided as a fallback.

## Brand Commitments

- **Name and premise**: "Dodo Burgers" — built on the in-universe backstory that the dodo secretly survived as an aquatic species, rediscovered in 2019 in the shallows off Singapore's Tuas reclaimed land.
- **Image policy (durable, explicitly reaffirmed for the current redesign work)**: every image on the site must be a real, freely-licensed photograph — no illustrations or AI-generated imagery — edited/composited as needed. This has been a repeated, explicit instruction from the project owner across prior sessions. Two standing, narrow exceptions: (1) the animated SVG "your build" preview graphic in the burger builder (`renderBuilderPreview()`), which redraws procedurally per ingredient combination and cannot be a fixed photo set; (2) added 2026-09-24, revised twice same day — a fixed-position icon animation along the bottom of the screen: a chef icon chasing a dodo icon, both sliding left-to-right in sync with horizontal scroll progress across the whole site; on reaching the last panel, the dodo icon disappears and becomes a burger icon (the catch). The chef icon is the "Cook" icon by Delapouite, via game-icons.net (CC BY 3.0, now credited via the header's "Credits" disclosure); the dodo and burger icons are original to this site. (An earlier version of this exception was a background line-art dodo/burger-patty motif repeated on every panel, and before that a hand-drawn chef icon judged not distinctive enough — same exception, revised execution each time.) Both exceptions are narrow and named; they do not license illustration elsewhere (menu photography, hero imagery, builder ingredient photos all stay real photographs).
- **Content/copy scope for the current redesign**: confirmed as visual-only. Menu items, prices, Singaporean copy/FAQ, the burger-builder mechanics, and cart behavior stay as-is; only the visual treatment changes.
- **Singaporean localization voice**: sambal/salted-egg/laksa-inflected menu descriptions, a halal-certification FAQ answer, and Tuas Link MRT references are confirmed brand voice, not incidental copy — a visual redesign should not dilute or genericize this voice.

## Evidence on Hand

- All current imagery (4 menu-item photos, 13 builder-ingredient swatch photos, two original composites — `hero.jpg`/`logo.jpg` — and, added 2026-09-24, 5 further real Pexels photos used as large-format panel photography — `feature-dark/board/handheld/sliced/stacked.jpg`) is real, licensed (Pexels License or CC0), and documented with credits in `README.md`. These assets are reusable as-is under a visual redesign.
- **2026-09-24 photo-density pass**: on request, panels other than the builder/order flow (Visit, Why-us, Field-log, Menu, FAQ) were filled with large real photography to close out empty negative space, referencing mosburger.com.sg for density (not its color palette — the site's own navy/steel-blue system stayed the connective visual language). The builder/order panel was explicitly excluded and stays uncluttered.
- No real customer testimonials, pricing benchmarks, or commercial claims exist, and none should be invented — this is an explicitly fictional brand built for a design/build exercise, not a real business.

## Product Principles

1. Every image stays a real, licensed photograph (one named, standing exception) even as the surrounding visual language changes — this is brand-level, not merely a style choice of the current look.
2. The whimsical dodo backstory and Singaporean flavor voice are the brand; a redesign changes the frame the story is told in, not the story or the facts.
3. No real backend, payment, or order-submission exists or should be implied more strongly than today's front-end-only demo.
4. Build-step-free delivery is non-negotiable — a redesign that requires a bundler or JS framework is out of scope. The `supabase-js` CDN import is the sanctioned exception for this variant's auth.
