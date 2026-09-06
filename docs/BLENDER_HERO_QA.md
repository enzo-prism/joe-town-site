# Blender hero verification — September 5, 2026

## Analysis and direction

Started from current `origin/main` 2c9da45, not the older local checkout. Reviewed the live field-guide site, current design contract, real public gameplay images, and the game’s style bible/mill/throne art specifications. The new hero uses forest, wheat, sage, teal roads, a crown hall, mill, corn plot, and recognizable chickens. Original actual-game Day/Night and full-size zoom remain immediately below. Illustration is labeled honestly; product price/version/platform claims are unchanged.

## Art review and refinements

Created via official Blender Lab MCP: 547 objects with procedural geometry/materials, five animated chickens, a mill wheel and gentle camera arc. Independent visual review found no blockers after moving a foreground lantern clear of a chicken. Removed the studio background and composited the video onto the exact site forest color. One complete 192-frame cycle at 24 fps. Numerically checked frames 1 and 193: largest world-matrix difference 1.75e-7; frame 193 is excluded from the export.

Editable Blender source is in `art/joe-town-hero.blend`. Rebuild script and web encoder are alongside it, excluded from Vercel. No runtime 3D dependency or paid asset service.

## Local verification

- Static validator passed: 107 references, 31 IDs, image dimensions/alt text, CSS assets, one GA loader/config, tracking language, JavaScript syntax.
- Validator now checks the dynamically selected desktop/mobile video paths.
- Widths 320, 390, 430, 768 and 1440: no horizontal overflow; purchase action remains visible before the illustration on phones.
- Desktop video: H.264, 1440×1080, 24 fps, 192 frames, 8.000 seconds, 836,113 bytes, no audio, faststart.
- Mobile video: H.264, 768×576, 329 KB; selected independently at first playback.
- Browser decoded video and advanced playback, pause/resume worked; mobile menu paused/resumed it.
- Reduced-motion: poster only, paused, no video src/download at initial load.
- Save-data: verified browser flag true, video src null, paused.
- JavaScript disabled: poster loaded at natural width 1440; animation control hidden and no video src.
- Scrolling directly to a lower section leaves video unloaded; the hero loads/plays when visible.
- Actual Day/Night updates image and pressed state; screenshot dialog opens, zooms and closes; Space age tab selects its panel.
- Independent code review caught background playback during screenshot dialog; fixed with dialog-open state and immediate resync.

## Release

Push to main is authorized by the task. Git integration must deploy the exact pushed commit. Confirm READY, successful CI, canonical asset hashes and actual browser playback after release; record resulting evidence in the task output.
