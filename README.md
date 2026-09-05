# Joe Town — Marketing Site

Dependency-free marketing site for **Joe Town**, a premium native macOS strategy
game. The 2026-08-10 **editorial cavern** update presents the Living Diorama
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

The 2026-08-14 conversion pass keeps the verified story and shortens the
buyer path to five chapters. The 2026-07-30 source update still governs
product facts:

1. **Hero** — dusk gameplay, official tagline, one purchase action, and a
   lighter scrim so the town stays visible.
2. **Play (`#play`)** — four Mac-window captures (town, roads, petitions, Joes)
   and the same-town five-hour clock.
3. **Ages (`#ages`)** — Camp/Kingdom/Space chapters plus one interactive
   ten-age board with mechanic-first captions.
4. **Systems (`#systems`)** — Corn → Flour → Bread → Food, guild/Joe/Monument
   decisions, four founders, and compact world/raid/away facts.
5. **FAQ and dusk-town close** — one purchase, local saves, offline play, no ads,
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
- Historical Foundry production studies remain in `images/foundry/` for source
  provenance, but they are not part of the buyer-facing page.
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
- The ten-age rail follows measured overflow, not viewport guesses, and keeps
  keyboard access (tab stop plus arrow controls), a live counter, and correct
  end controls. Start/end disabled states are snap-aware and the counter pins
  to the last slide at maximum scroll.
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
  `G-3XJQL5PVS1`; App Store links emit `app_store_click`. The privacy page
  intentionally loads no analytics script.
- Product privacy language says **no gameplay tracking** or explicitly names the
  Mac game. The website itself uses GA4 for aggregate usage.

## Release wording gate

The US App Store lookup on 2026-09-04 reports **version 1.6** at **$9.99**,
with **macOS 14.0** as the minimum. The game repository's
[release record](https://github.com/enzo-prism/joe-town/blob/e9b64ae96e1a69e6a3b868c2f9d81da592546506/docs/APP_STORE_RELEASE.md)
documents public build 29 as Apple-silicon-only. Version 1.5 was universal,
but availability of that older version to Intel customers has not been verified.

The [1.7 build 30 record](https://github.com/enzo-prism/joe-town/blob/e9b64ae96e1a69e6a3b868c2f9d81da592546506/docs/RELEASE_1_7.md)
documents both architectures in its signed package and internal TestFlight
distribution. This does not establish public availability or successful Intel launch.

- Keep the visible compatibility FAQ and its JSON-LD answer consistent.
- Restore the universal compatibility claim only after verifying Intel installation
  and launch, and confirming that the tested release is publicly available.
- Recheck App Store Connect and the public storefront before updating version,
  price, or release claims.

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
