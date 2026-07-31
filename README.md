# Joe Town — Marketing Site

Dependency-free marketing site for **Joe Town**, a premium native macOS strategy
game. The selected **Living Diorama** direction uses current game-rendered
captures for feature proof, labeled editorial art for atmosphere, and the
monochrome Founding Tile as the website identity.

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
- `css/style.css` — responsive Founding Tile design system
- `js/main.js` — menu, reveals, carousels, hour selector, FAQ, chatter, and
  contextual purchase bar
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

The 2026-07-30 source update brings the website in line with the game’s submitted
1.4 build:

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
8. **World, raids, ventures, and away play** — the wider simulation and its
   consequence-driven systems.
9. **A campaign with a crown** — `#campaign` proves the Space Legacy, five-level
   Deep Throne epilogue, and 21 Game Center achievements.
10. **FAQ and purchase close** — one purchase, local saves, offline play, no ads,
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
- Carousel behavior follows measured overflow, not viewport guesses. Scrollable
  rails retain keyboard access, current-slide state, and correct end controls.
- Mobile keeps price and the primary purchase action in the first viewport,
  uses safe-area-aware navigation and purchase chrome, and avoids page-level
  horizontal overflow.
- The hero is preloaded. Below-fold images lazy-load with explicit dimensions.
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
