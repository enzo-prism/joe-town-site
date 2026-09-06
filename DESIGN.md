# Joe Town field guide

## Intent

Show a small, believable civilization before asking someone to buy it. The previous site hid its strongest evidence under hero copy and repeated similar gallery layouts. The current page gives the game its own frame, explains one concrete production chain, and lets visitors explore ten ages.

## Visual system

Forest ink (#10271f family), warm parchment, wheat gold, and sage accents. Fraunces provides expressive serif headlines; Plus Jakarta Sans handles controls and body copy. Preserve the Founding Tile brand. Alternate quiet dark game frames with light editorial sections; keep screenshots at their original aspect ratio and offer full-resolution zoom.

## Narrative

1. Civilization with chickens: concise promise, visible price/compatibility, an original Blender miniature with a quiet loop; authentic day/night gameplay immediately follows.
2. Lay roads: real public interface and corn → flour → bread → food illustration using exact game pixels.
3. Ten ages: keyboard-operable tabs, real captures, short progression descriptions.
4. Named Joes and neighbors: varied split layouts explain individual and world decisions.
5. A clearly labeled 1.7 preview: inspection UI is not represented as the current App Store download.
6. Practical FAQ and a clear Mac purchase close.

## Interaction and accessibility

Native anchors work without JavaScript. All age panels remain visible without JavaScript; enhanced tabs use roving focus, arrows, Home/End. Native dialog provides modal screenshot viewing, Escape, zoom, scrolling, and focus restoration. Mobile navigation is an inline expanding disclosure, closes on Escape and desktop resize, and does not make the page inert. Continuous resource motion has a pause control and stops for reduced-motion preference. Entrance motion is short; nothing depends on scrolling animations to become readable.

## Evidence and honesty

Public captures: native source 7128ad06f139627de67c48db1251350b59f3f152 (1.6 build 29), deterministic marketing fixtures, 2880×1800, lossily encoded WebP with no visual retouching. Preview: dbc1eddb5a02e0ae7b0621e7743e0af25b2569e3 (1.7 build 32). Four SVG resource icons reproduce source sprite-grid pixels. The social card is an HTML/CSS editorial composition of public gameplay, not a game interface. Exact lineage is in `docs/REFRESH_ASSET_PROVENANCE.json`.

Public-source `BuildingType` has 24 cases; `CivilizationTechnology` has 18. Storefront price and requirements were checked September 4, 2026. Reverify before changing them. No external playtest is required: the owner tests releases.

Historical design material is archived in `docs/DESIGN_HISTORY_PRE_FIELDGUIDE.md`; it is not current product truth.

## Blender hero illustration

The editorial miniature uses the game’s chunky plateau, teal road links, crowned hall, working mill, terracotta roofs, corn plot, and cream chickens. It is clearly labeled as illustration, never gameplay. Keep the model uncropped and text/purchase actions outside the animation. Use a transparent poster and lightweight locally hosted video instead of a runtime 3D framework. Model, camera, and wheel return exactly to their initial transforms after eight seconds.
