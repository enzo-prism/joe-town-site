# Joe Town — Marketing Site

Dependency-free marketing site for **Joe Town**, a premium native macOS strategy
game. The 2026-08-03 **editorial cavern** redesign presents the Living Diorama
story as numbered magazine chapters: current game-rendered captures for feature
proof, labeled editorial art for atmosphere, Fraunces + Plus Jakarta Sans type,
and a dark gold-on-ink palette. The monochrome Founding Tile remains the brand
mark.

## Run locally

```sh
python3 -m http.server 8123
```

Open <http://localhost:8123>. A local server is required to check root-relative
favicons, `robots.txt`, and `sitemap.xml`.

## Validate

```sh
python3 scripts/validate_site.py
```

The dependency-free validator checks local HTML and CSS asset references,
duplicate IDs, image alt attributes and raster dimensions, the single GA4
loader/config pair, qualified tracking language, unverified public-release
wording, and JavaScript syntax. The same check runs in GitHub Actions.

## Structure

- `index.html` — single-page product story, SEO, Open Graph, and JSON-LD
- `css/style.css` — responsive editorial cavern design system
- `js/main.js` — scroll progress, reveals, mobile menu, hour tablist, age
  rail, systems tabs, quote rotator, lightbox dialog, FAQ, and contextual
  purchase bar
- `images/` — current game captures, responsive crops, icons, and labeled
  editorial key art
- `privacy.html` — separates the offline Mac game from website analytics
- `favicon.ico`, `robots.txt`, `sitemap.xml` — public browser/crawler surfaces
- `DESIGN.md` — current product truth, copy rules, visual system, and provenance
- `design-qa.md` — implementation and release QA record

Design documents, validation source, workflows, and raw capture inputs are
excluded from Vercel through `.vercelignore`. Public HTML, CSS, JavaScript,
favicons, crawler files, and referenced images remain deployable.

## Current page story

The 2026-08-03 redesign rebuilds the page as fifteen numbered chapters over
the same verified story. The 2026-07-30 source update keeps the website in line
with the game’s submitted 1.4 build:

1. **The Light Update hero** — current dusk gameplay, responsive sources, and
   release-safe wording.
2. **Same town. Five hours.** — `#hour` compares dawn, morning, midday, dusk, and
   night at the same camera and town state.
3. **Inside the latest build** — six expandable current-build captures show the
   town, petitions, ventures, exploration, diplomacy, and named-Joe roster.
4. **Ten ages** — refreshed build-24 game-rendered captures, plus the
   Camp/Kingdom/Space journey.
5. **Origins and named Joes** — five permanent origins and a flock whose skills,
   perks, relationships, and traits evolve.
6. **Physical production** — Corn → Flour → Bread → Food, carried along visible
   roads, with a real logistics proof image.
7. **Decisions that remain visible** — `#decisions` covers the three-branch guild
   tree, Joe perks and earned traits, and the four Monument phases.
8. **Joe Town Foundry** — a clearly labeled production-art study shows the
   Watchtower from eight consistent angles before its final pixel-art bake.
9. **World, raids, ventures, and away play** — the wider simulation and its
   consequence-driven systems.
10. **A campaign with a crown** — `#campaign` proves the Space Legacy, five-level
    Deep Throne epilogue, and 21 Game Center achievements.
11. **FAQ and purchase close** — one purchase, local saves, offline play, no ads,
    no in-app purchases, and no gameplay tracking.

## Asset provenance

- `hero-light-update-{1920,960}.webp`, `hour-{dawn,morning,midday,dusk,night}.webp`,
  `gameplay-{town,petitions,ventures,world,diplomacy,joes}.webp`,
  `system-{logistics,technology,joes,world}-2026.webp`,
  `logistics-chain.webp`, `choice-{guild,joe,monument}.webp`,
  `campaign-throne.webp`, refreshed `age-1..10.webp`, and refreshed
  `journey-{camp,town,space}-{square,wide}.webp` are captures made by the game’s
  deterministic snapshot renderer from the build-24 source.
- Current gameplay captures may be cropped and resized, but must not be
  retouched into a feature the game does not render.
- Generated narrative images remain labeled
  `EDITORIAL KEY ART · NOT GAMEPLAY`.
- `images/foundry/watchtower/watchtower-{000,045,090,135,180,225,270,315}-{640,1600}.webp`
  are Joe Town Foundry production-art renders of the runtime-aligned stage-4
  master. They are pipeline studies, not screenshots or shipped game assets,
  and the page labels them accordingly.
- `campaign-achievements.webp`, when present, must be generated from the game’s
  own 21 achievement-art catalog and verified against the source identifiers.
- `og-light-update-2026.png` uses a new URL for reliable social-card refreshes
  and follows the current Light Update hero and page promise.
- Exact commands, source commit, seed/tick, daylight phase, crop, dimensions,
  and any processing belong in the capture provenance record in `DESIGN.md`.

## Implementation notes

- Motion respects `prefers-reduced-motion`; hour comparison remains usable as a
  static selector.
- The gameplay gallery uses a native dialog, traps focus while open, restores
  the launching card on close, supports Escape plus Left/Right navigation, and
  provides a horizontally pannable detail view on small screens.
- The ten-age rail and the Foundry turntable follow measured overflow, not
  viewport guesses, and keep keyboard access (tab stop plus arrow controls),
  a live counter, and correct end controls. Start/end disabled states are
  snap-aware and the counter pins to the last slide at maximum scroll. The
  Foundry opens a separate square native dialog with Escape, Left/Right,
  contained focus, and focus restoration.
- The mobile menu lives outside the blurred header element so its fixed
  positioning resolves against the viewport. While it is open, `#main` and
  the footer are `inert` so Tab cannot escape into the page; a `matchMedia`
  listener closes the menu automatically when the viewport leaves the burger
  range.
- Mobile keeps price and the primary purchase action in the first viewport,
  uses safe-area-aware navigation and purchase chrome, and avoids page-level
  horizontal overflow.
- The hero is preloaded, split by `media` to mirror the `<picture>` sources,
  so each viewport fetches only its own hero variant. Below-fold images
  lazy-load with explicit dimensions.
- Google Analytics 4 loads once on the homepage with measurement ID
  `G-3XJQL5PVS1`. The privacy page intentionally loads no analytics script.
- Product privacy language says **no gameplay tracking** or explicitly names the
  Mac game. The website itself uses GA4 for aggregate usage.

## Release wording gate

The game repository proves that **Joe Town 1.4 build 24 was submitted for App
Store review on 2026-07-30**. It does not prove that 1.4 is publicly available.
The live public storefront lookup on 2026-07-30 still reports **version 1.3** at
**$9.99**, with **macOS 14.0** as the minimum.
Until App Store Connect is checked live and shows the version released:

- Do not say “available now,” “out now,” “released,” or “play the 1.4 update.”
- Present the new visuals and mechanics as game features without a public 1.4
  badge.
- Keep the App Store purchase link and current public price, but do not tie the
  purchase action to an unverified version number.

## Production

- Canonical site: <https://gojoetown.com/>
- Production branch: `main`
- Hosting: Vercel project `joe-town-site`
- GitHub-connected changes to `main` deploy automatically. Do not also run a
  manual production deploy unless the Git deployment fails.

After release, verify the expected Git commit reached production; compare the
canonical HTML, CSS, JavaScript, social image, favicons, privacy page, crawler
files, and referenced media with source; confirm exactly one GA loader and one
matching config call; then run browser checks at 320, 390, 430, 768, and 1440 CSS
pixels.
