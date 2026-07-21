/* Joe Town — Living Diorama interactions */
(function () {
  "use strict";

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

      if (options.target) {
        var heading = options.target.querySelector("h1, h2, h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
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
    var finalCta = document.querySelector(".final-cta");
    if (!bar || !hero || !finalCta) return;

    var heroPassed = false;
    var finalVisible = false;

    function update() {
      var show = window.innerWidth <= 560 && heroPassed && !finalVisible && !document.body.classList.contains("menu-open");
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
      }, { threshold: 0.01 }).observe(finalCta);
    } else {
      window.addEventListener("scroll", function () {
        heroPassed = hero.getBoundingClientRect().bottom <= 0;
        finalVisible = finalCta.getBoundingClientRect().top < window.innerHeight;
        update();
      }, { passive: true });
    }

    window.addEventListener("resize", update);
    document.addEventListener("click", function (event) {
      if (event.target.closest(".menu-button")) window.setTimeout(update, 0);
    });
    update();
  }

  setupReveals();
  setupMenu();
  setupMobilePurchase();
})();
