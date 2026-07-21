# Joe Town — Marketing Site

Static marketing site for **Joe Town**, a premium macOS strategy game.
The selected **Living Diorama** direction puts authentic gameplay in every major
chapter, supported by the monochrome Founding Tile and modern geometric type — no
build step or dependencies. The Mac game has no ads, in-app purchases, or gameplay
tracking. The marketing site uses Google Analytics 4 for aggregate website usage.

## Run locally

From this folder:

```sh
python3 -m http.server 8123
```

Then open <http://localhost:8123>.

Any static file server works (`npx serve`, etc.). Use a local server when
checking root-relative favicons, `robots.txt`, and `sitemap.xml`.

## Structure

- `index.html` — single-page product site, SEO/OG/JSON-LD inline
- `css/style.css` — full Founding Tile design system (ink/bone palette, Plus Jakarta Sans across every type surface)
- `js/main.js` — vanilla JS: resilient scroll reveals, accessible mobile menu,
  swipe-rail controls, scroll progress, compact FAQ behavior, and a
  context-aware mobile purchase bar
- `images/` — the Founding Tile SVG master, derived PNG icons/favicons, responsive
  Camp/Kingdom/Space gameplay crops, generated era icons and founder portraits,
  system captures, labeled editorial key art, and
  `og.png`
- `privacy.html` — Joe Town-specific privacy notice separating the offline game
  from website analytics
- `favicon.ico`, `robots.txt`, `sitemap.xml` — crawler and legacy browser fallbacks
- `images/raw/` — original Retina captures, kept out of the deployed markup
- `design-qa.md` — visual comparison history, interaction checks, and the final
  Product Design QA result

## Notes

- All motion respects `prefers-reduced-motion`.
- Mobile keeps the purchase action in the first viewport, turns the visual
  civilization journey into swipe rails, isolates modal navigation, and
  respects safe areas.
- The gameplay-led hero is preloaded. All below-fold images lazy-load with
  explicit dimensions.
- Civilization cards use square desktop and 3:2 mobile `<picture>` sources so the
  Camp, Kingdom, and Space stages remain clearly different at each breakpoint.
- Generated scenes are labeled `EDITORIAL KEY ART · NOT GAMEPLAY`. The active art
  family includes the Builder, Night Logistics, Archivist, and Starfarer images.
- The founder section rotates through verified in-game Joe chatter every few
  seconds, with pause and reduced-motion safeguards.
- The homepage loads Google Analytics 4 once with measurement ID
  `G-3XJQL5PVS1`. The privacy page intentionally does not load the analytics tag.
- Copy and palette follow `DESIGN.md`.

## Release state

- Production follows the selected Living Diorama redesign, verified Joe Town 1.1
  product facts, the mobile swipe-rail UX pass, a unified Plus Jakarta Sans type
  system, and source-backed founder profiles for John, Alex, Dawson, and Matt.
- The 2026-07-21 visual release replaces the repetitive journey boards with a
  distinct Camp → Kingdom → Space sequence, uses truthful Logistics/Named Joes/World
  Map system screens, and places three additional labeled editorial scenes in the
  Systems, FAQ, and final purchase chapters.
- The current release adds generated Camp/Kingdom/Space emblems, distinct founder
  chicken portraits, a cleaner Mac App Store hero action, and rotating verified
  Joe chatter with pause and reduced-motion support.
- Desktop QA passed at 1440×1000 and mobile QA passed at 390×844 with no broken
  images, duplicate IDs, console errors, or horizontal overflow.
- Responsive QA targets are `320`, `390`, `430`, `768`, and `1440` CSS pixels.
  Source and interaction checks are complete; the latest device capture is tracked
  transparently in `design-qa.md` as a post-release follow-up.
- Direction 1, **The Living Diorama**, is selected and implemented. See
  [`docs/VISUAL-FIRST-REDESIGN.md`](docs/VISUAL-FIRST-REDESIGN.md) for the
  decision record and archived alternatives.

## Production

- Canonical site: <https://gojoetown.com/>
- Production branch: `main`
- Hosting: Vercel project `joe-town-site`
- GitHub-connected updates to `main` deploy automatically. Do not also run a
  manual production deploy unless the Git deployment fails.
- Verify the released title, HTML hash, JavaScript, CSS, social image, favicons,
  `privacy.html`, `robots.txt`, and `sitemap.xml` on the canonical domain after
  every release. Confirm exactly one GA loader and one `G-3XJQL5PVS1` config call.
