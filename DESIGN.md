# Joe Town field guide

## Intent

Show a small, believable civilization, explain how it plays, and make the platform decision clear. The website introduces the forthcoming iPhone and iPad edition while giving visitors a direct route to the current Mac game. Real gameplay evidence stays distinct from illustration and future previews.

## Visual system

Forest ink (#10271f family), warm parchment, wheat gold, and sage accents. Fraunces provides expressive serif headlines; Plus Jakarta Sans handles controls and body copy. Preserve the Founding Tile brand and the original Blender town. Alternate dark game frames with light editorial sections. Keep screenshots at their original aspect ratios and offer full-resolution zoom. Device frames support the mobile story without covering game controls.

## Narrative

1. Civilization with chickens: concise promise, prominent “Coming to iPhone and iPad” status, and the current Mac purchase route beside the original illustrated town.
2. A town that fits your hands: genuine native phone and tablet previews explain the mobile edition, supported orientations, and touch interactions. The section explicitly states that preview UI is in development and newer than the submitted build.
3. Lay roads: real interface evidence and a corn → flour → bread → food illustration using exact game pixels.
4. Ten ages: keyboard-operable tabs, real captures, and short progression descriptions.
5. Named Joes and neighbors: varied split layouts explain individual and world decisions.
6. Practical platform, purchase, local-save, and privacy questions, followed by a clear Mac purchase close.

The obsolete “version 1.7 not yet released” story must not persist now that Mac 1.7.1 is public. Avoid suggesting that a Mac purchase today unlocks a currently downloadable mobile binary.

## Motion

Motion expresses the town's activity and introduces the phone and tablet chapter: short device entrances, illustrative gestures, road/delivery activity, and subtle ambient details. Use CSS and compact SVG rather than a runtime 3D framework. Animate transforms and opacity where possible; keep effects bounded and avoid animating page layout. Gesture graphics are decorative explanations, not promises that the website itself is playable.

Every continuous effect, including the existing Blender video, follows one page motion preference. Stop offscreen, when the document is hidden, while mobile navigation is expanded, or behind the screenshot dialog. Reduced-motion and data-saver preferences start static, and preference changes must take effect during the visit. Motion is progressive enhancement: no text, screenshot, action, or information depends on an animation completing. No-JavaScript content remains readable and still.

## Interaction and accessibility

Native anchors work without JavaScript. All age panels remain visible without JavaScript; enhanced tabs use roving focus, arrows, Home/End. Native dialog provides modal screenshot viewing, Escape, zoom, scrolling, and focus restoration. Mobile navigation is an inline expanding disclosure, closes on Escape and desktop resize, and does not make the page inert. Use visible focus states, comfortable touch targets, clear button names, and decorative SVGs excluded from the accessibility tree. Maintain contrast on image overlays. Keep one visible page-level motion control understandable on phone and desktop.

## Evidence and honesty

Original public captures: native source `7128ad06f139627de67c48db1251350b59f3f152` (1.6 build 29), deterministic marketing fixtures, 2880×1800, lossily encoded WebP with no visual retouching. The archived inspection preview came from `dbc1eddb5a02e0ae7b0621e7743e0af25b2569e3` (1.7 build 32). Four SVG resource icons reproduce source sprite-grid pixels. Original lineage remains in `docs/REFRESH_ASSET_PROVENANCE.json`.

New mobile previews come from native simulator rendering of synthetic town fixtures at source commit `241c27d0a26860e8e5f63fad00fc09ac113b5687`, captured September 30. They show upcoming UX work, not the submitted build 38 or a public mobile download. Preserve source aspect ratio and explicit preview identification in both the page and enlarged view. Mobile lineage is in `docs/MOBILE_ASSET_PROVENANCE.json`. Social imagery is an editorial composition, not a game interface.

Live release truth on September 30: Mac 1.7.1 (36), $9.99 US, macOS 14+, Apple silicon and Intel; iOS 1.8 (38) awaiting review with manual release. Mobile requirements: iOS/iPadOS 17+, A12+, landscape iPhone and both iPad orientations. Each device saves locally without automatic sync. No current Mac/mobile save-transfer promise. Offline gameplay and no gameplay tracking are separate from optional Apple services and website analytics.

Public Mac build-36 and current-source counts agree: 24 buildings, 18 civilization technology choices, and 15 guild choices. Count evidence is recorded in `docs/MOBILE_SOURCE_COUNTS.json`.

Recheck live status before changing availability language. Only advertise mobile availability after manual release and an independent public-listing/device-family readback. Source promotion is not an App Store binary update. Historical design material in `docs/DESIGN_HISTORY_PRE_FIELDGUIDE.md` is not current product truth.

## Blender hero illustration

The editorial miniature uses the game's chunky plateau, teal road links, crowned hall, working mill, terracotta roofs, corn plot, and cream chickens. It is clearly labeled as illustration, never gameplay. Keep the model uncropped and text/purchase actions outside the animation. Use a transparent poster and lightweight locally hosted video. Model, camera, and wheel return exactly to their initial transforms after eight seconds. Preserve original editable source and provenance in `art/` and `docs/BLENDER_HERO_PROVENANCE.json`.
