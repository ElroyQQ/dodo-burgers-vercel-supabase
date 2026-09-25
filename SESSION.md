# Dodo Burgers — full project history

**Scope:** everything done across the *entire* Dodo Burgers project, from the first commit through the current state, across **both** repos:

- [`ElroyQQ/dodo_burgers_POC`](https://github.com/ElroyQQ/dodo_burgers_POC) — the original site, Cloudflare Pages + D1
- [`ElroyQQ/dodo-burgers-vercel-supabase`](https://github.com/ElroyQQ/dodo-burgers-vercel-supabase) — a fork of it, Vercel + Supabase, created 2026-09-24 to test the same features on a different stack

Kept identical in both repos, since it's the one document covering both — updating it in one place means updating both. This is a retrospective narrative, not a supercharge per-session log (`dodo_burgers_POC` keeps those in its own `docs/sessions/`; the fork has no equivalent scaffolding) — it exists because the project spans two repos and no single session-log convention covers both. Written 2026-09-25; not maintained incrementally — a future session should add a new dated section rather than editing history above it, and should update both copies together.

---

## Phase 1 — Initial build and content pass (2026-09-22)

**Repo:** `dodo_burgers_POC` only (didn't exist as `dodo-burgers/` subfolder yet — see Phase 3).

1. **Initial commit** — a dark ocean/lagoon-themed single-page site with hand-drawn SVG illustrations (a dodo mascot, burger cross-section art) and a fictional backstory: the dodo didn't go extinct in 1681, it quietly evolved into an aquatic species and was rediscovered in 2019 off Singapore's Tuas reclaimed land.
2. **Burgers → real photos** — replaced illustrated SVG burgers with licensed Pexels photos, on instruction to stop illustrating anything food-related.
3. **Singaporean copy + light theme + photo-driven builder** — rewrote copy with local flavor (researched real Singapore burger sites — Fatboy's, Two Blur Guys, The Goodburger — for tone) adding sambal/salted-egg/laksa/chilli-crab language, a halal-certification FAQ, Tuas Link MRT references. Re-themed dark → light/cream with teal/coral accents. Converted the SVG dodo mascot to a real photo composite (a CC0 museum dodo-reconstruction photo, Pillow/numpy-composited onto a Singapore port sunset photo, with lighting/scale iteration to make it read as a believable subject rather than a pasted cutout). Converted "Build Your Own" from text pills to photo swatches (13 sourced ingredient photos).
4. **Polish** — dropped a Singlish headline particle; replaced the static builder-summary photo with an animated SVG illustration (`renderBuilderPreview()`) that redraws per ingredient combination — the one deliberate exception to the site's real-photo-only policy, since no photo set can cover every combination. Fixed an animation bug where every layer replayed on every click (fixed top bun invisible for ~1s after any change) by diffing against the previous state and only animating what changed.
5. **Workspace reorg** — the parent directory became a multi-project workspace; this site's files moved into `dodo-burgers/` via `git mv` (history preserved), alongside a new sibling `dividend-capture-analysis/` project and a root `CLAUDE.md` indexing both.
6. **First deploy** — GitHub Actions workflow added to deploy `dodo-burgers/` to Cloudflare Pages. (This was superseded later the same stretch by connecting Cloudflare Pages' own native Git integration instead — see the Cloudflare setup snags in Phase 4.)

## Phase 2 — Supercharge scaffolding (2026-09-23)

`docs/`, `openspec/`, and `graphify-out/` scaffolded for this repo (OpenSpec + docs-tree discipline — see this repo's own `CLAUDE.md`/`docs/STATUS.md` for what that gives it). Not carried into the later Vercel/Supabase fork, which has no OpenSpec scaffolding of its own.

## Phase 3 — Visual redesign and horizontal-scroll layout (2026-09-24)

1. **"The Engineered Reveal" redesign** — replaced the light/cream, teal-and-coral, illustration-adjacent "friendly mascot" look with a dark navy, single-steel-blue-accent system styled like a hardware company's product launch, playing the dodo premise completely straight. Named rules established and never broken since: **One Hue Rule** (exactly one accent color family, two values, no second hue), **No-Kicker Rule** (no eyebrow label above a heading), **Neutral Shadow Rule** (no colored glow shadows — explicitly called out as the most common "AI-generated interface" tell). Full system recorded in `DESIGN.md`.
2. **Vertical → horizontal scroll** — converted to a single fixed-height row of full-viewport panels advancing sideways (wheel redirected to horizontal scroll, keyboard nav, direct `scrollTo` instead of unreliable `scrollIntoView`). Added the chase-bar: a chef icon chasing a dodo icon along the bottom of the viewport in lockstep with scroll progress, paying off as a caught burger on the last panel — the second (and last) named exception to the real-photo policy, alongside the builder preview.
3. **Panel work** — added a "Find the shop" panel (address/hours + live OpenStreetMap embed); merged the builder and build-summary panels back together after a brief split broke the live "watch it build" feedback; fixed double-patty rendering; moved footer/legal credits into a small header disclosure since the horizontal layout has no footer; filled empty panel negative space with real photography (density pass, referencing mosburger.com.sg for density, not palette) — this also exposed and fixed a real bug where a wrapping 3-line header on narrow viewports hid panel content, fixed by measuring header height live instead of hardcoding it.
4. Reconciled into supercharge docs and closed with a session log (`/supercharge end`).

## Phase 4 — Login/signup on Cloudflare + D1 (2026-09-24)

Requested with an explicit "use as little tokens as possible" constraint.

1. **Setup snags** (all resolved live, interactively): `npm install -g wrangler` needed `--allow-scripts`; a stale `wrangler login` OAuth session failed and succeeded on retry; the user initially created a plain Cloudflare **Worker** instead of a **Pages** project (diagnosed by checking which Settings sub-tabs existed) and had to redo it as Pages; the Pages project initially had the wrong root directory (whole repo instead of `dodo-burgers/`), fixed in dashboard settings.
2. **Feature built**: PBKDF2 password hashing + salt (Web Crypto, no dependencies), constant-time hash comparison, a D1 `users` table, login/signup/logout Cloudflare Pages Functions, a logout button.
3. **Hardening pass**: D1-backed fixed-window rate limiting (5 signups/hour/IP, 10 logins/60s/IP) and security headers (`_headers` file: CSP, X-Frame-Options, etc.) added on request.
4. **Critical incident**: bumping PBKDF2 to 210,000 iterations (OWASP's current recommended minimum) silently broke every signup and every login-with-a-real-email in production, because it exceeded Cloudflare Pages Functions' per-request CPU time limit — surfaced to the user as a generic "Network error" rather than a clear cause. Root-caused via direct `curl` testing against the live deployment (comparing fake-email logins, which short-circuited before hashing and thus never crashed, against real-email logins, which did). **Fixed** by reverting to 100,000 iterations — the highest value confirmed to run within Cloudflare's CPU limit — with a code comment warning against raising it without live-testing again.
5. **Secondary incident**: after the fix, the user hit "Too many signups from this connection" — caused by the assistant's own diagnostic `curl` commands (which run on the user's real machine, not a sandbox) having consumed the per-IP rate-limit quota. Fixed by clearing the `auth_attempts` D1 table.
6. **Branch/PR workflow adopted**: at the user's request, all further changes to this repo go through a feature branch + PR + Cloudflare preview URL, never a direct push to `main` (Cloudflare Pages auto-deploys `main` straight to production on every push).

## Phase 5 — The Vercel + Supabase fork (2026-09-24)

Prompted by an exploratory question ("would a Vercel/Supabase clone be feasible?") that the user then confirmed building.

1. **Forked**: `rsync`-copied `dodo-burgers/` (post-redesign, already dark/horizontal) into a new `dodo-burgers-vercel-supabase/` folder and its own GitHub repo, excluding Cloudflare-specific files (`wrangler.toml`, `schema.sql`, `_headers`, `functions/`).
2. **Auth rebuilt on Supabase**: replaced the Cloudflare Functions + D1 + hand-rolled PBKDF2/rate-limiting entirely with Supabase's hosted Auth, called directly from the browser via `supabase-js` (loaded from `esm.sh` as an ES module — the one CDN dependency, no build step). No serverless functions needed at all for auth on this stack.
3. **Wired up and verified live**: the user's real Supabase project URL/anon key filled in; signup/login/logout tested end-to-end against the real backend, including turning off Supabase's default email-confirmation requirement for easier testing.
4. **GitHub + Vercel set up**: new public repo, new Vercel project (root directory, no build command — plain static files), same branch+PR+preview workflow adopted for this repo too.
5. **A real bug found via testing, not code review**: the PR preview deployment was gated behind a Vercel login wall ("Vercel Authentication" deployment protection, on by default for team projects) — meaning it wasn't actually shareable with an outside reviewer as intended. Fixed by the user disabling it in Vercel project settings; re-verified the preview then loaded publicly with auth still working.
6. **A real process bug found via git forensics**: a manual "Merge pull request" click on GitHub silently used a stale commit SHA (likely a stale browser tab), merging an older version of a PR branch into `main` and dropping three already-pushed commits without any error. Caught by diffing merge-commit parents against the branch's actual tip, not by trusting the "Merged" status. Fixed with a follow-up PR bringing in the missing commits; later PRs used squash merges, which don't have this failure mode.

## Phase 6 — CI and automated review, Vercel/Supabase repo (2026-09-25)

Added to close a gap identified in an external "shipping-loop" readiness review the user shared: the project had deploy automation (Vercel) but no lint, test, or build stage.

- **Lint** (`htmlhint`) caught a real, previously invisible bug: `index.html` had no `<!DOCTYPE html>`/`<html>`/`<head>`/`<body>` at all, running every browser in quirks mode. Fixed as part of adding CI.
- **Build-equivalent**: a small Node script confirms every `images/...` reference in `index.html` resolves to a real file (verified against both a positive and a deliberately-broken case).
- **Test**: a Playwright smoke suite (page loads clean, auth widget renders, menu/builder panels present, and — added later — a guest is correctly prompted to log in rather than allowed to place an order). Deliberately never calls the real `supabase.auth.signUp`, since preview and production share one live Supabase project and a CI run would otherwise create real accounts on every push.
- **Automated PR review** wired up via Anthropic's official `claude-code-action` GitHub Action — needs a `ANTHROPIC_API_KEY` repo secret and the Claude GitHub App installed (verified the exact failure mode from a live failed run rather than guessing, and corrected the setup instructions accordingly).
- All of this is CI-only tooling (`package.json`/lockfile) — the shipped site remains a zero-dependency, no-build-step static page.

Also did the same manual security review pass across both repos (since the automated `/security-review` skill only reviews pending diffs, not a whole codebase): the Vercel/Supabase client code came back clean (no free-text user input ever reaches `innerHTML`, the logged-in email renders via `textContent`); the Cloudflare Functions came back clean except one low-severity account-enumeration note on `/api/signup` (signup reveals whether an email is already registered, unlike login's generic error) — not yet fixed, flagged only.

## Phase 7 — Persistent pickup-order system, Vercel/Supabase repo only (2026-09-25)

The one feature that exists on only one of the two stacks.

- Logged-in users can place a real order from their cart — not just simulate one. Stored in a new `orders` table (migration in `supabase/migrations/0001_orders.sql`), Row-Level-Security-scoped so each user only ever sees their own, applied by the user directly in the Supabase SQL Editor (no admin/service-role DB access exists in the app or in Claude's own tooling, by design).
- Pickup-only flow (no delivery, no payment, matching the site's standing scope): places an order → computed ETA (8 min + 2 min/cart-line, capped at 25) → a header widget tracks status → a pop-up banner fires once the ETA passes (checked every 15s while the tab is open — no backend push, so it won't fire if the tab or the whole machine is asleep at that moment, though it self-corrects the moment the tab is active again since it compares against a stored timestamp, not a countdown) → "Mark as picked up" closes it out.
- A guest gets prompted to log in, with their cart preserved, rather than silently blocked — covered by an automated test.
- Verified fully live against the real deployed preview: real signup, real order insert, real logout/login round-trip proving persistence, a fast-forwarded ETA to trigger the ready pop-up without waiting, and a real "mark picked up" database update — not just code review.
- `PRODUCT.md`/`CLAUDE.md`/`README.md`/`DESIGN.md` all updated to describe it (including two new "signature components" documented in `DESIGN.md`: the order-status widget, reusing the existing header-disclosure pattern, and the pickup alert, the one place in the whole design system allowed to fill a large surface with the accent color, as a deliberate, narrow exception for a genuinely time-sensitive moment).

## Phase 8 — Making the fork's docs actually match reality (2026-09-25)

Two separate doc-drift problems found and fixed on the Vercel/Supabase repo, both the same root cause: files copied at fork time and never fully rewritten.

1. **README.md** still described the pre-redesign vertical/light-cream layout and had no live URL or preview-deployment explanation at all. Rewritten section by section; then, per an explicit request to keep the production URL out of anything public-facing, the top-of-file link was swapped from production to a preview URL — which then needed a **permanent, dedicated `preview` branch** (kept fast-forwarded from `main`, never meant to merge) once the original PR-specific preview link died the moment its branch was deleted after merge.
2. **CLAUDE.md** turned out to be worse: its Architecture, Image policy, and Session-history sections were a verbatim copy of the *original* `dodo-burgers/` docs from **before** that project's own redesign — describing a site (light/cream, vertical scroll, footer) that had never existed in this fork. Rewritten to match the actual current structure, with the fork's own history appended as clearly-marked new points rather than rewriting the inherited pre-fork history in place. **DESIGN.md** was also missing documentation for the new order/pickup UI components (see Phase 7) — added.

## Current state (as of 2026-09-25)

| | `dodo_burgers_POC` (Cloudflare) | `dodo-burgers-vercel-supabase` (Vercel) |
|---|---|---|
| Hosting | Cloudflare Pages | Vercel |
| Database/Auth | Cloudflare D1 + hand-rolled PBKDF2/rate-limiting | Supabase Auth (managed) |
| Login/signup/logout | ✅ | ✅ |
| Persistent pickup orders | ❌ (not built here) | ✅ |
| CI (lint/build/test) | ❌ | ✅ |
| Automated PR review | ❌ | ✅ (needs `ANTHROPIC_API_KEY` secret + GitHub App installed to actually run) |
| Stable non-production preview link | n/a (Cloudflare preview URLs are per-branch already) | ✅ `preview` branch |
| Open PRs | none | none |
| Known open item | `/api/signup` account-enumeration (low severity, flagged not fixed) | none tracked |

Both sites' `main` branches are deployed and live. This document is the single place that ties both repos' histories together — each repo's own `CLAUDE.md` documents only its own architecture and its own slice of history.
