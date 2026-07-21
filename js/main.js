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

      items.forEach(function (item, index) {
        item.setAttribute("role", "group");
        item.setAttribute("aria-roledescription", "slide");
        item.setAttribute("aria-label", (index + 1) + " of " + items.length);
      });

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

      function update() {
        var nextActive = closestIndex();
        active = nextActive;
        if (active !== announced) {
          status.textContent = (active + 1) + " / " + items.length;
          items.forEach(function (item, index) {
            item.toggleAttribute("aria-current", index === active);
          });
          announced = active;
        }
        previous.disabled = active === 0;
        next.disabled = active === items.length - 1;
        rail.tabIndex = window.innerWidth <= 780 ? 0 : -1;
        scheduled = false;
      }

      function requestUpdate() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(update);
      }

      function moveTo(index) {
        if (window.innerWidth > 780) return;
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
        if (window.innerWidth > 780) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveTo(closestIndex() + (event.key === "ArrowRight" ? 1 : -1));
      });
      window.addEventListener("resize", requestUpdate);
      update();
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

  setupViewportChrome();
  setupReveals();
  setupMenu();
  setupMobilePurchase();
  setupCarousels();
  setupMobileFaq();
})();
