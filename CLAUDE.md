# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**The Vercel + Supabase variant of the dodo-burgers site**, forked from the original Cloudflare Pages + D1 project at [`../dodo-burgers/`](../dodo-burgers/CLAUDE.md) to test the same login/signup/logout feature on a different stack. It is the same static site for "Dodo Burgers," a fictional Singapore burger restaurant — markup, CSS, and JS in one `index.html`, plus a flat `images/` folder. There is still no build step or package manager; the one addition versus the original is the `@supabase/supabase-js` client, loaded at runtime via CDN. See [README.md](README.md) for the project-level overview and full image credits, and see "Auth architecture" below for what's different from the Cloudflare version.

## Running it

Open `index.html` directly in a browser, or serve the folder (`python3 -m http.server`) to sanity-check relative paths. Before auth will work, fill in `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the top of the auth `<script type="module">` block in `index.html` with your own Supabase project's values (Settings → API in the Supabase dashboard). Deploy by connecting this folder as a Vercel project's root directory — no serverless functions or build command needed.

## Auth architecture (differs from `dodo-burgers/`)

The Cloudflare version has its own D1-backed users table, PBKDF2 hashing, and hand-rolled rate limiting behind `functions/api/{login,signup}.js`. This variant has none of that: Supabase's own hosted Auth handles password hashing, session cookies/tokens, and rate limiting server-side, and the browser talks to it directly via `supabase-js`:
- `supabase.auth.signUp({ email, password })` — signup (may require email confirmation depending on the Supabase project's auth settings).
- `supabase.auth.signInWithPassword({ email, password })` — login.
- `supabase.auth.signOut()` — logout.
- `supabase.auth.getSession()` / `onAuthStateChange()` — restores/tracks the logged-in state across reloads (Supabase persists the session in the browser itself; there's no custom `localStorage` flag to manage).

No `wrangler.toml`, `schema.sql`, `_headers`, or `functions/` directory exists in this folder — they were intentionally not copied from the original, since none of them apply here.

## Persistent pickup orders (added 2026-09-25)

Logged-in users can place a real, persisted order — not just simulate one. This is the one part of the site with an actual database table (`public.orders`, migration in `supabase/migrations/0001_orders.sql`, RLS-scoped to `auth.uid() = user_id`). Flow, all in the first `<script>` block (which owns `cart`/`renderCart`/`toast`) plus one cross-script hook from the auth script:

- The auth script (`<script type="module">`) dispatches a `window` custom event `dodo-auth` with `{ session }` on every login/logout/session-restore, so the cart script can react without the two scripts sharing scope.
- `submitOrder` click: requires a session (prompts login + preserves cart if not); on success, inserts a row with `items` (the cart array as-is, jsonb), `total`, and a computed `estimated_ready_at` (8 min + 2 min/line, capped 25).
- A header `<details>` widget (`#orderStatusBox`, same disclosure pattern as `#authBox`/Credits) shows the active order's state, items, and ETA; polls every 15s (`setInterval`) to flip status to `ready` once the ETA passes, and shows a persistent `.pickup-alert` banner (distinct from the ephemeral `.toast`) until dismissed or marked picked up.
- "Mark as picked up" clears `activeOrder` client-side and sets `status='picked_up'` server-side — the row isn't deleted, just excluded from the "active order" query (`.neq("status", "picked_up")`), so order history remains in the table.
- There is no backend cron or push notification — "ready" is determined by the browser's own clock comparing against `estimated_ready_at`, checked on load and every 15s while the tab is open. It will not notify if the tab is closed.

If asked to touch this again: don't add a second Supabase table or duplicate the auth session logic — reuse the `dodo-auth` event and the existing RLS-scoped `orders` table.

## Architecture

Everything is inline in `index.html`, in three blocks in this order:

1. **`<style>`** — all CSS, using custom properties on `:root` (`--paper`, `--card`, `--ink-900`, `--teal-700`, `--coral-500`, etc.) for a light/cream theme with teal as the brand accent and coral as the CTA color. There is no dark-mode variant — the page commits to one light theme.
2. **Markup** — header/nav, hero section (photo, not illustration), a "why us" section, a "field log" story section, a menu grid, a burger builder, an FAQ, a footer, and the cart drawer/overlay markup.
3. **`<script>`** — a single IIFE containing all interactivity, with no external JS libraries:
   - `MENU`, `BUILDER` (patty/bun/sauce/topping options, each with an `img` field), and `FAQ` are static data arrays/objects near the top of the script — edit these to change menu items, prices, builder options, or FAQ copy.
   - `cart` (array) and `build` (object) hold the running state for the order cart and the burger-builder selections, respectively.
   - Render functions (`renderMenu`, `renderBuilder`, `renderFaq`, `renderCart`, `renderPillRow`) rebuild their DOM section from the data/state above; there is no framework or virtual DOM, so these fully re-render their target element on every state change. Note: `renderPillRow` is the historical name — it now renders clickable **photo swatches** (`.swatch` elements), not text pills; see Session history below.
   - The cart is in-memory only (no `localStorage`/backend) — it resets on page reload, and "Send to kitchen" just clears the cart and shows a toast rather than submitting anywhere.

Fonts (Fredoka, Manrope, Space Mono) are loaded from Google Fonts via `<link>` tags at the top of the file.

## Image policy

**Every image on this site must be a real, freely-licensed photograph, edited as needed — never an illustration, drawing, or AI-generated image.** This was an explicit, repeated instruction from the project owner. When adding or changing imagery:
- Source from Pexels (Pexels License, free for commercial use) or another clearly free/CC0 source (e.g. Wikimedia Commons).
- Photo edits (cropping, color grading, compositing multiple photos together with Pillow/numpy) are fine and expected — the `images/hero.jpg` and `images/logo.jpg` files are original composites built this way.
- Record credits in the footer of `index.html` and in [README.md](README.md#image-credits) when adding new sourced images.

**One explicit exception**: the "Your build" preview in the builder section (`renderBuilderPreview()`) is a generated SVG illustration, not a photo — the project owner specifically asked for an animated illustration there so it can redraw itself per ingredient combination, which a fixed set of photos can't do. Don't treat this as license to reintroduce illustrations elsewhere; it's a one-spot, explicitly requested carve-out. It only animates the specific layer(s) that changed since the last render (diffed against `prevBuildKey`), each with a glow flash in the color of the option just picked — see point 8 below for why it's built that way and not a simpler stagger-everything approach.

## Session history

Summary of the major changes made in the most recent working session, in order, for context on *why* the site looks the way it does:

1. **Initial build** — dark ocean/lagoon-themed site with hand-drawn SVG illustrations (a dodo mascot, burger cross-section art) and a fictional backstory (rediscovered aquatic dodo off Singapore's Tuas reclaimed land).
2. **Burgers → real photos** — replaced the illustrated SVG burgers with licensed Pexels photos per item, on explicit instruction to stop using illustrations for anything food-related.
3. **Singaporean copy pass** — rewrote copy (FAQ, menu descriptions, footer) with local flavor after researching real Singapore burger sites for tone (e.g. Fatboy's, Two Blur Guys, The Goodburger) — added sambal/salted-egg/laksa/chilli-crab menu language, a halal-certification FAQ, and Tuas Link MRT references. Re-themed the whole site from dark to a light/cream palette on request.
4. **Dodo illustration → real photo** — replaced the SVG dodo mascot with a photo composite: since no photos of a live dodo exist, sourced a CC0 photo of an actual museum plaster/wax dodo reconstruction (Muséum national d'Histoire naturelle, Paris) and composited it against a real sunset photo of a Singapore port. Iterated through a few treatments (a "pinned field-specimen photo" collage, a mangrove-habitat composite to look more "alive" than a museum piece) before landing on the current version.
5. **Interactive builder** — converted "Build Your Own" from text/radio pill buttons to a fully photo-driven picker: sourced 13 individual ingredient photos (3 patties, 3 buns, 3 sauces, 4 toppings) so each option is a clickable image swatch with a selected-state checkmark, instead of a text label.
6. **Dodo compositing refinement** — moved the dodo from a separate "pinned photo" overlay to directly swimming in the water of the hero photo, at a corrected (much smaller, believable) scale relative to the background pier/cranes. Then fixed the lighting: the dodo sits in the same backlit position as the photo's pier posts (foreground, between camera and the low sun), so it needed to read as a near-silhouette with a thin warm rim light — not an evenly-lit studio cutout. Built with a proper multiply/screen-blend lighting pipeline (numpy) rather than flat color tinting, which preserves the subject's texture instead of flattening it.
7. **Docs + "your build" preview** — added README.md and this session-history section; removed the Singlish "lah" from the hero headline (back to "Extinct in 1681. Back on the menu now."); replaced the static `images/builder.jpg` photo in the builder summary with a generated, animated SVG illustration (`renderBuilderPreview()`) that redraws from the current bun/patty/sauce/topping selection on every change — the one explicit exception to the photo-only image policy above.
8. **Builder preview animation fix** — the first version of `renderBuilderPreview()` gave every layer a cumulative `animation-delay` and replayed the whole stack on every single click. With ~10+ layers this meant the top bun (last in the stack) could sit invisible for over a second after any change, which read as a bug (a piece of the burger going missing), not a nice animation. Rewrote it to diff the new build state against `prevBuildKey` (the previous bun/patty/sauce/toppings) and only animate the layer(s) that actually changed — each pops in with a quick scale bounce plus a `glow-shape` flash colored to match the option just picked (e.g. switching to a red sauce flashes red), while everything unchanged renders instantly with no animation. First render (`prevBuildKey === null`) never animates, to avoid a flashy pop on page load.
9. **Moved into its own subfolder** — a later session reorganized the parent directory into a multi-project workspace: this site's files (`index.html`, `images/`, `README.md`, this `CLAUDE.md`) moved from the parent folder's top level into `dodo-burgers/` via `git mv` (full commit history preserved — `git log`/`git blame` still work back through the move), alongside a new sibling `dividend-capture-analysis/` project and a root-level `CLAUDE.md` indexing all three. The reorg commit was pushed to this repo's existing GitHub remote (`ElroyQQ/dodo_burgers_POC`), which predates this reorg and was untouched by it. No content/behavior changes to the site itself in this session — purely a file-location move. If a future session's notes reference a path directly under `.../Claude projects/` instead of `.../Claude projects/dodo-burgers/`, that's why.

If asked to touch the hero image again, read the "Image policy" section above first, and know that getting the lighting/scale to match the background photo is the hard part — see point 6 for what worked. If asked to touch the builder preview animation again, read point 8 first — the diff-against-previous-state approach is load-bearing, don't regress to animating every layer on every render.
