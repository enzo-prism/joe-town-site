# Joe Town — Marketing Site Design Spec

Static site. No build step. `index.html` + `css/style.css` + `js/main.js` + `images/`.
Goal: convert Mac strategy/city-builder players into players. Charm + premium craft.

## Product facts (verified from source — do NOT invent beyond this)

- Game: **Joe Town** — premium macOS strategy game (AppKit + SpriteKit, native, universal Apple silicon + Intel, macOS 14+, 60 fps, min window 980×640).
- Tagline (official subtitle): "Build a chicken civilization."
- Fantasy: lead an underground chicken civilization ("the flock", citizens are "Joes") from a humble camp through **seven ages** to an ascendant kingdom.
- Seven ages in order: **Camp, Town, Citadel, Crown, Kingdom, Empire, Ascendant**.
- Price: **Free**. No ads, no in-app purchases, no tracking. Saves locally, plays fully offline.
- App Store link: `https://apps.apple.com/app/id6790244910` (App ID 6790244910, bundle com.designprism.joetown). Developer brand: **Design Prism** — support `https://www.design-prism.com/contact`, privacy `https://www.design-prism.com/privacy-policy`.
- Features: 20 buildings; roads/logistics with visible carts hauling real cargo (connected producers 100% output, Storehouse-served 125%, Workshop-boosted 150%); 12 permanent mutually-exclusive civilization technologies (2 per age, e.g. Harmonic Industry / Eternal Vigil, Royal Granaries / Standing Guard); units Militia → Archer → Shieldbearer → Ram → Captain; **named Captains** (Cluck Aurelius, Henrietta Boldwing, Roost Marshal Pip, Sir Peckard) that earn Renown and ranks; scouting + raid planning (4 rival terrains: Fungal Marsh, Basalt Ridge, Flooded Tunnels, Crystal Caverns; entry points Main Gate / Root Tunnels / Cliff Path; objectives Seize Supplies / Raid Relic Vault / Break Command Post; commitment Probe / Standard / All-In); rival factions: Ember Claw Brood, Mossfeather Commune, Ironbeak Dominion; counter-raids announced 3 turns ahead; 3 game modes (Cozy / Standard / Simulation); deterministic seeded worlds + replay; autosave + "While You Were Away" report (offline sim up to 24h, no streaks/guilt); menu-bar status item; VoiceOver + Reduce Motion support.
- Flavor quotes (verbatim from game chatter — use in "flock talks back" section):
  - "The worms seem unionized."
  - "Hoarding, but civic-minded."
  - "Trust issues, but structural."
  - "The town smells employable."
  - "Nap time has been cancelled."
  - "The timetable is aspirational."
  - "Do not peck the glowing wire."
  - "The coopconomy!"
  - "Our spreadsheet has feathers."
  - "Loot: ethically relocated."
  - "A tactical learning vacation."
  - "THE COOP!"
  - "We're fasting for the economy."
  - "Bawk first, plan later."
  - "Today: advanced counting to four."
  - "It hummed at Joebert."
- Founding lore line (verbatim): "The first crown is raised beneath the mountain." / "Six confused Joes gathered beneath the mountain."
- Positioning (verbatim from design docs): explicitly avoids energy, streak, login-reward, and FOMO systems; "The city is the hero"; "Defense is a puzzle"; "Raids are scouting problems".

## Art direction

The game is isometric pixel art in a dark cavern: deep navy-black, warm gold crowns/light, teal logistics lines and crystals, violet crystals, cream text, red mushroom-cap accents. The site must feel like descending into that cavern: **dark, gilded, alive** — premium editorial layout (think award-winning indie game sites), not a SaaS template.

### Palette (CSS custom properties)
- `--bg0: #060a14` deepest cavern (page base)
- `--bg1: #0c1220` section alt
- `--bg2: #131b2e` cards/panels
- `--line: rgba(242,182,79,0.14)` hairlines (gold at low alpha)
- `--gold: #f2b64f` primary accent (crowns, CTAs)
- `--gold-deep: #c98a2b`
- `--teal: #3fd8c2` secondary accent (logistics, links, crystals)
- `--cream: #f4ecdd` headings/text
- `--muted: #9aa4ba` body secondary
- `--red: #d96a4f` sparing accent (mushroom caps)
- `--violet: #8f7ee0` sparing accent (crystals)

### Typography (Google Fonts, preconnect, display=swap)
- Display: **Fraunces** (variable, opsz + SOFT/WONK if available, weights 400–700). Headlines, big italic accents. It has the regal-but-slightly-absurd character the game needs.
- Body/UI: **Inter** (400/500/600).
- HUD echoes / eyebrows / labels / stats: **JetBrains Mono** (400/600), uppercase, letter-spacing 0.14em.
- Pixel accent: **Press Start 2P** — ONLY for the nav wordmark "JOE TOWN", tiny section index chips ("01"), and marquee separators. Never for long text.

### Motifs & texture
- Cavern backdrop: layered radial gradients (deep navy vignette), very subtle noise/grain (SVG feTurbulence data-URI, opacity ~0.05), and a **drifting crystal particle field** (small diamond shapes in teal/violet, few, slow float, CSS or lightweight canvas, `prefers-reduced-motion` disables).
- Gold crown glyph (inline SVG, 3-point crown like the app icon) used as divider/section marks.
- Isometric diamond shapes as decorative geometry (rotated squares with gold hairline borders).
- Pixel-art details: tiny CSS box-shadow pixel chicken in footer/hero (crafted, crisp `image-rendering: pixelated` where raster is used); screenshots displayed in "Mac window" frames (traffic-light dots, gold hairline border, deep glow).
- Hairline gold borders (1px, low alpha), generous radii on cards (14–18px) BUT pixel-corners motif option: small corner notches. Keep it tasteful — premium first, pixel second.
- Screenshot treatment: `border-radius: 12px`, 1px gold hairline, `box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 120px rgba(242,182,79,.07)`. Never stretch; preserve aspect.

## Page structure & final copy

### 0. Nav (sticky, translucent blur, gold hairline bottom)
- Left: app icon (32px, rounded) + pixel-font wordmark "JOE TOWN".
- Links: Ages · Features · The Flock · Modes · FAQ.
- Right: gold pill button "Mac App Store" → App Store link.
- Mobile: hamburger → full overlay menu.

### 1. Hero
- Background: cavern gradient + crystal field + huge faint isometric diamond grid.
- Eyebrow (mono, gold): `A PREMIUM STRATEGY GAME FOR MAC`
- H1 (Fraunces, ~clamp(3rem, 7vw, 6.5rem)): "Build a **chicken** civilization." — "chicken" in gold italic.
- Sub (Inter, muted, max ~60ch): "Lead an underground flock from a humble camp to an ascendant kingdom. Lay every road, choose every technology, and raise the first crown beneath the mountain."
- CTAs: primary gold "Download on the Mac App Store" (with  Apple logo SVG); secondary ghost "Watch the town grow ↓" (scrolls to Ages).
- Micro-trust row (mono, tiny, muted): `FREE · NO ADS · NO IN-APP PURCHASES · NO TRACKING · PLAYS OFFLINE`
- Hero visual: `shot-kingdom.png` in Mac-window frame, slight 3D tilt (perspective, ~6deg, straightens subtly on scroll or hover), teal+gold ambient glow behind, a few floating pixel diamonds. Below/around: app icon + crown SVG accents.
- Optional flourish: small caption under frame (mono, muted): `KINGDOM AGE — TURN 55 — THE FLOCK ADOPTS ROYAL GRANARIES`.

### 2. Marquee divider
Infinite loop, mono uppercase, gold on dark, separated by crown/pixel glyphs:
`SEVEN AGES ✦ NAMED CAPTAINS ✦ DETERMINISTIC WORLDS ✦ 20 BUILDINGS ✦ 12 TECHNOLOGIES ✦ OFFLINE ✦ NO ADS ✦ CHICKENS`
(duplicate for seamless loop; slow; pause on hover; reduced-motion: static)

### 3. The Seven Ages — `id="ages"`
- Section header: index chip `01`, eyebrow `FROM CAMPFIRE TO CROWN`, H2 "Seven ages of civilization.", sub: "Every age redraws your capital — new materials, new wardrobe, new machines. Same chickens."
- Interactive age switcher: 7 tabs (Camp / Town / Citadel / Crown / Kingdom / Empire / Ascendant) as a horizontal stepped "timeline" with rising gold markers (like steps/crown points). Clicking swaps a large framed board-crop image (`age-N-*.png` cropped to the isometric board) with a short description + mono meta line. Keyboard accessible (arrow keys, roving tabindex). Default: Kingdom.
- Per-age copy (condensed from the game's style bible):
  1. **Camp** — "Rough roots, rope, and baskets. Plain plumage, big dreams." meta: `FARM · QUARRY · MILITIA`
  2. **Town** — "Timber frames and copper signs. Aprons, handcarts, and the first archers." meta: `ORE MINE · BARRACKS · WATCHTOWER`
  3. **Citadel** — "Cut stone and iron bands. Chainmail, forges, and battering rams." meta: `WORKSHOP · RAM · SMELTER`
  4. **Crown** — "Painted roofs, gold trim, royal banners. The first Captains take command." meta: `CAPTAIN · TRAIN STATION · POWER PLANT`
  5. **Kingdom** — "Brick arches and glass. Officer trim, formation drills, granaries fit for royalty." meta: `ROYAL GRANARIES · STANDING GUARD`
  6. **Empire** — "Steel, rivets, and clockwork. Goggles optional. Ambition mandatory." meta: `IMPERIAL FOUNDRIES · GRAND RAMPARTS`
  7. **Ascendant** — "Obsidian and radiant crystal. The flock, haloed in gold." meta: `HARMONIC INDUSTRY · ETERNAL VIGIL`

### 4. Features — `id="features"`
Header: chip `02`, eyebrow `ECONOMY IS STRATEGY`, H2 "A town that runs like clockwork.", sub: "Every military decision starts with a road, a cart, and a chicken with a job."
Six cards (3×2 grid, bg2, gold hairline, hover lift + glow; each: small inline SVG icon in gold, mono kicker, Fraunces h3, 2–3 line body):
1. kicker `LOGISTICS` — "Every road matters." — "Carts haul real cargo along roads you paint. Connected producers earn full output; storehouse routes and workshops push it to 150%."
2. kicker `TECHNOLOGY` — "Choose your civilization." — "Twelve permanent technologies, two per age, mutually exclusive. Granaries or garrisons — your flock, your doctrine."
3. kicker `TACTICS` — "Scout. Plan. Raid." — "Read rival terrain, pick the entry point, set your commitment. Probe, standard, or all-in — the relic vault won't raid itself."
4. kicker `DEFENSE` — "Walls are a puzzle." — "Counter-raids arrive announced, three turns out. Walls, watchtowers, and guarded roads decide what survives the night."
5. kicker `COMMAND` — "Captains with names." — "Cluck Aurelius. Henrietta Boldwing. Roost Marshal Pip. Sir Peckard. They earn Renown, rise through five ranks, and get exaggerated by historians."
6. kicker `PERSISTENCE` — "It lives while you're away." — "The simulation continues offline. Come back to a 'While You Were Away' report — stories first, no streaks, no guilt."

### 5. The Flock Talks Back — `id="flock"`
- Dark section alt bg. Header: chip `03`, eyebrow `AFFECTIONATE SARCASM`, H2 "The flock talks back.", sub: "Six confused Joes gathered beneath the mountain. They have notes."
- Masonry/scattered wall of speech bubbles (cream bubbles, rounded, little tails; a couple rotated ±2deg) using 8–10 of the verbatim quotes above. Attribute some with mono sign-offs like `— FARMER JOE`, `— QUALITY CONTROL`, `— THE GARRISON`. Add 1–2 pixel chicken decorations.
- This section sells charm — make it playful.

### 6. Modes + Promise — `id="modes"`
Two-column split:
- Left: chip `04`, H2 "Your pace, your pressure." Three mode rows (mono name + description):
  - **Cozy** — "No disasters, no rival pressure. Just you, the flock, and the feng shui of roads."
  - **Standard** — "The intended climb: raids, counter-raids, and events on a steady drumbeat."
  - **Simulation** — "Denser events and logistics for players who read supply lines for fun."
- Right: promise panel (gold-bordered card): H3 "Free. And free of nonsense." + checklist (teal check SVGs): `No ads` `No in-app purchases` `No tracking` `No energy meters or daily streaks` `Saves locally, plays offline` `Native macOS — Apple silicon & Intel`. Footnote (mono, tiny, muted): `MACOS 14+ · 60 FPS · MENUBAR APP · VOICEOVER & REDUCE MOTION SUPPORT`

### 7. FAQ — `id="faq"`
Accordion (details/summary, styled, accessible), 5 items:
- "How much does Joe Town cost?" → "It's free. No ads, no in-app purchases, no tracking — a premium game with premium manners."
- "Does it play offline?" → "Entirely. Your town saves locally and the simulation even advances while you're away, capped at 24 hours."
- "What Macs are supported?" → "macOS 14 or later, on Apple silicon and Intel. One universal download, 60 frames per second."
- "Is it controller-friendly?" → "Joe Town is built for mouse and keyboard — paint roads with the road tool, train squads with hotkeys, command from the town panel."
- "Do I have to raid?" → "No. The peaceful Charter path can carry your flock through the whole arc. Raiding is for chickens who want relics."

### 8. Final CTA + Footer
- Full-bleed cavern section: huge gold crown SVG glowing, H2 (Fraunces): "The first crown is raised beneath the mountain." sub: "All that's missing is a chicken to wear it." Big gold CTA "Download Joe Town — Free".
- Footer: pixel chicken (CSS box-shadow art) + "JOE TOWN" wordmark; columns: Game (Ages, Features, FAQ), Studio (Design Prism, Support, Privacy); legal line (mono, tiny): `© 2026 DESIGN PRISM · JOE TOWN IS A TRADEMARK OF DESIGN PRISM · MADE BENEATH THE MOUNTAIN`.

## Motion (all disabled under prefers-reduced-motion)
- Scroll reveals: IntersectionObserver, fade+translateY(16px), staggered 60ms in grids, once-only.
- Crystal field: ~14 diamonds, slow vertical drift + opacity pulse, parallax on scroll (transform translate3d only).
- Hero frame tilt straightens slightly as you scroll; subtle ambient glow pulse.
- Age switcher: crossfade + slight scale on image swap; gold marker slides along the timeline.
- Marquee: 40s linear loop.
- No heavy libraries. Vanilla JS, < 15KB. No jQuery, no framework.

## Technical requirements
- Semantic HTML5, landmarks, skip link, focus-visible gold outlines, alt text, aria for tabs/accordion, color contrast AA (muted text ≥ #9aa4ba on dark).
- Fully responsive: fluid clamp() type; breakpoints ~1120px and ~720px; hero stacks; ages timeline becomes horizontal scroll-snap on mobile; grids collapse to 1–2 cols. Test at 1440×900, 390×844.
- Performance: hero image < 400KB (serve resized ~1920w PNG→ or high-quality JPEG/WebP; pixel-art UI screenshots compress well as WebP q80). Preload hero image. `loading="lazy"` below the fold, width/height attrs to avoid CLS. Fonts: only needed weights.
- SEO/social: title "Joe Town — Build a Chicken Civilization", meta description from hero sub, canonical `https://www.design-prism.com/joetown/` (placeholder), OG/Twitter cards using `og.png` (1200×630, generated from kingdom screenshot + overlay), favicon from app icon (32/180/apple-touch), theme-color #060a14, JSON-LD `VideoGame` schema (name, operatingSystem macOS, applicationCategory GameApplication, genre Strategy/Simulation, offers price 0).
- Files: `index.html`, `css/style.css`, `js/main.js`, `images/*`, `favicon` assets, `README.md` (how to open/serve locally: `python3 -m http.server`).

## Addendum (v3, shipped — full copy rewrite)

All copy rewritten around the "Stone Age to the stars" arc. New/expanded sections (chips renumbered 01–11):
- Hero: "From the Stone Age to the stars." (official tagline "Build a chicken civilization" opens the sub).
- **02 Joes** (`#joes`) — "Every Joe is somebody." Mock inspector card (★ Yolko Ono), 24-name founder library, 8 traits with visible behaviors, 16 professions / 13 skills, memories + 200-entry chronicle, Command-click favorites. Trait chips row.
- **03 Progression** (`#progress`) — "Progress is a promise you keep." 7 charters, 6 era milestones, Ascendant Legacy (campaign completion), doctrine-pair note.
- **07 World** (`#world`, was `#rivals`) — expanded: factions + terrains + scouting + three verbatim discovery events (Ancient Cache, Strange Object "bad sky corn", Fire Discovery) + peaceful-path note.
- **08 Roadmap** (`#roadmap`) — "The road to the stars." 1.0 Ascendant (NOW badge) → 2.0 Modern & Information → 3.0 Space Age → 4.0 Interstellar Legacy. Explicitly labeled post-launch roadmap (not shipped content).
- Flock quotes refreshed with profession chatter (verbatim from the game). FAQ gained "Can I boss the Joes around?" and "Does the campaign have an ending?".
- Stats band now 6 numbers: 7 ages · 20 buildings · 16 professions · 12 doctrines · 3 rivals · 0 ads.
- Nav: Ages · Joes · World · Features · The Flock · FAQ.

Copy honesty rules (from deep code read): founder names are seeded (don't print a fixed cast); only Friend relationships ship; jobs are auto-staffed, not player-assigned; no world map/fog/diplomacy; Space/Interstellar eras are roadmap-only — always framed future-tense.

## Addendum (v2, shipped)

- New sections after Features: **Captains** (`#captains`, chip 03 — four named captains with rank pips + Renown note), **Coopconomy** (`#economy`, chip 04 — two supply-chain diagrams: Corn→Flour→Food, Iron+Coal→Ingots→Tools, with 100/125/150% output note), **Rivals** (`#rivals`, chip 05 — three faction cards with ATK/DEF bias bars + four terrain chips). Flock/Modes/FAQ renumbered to 06/07/08.
- **Stats band** before the final CTA: count-up numbers (7 ages · 20 buildings · 12 doctrines · 3 rivals · 0 ads), cubic-ease 900ms, disabled under reduced motion.
- Feature card 5 changed from Captains to Replayability ("Same seed, same town.") to avoid duplicating the new Captains section.
- Mobile (≤720px): sections tightened to 72px padding, chains stack vertically with rotated arrows, captain grid 2-up, faction cards full-width, stats grid 3+2, safe-area bottom padding on CTA/footer, gold tap-highlight.
- Nav (desktop + mobile overlay) gained a "Captains" link.

## Image derivations to produce (from images/raw, verify each visually after generating)
1. `hero-kingdom.webp` ~1920w from shot-kingdom.png (q~82) + a 960w variant for srcset.
2. `age-1..7.webp` — from age-N-*.png (2880×1800): crop to the isometric board region (roughly x 300–1900, y 140–1400 — VERIFY by viewing crops and adjusting so the board fills frame with a little cavern margin; consistent crop across all 7), resize ~1400w, WebP q82. Use `sips` (`-c`, `--cropOffset`) or Python PIL if available.
3. `shot-camp.webp` ~1600w from shot-camp.png (full window, for a secondary showcase if used).
4. `shot-choice.webp` from shot-ascendant-choice.png ~1120w (could back the Modes section).
5. `og.png` 1200×630: kingdom shot crop or board crop, darkened, with icon + "JOE TOWN — Build a chicken civilization" if tooling allows (HTML→screenshot is fine; otherwise a clean crop suffices).
6. `icon.png` 512w from icon-1024.png; favicon-32.png; apple-touch-icon 180w.
Keep `images/raw/` out of the deployed paths (reference only derived files).
