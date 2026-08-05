(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll progress ---------- */
  const progressEl = document.getElementById("scrollProgress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
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

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("mobileMenu");
  const pageMain = document.getElementById("main");
  const pageFooter = document.querySelector(".footer");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    pageMain.inert = open;
    if (pageFooter) pageFooter.inert = open;
    document.body.style.overflow = open ? "hidden" : "";
    updateBuybar();
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
  });
  /* the burger hides above 1040px; never leave the overlay stuck open there */
  window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => {
    if (e.matches && !menu.hidden) setMenu(false);
  });

  /* ---------- hour switcher ---------- */
  const hourData = {
    dawn: { clock: "05:40", caption: "Dawn · Cool light reaches the plateau." },
    morning: { clock: "09:00", caption: "Morning · Long light, first deliveries." },
    midday: { clock: "12:30", caption: "Midday · Full light across the board." },
    dusk: { clock: "18:20", caption: "Dusk · The windows start to warm." },
    night: { clock: "23:00", caption: "Night · Windows glow warm against the cool board." }
  };
  const hourFrames = document.querySelectorAll(".hour-frame");
  const hourTabs = Array.from(document.querySelectorAll(".hour-tab"));
  const hourClock = document.getElementById("hourClock");
  const hourCaption = document.getElementById("hourCaption");

  function setHour(hour) {
    hourFrames.forEach((f) => f.classList.toggle("is-active", f.dataset.hour === hour));
    hourTabs.forEach((t) => {
      const active = t.dataset.hour === hour;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    hourClock.textContent = hourData[hour].clock;
    hourCaption.textContent = hourData[hour].caption;
  }

  const hourControls = document.querySelector(".hour-controls");
  hourTabs.forEach((tab) => {
    tab.addEventListener("click", () => setHour(tab.dataset.hour));
  });
  hourControls.addEventListener("keydown", (e) => {
    const idx = hourTabs.findIndex((t) => t.classList.contains("is-active"));
    let next = null;
    if (e.key === "ArrowRight") next = (idx + 1) % hourTabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + hourTabs.length) % hourTabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = hourTabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      setHour(hourTabs[next].dataset.hour);
      hourTabs[next].focus();
    }
  });

  /* ---------- age rail ---------- */
  const rail = document.getElementById("ageRail");
  const prevBtn = document.getElementById("agePrev");
  const nextBtn = document.getElementById("ageNext");
  const counter = document.getElementById("ageCounter");
  const ageCards = rail.querySelectorAll(".age-card");

  function railStep() {
    return ageCards[0].getBoundingClientRect().width + 18;
  }
  function updateRail() {
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    /* the mandatory snap parks the rail one padding-left past 0, so treat
       anything within half a card of the start as the first position */
    const atStart = rail.scrollLeft <= railStep() / 2;
    const atEnd = rail.scrollLeft >= maxScroll - 4;
    const idx = atStart
      ? 0
      : atEnd
        ? ageCards.length - 1
        : Math.min(ageCards.length - 1, Math.round(rail.scrollLeft / railStep()));
    counter.textContent = `${idx + 1} / ${ageCards.length}`;
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
  }
  prevBtn.addEventListener("click", () => rail.scrollBy({ left: -railStep(), behavior: reducedMotion ? "auto" : "smooth" }));
  nextBtn.addEventListener("click", () => rail.scrollBy({ left: railStep(), behavior: reducedMotion ? "auto" : "smooth" }));
  rail.addEventListener("scroll", () => window.requestAnimationFrame(updateRail), { passive: true });
  window.addEventListener("resize", updateRail);
  updateRail();

  /* ---------- systems tabs ---------- */
  const sysTabs = Array.from(document.querySelectorAll(".sys-tab"));
  const sysPanels = document.querySelectorAll(".sys-panel");

  function setSys(key) {
    sysTabs.forEach((t) => {
      const active = t.dataset.sys === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    sysPanels.forEach((p) => {
      p.hidden = p.id !== "sysPanel" + key.charAt(0).toUpperCase() + key.slice(1);
    });
  }
  const sysTablist = document.querySelector(".sys-tablist");
  sysTabs.forEach((tab) => tab.addEventListener("click", () => setSys(tab.dataset.sys)));
  sysTablist.addEventListener("keydown", (e) => {
    const idx = sysTabs.findIndex((t) => t.classList.contains("is-active"));
    let next = null;
    if (e.key === "ArrowRight") next = (idx + 1) % sysTabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + sysTabs.length) % sysTabs.length;
    if (next !== null) {
      e.preventDefault();
      setSys(sysTabs[next].dataset.sys);
      sysTabs[next].focus();
    }
  });

  /* ---------- flock quote rotator ---------- */
  const quotes = [
    "Our spreadsheet has feathers.",
    "The worms seem unionized.",
    "Hoarding, but civic-minded.",
    "Trust issues, but structural.",
    "The town smells employable.",
    "Nap time has been cancelled.",
    "The timetable is aspirational.",
    "Do not peck the glowing wire.",
    "The coopconomy!",
    "Loot: ethically relocated.",
    "A tactical learning vacation.",
    "THE COOP!",
    "We're fasting for the economy.",
    "Bawk first, plan later.",
    "Today: advanced counting to four.",
    "It hummed at Joebert."
  ];
  const quoteEl = document.getElementById("flockQuote");
  const pauseBtn = document.getElementById("quotePause");
  let quoteIdx = 0;
  let quoteTimer = null;
  let quotePaused = false;
  let quoteVisible = true;

  function rotateQuote() {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    if (reducedMotion) return;
    quoteEl.style.opacity = "0";
    setTimeout(() => {
      quoteEl.textContent = `“${quotes[quoteIdx]}”`;
      quoteEl.style.opacity = "1";
    }, 260);
  }
  quoteEl.style.transition = "opacity 0.26s ease";

  function tickQuotes() {
    if (quoteTimer) clearInterval(quoteTimer);
    if (!quotePaused && quoteVisible && !reducedMotion) {
      quoteTimer = setInterval(rotateQuote, 4600);
    }
  }
  pauseBtn.addEventListener("click", () => {
    quotePaused = !quotePaused;
    pauseBtn.setAttribute("aria-pressed", String(quotePaused));
    pauseBtn.textContent = quotePaused ? "Resume Joe chatter" : "Pause Joe chatter";
    tickQuotes();
  });
  document.addEventListener("visibilitychange", () => {
    quoteVisible = !document.hidden;
    tickQuotes();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      quoteVisible = entries[0].isIntersecting && !document.hidden;
      tickQuotes();
    }).observe(quoteEl);
  }
  tickQuotes();

  /* ---------- lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCap");
  const lbClose = document.getElementById("lightboxClose");
  const lbPrev = document.getElementById("lightboxPrev");
  const lbNext = document.getElementById("lightboxNext");
  const lbItems = Array.from(document.querySelectorAll("[data-lightbox]")).map((fig) => {
    const img = fig.querySelector("img");
    const cap = fig.querySelector("figcaption");
    let capText = cap ? cap.textContent.trim() : "";
    if (cap) {
      const strong = cap.querySelector("strong");
      const span = cap.querySelector("span");
      if (strong && span) capText = `${strong.textContent} — ${span.textContent}`;
    }
    return { src: img.src, alt: img.alt, cap: capText };
  });
  let lbIndex = 0;
  let lastFocus = null;

  function showLb(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const item = lbItems[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCap.textContent = item.cap;
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
  /* fires for the button, backdrop click, and native Escape alike */
  lightbox.addEventListener("close", () => {
    if (lastFocus) {
      lastFocus.focus();
      lastFocus = null;
    }
  });

  document.querySelectorAll("[data-lightbox]").forEach((fig, i) => {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Open image full size");
    fig.addEventListener("click", () => openLb(i));
    fig.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb(i);
      }
    });
  });
  lbClose.addEventListener("click", closeLb);
  lbPrev.addEventListener("click", () => showLb(lbIndex - 1));
  lbNext.addEventListener("click", () => showLb(lbIndex + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); showLb(lbIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showLb(lbIndex + 1); }
  });

  /* ---------- foundry turntable ---------- */
  const fRail = document.getElementById("foundryRail");
  const fCards = Array.from(document.querySelectorAll("[data-foundry-card]"));
  const fDialog = document.getElementById("foundryDialog");

  if (fRail && fCards.length) {
    const fPrev = document.getElementById("foundryPrev");
    const fNext = document.getElementById("foundryNext");
    const fCounter = document.getElementById("foundryCounter");
    const fStep = () => {
      const card = fRail.querySelector(".foundry-card");
      return card ? card.getBoundingClientRect().width + 14 : 334;
    };
    const fUpdate = () => {
      const maxScroll = fRail.scrollWidth - fRail.clientWidth;
      const atEnd = fRail.scrollLeft >= maxScroll - 8;
      const index = atEnd
        ? fCards.length
        : Math.min(
            fCards.length,
            Math.round(fRail.scrollLeft / fStep()) + 1
          );
      fCounter.textContent = `${index} / ${fCards.length}`;
      fPrev.disabled = fRail.scrollLeft < 8;
      fNext.disabled = atEnd;
    };
    fPrev.addEventListener("click", () => fRail.scrollBy({ left: -fStep(), behavior: reducedMotion ? "auto" : "smooth" }));
    fNext.addEventListener("click", () => fRail.scrollBy({ left: fStep(), behavior: reducedMotion ? "auto" : "smooth" }));
    fRail.addEventListener("scroll", fUpdate, { passive: true });
    window.addEventListener("resize", fUpdate);
    fUpdate();
  }

  if (fCards.length && fDialog && typeof fDialog.showModal === "function") {
    const image = fDialog.querySelector("[data-foundry-dialog-image]");
    const title = fDialog.querySelector("[data-foundry-dialog-title]");
    const caption = fDialog.querySelector("[data-foundry-dialog-caption]");
    const status = fDialog.querySelector("[data-foundry-dialog-status]");
    const previous = fDialog.querySelector("[data-foundry-previous]");
    const next = fDialog.querySelector("[data-foundry-next]");
    const close = fDialog.querySelector("[data-foundry-close]");

    let active = 0;
    let activeTrigger = null;

    const preload = (index) => {
      const card = fCards[(index + fCards.length) % fCards.length];
      const src = card && card.getAttribute("data-foundry-src");
      if (!src) return;
      const pre = new Image();
      pre.decoding = "async";
      pre.src = src;
    };

    const render = (index) => {
      active = (index + fCards.length) % fCards.length;
      const card = fCards[active];
      image.setAttribute("src", card.getAttribute("data-foundry-src"));
      image.setAttribute("alt", card.getAttribute("data-foundry-alt") || "");
      title.textContent = card.getAttribute("data-foundry-title") || "";
      caption.textContent = card.getAttribute("data-foundry-caption") || "";
      status.textContent = `${active + 1} / ${fCards.length}`;
      preload(active + 1);
      preload(active - 1);
    };

    const dismiss = () => fDialog.close();

    fCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        activeTrigger = card;
        render(index);
        document.body.classList.add("foundry-dialog-open");
        fDialog.showModal();
        close.focus();
      });
    });

    previous.addEventListener("click", () => render(active - 1));
    next.addEventListener("click", () => render(active + 1));
    close.addEventListener("click", dismiss);
    fDialog.addEventListener("click", (e) => { if (e.target === fDialog) dismiss(); });
    fDialog.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      render(active + (e.key === "ArrowRight" ? 1 : -1));
    });
    fDialog.addEventListener("close", () => {
      document.body.classList.remove("foundry-dialog-open");
      if (activeTrigger && document.contains(activeTrigger)) activeTrigger.focus();
      activeTrigger = null;
    });
  }

  /* ---------- mobile buy bar ---------- */
  const buybar = document.getElementById("buybar");
  const heroActions = document.getElementById("heroActions");
  const finalCta = document.getElementById("buy");
  const mqMobile = window.matchMedia("(max-width: 780px)");
  let buybarOn = false;

  function updateBuybar() {
    const mobile = mqMobile.matches;
    const pastHero = heroActions.getBoundingClientRect().bottom < 0;
    const ctaVisible = finalCta.getBoundingClientRect().top < window.innerHeight * 0.8;
    const menuOpen = !menu.hidden;
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
})();
