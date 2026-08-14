(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const progressEl = document.getElementById("scrollProgress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressEl) progressEl.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("mobileMenu");
  const pageMain = document.getElementById("main");
  const pageFooter = document.querySelector(".footer");
  const setMenu = (open) => {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    if (pageMain) pageMain.inert = open;
    if (pageFooter) pageFooter.inert = open;
    document.body.style.overflow = open ? "hidden" : "";
    updateBuybar();
  };
  if (burger && menu) {
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) setMenu(false);
    });
    window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => {
      if (e.matches && !menu.hidden) setMenu(false);
    });
  }

  function bindTablist(tablist, onSelect, keyAttr) {
    if (!tablist) return [];
    const tabs = Array.from(tablist.querySelectorAll("[role='tab']"));
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => onSelect(tab.dataset[keyAttr], { fromUser: true }));
    });
    tablist.addEventListener("keydown", (e) => {
      const idx = tabs.findIndex((t) => t.classList.contains("is-active"));
      let next = null;
      if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        onSelect(tabs[next].dataset[keyAttr], { fromUser: true });
        tabs[next].focus();
      }
    });
    return tabs;
  }

  const hourData = {
    dawn: { clock: "05:40", caption: "Dawn · Cool light reaches the plateau." },
    morning: { clock: "09:00", caption: "Morning · Long light, first deliveries." },
    midday: { clock: "12:30", caption: "Midday · Full light across the board." },
    dusk: { clock: "18:20", caption: "Dusk · The windows start to warm." },
    night: { clock: "23:00", caption: "Night · Windows glow warm against the cool board." }
  };
  const hourOrder = Object.keys(hourData);
  const hourFrames = document.querySelectorAll("#hourFrames .board-frame");
  const hourClock = document.getElementById("hourClock");
  const hourCaption = document.getElementById("hourCaption");
  let hourUserLocked = false;
  let hourTimer = null;
  let hourVisible = false;
  const hourTabs = bindTablist(document.getElementById("hourTabs"), setHourFromUser, "hour");

  function setHour(hour) {
    if (!hourData[hour]) return;
    hourFrames.forEach((f) => f.classList.toggle("is-active", f.dataset.hour === hour));
    hourTabs.forEach((t) => {
      const active = t.dataset.hour === hour;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    if (hourClock) hourClock.textContent = hourData[hour].clock;
    if (hourCaption) hourCaption.textContent = hourData[hour].caption;
  }

  function setHourFromUser(hour, opts) {
    if (opts && opts.fromUser) hourUserLocked = true;
    setHour(hour);
    tickHours();
  }

  function nextHour() {
    const current = Array.from(hourFrames).find((f) => f.classList.contains("is-active"));
    const idx = Math.max(0, hourOrder.indexOf(current ? current.dataset.hour : "dawn"));
    setHour(hourOrder[(idx + 1) % hourOrder.length]);
  }

  function tickHours() {
    if (hourTimer) clearInterval(hourTimer);
    hourTimer = null;
    if (!reducedMotion && hourVisible && !hourUserLocked && hourFrames.length) {
      hourTimer = setInterval(nextHour, 3200);
    }
  }

  const hourBlock = document.getElementById("hour");
  if (hourBlock && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      hourVisible = entries[0].isIntersecting && !document.hidden;
      tickHours();
    }, { threshold: 0.35 }).observe(hourBlock);
  }
  document.addEventListener("visibilitychange", () => {
    hourVisible = hourVisible && !document.hidden;
    tickHours();
  });

  const ageData = {
    camp: { meta: "Farm · Quarry · Militia", caption: "Rough roots, rope, and baskets. Twelve founders and a plan." },
    town: { meta: "Ore Mine · Barracks · Watchtower", caption: "Timber frames, copper signs, and the first real roads." },
    citadel: { meta: "Workshop · Ram · Citadel", caption: "Cut stone and iron bands. The town learns to hold a wall." },
    crown: { meta: "Captain · Train Station · Power Plant", caption: "Painted roofs, gold trim, and the first Captains." },
    kingdom: { meta: "Royal Granaries · Standing Guard", caption: "Brick arches and glass. A capital, still run by poultry." },
    empire: { meta: "Imperial Foundries · Grand Ramparts", caption: "Steel, rivets, and clockwork. Goggles optional." },
    ascendant: { meta: "Harmonic Industry · Eternal Vigil", caption: "Obsidian and radiant crystal. The flock, haloed in gold." },
    fusion: { meta: "Fusion · Energy · Automation", caption: "Impossible heat becomes useful work." },
    orbital: { meta: "Orbit · Logistics · Launch", caption: "The town builds the infrastructure to leave the cavern." },
    space: { meta: "Space · Legacy · The Flock", caption: "The original cavern stays home. The stars are the commute." }
  };
  const ageFrames = document.querySelectorAll("#ageFrames .board-frame");
  const ageMeta = document.getElementById("ageMeta");
  const ageCaption = document.getElementById("ageCaption");
  const ageTablist = document.getElementById("ageTabs");
  const ageTabs = bindTablist(ageTablist, setAge, "age");

  function setAge(age) {
    if (!ageData[age]) return;
    ageFrames.forEach((f) => f.classList.toggle("is-active", f.dataset.age === age));
    ageTabs.forEach((t) => {
      const active = t.dataset.age === age;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    if (ageMeta) ageMeta.textContent = ageData[age].meta;
    if (ageCaption) ageCaption.textContent = ageData[age].caption;
    const activeTab = ageTabs.find((t) => t.dataset.age === age);
    if (activeTab && ageTablist && ageTablist.classList.contains("pill-scroll")) {
      activeTab.scrollIntoView({ inline: "center", block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
    }
  }

  document.querySelectorAll("[data-jump-age]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setAge(btn.dataset.jumpAge);
      const stage = document.getElementById("ageFrames");
      if (stage) stage.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    });
  });

  function setupRail(rail) {
    const id = rail.id;
    const controls = document.querySelector(`[data-rail-controls="${id}"]`);
    if (!controls) return;
    const prevBtn = controls.querySelector("[data-rail-prev]");
    const nextBtn = controls.querySelector("[data-rail-next]");
    const counter = controls.querySelector("[data-rail-counter]");
    const cards = rail.children;

    function step() {
      const first = cards[0];
      if (!first) return 0;
      const style = getComputedStyle(rail);
      const gap = parseFloat(style.columnGap || style.gap || "16") || 16;
      return first.getBoundingClientRect().width + gap;
    }
    function overflowing() {
      return rail.scrollWidth - rail.clientWidth > 4;
    }
    function update() {
      const live = overflowing();
      controls.hidden = !live;
      if (live) {
        rail.tabIndex = 0;
      } else {
        rail.removeAttribute("tabindex");
      }
      if (!live || !cards.length) return;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const atStart = rail.scrollLeft <= step() / 2;
      const atEnd = rail.scrollLeft >= maxScroll - 4;
      const idx = atStart
        ? 0
        : atEnd
          ? cards.length - 1
          : Math.min(cards.length - 1, Math.round(rail.scrollLeft / step()));
      if (counter) counter.textContent = `${idx + 1} / ${cards.length}`;
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
    }
    const scrollOpts = { behavior: reducedMotion ? "auto" : "smooth" };
    if (prevBtn) prevBtn.addEventListener("click", () => rail.scrollBy({ left: -step(), ...scrollOpts }));
    if (nextBtn) nextBtn.addEventListener("click", () => rail.scrollBy({ left: step(), ...scrollOpts }));
    rail.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
    rail.addEventListener("keydown", (e) => {
      if (!overflowing()) return;
      if (e.key === "ArrowRight") { e.preventDefault(); rail.scrollBy({ left: step(), ...scrollOpts }); }
      if (e.key === "ArrowLeft") { e.preventDefault(); rail.scrollBy({ left: -step(), ...scrollOpts }); }
    });
    window.addEventListener("resize", update);
    update();
  }
  document.querySelectorAll("[data-rail]").forEach(setupRail);

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCap");
  const lbClose = document.getElementById("lightboxClose");
  const lbPrev = document.getElementById("lightboxPrev");
  const lbNext = document.getElementById("lightboxNext");

  function captionFrom(fig) {
    const cap = fig.querySelector("figcaption");
    if (!cap) return "";
    const strong = cap.querySelector("strong");
    const span = cap.querySelector("span");
    if (strong && span) return `${strong.textContent} — ${span.textContent}`;
    return cap.textContent.trim();
  }

  const lbItems = [];
  document.querySelectorAll("[data-lightbox]").forEach((fig) => {
    const img = fig.querySelector("img");
    if (!img) return;
    const index = lbItems.length;
    lbItems.push({ getSrc: () => img.currentSrc || img.src, alt: img.alt, cap: captionFrom(fig) });
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Open image full size");
    fig.addEventListener("click", () => openLb(index));
    fig.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb(index);
      }
    });
  });
  document.querySelectorAll("[data-lightbox-stage]").forEach((stage) => {
    const frames = document.getElementById(stage.getAttribute("data-lightbox-stage"));
    if (!frames) return;
    const index = lbItems.length;
    lbItems.push({
      getSrc: () => {
        const active = frames.querySelector(".is-active") || frames.querySelector("img");
        return active ? (active.currentSrc || active.src) : "";
      },
      getAlt: () => {
        const active = frames.querySelector(".is-active") || frames.querySelector("img");
        return active ? active.alt : "";
      },
      getCap: () => {
        if (stage.closest("#hour")) return hourCaption ? hourCaption.textContent : "";
        if (stage.closest("#ages")) return ageCaption ? ageCaption.textContent : "";
        return "";
      }
    });
    stage.setAttribute("tabindex", "0");
    stage.setAttribute("role", "button");
    stage.setAttribute("aria-label", "Open image full size");
    stage.addEventListener("click", () => openLb(index));
    stage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb(index);
      }
    });
  });

  let lbIndex = 0;
  let lastFocus = null;

  function showLb(i) {
    if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    const item = lbItems[lbIndex];
    lbImg.src = item.getSrc();
    lbImg.alt = item.getAlt ? item.getAlt() : item.alt || "";
    lbCap.textContent = item.getCap ? item.getCap() : item.cap || "";
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    showLb(i);
    lightbox.showModal();
    lbClose.focus();
  }
  function closeLb() {
    lightbox.close();
  }
  if (lightbox) {
    lightbox.addEventListener("close", () => {
      if (lastFocus) {
        lastFocus.focus();
        lastFocus = null;
      }
    });
    if (lbClose) lbClose.addEventListener("click", closeLb);
    if (lbPrev) lbPrev.addEventListener("click", () => showLb(lbIndex - 1));
    if (lbNext) lbNext.addEventListener("click", () => showLb(lbIndex + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); showLb(lbIndex - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); showLb(lbIndex + 1); }
    });
  }

  const buybar = document.getElementById("buybar");
  const heroActions = document.getElementById("heroActions");
  const finalCta = document.getElementById("buy");
  const mqMobile = window.matchMedia("(max-width: 780px)");
  let buybarOn = false;

  function updateBuybar() {
    if (!buybar || !heroActions || !finalCta) return;
    const mobile = mqMobile.matches;
    const pastHero = heroActions.getBoundingClientRect().bottom < 0;
    const ctaVisible = finalCta.getBoundingClientRect().top < window.innerHeight * 0.8;
    const menuOpen = menu ? !menu.hidden : false;
    const shouldShow = mobile && pastHero && !ctaVisible && !menuOpen;
    if (shouldShow !== buybarOn) {
      buybarOn = shouldShow;
      buybar.hidden = !shouldShow;
    }
  }
  window.addEventListener("scroll", updateBuybar, { passive: true });
  window.addEventListener("resize", updateBuybar);
  mqMobile.addEventListener("change", updateBuybar);
  updateBuybar();

  document.querySelectorAll('a[href^="https://apps.apple.com/app/id6790244910"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "app_store_click", {
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      }
    });
  });
})();
