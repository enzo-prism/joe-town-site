# Living Diorama — Design QA

## Light Update website refresh — 2026-07-30

### Source and release boundary

- Game implementation reviewed at `/Users/enzo/joe-town`, commit `3edeafc`.
- The source and release record prove Joe Town 1.4 build 24 was submitted for
  App Store review on 2026-07-30 with manual release.
- This QA record does **not** treat submission as public availability. The page
  must not say `available now`, `out now`, `released`, or attach a public 1.4
  badge until App Store Connect is checked live.

### New proof surfaces

- **Hero:** build-24 dusk gameplay with 1920px and 960px responsive sources.
- **Same town. Five hours (`#hour`):** dawn, morning, midday, dusk, and night
  captures use the same deterministic town and camera. The selector must expose
  one selected state, work by keyboard and pointer, keep useful image alt text,
  and remain usable with reduced motion or without scripted transitions.
- **Physical production:** a real logistics view proves Corn → Flour → Bread →
  Food and visible connected routes.
- **Decisions (`#decisions`):** source UI proves the three-branch guild, Joe
  perks/earned traits, and four-phase Monument without presenting editorial art
  as gameplay.
- **Campaign (`#campaign`):** source capture/art proves the Space Legacy,
  five-level Deep Throne epilogue, and 21 Game Center achievements.
- **Refreshed progression:** all ten age frames and Camp/Kingdom/Space crops use
  the current renderer’s daylight, volume, contact shadows, distance treatment,
  cut-rock edge, scree, fissures, and lichen.
- **Social image:** `og-light-update-2026.png` matches the Light Update hero and does not imply an
  unverified public version state.

### Asset truth gate

- Game-rendered proof: `hero-light-update-{1920,960}.webp`,
  `hour-{dawn,morning,midday,dusk,night}.webp`, `logistics-chain.webp`,
  `choice-{guild,joe,monument}.webp`, `campaign-throne.webp`, `age-1..10.webp`,
  and `journey-{camp,town,space}-{square,wide}.webp`.
- `campaign-achievements.webp` is allowed only when derived from the game’s own
  21-item achievement-art catalog and visually verified.
- Existing generated narrative scenes retain the visible
  `EDITORIAL KEY ART · NOT GAMEPLAY` label.
- Crops and resizing are allowed. Feature invention, compositing unrelated
  states into fake gameplay, or describing a synthetic snapshot as a player’s
  save is not.

### Required validation

- [x] `python3 scripts/validate_site.py`
- [x] `git diff --check`
- [x] No missing local assets, duplicate IDs, or `<img>` without `alt`
- [x] All 13 new gameplay/art exports match their declared HTML dimensions
- [x] Exactly one GA4 loader and one `G-3XJQL5PVS1` config on the homepage
- [x] No analytics loader on `privacy.html`
- [x] No unqualified `no tracking` promise while website GA4 is present
- [x] Desktop browser pass at 1440×1000
- [x] Responsive browser passes at 320×700, 390×844, 430×932, and 768×900
- [x] No document-level horizontal overflow
- [x] Menu focus/inert/Escape and hour selector pointer/arrow-key/ARIA pass
- [x] Manual keyboard spot-check: skip link, overflowing carousels, FAQ, and
  purchase links
- [x] Reduced-motion implementation pass
- [ ] Real VoiceOver spot-check
- [ ] Production readback matches the released commit and public assets
- [x] Public storefront checked separately before public-version wording

**Current result:** source validation passes: 111 HTML references, 47 IDs, image
alts and intrinsic dimensions, CSS assets, GA singleton, tracking/release
wording, JavaScript syntax, and clean diffs. Fresh browser QA also confirms the
desktop/mobile layouts, no broken images or document overflow, the menu’s
focus/inert/Escape behavior, and the hour selector’s pointer, keyboard, and ARIA
states. Automated viewport evidence covers 320×700, 390×844, 430×932, 768×900,
and 1440×1000 with `scrollWidth == clientWidth` and a fully visible hero CTA.
The 1440px hero/hour/decisions/campaign and 390px hero/hour were visually
inspected. The skip link moves focus to `main`; an overflowing rail advances by
keyboard and updates its current slide; FAQ disclosure and purchase links remain
keyboard-reachable. VoiceOver and production readback remain separate;
the historical passes below do not prove this refresh.

## Historical Living Diorama comparison target — 2026-07-20

- Source visual truth: `/Users/enzo/.codex/generated_images/019f6d46-9c86-7522-b34a-4f68d3c27f03/exec-addf4155-cfda-4adc-87c1-7ac6e7053532.png`
- Desktop implementation tour: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-implementation-tour.png`
- Full-view comparison: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-full-comparison.png`
- Focused hero comparison: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-hero-comparison.png`
- Mobile implementation: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-mobile-390-final.png`
- Baseline viewports checked before the latest mobile polish: 320×844, 390×844,
  768×900, and 1440×1000
- State: default page, open mobile menu, open FAQ item, sticky purchase bar, and closing purchase section

The source is an 869×1810 concept board rather than a browser-viewport capture.
The full comparison places it beside a section-by-section desktop tour normalized
to the same height. The focused comparison normalizes both hero regions to 620px
high. Section screenshots overlap slightly by design so each chapter can be read
at full viewport scale.

## Historical baseline findings

No actionable P0, P1, or P2 mismatch remains from the source-comparison pass.
The current mobile release follow-up is tracked below.

- [P3] Authentic gameplay captures retain small pieces of shipped HUD chrome in
  some journey and feature crops. This intentionally favors truthful game imagery
  over the concept board's cleaner illustrative composites.
- [P3] The desktop hero headline uses two lines at 1440px instead of the concept's
  three. This keeps the real gameplay town large and readable while preserving the
  selected editorial hierarchy; mobile returns to three lines.
- [P3] A real VoiceOver pass and live OS reduced-motion toggle remain useful final
  release checks. Semantic browser output and reduced-motion CSS were reviewed.

## Historical baseline fidelity surfaces

- **Fonts and typography:** Plus Jakarta Sans now owns every display, body, label,
  HUD, navigation, and control surface. Weight, scale, tracking, and color preserve
  hierarchy within one modern geometric family.
- **Spacing and layout rhythm:** the hero, three-age journey, balanced Joe split,
  four-card systems row, quiet FAQ, and emblem close reproduce the concept's visual
  sequence. Desktop content is constrained to 1280px. Mobile collapses cleanly.
- **Colors and visual tokens:** ink, bone, corn gold, and teal map directly to the
  concept. Gold is reserved for progression and purchase actions; teal remains an
  information accent. Contrast and focus rings are clear.
- **Image quality and asset fidelity:** the hero and all gameplay claims use
  authentic Joe Town captures. Four generated editorial scenes—the Builder,
  Night Logistics, Archivist, and Starfarer—form one visibly labeled art family.
  The Founding Tile remains the supplied SVG master. No placeholder or code-drawn
  artwork ships.
- **Copy and content:** concise copy preserves the verified ten ages, source-backed
  founders John, Alex, Dawson, and Matt, the $9.99 one-time price, offline play,
  supported Macs, and premium purchase promises without roadmap or interstellar
  claims. Founder activities are examples of evolving play, not fixed careers.
- **Icons:** the supplied Founding Tile is the only visual icon required. Menu
  bars and disclosure signs are native control affordances, not asset substitutes.
- **Responsiveness:** desktop keeps the visual grid; mobile/tablet use bounded
  scroll-snap rails with edge peeks, 44px controls, and no document-level overflow.
  Short-screen rules keep the price and primary CTA in the first phone viewport.

## Historical interaction and accessibility evidence

- Skip link and semantic heading order are present.
- Mobile menu moves focus to the first link, traps Tab with the menu button, sets
  page content inert, closes with Escape, restores focus, and closes on resize.
- FAQ disclosure opens through its native `details`/`summary` control.
- The mobile purchase bar appears when the hero purchase action leaves view, stays
  available through tablet width, and hides at the closing CTA or while navigation
  is open. Its hidden state is inert and removed from assistive navigation.
- Age and systems rails support touch, arrow controls, Left/Right keys, live slide
  position, disabled end controls, snap stops, and reduced motion.
- All purchase links use the verified App Store URL and consistent accessible names.
- Reveal content remains visible when JavaScript, IntersectionObserver, or motion
  animation is unavailable.
- Baseline browser console errors and warnings checked: none. The latest source
  pass completed JavaScript parsing and HTTP/MIME readback; fresh device-console
  evidence remains a post-release follow-up.

## Visual, copy, and analytics release — 2026-07-21

- Replaced the near-identical journey boards with source-faithful Camp, Town, and
  Space compositions. Desktop uses square crops; mobile uses 3:2 sources through
  `<picture>`.
- Replaced reused or misleading system images with real Logistics, Manage Joes,
  and World Map screens. The system gallery is a two-column desktop grid and a
  mobile swipe rail.
- Added three new generated scenes matching the approved Builder image: Night
  Logistics after the system explanation, Archivist Joe beside the FAQ, and a
  Starfarer background behind the closing purchase action.
- Labeled every narrative generated scene `EDITORIAL KEY ART · NOT GAMEPLAY` and
  kept the gameplay-led hero authentic.
- Rewrote the purchase journey around the real mechanics, canonical founders, and
  a clearer Camp-to-Space promise.
- Added GA4 measurement ID `G-3XJQL5PVS1` once on the homepage. Updated product
  promises to `No gameplay tracking` and added a Joe Town-specific privacy notice.
- Browser QA passed at 1440×1000 and 390×844: correct responsive sources, no
  horizontal overflow, no missing alt attributes, no duplicate IDs, no broken
  images, and no console errors. `git diff --check` also passed.
- Production commit, Vercel readiness, and canonical readback are recorded only
  after the deployment gates pass.

## Comparison history

### Pass 1 — blocked

- [P2] The full-window hero crop exposed a large right-side game panel that competed
  with the town and diverged from the gameplay-first concept.
- [P2] The Joe quote rendered duplicated quotation marks.
- [P2] The sticky mobile purchase bar remained visible too long as the closing CTA
  entered the viewport.
- [P2] Mobile hero shading hid too much of the town.

### Fixes

- Produced `hero-kingdom-world.webp`, a measured authentic gameplay crop sized for
  the hero slot, then recaptured desktop and mobile evidence.
- Removed literal quotation marks and retained the typographic quote treatment.
- Lowered the closing-CTA observer threshold from `0.08` to `0.01`.
- Tuned the mobile image opacity and solid shading while preserving text contrast.

### Pass 2 — passed

The post-fix hero comparison, mobile capture, Joe section, systems section, and
responsive metrics show no remaining P0/P1/P2 issue. The P3 differences above are
intentional or release-polish follow-ups.

## Historical implementation checklist

- [x] Selected visual hierarchy implemented
- [x] All target image slots filled with authentic gameplay or labeled key art
- [x] Primary navigation, purchase links, mobile menu, and FAQ functional
- [ ] Post-release 320, 390, 430, and 768 browser recapture for the current mobile pass
- [ ] Post-release browser console recheck for the current mobile pass
- [x] Documentation updated

**Historical result (2026-07-20):** source QA passed and production release was
authorized for that baseline. This does not clear the 2026-07-30 refresh gates.

## Mobile UX polish pass — 2026-07-20

- Replaced seven tall mobile card stacks with two native swipe rails, reducing
  repetitive vertical travel while keeping every card in semantic DOM order.
- Added an immediate mobile town-status HUD, numbered cards, section progress,
  pressed states, a scroll-progress hairline, and an animated menu close state.
- Added notch-safe header/menu/bar spacing, 320px and short-height hero tuning,
  larger utility text, and 44px footer targets.
- Removed the hero reveal delay; below-fold WebP media remains lazy and
  asynchronously decoded.
- Source validation passed: balanced CSS, unique IDs, valid ARIA control targets,
  valid JavaScript, clean diffs, and HTTP 200/MIME checks for all touched assets.
- The responsive browser capture surface was unavailable during this pass. The
  explicit push-to-production request authorizes release on the completed source,
  interaction, asset, and canonical readback gates; fresh captures remain follow-up.

## Release verification — 2026-07-20

- Release path: fast-forward the validated Living Diorama branch to `main`; the
  existing GitHub-to-Vercel integration performs the production deployment.
- Required live proof: expected Git commit reaches Vercel `READY`, canonical HTML
  matches source, the short title is present, and all CSS/JS/OG/favicon/crawl assets
  return successfully.
- Do not run a second manual production deployment when the Git deployment succeeds.

## Modern typography pass — 2026-07-20

- Replaced every active display, body, navigation, label, HUD, profile, card,
  accordion, button, and footer typeface with Plus Jakarta Sans.
- Removed the three-family desktop/mobile split and its mobile-only overrides.
- Rebalanced headline size and measure, removed synthesized display italics,
  tightened label tracking, and raised the smallest interface text.
- Verified the live Google Fonts stylesheet and variable WOFF2 asset, all 27 CSS
  font declarations, legacy-family removal, CSS structure, and local HTTP responses.
- Fresh visual viewport evidence remains a transparent post-release follow-up; the
  validated source and explicit production request clear the release gate.

## Founder roster pass — 2026-07-20

- Replaced the invented Enzo profile with four source-backed founders: John, Alex,
  Dawson, and Matt.
- Removed fictional Craft/Guts/Luck bars and non-canonical traits; each card now
  uses visible text for personality and an illustrative, changeable activity.
- Preserved the labeled editorial portrait and verified flock quote while making
  the section more representative of the wider flock.
- The four-card roster uses a two-column desktop grid and a single-column mobile
  stack, keeping source order and screen-reader order aligned.

## Production readback — 2026-07-20

- GitHub `main` and the Vercel production deployment were verified on the same
  release after the typography, founder roster, and documentation updates.
- The canonical site returned HTTP 200 with Vercel `READY`, cache, and HSTS
  headers present.
- Live HTML, CSS, JavaScript, Open Graph image, favicon, `robots.txt`, and
  `sitemap.xml` matched the validated `main` files byte-for-byte.
- Live content confirmed Plus Jakarta Sans, John, Alex, Dawson, and Matt; the old
  Enzo feature card was absent and the verified App Store destination remained.

## Visual and analytics production readback — 2026-07-21

- Release source commit `60fe01f732f2e71f05160860047847d25c94d47e`
  reached Vercel production as deployment `dpl_BvSeNgB4JYKdoHv7KvZ35hYq3sDT`.
- `gojoetown.com` returned the new Camp/Town/Space journey, three additional
  labeled editorial-art placements, corrected system captures, GA4 measurement
  ID `G-3XJQL5PVS1`, qualified `No gameplay tracking` language, and the local
  Joe Town privacy notice.
- Canonical HTML, privacy HTML, CSS, JavaScript, Open Graph image, favicon,
  `robots.txt`, `sitemap.xml`, and all 12 new WebPs matched the committed source
  byte-for-byte.
- The live homepage contained exactly one GA loader and one matching config call;
  `/privacy.html` intentionally contained neither. The privacy page was included
  in the live sitemap.
- HTTP/MIME checks returned 200 for HTML, privacy, CSS, JavaScript, WebP, PNG,
  ICO, robots, and sitemap surfaces. Canonical response headers included Vercel
  cache confirmation and HSTS.

## Generated era icon pass — 2026-07-21

- Added three distinct generated pixel-art emblems for Camp, Kingdom, and Space
  without replacing or obscuring the authentic gameplay captures.
- Removed the flat chroma backgrounds locally, exported 576px lossless WebPs with
  alpha, and placed them as decorative images at the screenshot/caption seam.
- Updated the selected journey chapters to Camp, Kingdom, and Space, including the
  user-provided Kingdom copy and clearer Kingdom/Space screenshot alternatives.
- Verified 1440×900 and 390×844 layouts: all three assets loaded at their intrinsic
  width, decorative alts remain empty, labels are correct, and neither viewport has
  horizontal page overflow. This pass is included in the current release candidate.

## Generated founder portrait pass — 2026-07-21

- Replaced the John, Alex, Dawson, and Matt letter avatars with four distinct
  generated pixel-art chickens tailored to each visible personality and activity.
- Kept every founder name, personality, and activity as accessible live text. The
  portraits use empty alternative text because they are decorative companions to
  that adjacent content.
- Verified the integrated roster at 1440×900 and 390×844: all four 256px WebPs
  load, the two-column and single-column layouts remain balanced, and neither
  viewport has horizontal page overflow.
- This portrait pass is included in the current release candidate.

## Joe chatter rotation — 2026-07-21

- Replaced the static founder quote with a 16-line rotation sourced verbatim from
  the verified in-game chatter list in `DESIGN.md`.
- Quotes advance every 5.2 seconds with a short text fade, stop while the page is
  hidden or the chatter block is offscreen, and include a visible 44px pause/resume
  control.
- Reduced-motion visitors keep the initial quote static and do not see an inactive
  pause control. The current quote remains ordinary blockquote text rather than an
  unsolicited live-region announcement.
- Local browser QA confirmed a visible quote advances after 5.2 seconds, the pause
  control preserves the same quote beyond the next interval, the control is 44px
  tall, and the 390×844 layout has no horizontal overflow.

## Art and chatter production readback — 2026-07-21

- Release source commit `81ba744e8d4915df2675d11a88d5638aeecaa9cb`
  reached Vercel production as deployment `dpl_Dyww1FKHkm7EV4gWGLXJ2JxBMumF`.
- `gojoetown.com` returned the cleaner hero, Camp/Kingdom/Space icons, four founder
  portraits, and rotating verified Joe chatter with its pause control.
- Canonical homepage, privacy page, CSS, JavaScript, Apple mark, all three era
  icons, and all four founder portraits matched the committed files byte-for-byte.
- Live HTTP/MIME checks returned 200 for the homepage, privacy page, CSS,
  JavaScript, SVG, every new WebP, `robots.txt`, and `sitemap.xml`. The homepage
  retained exactly one GA4 loader and config call; the privacy page retained none.
- Canonical response headers confirmed Vercel cache service and HSTS.

## Carousel and markup fix pass — 2026-07-25

Six defects found by reading `js/main.js` against the CSS and confirmed live at
1440×1000 and 390×844 on a local static server.

- **Ten-age rail arrows were inert on desktop.** `setupCarousels` gated
  `moveTo()` and the arrow-key handler on `window.innerWidth <= 780`, but
  `.ages-strip` scrolls horizontally at every width and `.ages-controls` is
  `display: flex` at every width. Measured before the fix: clicking Next at
  1280px left `scrollLeft` at 0 and the counter at `1 / 10`. The width guess is
  replaced by `scrollWidth - clientWidth > 4`, so a rail is a carousel exactly
  while it overflows.
- **Phantom Origins controls above 780px.** `.origins-controls` inherits
  `.ages-controls { display: flex }`, so desktop rendered "Swipe through the
  origins", a `1 / 5` counter, and two arrows over a static five-column grid.
  Controls now carry `hidden` when their rail does not overflow, with
  `.carousel-controls[hidden] { display: none }` added to outrank the
  `display: flex` rules.
- **Ten-age rail lost its keyboard tab stop.** `rail.tabIndex` was forced to
  `-1` above 780px on a rail that is scrollable there (WCAG 2.1.1). The tab
  stop, the arrow keys, and the carousel/slide ARIA now all follow real overflow,
  so static desktop grids are no longer announced as carousels.
- **`aria-current` was never true.** `item.toggleAttribute("aria-current", …)`
  writes `aria-current=""`, which ARIA maps to *false*, so no slide was ever
  marked current. Now set to `"true"` on the active slide and removed elsewhere.
- **Counter stalled and Next never disabled at the end of a wide rail.**
  Exposed by the first fix: at 1440px the last four age tiles share one final
  scroll offset, so at maximum scroll the rail read `7 / 10` with Next still
  enabled. Display and disabled state now pin to the ends by scroll position,
  while movement keeps using the raw geometric index so stepping back from the
  end lands on a reachable offset.
- **Invalid `<figcaption>` in a `<div>`.** The Ventures art block used a `div`
  where every other art block uses `figure`. Changed to `figure`; all 21
  figcaptions now sit in a `figure`.
- **Stale cache key on the privacy page.** `privacy.html` requested
  `style.css?v=20260721-release2` while the homepage requested `release3`, so it
  could serve outdated CSS. Both pages and `main.js` now use
  `?v=20260730-light1`.

Verification: the ten-age rail steps 1 → 10 and back with the counter,
`aria-current`, and both disabled states correct at each end; all four rails
behave correctly at 390×844; the origins rail runs `1 / 5` → `5 / 5` → `1 / 5`
on mobile; zero console messages; no horizontal page overflow; homepage, privacy
page, versioned CSS and JS, `robots.txt`, `sitemap.xml`, and `favicon.ico` all
return 200. Note that the automation browser used for this pass ignores
`behavior: "smooth"` entirely (confirmed at window level), so rail movement was
exercised with `behavior: "auto"`; the scroll targets landed on snap positions
to the pixel.

Not fixed, carried forward: `hero-kingdom-1920.webp` and `hero-kingdom-960.webp`
are unreferenced, and the hero `<picture>` has no `<source>`, so phones download
the full 1600×1297 crop. The orphans are a different aspect (16:10 vs the hero's
4:3.2) and the mobile `object-position` is tuned to the current art, so wiring
them in is an art decision rather than a bug fix. `icon.png` and `icon-512.png`
are also unreferenced (there is no web manifest).

## Current-build screenshot refresh — 2026-07-30

- Added a screenshot-only `--marketing-town` fixture in the game repository.
  It creates a spacious, age-filtered town with connected districts and a real
  Corn → Flour → Bread → Food stock chain. It cannot affect live play or saves.
- Replaced the hero, five-hour sequence, ten-age rail, three journey stages,
  logistics proof, technology choice, named-Joe roster, world map, and campaign
  achievement montage with current-build captures.
- Added six expandable product frames for town, petitions, ventures,
  exploration, diplomacy, and the Joe roster. Sample data is disclosed in the
  visible introduction; gameplay pixels were not generated or retouched.
- The lightbox uses a native dialog, contains focus, restores the launching
  card, closes with Escape, wraps with Left/Right or visible controls, and uses
  a horizontally pannable detail image on small screens.
- The achievement montage now contains all 21 exact game-rendered badge images
  in a 7×3 layout.
- Stable screenshot paths use the `20260730-shots2` query key, while the social
  card moved to `og-light-update-2026.png` to invalidate earlier unfurl caches.
- Release build, smoke test, the 15-test progression suite, source validation,
  JavaScript syntax, image decoding, keyboard behavior, and responsive browser
  checks are required before handoff.
