# Joe Town — Marketing Site Design Spec

Static site. No build step. `index.html` + `css/style.css` + `js/main.js` + `images/`.
Goal: convert Mac strategy/city-builder players into players. Charm + premium craft.

> **Current direction:** **The Living Diorama** was selected on 2026-07-20 and
> is now the production-ready design. The page is a concise visual journey:
> gameplay-led hero → Camp/Kingdom/Space → one Joe story → four visual systems →
> Night Logistics interlude → Archivist FAQ → Starfarer purchase close. The other two directions remain archived in
> [`docs/VISUAL-FIRST-REDESIGN.md`](docs/VISUAL-FIRST-REDESIGN.md).

## Living Diorama implementation — current

- **Visual hierarchy:** the town is the hero; authentic gameplay captures carry
  all gameplay claims, while generated scenes are explicitly labeled editorial
  key art and never presented as gameplay.
- **Copy budget:** roughly 450 visible words (the 2026-07-21 humor pass traded a
  small budget increase for sourced game-voice jokes) with a single verified App
  Store destination. Known deviation: the purchase label has three variants
  (`Buy for $9.99` nav, `Buy on the Mac App Store · $9.99` hero/close, `Buy`
  mobile bar with a complete aria-label).
- **Journey:** Camp, Kingdom, and Space are semantic figures in a desktop grid and a
  touch/keyboard scroll-snap rail on mobile. Each stage has a square desktop crop
  and a 3:2 mobile crop, with all ten shipped ages named in a compact chronology.
- **Character:** one editorial Joe portrait, four compact source-backed founder
  profiles with distinct generated pixel-art chickens, and a short verified flock
  quote create attachment without a long
  roster section. John, Alex, Dawson, and Matt replace the earlier self-referential
  Enzo card; evolving work states are written as examples, not permanent jobs. The
  quote rotates through verified game chatter, includes a pause control, stops in a
  hidden tab or while offscreen, and remains static when reduced motion is requested.
- **Systems:** Roads, Technology, Named Joes, and World Map use truthful image-led
  cards with minimal action labels. The desktop grid is two columns so shipped UI
  remains legible instead of being forced into portrait crops.
- **Responsive:** desktop keeps the cinematic grid while mobile and tablet use
  edge-peeking swipe rails for ages and systems. Mobile includes focus-contained
  navigation, notch-safe chrome, short-screen hero tuning, and a purchase bar
  that appears when the hero action leaves view and hides at the closing CTA.
- **Motion:** the hero is immediate; below-fold reveal, menu, HUD, carousel, and
  FAQ motion all defer to reduced-motion preferences.
- **Assets:** `hero-kingdom-world.webp` is an authentic gameplay crop sized for
  the hero. Journey pairs use `journey-{camp,town,space}-{square,wide}.webp`, while
  generated decorative emblems use `era-icon-{camp,kingdom,space}.webp`.
  System truth comes from `system-{logistics,joes,world}.webp` plus the existing
  technology choice capture. Generated editorial art includes the Builder, Night
  Logistics, Archivist, and Starfarer scenes; every narrative scene is labeled.

## Copy voice — current (2026-07-21 humor pass)

All visible prose was rewritten in the game's own house voice: **deadpan
municipal absurdity, affectionate sarcasm, chicken physicality** (the game's
style-bible definition). Rules for future copy edits:

- **Every joke is sourced.** Quoted lines are verbatim from shipped game strings
  ("The worms seem unionized." — farm chatter; "Everything grew; nothing
  exploded. Probably." and "Productivity occurred without supervision." — away
  reports, `AwayReportOverlay.swift`; "Hoarding, but civic-minded." — chatter);
  paraphrased gags trace to real content (suggestion-box hole and "the rooster
  quit" — Camp/Orbital idle chatter; "banquet is snacks with witnesses" —
  Kingdom chatter; eggs "as residents, pending" — Kingdom census line; duck
  parliament and goose volume-diplomacy — The Puddle Parliament and The Honking
  Directorate in `WorldExploration.swift`). Do not invent game facts for a joke.
- **Gain-framing is law** (game style bible, test-enforced in-app): never use
  lost, lose, missed, expire, wasted, decay, wither, forfeit, penalty, hurry,
  don't-miss, running-out, overflow, spoil, or rot in visible copy.
- **Tracking language stays scoped:** "no gameplay tracking" or "the Mac game" —
  never an unqualified "no tracking" while the site loads GA.
- **Facts are fixed:** all claims must match "Product facts" below; humor rides
  on top of verified claims, never replaces them.

## Founding Tile visual system — current

The approved Founding Tile is the website's primary identity. This section supersedes older decorative guidance below where the two conflict.

- **Foundation:** ink `#080a0d`, coal `#101419`, raised panel `#161c23`, bone `#f5f1e8`, muted `#a7adb7`.
- **Accents:** corn gold is reserved for purchase actions, advancement, and selected states; teal marks logistics and interactive information.
- **Brand hierarchy:** Founding Tile first; game screenshots second; crowns, crystals, and pixel chickens stay inside the game-world story instead of acting as competing logos.
- **Typography:** Plus Jakarta Sans is the single site family. Display, body, labels, HUD text, navigation, and controls use its 400–800 weight range; scale, tracking, case, and color create hierarchy without mixing typefaces.
- **Surfaces:** flat fills, neutral bone hairlines, 8–12px radii, restrained shadows. Avoid glossy gold gradients, universal gold borders, and decorative hover lift on non-interactive cards.
- **Motion:** retain below-fold reveals, menu transitions, scroll progress, and restrained swipe-rail movement. Avoid ambient crystal drift, marquee movement, large hero tilts, and decorative floating geometry.
- **Page rhythm:** hero promise → three-age journey → one Joe story → four visual systems → Night Logistics key art → Archivist FAQ → Starfarer purchase close.
- **Responsive:** compact navigation begins at 1040px; age/system rails and the contextual purchase bar begin at 780px; controls remain keyboard accessible and safe-area aware.
- **Mobile conversion:** keep price and the primary action in the first phone viewport, reveal a safe-area purchase bar as soon as that action scrolls away, and hide it again at the final CTA or while navigation is open.
- **Mobile pacing:** ages and systems become labeled horizontal story rails with counters, arrow controls, keyboard navigation, snap stops, and a visible next-card peek. Joe context precedes the portrait and FAQ items behave as a compact accordion.

## Product facts (verified from source — do NOT invent beyond this)

> Canonical product snapshot — 2026-07-20. Older addenda below are retained as design history only; this section and the deployed copy take precedence.

- Game: **Joe Town** — premium macOS strategy game (AppKit + SpriteKit, native, universal Apple silicon + Intel, macOS 14+, 60 fps, min window 980×640).
- Tagline (official subtitle): "Build a chicken civilization."
- Fantasy: lead an underground chicken civilization ("the flock", citizens are "Joes") from a humble camp through **ten ages** to the Space Age.
- Ten ages in order: **Camp, Town, Citadel, Crown, Kingdom, Empire, Ascendant, Fusion, Orbital, Space**.
- Price: **$9.99 USD, one-time purchase**. The Mac game has no ads, no in-app purchases, and no gameplay tracking. Saves locally, plays fully offline.
- App Store link: `https://apps.apple.com/app/id6790244910` (App ID 6790244910, bundle com.designprism.joetown). Developer brand: **Design Prism** — support `https://www.design-prism.com/contact`, privacy `https://www.design-prism.com/privacy-policy`.
- Current source facts: 24 buildings; 18 technologies; ten ages; 13 animal civilizations; 12 named founders (John, Alex, Michael, Dawson, Max, Matt, McTavish, Enzo, Will, Brandon, Jack, and Oliver); five personalities; five skills; four career ranks; six earned traits; realm-local history and the Flock Chronicle. Roads, visible logistics, deterministic seeded worlds, autosave, offline progress summaries, VoiceOver, and Reduce Motion support are implemented. Difficulty modes, manually assigned jobs, a full world map, and interstellar play are not shipped features.
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
- Founding copy: "The first Joes gathered beneath the mountain."
- Positioning (verbatim from design docs): explicitly avoids energy, streak, login-reward, and FOMO systems; "The city is the hero"; "Defense is a puzzle"; "Raids are scouting problems".

## Website analytics and privacy — current

- The homepage loads Google Analytics 4 once with measurement ID
  `G-3XJQL5PVS1` to understand aggregate website visits.
- Analytics is a website behavior, not a game behavior. Product copy must say
  `No gameplay tracking` or explicitly name the Mac game; never use an unqualified
  site-wide `No tracking` promise while GA is present.
- `privacy.html` is the Joe Town-specific disclosure. It explains website
  analytics, links to Google and Apple privacy information, and intentionally does
  not load the GA tag itself.
- Production QA must confirm one `gtag.js` loader, one matching config call, a
  working Privacy link, and HTTP 200 for `/privacy.html`.

## Archived pre–Living Diorama art direction (superseded)

Reference only. The current Living Diorama and Founding Tile sections above win
whenever this archived direction conflicts with the shipped site.

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

### Typography (single modern system)
- Family: **Plus Jakarta Sans** everywhere, loaded with weights 400–800 and `font-display: swap`.
- Display: 700 weight, tight `-0.05em` tracking, compact line height, and normal-style gold emphasis.
- Body/UI: 400–700 weight with readable 1.58 leading.
- HUD echoes / eyebrows / labels / stats: 600–700 weight, uppercase where useful, and restrained 0.05–0.10em tracking.
- No secondary serif, monospace, pixel, or system-only family is part of the active website typography.

### Motifs & texture
- Cavern backdrop: layered radial gradients (deep navy vignette), very subtle noise/grain (SVG feTurbulence data-URI, opacity ~0.05), and a **drifting crystal particle field** (small diamond shapes in teal/violet, few, slow float, CSS or lightweight canvas, `prefers-reduced-motion` disables).
- Gold crown glyph (inline SVG) remains a progression motif, separate from the app identity.
- Brand mark: **The Founding Tile** — a friendly Joe carved from a black isometric town tile in bold negative space. Keep it monochrome, geometric, and legible at 16px; do not reintroduce crowns, scenery, or fine detail into the logo.
- Isometric diamond shapes as decorative geometry (rotated squares with gold hairline borders).
- Pixel-art details: tiny CSS box-shadow pixel chicken in footer/hero (crafted, crisp `image-rendering: pixelated` where raster is used); screenshots displayed in "Mac window" frames (traffic-light dots, gold hairline border, deep glow).
- Hairline gold borders (1px, low alpha), generous radii on cards (14–18px) BUT pixel-corners motif option: small corner notches. Keep it tasteful — premium first, pixel second.
- Screenshot treatment: `border-radius: 12px`, 1px gold hairline, `box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 120px rgba(242,182,79,.07)`. Never stretch; preserve aspect.

## Archived pre–Living Diorama page structure and copy

### 0. Nav (sticky, translucent blur, gold hairline bottom)
- Left: Founding Tile app icon (32px, rounded) + pixel-font wordmark "JOE TOWN".
- Links: Ages · Features · The Flock · Modes · FAQ.
- Right: gold pill button "Mac App Store" → App Store link.
- Mobile: hamburger → full overlay menu.

### 1. Hero
- Background: cavern gradient + crystal field + huge faint isometric diamond grid.
- Eyebrow (compact uppercase, gold): `A PREMIUM STRATEGY GAME FOR MAC`
- H1 (legacy display concept): "Build a **chicken** civilization." — "chicken" in gold.
- Sub (muted, max ~60ch): "Lead an underground flock from a humble camp to an ascendant kingdom. Lay every road, choose every technology, and raise the first crown beneath the mountain."
- CTAs: primary gold "Buy on the Mac App Store — $9.99" (with Apple logo SVG); secondary ghost "Watch the town grow ↓" (scrolls to Ages).
- Micro-trust row (compact, tiny, muted): `$9.99 ONCE · NO ADS · NO IN-APP PURCHASES · NO TRACKING · PLAYS OFFLINE`
- Hero visual: `shot-kingdom.png` in Mac-window frame, slight 3D tilt (perspective, ~6deg, straightens subtly on scroll or hover), teal+gold ambient glow behind, a few floating pixel diamonds. Below/around: app icon + crown SVG accents.
- Optional flourish: small caption under frame (compact, muted): `KINGDOM AGE — TURN 55 — THE FLOCK ADOPTS ROYAL GRANARIES`.

### 2. Marquee divider
Infinite loop, compact uppercase, gold on dark, separated by crown/pixel glyphs:
`TEN AGES ✦ NAMED JOES ✦ 13 CIVILIZATIONS ✦ 24 BUILDINGS ✦ 18 TECHNOLOGIES ✦ OFFLINE ✦ NO ADS ✦ CHICKENS`
(duplicate for seamless loop; slow; pause on hover; reduced-motion: static)

### 3. The Ten Ages — `id="ages"`
- Section header: index chip `01`, eyebrow `FROM CAMPFIRE TO STARS`, H2 "Ten ages of civilization.", sub: "Every age redraws your capital — new materials, new wardrobe, new machines. Same chickens."
- Interactive age switcher: 10 tabs (Camp / Town / Citadel / Crown / Kingdom / Empire / Ascendant / Fusion / Orbital / Space). Clicking swaps a large framed board image with a short description + compact meta line. Keyboard accessible (arrow keys, roving tabindex). Default: Kingdom.
- Per-age copy (condensed from the game's style bible):
  1. **Camp** — "Rough roots, rope, and baskets. Plain plumage, big dreams." meta: `FARM · QUARRY · MILITIA`
  2. **Town** — "Timber frames and copper signs. Aprons, handcarts, and the first archers." meta: `ORE MINE · BARRACKS · WATCHTOWER`
  3. **Citadel** — "Cut stone and iron bands. Chainmail, workshops, and hard-won civic confidence." meta: `WORKSHOP · RAM · CITADEL`
  4. **Crown** — "Painted roofs, gold trim, royal banners. The first Captains take command." meta: `CAPTAIN · TRAIN STATION · POWER PLANT`
  5. **Kingdom** — "Brick arches and glass. Officer trim, formation drills, granaries fit for royalty." meta: `ROYAL GRANARIES · STANDING GUARD`
  6. **Empire** — "Steel, rivets, and clockwork. Goggles optional. Ambition mandatory." meta: `IMPERIAL FOUNDRIES · GRAND RAMPARTS`
  7. **Ascendant** — "Obsidian and radiant crystal. The flock, haloed in gold." meta: `HARMONIC INDUSTRY · ETERNAL VIGIL`
  8. **Fusion** — "A radiant civilization learns to turn impossible heat into useful work." meta: `FUSION · ENERGY · AUTOMATION`
  9. **Orbital** — "The town looks upward and builds the infrastructure to reach orbit." meta: `ORBIT · LOGISTICS · LAUNCH`
  10. **Space** — "The original cavern remains home, even as Joe civilization reaches the stars." meta: `SPACE · LEGACY · THE FLOCK`

### 4. Features — `id="features"`
Header: chip `02`, eyebrow `ECONOMY IS STRATEGY`, H2 "A town that runs like clockwork.", sub: "Every military decision starts with a road, a cart, and a chicken with a job."
Six cards (3×2 grid, bg2, gold hairline, hover lift + glow; each: small inline SVG icon in gold, compact kicker, legacy display h3, 2–3 line body):
1. kicker `LOGISTICS` — "Every road matters." — "Carts haul real cargo along roads you paint. Connected producers earn full output; storehouse routes and workshops push it to 150%."
2. kicker `TECHNOLOGY` — "Choose your civilization." — "Eighteen technologies turn new ideas into visible changes across the town."
3. kicker `TACTICS` — "Scout. Plan. Raid." — "Read rival terrain, pick the entry point, set your commitment. Probe, standard, or all-in — the relic vault won't raid itself."
4. kicker `DEFENSE` — "Walls are a puzzle." — "Counter-raids arrive announced, three turns out. Walls, watchtowers, and guarded roads decide what survives the night."
5. kicker `COMMAND` — "Captains with names." — "Cluck Aurelius. Henrietta Boldwing. Roost Marshal Pip. Sir Peckard. They earn Renown, rise through five ranks, and get exaggerated by historians."
6. kicker `PERSISTENCE` — "It lives while you're away." — "The simulation continues offline. Come back to a 'While You Were Away' report — stories first, no streaks, no guilt."

### 5. The Flock Talks Back — `id="flock"`
- Dark section alt bg. Header: chip `03`, eyebrow `AFFECTIONATE SARCASM`, H2 "The flock talks back.", sub: "The first Joes gathered beneath the mountain. Generations later, they still have notes."
- Masonry/scattered wall of speech bubbles (cream bubbles, rounded, little tails; a couple rotated ±2deg) using 8–10 of the verbatim quotes above. Attribute some with compact sign-offs like `— FARMER JOE`, `— QUALITY CONTROL`, `— THE GARRISON`. Add 1–2 pixel chicken decorations.
- This section sells charm — make it playful.

### 6. Ways to Play + Promise — `id="modes"`
Two-column split:
- Left: chip `04`, H2 "Your town, at your depth." Three play-style rows: **Observe**, **Shape**, and **Optimize**. These describe how players can engage with the same simulation; they are not separate difficulty settings.
- Right: promise panel (gold-bordered card): H3 "One purchase. No nonsense." + checklist (teal check SVGs): `No ads` `No in-app purchases` `No tracking` `No energy meters or daily streaks` `Saves locally, plays offline` `Native macOS — Apple silicon & Intel`. Footnote (compact, tiny, muted): `MACOS 14+ · 60 FPS · MENUBAR APP · VOICEOVER & REDUCE MOTION SUPPORT`

### 7. FAQ — `id="faq"`
Accordion (details/summary, styled, accessible), 5 items:
- "How much does Joe Town cost?" → "Joe Town is $9.99 USD as a one-time purchase. No ads, no in-app purchases, no tracking — a premium game with premium manners."
- "Does it play offline?" → "Entirely. Your town saves locally and the simulation even advances while you're away, capped at 24 hours."
- "What Macs are supported?" → "macOS 14 or later, on Apple silicon and Intel. One universal download, 60 frames per second."
- "Is it controller-friendly?" → "Joe Town is built for mouse and keyboard — paint roads with the road tool, train squads with hotkeys, command from the town panel."
- "Do I have to raid?" → "No. The peaceful Charter path can carry your flock through the whole arc. Raiding is for chickens who want relics."

### 8. Final CTA + Footer
- Full-bleed cavern section: huge gold crown SVG glowing, H2 (legacy display): "The first crown is raised beneath the mountain." sub: "All that's missing is a chicken to wear it." Big gold CTA "Buy Joe Town — $9.99".
- Footer: pixel chicken (CSS box-shadow art) + "JOE TOWN" wordmark; columns: Game (Ages, Features, FAQ), Studio (Design Prism, Support, Privacy); compact legal line: `© 2026 DESIGN PRISM · JOE TOWN IS A TRADEMARK OF DESIGN PRISM · MADE BENEATH THE MOUNTAIN`.

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
- SEO/social: title "Joe Town — Chickens Build History", short product copy with restrained humor, canonical `https://gojoetown.com/`, OG/Twitter cards using `og.png` (1200×630, generated from kingdom screenshot + Founding Tile overlay), favicon from the Founding Tile SVG with ICO/PNG fallbacks (16/32/180), theme-color #05090d, JSON-LD `VideoGame` schema (name, operatingSystem macOS, applicationCategory GameApplication, genre Strategy/Simulation, offers price 9.99 USD).
- Files: `index.html`, `css/style.css`, `js/main.js`, `images/*`, `favicon` assets, `README.md` (how to open/serve locally: `python3 -m http.server`).

## Legacy snapshot (v3, superseded)

This snapshot records an earlier seven-age site iteration. It is retained for design history only and must not be used as current product truth. The current site preserves its strongest structure while using the verified ten-age facts above.

The earlier iteration added:
- Hero: "From the Stone Age to the stars." (official tagline "Build a chicken civilization" opens the sub).
- **02 Joes** (`#joes`) — "Every Joe is somebody." Inspector-style storytelling, named Joes, personality, skills, friendships, memories, and favorites.
- **03 Progression** (`#progress`) — "Progress is a promise you keep." Charters, age milestones, and permanent technology choices.
- **07 World** (`#world`, was `#rivals`) — expanded: factions + terrains + scouting + three verbatim discovery events (Ancient Cache, Strange Object "bad sky corn", Fire Discovery) + peaceful-path note.
- **08 Roadmap** (`#roadmap`) — an earlier future-facing arc that has now been replaced because Fusion, Orbital, and Space are shipped content.
- Flock quotes refreshed with profession chatter (verbatim from the game). FAQ gained "Can I boss the Joes around?" and "Does the campaign have an ending?".
- Stats band uses current source-backed counts: 10 ages · 24 buildings · 5 Joe skills · 18 technologies · 13 civilizations · 0 ads.
- Nav: Ages · Joes · World · Features · The Flock · FAQ.

Copy honesty rules: founder seating is seeded; friendships ship; work guidance and assignments are visible; never imply a separate difficulty setting; Space is current content; Interstellar remains future vision.

## Legacy snapshot (v2, superseded)

- New sections after Features: **Captains** (`#captains`, chip 03 — four named captains with rank pips + Renown note), **Coopconomy** (`#economy`, chip 04 — two supply-chain diagrams: Corn→Flour→Food, Iron+Coal→Ingots→Tools, with 100/125/150% output note), **Rivals** (`#rivals`, chip 05 — three faction cards with ATK/DEF bias bars + four terrain chips). Flock/Modes/FAQ renumbered to 06/07/08.
- **Stats band** before the final CTA: count-up numbers, cubic-ease 900ms, disabled under reduced motion. Current counts are defined above.
- Feature card 5 changed from Captains to Replayability ("Same seed, same town.") to avoid duplicating the new Captains section.
- Mobile (≤720px): sections tightened to 72px padding, chains stack vertically with rotated arrows, captain grid 2-up, faction cards full-width, stats grid 3+2, safe-area bottom padding on CTA/footer, gold tap-highlight.
- Nav (desktop + mobile overlay) gained a "Captains" link.

## Image derivations to produce (from images/raw, verify each visually after generating)
1. `hero-kingdom.webp` ~1920w from shot-kingdom.png (q~82) + a 960w variant for srcset.
2. `age-1..10.webp` — current isometric board captures for all ten ages, consistently framed and visually verified.
3. `shot-camp.webp` ~1600w from shot-camp.png (full window, for a secondary showcase if used).
4. `shot-choice.webp` from shot-ascendant-choice.png ~1120w (could back the Modes section).
5. `og.png` 1200×630: kingdom shot crop or board crop, darkened, with the Founding Tile + "JOE TOWN — Build a chicken civilization".
6. `logo-mark.svg` is the web master; derive `icon.png` / `icon-512.png`, favicon 16/32, and apple-touch 180 from it.
Keep `images/raw/` out of the deployed paths (reference only derived files).
