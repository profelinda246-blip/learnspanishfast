# Learn Spanish Fast hoy

Website for **Learn Spanish Fast hoy**, a one-instructor Spanish school (Profe Linda Ward, Central Coast, California) teaching adult learners live on Zoom using the TPRS® storytelling method.

Static HTML/CSS/JS — no build step, no framework, no dependencies. Open `index.html` in a browser or serve the folder as-is; it also deploys directly to GitHub Pages.

## Pages

| File | Page |
| --- | --- |
| [`index.html`](index.html) | Homepage |
| [`all-classes.html`](all-classes.html) | Course catalogue, 5 levels, per-class enrollment, book-buying steps |
| [`about.html`](about.html) | Profe Linda's story |
| [`know-your-level.html`](know-your-level.html) | Self-placement checklist |

Shared assets: [`css/style.css`](css/style.css) (design tokens + layout) and [`js/main.js`](js/main.js) (courses menu, FAQ accordion, placement quiz).

## Design source

Reproduced from the design handoff in [`design_handoff_lsf_website/`](design_handoff_lsf_website), which documents the full design system (colors, type scale, spacing) and intended behaviour. Fixes and departures from that handoff:

- The courses menu now opens on keyboard focus and click/touch, not hover only (`aria-expanded`, closes on Escape and outside click) — flagged as a gap in `SCREENS.md`.
- The homepage stat now reads "5 levels" (was "4 levels") to match the catalogue — flagged in `BEHAVIOR.md`.
- The handoff prototyped an e-commerce-style cart (add classes, see a running total, one combined checkout). These are enrollments in a live class with a fixed number of seats, not a store, so the cart was dropped: each class card in `all-classes.html` has its own "Register for this class" button that goes straight to that class's enrollment, not a shared basket.
- The homepage's "La clase, en fotos" and About's "En la clase" placeholder photo grids (4 unlabelled student/classroom placeholder shots each) were removed at the client's request.

## Course catalogue

`all-classes.html` reflects the real 2026 course lineup, not the design handoff's prototype levels. The five levels are **Beginning I, Beginning II, Intermediate, Advanced I, Advanced II** (the handoff had "Intermediate Fall / Intermediate Spring / Intermediate-Advanced" instead — that naming is gone everywhere, including the placement quiz in `js/main.js` and the nav dropdown on all four pages). Schedule, term dates, prerequisites, novels and required materials per level come from the client's real course descriptions, not the handoff. Price is confirmed at **$139 for every level**. The Cuesta College in-person/Zoom hybrid format is confirmed to apply to **Beginning I only** — the other four levels are Zoom-only.

## Known placeholders / open items

- **Photos and logo are mostly still placeholders.** Real photos go in [`img/`](img/) (created for this) — `img/profe-linda-hero.jpg` (homepage hero), `img/profe-linda-meet.jpg` (homepage "Meet Linda Ward" and the About page hero), and all 5 novel covers (`img/novel-*`, used in both the homepage course teasers and `all-classes.html`) are filled in; the remaining images are still labelled striped boxes, and the logo hasn't come from the client yet.
- **Amazon curriculum workbook links** are named per level ("Amazon: LSF Beginning I curriculum (link coming)") but not yet linked — `TODO` comments mark each spot in `all-classes.html`.
- **Advanced I and Advanced II meeting times** aren't confirmed — only the day (Tuesdays) and duration (5 weeks) were given, so the cards read "time to be confirmed". `TODO` comments mark both.
- **Enrollment now goes to real Stripe Payment Links**, one per level, all $139 — each "Register for this class" button in `all-classes.html` links straight to Stripe Checkout. No server involved: Payment Links are pre-created in the Stripe Dashboard and need no backend, which fits this static/GitHub-Pages site. (A separate "Stripe Checkout Studio" code-integration prompt was sent our way that assumed a server-side `stripe.checkout.sessions.create(...)` call — that path was deliberately not taken, since it needs a real backend this site doesn't have; see the session notes if that comes up again.) Still open: a proper post-payment "thank you" experience — right now Payment Links fall back to Stripe's generic confirmation screen. Plan is one dynamic `thank-you.html?class=<slug>` page on our side (Stripe Payment Links support redirecting to a custom URL after payment), rather than 5 near-duplicate pages.
- **No mobile hamburger menu.** Layout is fully fluid (`clamp()`, `auto-fit` grids) and the nav wraps on narrow screens; a dedicated mobile menu is still to be designed.

## Contact info

Confirmed from the client: email `profelinda246@gmail.com`, phone `(805) 440-3064`, based in San Luis Obispo, CA. Used throughout — nav "Register" links, footers, and per-class "Register"/"Ask Profe Linda" links.

## Deploying

**GitHub Pages** (this repo, root of the default branch):

1. Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
2. The site publishes at `https://<user>.github.io/<repo>/`.

No other setup is required — it's plain static files.
