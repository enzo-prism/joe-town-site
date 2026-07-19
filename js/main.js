/* Joe Town — vanilla JS: crystal field, reveals, age switcher, hero tilt, mobile menu */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Crystal particle field ---------- */
  (function crystalField() {
    if (reduceMotion) return;
    var field = document.querySelector(".crystal-field");
    if (!field) return;
    var colors = ["#3fd8c2", "#8f7ee0", "#f2b64f"];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 14; i++) {
      var c = document.createElement("span");
      c.className = "crystal";
      var size = 5 + Math.random() * 8;
      c.style.setProperty("--s", size.toFixed(1) + "px");
      c.style.setProperty("--c", colors[i % colors.length]);
      c.style.setProperty("--dur", (16 + Math.random() * 18).toFixed(1) + "s");
      c.style.left = (Math.random() * 100).toFixed(2) + "%";
      c.style.top = (Math.random() * 100).toFixed(2) + "%";
      c.style.animationDelay = (-Math.random() * 20).toFixed(1) + "s";
      frag.appendChild(c);
    }
    field.appendChild(frag);

    /* gentle scroll parallax */
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        field.style.transform = "translate3d(0," + (window.scrollY * 0.06).toFixed(1) + "px,0)";
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ---------- Scroll reveals (staggered 60ms in grids, once-only) ---------- */
  (function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    // Stagger siblings inside grids/walls
    document.querySelectorAll(".feature-grid, .quote-wall").forEach(function (grid) {
      var i = 0;
      grid.querySelectorAll(".reveal").forEach(function (el) {
        el.style.setProperty("--reveal-delay", (i * 60) + "ms");
        i++;
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Hero frame tilt: straightens on scroll & hover ---------- */
  (function heroTilt() {
    if (reduceMotion) return;
    var frame = document.getElementById("hero-frame");
    if (!frame) return;
    var baseX = 4, baseY = -6;
    function apply(scrollFactor, hover) {
      var f = hover ? 0 : scrollFactor;
      frame.style.transform =
        "rotateX(" + (baseX * f).toFixed(2) + "deg) rotateY(" + (baseY * f).toFixed(2) + "deg)";
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        // 1 at top of page → 0 after ~70% of viewport scrolled
        var f = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.7));
        apply(f, false);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    frame.addEventListener("mouseenter", function () { apply(0, true); });
    frame.addEventListener("mouseleave", onScroll);
    onScroll();
  })();

  /* ---------- Seven Ages switcher ---------- */
  (function ageSwitcher() {
    var AGES = [
      { name: "Camp",      desc: "Rough roots, rope, and baskets. Plain plumage, big dreams.",                                  meta: "FARM · QUARRY · MILITIA",              alt: "Joe Town capital in the Camp age — rough roots, rope and baskets on the isometric board" },
      { name: "Town",      desc: "Timber frames and copper signs. Aprons, handcarts, and the first archers.",                   meta: "ORE MINE · BARRACKS · WATCHTOWER",     alt: "Joe Town capital in the Town age — timber frames and copper signs on the isometric board" },
      { name: "Citadel",   desc: "Cut stone and iron bands. Chainmail, forges, and battering rams.",                            meta: "WORKSHOP · RAM · SMELTER",             alt: "Joe Town capital in the Citadel age — cut stone and iron bands on the isometric board" },
      { name: "Crown",     desc: "Painted roofs, gold trim, royal banners. The first Captains take command.",                   meta: "CAPTAIN · TRAIN STATION · POWER PLANT", alt: "Joe Town capital in the Crown age — painted roofs and gold trim on the isometric board" },
      { name: "Kingdom",   desc: "Brick arches and glass. Officer trim, formation drills, granaries fit for royalty.",          meta: "ROYAL GRANARIES · STANDING GUARD",     alt: "Joe Town capital in the Kingdom age — brick arches and glass on the isometric board" },
      { name: "Empire",    desc: "Steel, rivets, and clockwork. Goggles optional. Ambition mandatory.",                         meta: "IMPERIAL FOUNDRIES · GRAND RAMPARTS",  alt: "Joe Town capital in the Empire age — steel, rivets and clockwork on the isometric board" },
      { name: "Ascendant", desc: "Obsidian and radiant crystal. The flock, haloed in gold.",                                    meta: "HARMONIC INDUSTRY · ETERNAL VIGIL",    alt: "Joe Town capital in the Ascendant age — obsidian and radiant crystal on the isometric board" }
    ];

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".age-tab"));
    var panel = document.getElementById("age-panel");
    var img = document.getElementById("age-img");
    var frame = document.querySelector(".age-frame");
    var info = document.querySelector(".age-info");
    var nameEl = document.getElementById("age-name");
    var descEl = document.getElementById("age-desc");
    var metaEl = document.getElementById("age-meta");
    var slider = document.querySelector(".tab-slider");
    if (!tabs.length || !img) return;

    var current = 5; // default: Kingdom

    // Preload all age images for instant swaps
    AGES.forEach(function (_, i) {
      var pre = new Image();
      pre.src = "images/age-" + (i + 1) + ".webp";
    });

    function moveSlider(tab) {
      if (!slider) return;
      slider.style.width = tab.offsetWidth + "px";
      slider.style.transform = "translateX(" + tab.offsetLeft + "px)";
    }

    function select(age, focus) {
      if (age === current && !focus) { moveSlider(tabs[age - 1]); return; }
      current = age;
      var data = AGES[age - 1];

      tabs.forEach(function (tab) {
        var selected = Number(tab.getAttribute("data-age")) === age;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected) {
          panel.setAttribute("aria-labelledby", tab.id);
          moveSlider(tab);
          if (focus) tab.focus();
          // keep the active tab visible in mobile scroll-snap rail
          tab.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
        }
      });

      var swap = function () {
        img.src = "images/age-" + age + ".webp";
        img.alt = data.alt;
        nameEl.textContent = data.name;
        descEl.textContent = data.desc;
        metaEl.textContent = data.meta;
        frame.classList.remove("is-swapping");
        info.classList.remove("is-swapping");
      };

      if (reduceMotion) { swap(); return; }
      frame.classList.add("is-swapping");
      info.classList.add("is-swapping");
      window.setTimeout(swap, 220);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // focus: true so a click followed by arrow keys behaves per WAI-ARIA tabs
        select(Number(tab.getAttribute("data-age")), true);
      });
    });

    // Roving tabindex + arrow-key navigation per WAI-ARIA tabs pattern
    document.querySelector(".age-tabs").addEventListener("keydown", function (e) {
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        select(next + 1, true);
      }
    });

    window.addEventListener("resize", function () { moveSlider(tabs[current - 1]); });
    // Initial slider position (after layout/fonts settle)
    requestAnimationFrame(function () { moveSlider(tabs[current - 1]); });
    window.addEventListener("load", function () { moveSlider(tabs[current - 1]); });
  })();

  /* ---------- Mobile menu ---------- */
  (function mobileMenu() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.getElementById("mobile-menu");
    if (!burger || !menu) return;

    function setOpen(open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        burger.focus();
      }
    });
  })();
})();
