/* Joe Town — Living Diorama interactions */
(function () {
  "use strict";

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setupViewportChrome() {
    var progress = document.querySelector(".scroll-progress span");
    var header = document.querySelector(".site-header");
    if (!progress && !header) return;

    var scheduled = false;

    function update() {
      var root = document.documentElement;
      var scrollable = Math.max(1, root.scrollHeight - root.clientHeight);
      var ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
      if (progress) progress.style.transform = "scaleX(" + ratio + ")";
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
      scheduled = false;
    }

    function requestUpdate() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  function setupReveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    document.documentElement.classList.add("reveal-ready");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });

    items.forEach(function (item) { observer.observe(item); });

    function revealEverything() {
      if (!motionQuery.matches) return;
      document.documentElement.classList.remove("reveal-ready");
      items.forEach(function (item) { item.classList.add("is-visible"); });
      observer.disconnect();
    }

    if (motionQuery.addEventListener) motionQuery.addEventListener("change", revealEverything);
  }

  function setupMenu() {
    var button = document.querySelector(".menu-button");
    var menu = document.getElementById("mobile-menu");
    var main = document.getElementById("main");
    var footer = document.querySelector(".footer");
    var headerBrand = document.querySelector(".site-header .brand");
    if (!button || !menu) return;

    function menuLinks() {
      return Array.prototype.slice.call(menu.querySelectorAll("a[href]"));
    }

    function closeMenu(options) {
      options = options || {};
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
      menu.hidden = true;
      document.body.classList.remove("menu-open");
      if (main) main.removeAttribute("inert");
      if (footer) footer.removeAttribute("inert");
      if (headerBrand) {
        headerBrand.removeAttribute("inert");
        headerBrand.removeAttribute("aria-hidden");
      }
      document.dispatchEvent(new CustomEvent("joe-town:menu-state", { detail: { open: false } }));

      if (options.target) {
        var heading = options.target.querySelector("h1, h2, h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.addEventListener("blur", function cleanHeadingFocus() {
            heading.removeAttribute("tabindex");
          }, { once: true });
          window.setTimeout(function () { heading.focus({ preventScroll: true }); }, 80);
        }
      } else if (options.restoreFocus) {
        button.focus();
      }
    }

    function openMenu() {
      var links = menuLinks();
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
      menu.hidden = false;
      document.body.classList.add("menu-open");
      if (main) main.setAttribute("inert", "");
      if (footer) footer.setAttribute("inert", "");
      if (headerBrand) {
        headerBrand.setAttribute("inert", "");
        headerBrand.setAttribute("aria-hidden", "true");
      }
      document.dispatchEvent(new CustomEvent("joe-town:menu-state", { detail: { open: true } }));
      if (links[0]) links[0].focus();
    }

    button.addEventListener("click", function () {
      if (button.getAttribute("aria-expanded") === "true") closeMenu({ restoreFocus: true });
      else openMenu();
    });

    menuLinks().forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href");
        var target = href && href.charAt(0) === "#" ? document.querySelector(href) : null;
        closeMenu({ target: target });
      });
    });

    document.addEventListener("keydown", function (event) {
      if (button.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab") return;

      var focusables = [button].concat(menuLinks());
      var current = focusables.indexOf(document.activeElement);
      if (event.shiftKey && current <= 0) {
        event.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (!event.shiftKey && current === focusables.length - 1) {
        event.preventDefault();
        focusables[0].focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1040 && button.getAttribute("aria-expanded") === "true") {
        closeMenu({ restoreFocus: false });
      }
    });
  }

  function setupMobilePurchase() {
    var bar = document.querySelector(".mobile-buy");
    var hero = document.querySelector(".hero");
    var heroPurchase = hero && hero.querySelector(".hero-actions .button");
    var finalCta = document.querySelector(".final-cta");
    if (!bar || !hero || !heroPurchase || !finalCta) return;

    var heroPurchaseVisible = true;
    var finalVisible = false;

    function update() {
      var show = window.innerWidth <= 780 && !heroPurchaseVisible && !finalVisible && !document.body.classList.contains("menu-open");
      bar.classList.toggle("is-visible", show);
      bar.toggleAttribute("inert", !show);
      bar.setAttribute("aria-hidden", String(!show));
      document.body.classList.toggle("mobile-buy-visible", show);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          heroPurchaseVisible = entry.isIntersecting;
          update();
        });
      }, { threshold: 0.01 }).observe(heroPurchase);

      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          finalVisible = entry.isIntersecting;
          update();
        });
      }, { threshold: 0.01 }).observe(finalCta);
    } else {
      window.addEventListener("scroll", function () {
        var purchaseRect = heroPurchase.getBoundingClientRect();
        heroPurchaseVisible = purchaseRect.bottom > 0 && purchaseRect.top < window.innerHeight;
        finalVisible = finalCta.getBoundingClientRect().top < window.innerHeight;
        update();
      }, { passive: true });
    }

    window.addEventListener("resize", update);
    document.addEventListener("joe-town:menu-state", update);
    update();
  }

  function setupCarousels() {
    var controls = Array.prototype.slice.call(document.querySelectorAll("[data-carousel-controls]"));

    controls.forEach(function (control) {
      var rail = document.getElementById(control.getAttribute("data-carousel-controls"));
      var previous = control.querySelector("[data-carousel-prev]");
      var next = control.querySelector("[data-carousel-next]");
      var status = control.querySelector(".carousel-status");
      if (!rail || !previous || !next || !status) return;

      var items = Array.prototype.slice.call(rail.children);
      var active = 0;
      var announced = -1;
      var scheduled = false;
      var isCarousel = null;

      /* A rail is a carousel only while it actually overflows. That depends on
         the breakpoint for the journey/systems/origins grids and is true at
         every width for the ten-age rail, so measure instead of guessing. */
      function scrollable() {
        return rail.scrollWidth - rail.clientWidth > 4;
      }

      function applySemantics(on) {
        if (isCarousel === on) return;
        isCarousel = on;
        if (on) rail.setAttribute("aria-roledescription", "carousel");
        else rail.removeAttribute("aria-roledescription");
        items.forEach(function (item, index) {
          if (on) {
            item.setAttribute("role", "group");
            item.setAttribute("aria-roledescription", "slide");
            item.setAttribute("aria-label", (index + 1) + " of " + items.length);
          } else {
            item.removeAttribute("role");
            item.removeAttribute("aria-roledescription");
            item.removeAttribute("aria-label");
            item.removeAttribute("aria-current");
          }
        });
        if (!on) announced = -1;
      }

      function maxScroll() {
        return rail.scrollWidth - rail.clientWidth;
      }

      /* Leftmost slide at the current offset. Drives movement, so it stays
         geometric: stepping back from the end must land on a reachable offset. */
      function closestIndex() {
        var start = items[0] ? items[0].offsetLeft : 0;
        var best = 0;
        var distance = Infinity;
        items.forEach(function (item, index) {
          var delta = Math.abs(item.offsetLeft - start - rail.scrollLeft);
          if (delta < distance) {
            distance = delta;
            best = index;
          }
        });
        return best;
      }

      /* Wide rails show several slides at once, so the trailing ones share one
         final offset. Pin the ends for display, or the counter stalls short of
         the total when the last slide is already fully on screen. */
      function activeIndex() {
        if (rail.scrollLeft >= maxScroll() - 2) return items.length - 1;
        if (rail.scrollLeft <= 2) return 0;
        return closestIndex();
      }

      function update() {
        var on = scrollable();
        applySemantics(on);
        control.hidden = !on;
        rail.tabIndex = on ? 0 : -1;
        scheduled = false;
        if (!on) return;

        active = activeIndex();
        if (active !== announced) {
          status.textContent = (active + 1) + " / " + items.length;
          items.forEach(function (item, index) {
            if (index === active) item.setAttribute("aria-current", "true");
            else item.removeAttribute("aria-current");
          });
          announced = active;
        }
        previous.disabled = rail.scrollLeft <= 2;
        next.disabled = rail.scrollLeft >= maxScroll() - 2;
      }

      function requestUpdate() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(update);
      }

      function moveTo(index) {
        if (!scrollable()) return;
        active = Math.max(0, Math.min(items.length - 1, index));
        var start = items[0] ? items[0].offsetLeft : 0;
        rail.scrollTo({
          left: items[active].offsetLeft - start,
          behavior: motionQuery.matches ? "auto" : "smooth"
        });
        update();
      }

      previous.addEventListener("click", function () { moveTo(closestIndex() - 1); });
      next.addEventListener("click", function () { moveTo(closestIndex() + 1); });
      rail.addEventListener("scroll", requestUpdate, { passive: true });
      rail.addEventListener("keydown", function (event) {
        if (!scrollable()) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveTo(closestIndex() + (event.key === "ArrowRight" ? 1 : -1));
      });
      window.addEventListener("resize", requestUpdate);
      /* Lazy-loaded rail images settle after first paint and change scrollWidth. */
      window.addEventListener("load", requestUpdate);
      update();
    });
  }

  function setupHourSelectors() {
    var sections = Array.prototype.slice.call(document.querySelectorAll(".hour-section"));

    sections.forEach(function (section, sectionIndex) {
      var tabs = Array.prototype.slice.call(section.querySelectorAll("[data-hour-tab]"));
      var image = section.querySelector("[data-hour-image]");
      var caption = section.querySelector("[data-hour-caption-output], .hour-caption");
      if (!tabs.length || !image) return;

      var tablist = tabs[0].parentElement;
      var active = tabs.findIndex(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      });
      if (active < 0) active = 0;

      if (tablist) {
        tablist.setAttribute("role", "tablist");
        if (!tablist.getAttribute("aria-label")) {
          tablist.setAttribute("aria-label", "Choose a town hour");
        }
      }

      var panel = image.closest(".hour-stage, .hour-visual, figure") || image.parentElement;
      var panelId = panel && panel.id ? panel.id : "hour-panel-" + (sectionIndex + 1);
      if (panel && !panel.id) panel.id = panelId;
      if (panel) panel.setAttribute("role", "tabpanel");
      if (caption) {
        caption.setAttribute("aria-live", "polite");
        caption.setAttribute("aria-atomic", "true");
      }

      function tabLabel(tab) {
        return tab.getAttribute("data-hour-label") ||
          tab.getAttribute("aria-label") ||
          tab.textContent.trim() ||
          tab.getAttribute("data-hour-key") ||
          "Selected hour";
      }

      function preload(index) {
        var candidate = tabs[(index + 1) % tabs.length];
        var src = candidate && candidate.getAttribute("data-hour-src");
        if (!src || src === image.getAttribute("src")) return;
        var nextImage = new Image();
        nextImage.decoding = "async";
        nextImage.src = src;
      }

      function select(index, options) {
        options = options || {};
        active = (index + tabs.length) % tabs.length;
        var tab = tabs[active];
        var src = tab.getAttribute("data-hour-src");
        var label = tabLabel(tab);
        var alt = tab.getAttribute("data-hour-alt") ||
          "The same Joe Town plateau at " + label.toLowerCase() + ", showing the changing town light";
        var copy = tab.getAttribute("data-hour-description") ||
          tab.getAttribute("data-hour-copy") ||
          tab.getAttribute("data-hour-caption-text") ||
          tab.getAttribute("data-hour-caption");
        var key = tab.getAttribute("data-hour-key") || String(active + 1);

        tabs.forEach(function (item, itemIndex) {
          var selected = itemIndex === active;
          item.setAttribute("role", "tab");
          item.setAttribute("aria-selected", String(selected));
          item.setAttribute("tabindex", selected ? "0" : "-1");
          item.setAttribute("aria-controls", panelId);
          item.classList.toggle("is-active", selected);
          if (!item.id) item.id = "hour-tab-" + (sectionIndex + 1) + "-" + (itemIndex + 1);
        });

        if (panel) panel.setAttribute("aria-labelledby", tab.id);
        if (src && image.getAttribute("src") !== src) image.setAttribute("src", src);
        image.setAttribute("alt", alt);
        if (caption && copy) caption.textContent = copy;
        section.setAttribute("data-active-hour", key);

        if (options.focus) tab.focus();
        preload(active);
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          select(index);
        });

        tab.addEventListener("keydown", function (event) {
          var target = null;
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = index - 1;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") target = index + 1;
          if (event.key === "Home") target = 0;
          if (event.key === "End") target = tabs.length - 1;
          if (target === null) return;
          event.preventDefault();
          select(target, { focus: true });
        });
      });

      select(active);
    });
  }

  function setupGameplayGallery() {
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-gameplay-card]"));
    var dialog = document.getElementById("gameplay-dialog");
    if (!cards.length || !dialog || typeof dialog.showModal !== "function") return;

    var image = dialog.querySelector("[data-gameplay-dialog-image]");
    var viewport = dialog.querySelector("[data-gameplay-dialog-viewport]");
    var title = dialog.querySelector("[data-gameplay-dialog-title]");
    var caption = dialog.querySelector("[data-gameplay-dialog-caption]");
    var status = dialog.querySelector("[data-gameplay-dialog-status]");
    var previous = dialog.querySelector("[data-gameplay-previous]");
    var next = dialog.querySelector("[data-gameplay-next]");
    var close = dialog.querySelector("[data-gameplay-close]");
    if (!image || !title || !caption || !status || !previous || !next || !close) return;

    var active = 0;
    var activeTrigger = null;

    function preload(index) {
      var card = cards[(index + cards.length) % cards.length];
      var src = card && card.getAttribute("data-gameplay-src");
      if (!src) return;
      var preloadImage = new Image();
      preloadImage.decoding = "async";
      preloadImage.src = src;
    }

    function render(index) {
      active = (index + cards.length) % cards.length;
      var card = cards[active];
      image.setAttribute("src", card.getAttribute("data-gameplay-src"));
      image.setAttribute("alt", card.getAttribute("data-gameplay-alt") || "");
      title.textContent = card.getAttribute("data-gameplay-title") || "";
      caption.textContent = card.getAttribute("data-gameplay-caption") || "";
      status.textContent = (active + 1) + " / " + cards.length;
      if (viewport) viewport.scrollLeft = 0;
      preload(active + 1);
      preload(active - 1);
    }

    function open(index, trigger) {
      activeTrigger = trigger;
      render(index);
      document.body.classList.add("gameplay-dialog-open");
      dialog.showModal();
      close.focus();
    }

    function move(amount) {
      render(active + amount);
    }

    function dismiss() {
      document.body.classList.remove("gameplay-dialog-open");
      dialog.close();
    }

    cards.forEach(function (card, index) {
      card.addEventListener("click", function () {
        open(index, card);
      });
    });

    previous.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    close.addEventListener("click", dismiss);

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dismiss();
    });

    dialog.addEventListener("cancel", function () {
      document.body.classList.remove("gameplay-dialog-open");
    });

    dialog.addEventListener("keydown", function (event) {
      if (event.key === "Tab") {
        var focusables = Array.prototype.slice.call(dialog.querySelectorAll(
          "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"
        ));
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("gameplay-dialog-open");
      if (activeTrigger && document.contains(activeTrigger)) activeTrigger.focus();
      activeTrigger = null;
    });
  }

  function setupMobileFaq() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".faq-list details"));
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open || window.innerWidth > 780) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function setupFlockChatter() {
    var chatter = document.querySelector("[data-flock-chatter]");
    if (!chatter) return;

    var quote = chatter.querySelector("[data-chatter-quote]");
    var toggle = chatter.querySelector("[data-chatter-toggle]");
    var toggleLabel = chatter.querySelector("[data-chatter-toggle-label]");
    var quotes = [
      "The worms seem unionized.",
      "Hoarding, but civic-minded.",
      "Trust issues, but structural.",
      "The town smells employable.",
      "Nap time has been cancelled.",
      "The timetable is aspirational.",
      "Do not peck the glowing wire.",
      "The coopconomy!",
      "Our spreadsheet has feathers.",
      "Loot: ethically relocated.",
      "A tactical learning vacation.",
      "THE COOP!",
      "We're fasting for the economy.",
      "Bawk first, plan later.",
      "Today: advanced counting to four.",
      "It hummed at Joebert."
    ];
    if (!quote || !toggle || !toggleLabel || quotes.length < 2) return;

    var index = Math.max(0, quotes.indexOf(quote.textContent.trim()));
    var userPaused = false;
    var sectionVisible = true;
    var rotationTimer = 0;
    var swapTimer = 0;

    function clearTimers() {
      window.clearTimeout(rotationTimer);
      window.clearTimeout(swapTimer);
      rotationTimer = 0;
      swapTimer = 0;
      chatter.classList.remove("is-changing");
    }

    function schedule() {
      window.clearTimeout(rotationTimer);
      if (userPaused || motionQuery.matches || document.hidden || !sectionVisible) return;
      rotationTimer = window.setTimeout(showNext, 5200);
    }

    function showNext() {
      if (userPaused || motionQuery.matches || document.hidden || !sectionVisible) return;
      chatter.classList.add("is-changing");
      swapTimer = window.setTimeout(function () {
        index = (index + 1) % quotes.length;
        quote.textContent = quotes[index];
        chatter.classList.remove("is-changing");
        schedule();
      }, 180);
    }

    function updateToggle() {
      toggle.setAttribute("aria-pressed", String(userPaused));
      toggleLabel.textContent = userPaused ? "Resume Joe chatter" : "Pause Joe chatter";
    }

    toggle.addEventListener("click", function () {
      userPaused = !userPaused;
      clearTimers();
      updateToggle();
      schedule();
    });

    document.addEventListener("visibilitychange", function () {
      clearTimers();
      schedule();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          sectionVisible = entry.isIntersecting;
          clearTimers();
          schedule();
        });
      }, { threshold: 0.05 }).observe(chatter);
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", function () {
        clearTimers();
        schedule();
      });
    }

    updateToggle();
    schedule();
  }

  setupViewportChrome();
  setupReveals();
  setupMenu();
  setupMobilePurchase();
  setupCarousels();
  setupHourSelectors();
  setupGameplayGallery();
  setupMobileFaq();
  setupFlockChatter();
})();
