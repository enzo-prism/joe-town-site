# Living Diorama — Design QA

## Comparison target

- Source visual truth: `/Users/enzo/.codex/generated_images/019f6d46-9c86-7522-b34a-4f68d3c27f03/exec-addf4155-cfda-4adc-87c1-7ac6e7053532.png`
- Desktop implementation tour: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-implementation-tour.png`
- Full-view comparison: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-full-comparison.png`
- Focused hero comparison: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-hero-comparison.png`
- Mobile implementation: `/Users/enzo/Documents/Codex/2026-07-16/let-s-update-and-improve-my/work/joe-town-site-qa/living-diorama-mobile-390-final.png`
- Viewports checked: 320×844, 390×844, 768×900, and 1440×1000
- State: default page, open mobile menu, open FAQ item, sticky purchase bar, and closing purchase section

The source is an 869×1810 concept board rather than a browser-viewport capture.
The full comparison places it beside a section-by-section desktop tour normalized
to the same height. The focused comparison normalizes both hero regions to 620px
high. Section screenshots overlap slightly by design so each chapter can be read
at full viewport scale.

## Findings

No actionable P0, P1, or P2 mismatch remains.

- [P3] Authentic gameplay captures retain small pieces of shipped HUD chrome in
  some journey and feature crops. This intentionally favors truthful game imagery
  over the concept board's cleaner illustrative composites.
- [P3] The desktop hero headline uses two lines at 1440px instead of the concept's
  three. This keeps the real gameplay town large and readable while preserving the
  selected editorial hierarchy; mobile returns to three lines.
- [P3] A real VoiceOver pass and live OS reduced-motion toggle remain useful final
  release checks. Semantic browser output and reduced-motion CSS were reviewed.

## Required fidelity surfaces

- **Fonts and typography:** Fraunces preserves the concept's high-contrast warm
  editorial display voice; mobile swaps interface copy to native system sans and
  monospace faces while desktop retains the established Inter/JetBrains pairing.
- **Spacing and layout rhythm:** the hero, three-age journey, balanced Joe split,
  four-card systems row, quiet FAQ, and emblem close reproduce the concept's visual
  sequence. Desktop content is constrained to 1280px. Mobile collapses cleanly.
- **Colors and visual tokens:** ink, bone, corn gold, and teal map directly to the
  concept. Gold is reserved for progression and purchase actions; teal remains an
  information accent. Contrast and focus rings are clear.
- **Image quality and asset fidelity:** the hero and all gameplay claims use
  authentic Joe Town captures. The missing Joe portrait was produced as dedicated
  key art, optimized to a 1120×1400 WebP, and visibly labeled. The Founding Tile
  remains the supplied SVG master. No placeholder or code-drawn artwork ships.
- **Copy and content:** approximately 350 visible words preserve the verified ten
  ages, named Joes, $9.99 one-time price, offline play, supported Macs, and premium
  purchase promises without roadmap or interstellar claims.
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
- Browser console errors and warnings checked: none.

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
- [ ] Fresh 320, 390, 430, and 768 browser recapture for the current mobile pass
- [ ] Browser console recheck for the current mobile pass
- [x] Documentation updated

current result: source QA passed; visual release gate pending

## Mobile UX polish pass — 2026-07-20

- Replaced seven tall mobile card stacks with two native swipe rails, reducing
  repetitive vertical travel while keeping every card in semantic DOM order.
- Added an immediate mobile town-status HUD, numbered cards, section progress,
  pressed states, a scroll-progress hairline, and an animated menu close state.
- Added notch-safe header/menu/bar spacing, 320px and short-height hero tuning,
  larger utility text, and 44px footer targets.
- Removed the hero reveal delay and two nonessential web-font families; below-fold
  WebP media remains lazy and asynchronously decoded.
- Source validation passed: balanced CSS, unique IDs, valid ARIA control targets,
  valid JavaScript, clean diffs, and HTTP 200/MIME checks for all touched assets.
- A fresh browser viewport recapture at 320, 390, 430, and 768 remains the release
  gate before this local pass is published.
