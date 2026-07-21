# Living Diorama — Design QA

## Comparison target

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

## Findings

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

## Required fidelity surfaces

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

## Interaction and accessibility evidence

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

## Implementation checklist

- [x] Selected visual hierarchy implemented
- [x] All target image slots filled with authentic gameplay or labeled key art
- [x] Primary navigation, purchase links, mobile menu, and FAQ functional
- [ ] Post-release 320, 390, 430, and 768 browser recapture for the current mobile pass
- [ ] Post-release browser console recheck for the current mobile pass
- [x] Documentation updated

**Current result:** source QA passed; production release authorized; fresh visual
evidence remains an explicitly documented follow-up.

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
