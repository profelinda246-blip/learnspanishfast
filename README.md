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
| [`thank-you.html`](thank-you.html) | Post-payment page — see "Stripe checkout" below |

Shared assets: [`css/style.css`](css/style.css) (design tokens + layout) and [`js/main.js`](js/main.js) (courses menu, FAQ accordion, placement quiz, thank-you page content).

## Design source

Reproduced from the design handoff in [`design_handoff_lsf_website/`](design_handoff_lsf_website), which documents the full design system (colors, type scale, spacing) and intended behaviour. Fixes and departures from that handoff:

- The courses menu now opens on keyboard focus and click/touch, not hover only (`aria-expanded`, closes on Escape and outside click) — flagged as a gap in `SCREENS.md`.
- The homepage stat now reads "5 levels" (was "4 levels") to match the catalogue — flagged in `BEHAVIOR.md`.
- The handoff prototyped an e-commerce-style cart (add classes, see a running total, one combined checkout). These are enrollments in a live class with a fixed number of seats, not a store, so the cart was dropped: each class card in `all-classes.html` has its own "Register for this class" button that goes straight to that class's enrollment, not a shared basket.
- The homepage's "La clase, en fotos" and About's "En la clase" placeholder photo grids (4 unlabelled student/classroom placeholder shots each) were removed at the client's request.
- **Mobile nav**: below 860px, `.site-nav` collapses behind a hamburger button (`.nav-toggle`, `initMobileNav` in `js/main.js`) instead of wrapping onto multiple lines. The Courses flyout stops being a hover panel in this mode and is just always expanded in place (no hover on touch) — same markup, CSS-driven. Closes on a nav link click, Escape, an outside tap, or resizing back to desktop width.

## Course catalogue

`all-classes.html` reflects the real course lineup, not the design handoff's prototype levels. The five levels are **Beginning I, Beginning II, Intermediate, Advanced I, Advanced II** (the handoff had "Intermediate Fall / Intermediate Spring / Intermediate-Advanced" instead — that naming is gone everywhere, including the placement quiz in `js/main.js` and the nav dropdown on all four pages). Schedule, term dates, prerequisites, novels and required materials per level come from the client's real course descriptions, not the handoff. Price is confirmed at **$139 for every level**. The Cuesta College in-person/Zoom hybrid format is confirmed to apply to **Beginning I only** — the other four levels are Zoom-only. Advanced I & II meet **Tuesdays 5:20-7:00pm** (confirmed — was previously "time to be confirmed").

**2026-27 school year**: the client sent the full two-term schedule (client calls them "Session I" = fall 2026, "Session II" = spring 2027). Each card shows whichever term hadn't started yet as of the update (2026-09-23), and `all-classes.html` groups the cards under two headline sections — **"2026 classes"** then **"2027 classes"** — instead of mixing years inside the pedagogical Beginning→Advanced order, at the client's request: reading five cards with dates jumping between two different years, in no obvious pattern, was confusing (her framing: if it trips her up, it'll really trip up an older, less tech-savvy student). The Courses dropdown and the homepage teasers still use the pedagogical order — only this page's main list is grouped by year.

| Level | Section shown in | Term shown | Next term queued (not yet on the site) |
| --- | --- | --- | --- |
| Beginning II | 2026 classes | Oct 2026 (hadn't started yet) | Apr 1–May 13, 2027, novel changes to **Los Secretos de la Alhambra** |
| Advanced II | 2026 classes | Oct 2026 (hadn't started yet) | Mar 23–Apr 20, 2027, novel **TBD** |
| Beginning I | 2027 classes | Feb 2027 (2026 term had already started) | — |
| Intermediate | 2027 classes | Feb 2027 (2026 term had already started) | — |
| Advanced I | 2027 classes | Feb 2027 (2026 term had already started) | — |

**Advanced I/II split across the two sections, on purpose.** The displayed Advanced II (2026) and Advanced I (2027) aren't actually a matching pair — Advanced II's shown session predates Advanced I's shown session, since each independently rolled to "whichever term hasn't started yet." The old copy ("Advanced II picks up where Advanced I leaves off a couple of weeks later") stopped being true the moment that happened, so it's been replaced: a short `.level-group-note` on each card explains the pairing in general terms and points to the other one's section, without claiming a chronological adjacency that isn't there right now. Once Advanced II rolls to its 2027 term (see table above), it'll land in the same section as Advanced I and the notes can go back to describing a real back-to-back pair.

When Beginning II's and Advanced II's current terms wrap, swap in the queued dates/novels above — each card has an HTML comment marking exactly this. **Advanced II's prerequisite loosened**: the client's schedule now says it can be taken without Advanced I ("students who can speak well" + teacher approval), so the "one continuous course" framing (added earlier at the client's request) is now presented as the *recommendation*, not a hard requirement — same for the placement-quiz copy in `js/main.js`.

## Known placeholders / open items

- **Photos and logo are mostly still placeholders.** Real photos go in [`img/`](img/) (created for this) — `img/profe-linda-hero.jpg` (homepage hero) and `img/profe-linda-meet.jpg` (homepage "Meet Linda Ward" and the About page hero) are filled in, and all 5 currently-shown novel covers now have real cover art, Intermediate's (Robo en la Noche) and Advanced I's (La Casa en Mango Street) included. The rest of the site's images are still placeholders, and the logo hasn't come from the client yet.
- **Amazon curriculum workbook links**: Beginning I, Beginning II, and Advanced II now have real links (in `all-classes.html`, `js/main.js`'s `workbookUrl`, and clickable on `thank-you.html`). Still missing: Intermediate's (for Robo en la Noche) and Advanced I's (for La Casa en Mango Street) — `TODO` comments mark both spots. There's also an unplaced link Linda sent, titled "Beginning II Activity Guide" on Amazon but for the novel *Pobre Ana Bailó Tango* (`https://www.amazon.com/dp/B0GWXPHPMY`) — that's actually Intermediate's old 2026-term novel, not Beginning II's, so it isn't attached anywhere on the live site; keep it in mind if Intermediate ever cycles back to that term.
- **Intermediate's audiobook may work differently this term.** The 2027 schedule says its audiobook "IS a download," while every other class's is explicitly "NOT a download" (the $5 TPRSBooks subscription). This wasn't published as a stated difference — flagged with a `TODO` in `all-classes.html` — confirm with Linda before saying anything concrete about it.

## Stripe checkout

Enrollment goes through real Stripe Payment Links, one per level, all $139 — each "Register for this class" button in `all-classes.html` links straight to Stripe Checkout. No server involved: Payment Links are pre-created in the Stripe Dashboard and need no backend, which fits this static/GitHub-Pages site. (A separate "Stripe Checkout Studio" code-integration prompt was sent our way twice, for an embedded custom form and later a "hosted" redirect — both assumed a server-side `stripe.checkout.sessions.create(...)` call with a secret key. Neither path was taken: this site has no backend to run that on, and there's nowhere safe to hold a secret key in a static repo. If that prompt comes back, the answer is still Payment Links.)

**Post-payment page**: [`thank-you.html`](thank-you.html) is one page shared by all 5 links — it reads `?class=<slug>` from the URL and fills in that class's schedule, novel, and materials (logic in `js/main.js`, `initThankYou`). No slug, or an unrecognized one, falls back to a generic thank-you + link to the catalogue.

**Still needs doing, in the Stripe Dashboard (not code — I can't do this part myself):** each Payment Link's "After payment" setting must be set to redirect to its matching thank-you URL:

| Class | Redirect to |
| --- | --- |
| Beginning I | `https://profelinda246-blip.github.io/learnspanishfast/thank-you.html?class=beginning-i` |
| Beginning II | `https://profelinda246-blip.github.io/learnspanishfast/thank-you.html?class=beginning-ii` |
| Intermediate | `https://profelinda246-blip.github.io/learnspanishfast/thank-you.html?class=intermediate` |
| Advanced I | `https://profelinda246-blip.github.io/learnspanishfast/thank-you.html?class=advanced-i` |
| Advanced II | `https://profelinda246-blip.github.io/learnspanishfast/thank-you.html?class=advanced-ii` |

(Swap the domain for a custom one if/when this site gets one.) Until this is set, buyers land on Stripe's generic confirmation screen instead of our page — payments still work fine either way.

## Contact info

Confirmed from the client: email `profelinda246@gmail.com`, phone `(805) 440-3064`, based in San Luis Obispo, CA. Used throughout — nav "Register" links, footers, and per-class "Register"/"Ask Profe Linda" links.

## Deploying

**GitHub Pages** (this repo, root of the default branch):

1. Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
2. The site publishes at `https://<user>.github.io/<repo>/`.

No other setup is required — it's plain static files.
