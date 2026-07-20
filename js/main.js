/* Joe Town — vanilla JS: reveals, age switcher, subtle hero motion, mobile purchase UX */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveals (staggered 60ms in grids, once-only) ---------- */
  (function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    // Stagger siblings inside grids/walls
    document.querySelectorAll(".feature-grid, .quote-wall, .captain-grid, .faction-grid, .progress-grid, .discovery-grid").forEach(function (grid) {
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
    if (reduceMotion || window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    var frame = document.getElementById("hero-frame");
    if (!frame) return;
    var baseX = 1, baseY = -1.5;
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

  /* ---------- Ten Ages switcher ---------- */
  (function ageSwitcher() {
    var AGES = [
      { name: "Camp",      desc: "Rough roots, rope, and baskets. Twelve founders, one communal hall, big dreams.",                 meta: "CAMP CHARTER · FARM · QUARRY · MILITIA",    alt: "Joe Town capital in the Camp age — rough roots, rope and baskets on the isometric board" },
      { name: "Town",      desc: "Timber frames and copper signs. The first archers, the first doctrines, the first skyline.",      meta: "TOWN CHARTER · ORE MINE · BARRACKS",        alt: "Joe Town capital in the Town age — timber frames and copper signs on the isometric board" },
      { name: "Citadel",   desc: "Cut stone and iron bands. Forges light up; the rams roll out.",                                   meta: "CITADEL CHARTER · WORKSHOP · RAMS",         alt: "Joe Town capital in the Citadel age — cut stone and iron bands on the isometric board" },
      { name: "Crown",     desc: "Painted roofs and royal banners. A Captain takes command — and gets a name.",                     meta: "CROWN CHARTER · CAPTAINS · RAIL",           alt: "Joe Town capital in the Crown age — painted roofs and gold trim on the isometric board" },
      { name: "Kingdom",   desc: "Brick arches and glass. Officers drill, granaries rise, and the chronicle thickens.",             meta: "KINGDOM CHARTER · ROYAL GRANARIES",         alt: "Joe Town capital in the Kingdom age — brick arches and glass on the isometric board" },
      { name: "Empire",    desc: "Steel, rivets, clockwork. Goggles optional. Ambition mandatory.",                                 meta: "EMPIRE CHARTER · IMPERIAL FOUNDRIES",       alt: "Joe Town capital in the Empire age — steel, rivets and clockwork on the isometric board" },
      { name: "Ascendant", desc: "Obsidian and radiant crystal. The original seven-age climb becomes a foundation for what follows.", meta: "ASCENDANT LEGACY · THE HORIZON OPENS",       alt: "Joe Town capital in the Ascendant age — obsidian and radiant crystal on the isometric board" },
      { name: "Fusion",    desc: "Reactors and research labs turn deep-cavern ambition into a new source of light.",                 meta: "FUSION CHARTER · REACTORS · RESEARCH",      alt: "Joe Town capital in the Fusion age — luminous reactors and research buildings on the isometric board" },
      { name: "Orbital",   desc: "Habitat domes and launch complexes prepare the flock for its first permanent steps beyond home.", meta: "ORBITAL CHARTER · HABITATS · LAUNCH",       alt: "Joe Town capital in the Orbital age — habitat domes and a launch complex on the isometric board" },
      { name: "Space",     desc: "A Starport crowns ten ages of growth, while colonies and an enormous frontier remain alive below.", meta: "SPACE LEGACY · STARPORT · NEW WORLDS",       alt: "Joe Town capital in the Space age — a Starport and advanced structures on the isometric board" }
    ];

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".age-tab"));
    var panel = document.getElementById("age-panel");
    var img = document.getElementById("age-img");
    var frame = document.querySelector(".age-frame");
    var info = document.querySelector(".age-info");
    var nameEl = document.getElementById("age-name");
    var descEl = document.getElementById("age-desc");
    var metaEl = document.getElementById("age-meta");
    var progressEl = document.getElementById("age-progress");
    var slider = document.querySelector(".tab-slider");
    var tabsRail = document.querySelector(".age-tabs");
    if (!tabs.length || !img) return;

    var current = 5; // default: Kingdom

    // Warm the age gallery after the critical hero has settled.
    var warmAges = function () {
      AGES.forEach(function (_, i) {
        var pre = new Image();
        pre.src = "images/age-" + (i + 1) + ".webp";
      });
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(warmAges, { timeout: 1800 });
    else window.setTimeout(warmAges, 900);

    function moveSlider(tab) {
      if (!slider) return;
      slider.style.width = tab.offsetWidth + "px";
      slider.style.transform = "translateX(" + tab.offsetLeft + "px)";
    }

    function centerTab(tab, behavior) {
      if (!tabsRail || !window.matchMedia("(max-width: 720px)").matches) return;
      tabsRail.scrollTo({
        left: tab.offsetLeft - (tabsRail.clientWidth - tab.offsetWidth) / 2,
        behavior: behavior
      });
    }

    function select(age, focus) {
      if (age === current && !focus) { moveSlider(tabs[age - 1]); return; }
      current = age;
      var data = AGES[age - 1];
      if (progressEl) progressEl.textContent = "AGE " + age + " OF 10 · SWIPE THROUGH THE JOURNEY →";

      tabs.forEach(function (tab) {
        var selected = Number(tab.getAttribute("data-age")) === age;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected) {
          panel.setAttribute("aria-labelledby", tab.id);
          moveSlider(tab);
          if (focus) tab.focus();
          // keep the active tab visible in mobile scroll-snap rail
          centerTab(tab, reduceMotion ? "auto" : "smooth");
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
    window.addEventListener("load", function () {
      moveSlider(tabs[current - 1]);
      centerTab(tabs[current - 1], "auto");
    });
  })();

  /* ---------- Stats count-up ---------- */
  (function countUp() {
    var nums = document.querySelectorAll(".stat-num[data-count]");
    if (!nums.length) return;
    function setFinal(el) { el.textContent = el.getAttribute("data-count"); }
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(setFinal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = Number(el.getAttribute("data-count"));
        if (target === 0) { el.textContent = "0"; return; }
        var start = null;
        var dur = 900;
        function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Mobile flock chatter disclosure ---------- */
  (function flockDisclosure() {
    var wall = document.querySelector(".quote-wall");
    var toggle = document.querySelector(".flock-toggle");
    if (!wall || !toggle) return;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      wall.classList.toggle("show-all", !expanded);
      toggle.firstChild.nodeValue = expanded ? "More flock chatter " : "Less flock chatter ";
    });
  })();

  /* ---------- Mobile purchase bar ---------- */
  (function mobilePurchaseBar() {
    var bar = document.querySelector(".mobile-buy-bar");
    var hero = document.querySelector(".hero");
    var finalCta = document.querySelector(".final-cta");
    if (!bar || !hero || !finalCta) return;

    var heroPassed = false;
    var finalVisible = false;

    function update() {
      var show = window.innerWidth <= 720 && heroPassed && !finalVisible;
      bar.classList.toggle("is-visible", show);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          update();
        });
      }, { threshold: 0 }).observe(hero);

      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          finalVisible = entry.isIntersecting;
          update();
        });
      }, { threshold: 0.08 }).observe(finalCta);
    } else {
      window.addEventListener("scroll", function () {
        heroPassed = hero.getBoundingClientRect().bottom <= 0;
        finalVisible = finalCta.getBoundingClientRect().top < window.innerHeight;
        update();
      }, { passive: true });
    }

    window.addEventListener("resize", update);
    update();
  })();

  /* ---------- Mobile menu ---------- */
  (function mobileMenu() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.getElementById("mobile-menu");
    var main = document.getElementById("main");
    var footer = document.querySelector(".footer");
    if (!burger || !menu) return;

    var firstLink = menu.querySelector("a");
    var lastLink = menu.querySelector("a:last-child");

    function setOpen(open, restoreFocus) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      document.body.classList.toggle("menu-open", open);
      if (main) main.toggleAttribute("inert", open);
      if (footer) footer.toggleAttribute("inert", open);
      if (open && firstLink) firstLink.focus();
      else if (restoreFocus) burger.focus();
    }

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true", false);
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false, false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      } else if (e.key === "Tab" && burger.getAttribute("aria-expanded") === "true") {
        if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          burger.focus();
        } else if (!e.shiftKey && document.activeElement === lastLink) {
          e.preventDefault();
          burger.focus();
        } else if (document.activeElement === burger) {
          e.preventDefault();
          if (e.shiftKey) lastLink.focus();
          else firstLink.focus();
        }
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false, false);
      }
    });
  })();
})();
