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

## Course catalogue

`all-classes.html` reflects the real 2026 course lineup, not the design handoff's prototype levels. The five levels are **Beginning I, Beginning II, Intermediate, Advanced I, Advanced II** (the handoff had "Intermediate Fall / Intermediate Spring / Intermediate-Advanced" instead — that naming is gone everywhere, including the placement quiz in `js/main.js` and the nav dropdown on all four pages). Schedule, term dates, prerequisites, novels and required materials per level come from the client's real course descriptions, not the handoff. Price is confirmed at **$139 for every level**. The Cuesta College in-person/Zoom hybrid format is confirmed to apply to **Beginning I only** — the other four levels are Zoom-only.

## Known placeholders / open items

- **Photos and logo are mostly still placeholders.** Real photos go in [`img/`](img/) (created for this) — `img/profe-linda.jpg` is filled in (homepage hero); every other image is still a labelled striped box, and the logo hasn't come from the client yet.
- **Amazon curriculum workbook links** are named per level ("Amazon: LSF Beginning I curriculum (link coming)") but not yet linked — `TODO` comments mark each spot in `all-classes.html`.
- **Advanced I and Advanced II meeting times** aren't confirmed — only the day (Tuesdays) and duration (5 weeks) were given, so the cards read "time to be confirmed". `TODO` comments mark both.
- **Enrollment is a `mailto:` per class.** Each level's "Register for this class" button opens an email to Profe Linda naming that class; swapping in the real Stripe Payment Link per class (see `design_handoff_lsf_website/BEHAVIOR.md`) is a follow-up, not built here. Each button has a `TODO` comment right above it in `all-classes.html` marking where that link goes — once Stripe has a link for a class, drop it into that button's `href` and it's live.
- **No mobile hamburger menu.** Layout is fully fluid (`clamp()`, `auto-fit` grids) and the nav wraps on narrow screens; a dedicated mobile menu is still to be designed.

## Contact info

Confirmed from the client: email `profelinda246@gmail.com`, phone `(805) 440-3064`, based in San Luis Obispo, CA. Used throughout — nav "Register" links, footers, and per-class "Register"/"Ask Profe Linda" links.

## Deploying

**GitHub Pages** (this repo, root of the default branch):

1. Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
2. The site publishes at `https://<user>.github.io/<repo>/`.

No other setup is required — it's plain static files.
