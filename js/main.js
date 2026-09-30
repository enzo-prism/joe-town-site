(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const lightbox = document.getElementById('lightbox');
  const siteMotionButton = document.getElementById('site-motion-toggle');
  const delivery = document.querySelector('.delivery');
  const deliveryButton = document.getElementById('motion-toggle');
  const dioramaVideo = document.getElementById('diorama-video');
  const dioramaButton = document.getElementById('diorama-toggle');
  const dioramaStage = document.querySelector('.diorama-stage');
  const scenes = [...new Set([...document.querySelectorAll('[data-motion-scene]'), delivery].filter(Boolean))];
  const sceneVisibility = new Map(scenes.map(scene => [scene, false]));
  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  const revealVisibility = new Map(revealTargets.map(target => [target, false]));
  let globalPaused = !!connection?.saveData;
  let explicitGlobalMotion = false;
  let deliveryPaused = false;
  let animationWanted = !reducedMotion.matches && !connection?.saveData;
  let explicitPlayback = false;
  let userPaused = false;
  let dioramaVisible = false;
  let playPending = false;
  let playRequest = 0;

  const foregroundAvailable = () => !document.hidden && (!menu || menu.hidden) && !lightbox?.open;
  const motionAllowed = () => !globalPaused && !reducedMotion.matches && (!connection?.saveData || explicitGlobalMotion);
  const dioramaCanPlay = () => animationWanted && !globalPaused && dioramaVisible && foregroundAvailable();
  const updateDioramaButton = () => {
    if (!dioramaButton || !dioramaVideo) return;
    const active = dioramaCanPlay() && (!dioramaVideo.paused || playPending);
    const label = globalPaused ? 'Visual effects paused' : (active ? 'Pause town animation' : 'Play town animation');
    dioramaButton.setAttribute('aria-label', label);
    dioramaButton.setAttribute('aria-pressed', String(!active));
    dioramaButton.disabled = globalPaused;
    const icon = dioramaButton.querySelector('.diorama-toggle-icon');
    const text = dioramaButton.querySelector('.diorama-toggle-text');
    if (icon) icon.textContent = active ? 'Ⅱ' : '▶';
    if (text) text.textContent = globalPaused ? 'Effects paused' : (active ? 'Pause animation' : 'Play animation');
  };
  const syncDiorama = () => {
    if (!dioramaVideo) return;
    if (!dioramaCanPlay()) {
      playRequest += 1;
      playPending = false;
      dioramaVideo.pause();
      updateDioramaButton();
      return;
    }
    if (playPending || !dioramaVideo.paused) return;
    // Select one export only when playback is requested; keep the static poster
    // until a decoded video frame is playing. Resize never downloads both files.
    if (!dioramaVideo.getAttribute('src')) {
      dioramaVideo.src = window.matchMedia('(max-width: 780px)').matches
        ? dioramaVideo.dataset.mobileSrc : dioramaVideo.dataset.desktopSrc;
    }
    dioramaVideo.muted = true;
    playPending = true;
    const request = ++playRequest;
    updateDioramaButton();
    const playback = dioramaVideo.play();
    if (playback) playback.then(() => {
      if (request !== playRequest) return;
      playPending = false;
      if (!dioramaCanPlay()) dioramaVideo.pause();
      updateDioramaButton();
    }).catch(() => {
      if (request !== playRequest) return;
      playPending = false;
      animationWanted = false;
      dioramaVideo.classList.remove('is-ready');
      updateDioramaButton();
    });
  };
  const syncMotion = () => {
    const allowed = motionAllowed();
    const foreground = foregroundAvailable();
    scenes.forEach(scene => {
      const localPaused = scene === delivery && deliveryPaused;
      scene.classList.toggle('motion-paused', !allowed || !foreground || !sceneVisibility.get(scene) || localPaused);
    });
    revealTargets.forEach(target => {
      // Content starts visible. Enhancement begins only after intersection;
      // preferences and suspended contexts never gate readable content.
      if (allowed && foreground && revealVisibility.get(target)) target.classList.add('is-revealed');
    });
    if (siteMotionButton) {
      siteMotionButton.textContent = reducedMotion.matches ? 'Reduced motion on' : (globalPaused ? 'Resume visual effects' : 'Pause visual effects');
      siteMotionButton.setAttribute('aria-pressed', String(globalPaused || reducedMotion.matches));
      siteMotionButton.disabled = reducedMotion.matches;
    }
    if (deliveryButton) {
      deliveryButton.textContent = reducedMotion.matches ? 'Reduced motion on' : (globalPaused ? 'Visual effects paused' : (deliveryPaused ? 'Resume deliveries' : 'Pause deliveries'));
      deliveryButton.setAttribute('aria-pressed', String(globalPaused || reducedMotion.matches || deliveryPaused));
      deliveryButton.disabled = globalPaused || reducedMotion.matches;
    }
    syncDiorama();
  };

  const closeMenu = (restoreFocus = false) => {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) menuButton.focus();
    syncMotion();
  };
  if (menuButton && menu) {
    menuButton.hidden = false;
    menuButton.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      syncMotion();
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
    });
    window.matchMedia('(min-width: 781px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
    new MutationObserver(syncMotion).observe(menu, { attributes: true, attributeFilter: ['hidden'] });
  }
  if (siteMotionButton) {
    siteMotionButton.hidden = false;
    siteMotionButton.addEventListener('click', () => {
      globalPaused = !globalPaused;
      explicitGlobalMotion = !globalPaused;
      if (!globalPaused && !userPaused && !explicitPlayback) animationWanted = !reducedMotion.matches;
      syncMotion();
    });
  }
  if (deliveryButton) {
    deliveryButton.hidden = false;
    deliveryButton.addEventListener('click', () => { deliveryPaused = !deliveryPaused; syncMotion(); });
  }
  if (dioramaButton && dioramaVideo) {
    dioramaButton.hidden = false;
    dioramaButton.addEventListener('click', () => {
      animationWanted = !(dioramaCanPlay() && (!dioramaVideo.paused || playPending));
      explicitPlayback = animationWanted;
      userPaused = !animationWanted;
      if (animationWanted && dioramaVideo.error) dioramaVideo.load();
      syncDiorama();
    });
    dioramaVideo.addEventListener('playing', () => {
      if (dioramaCanPlay()) dioramaVideo.classList.add('is-ready');
      else dioramaVideo.pause();
      updateDioramaButton();
    });
    dioramaVideo.addEventListener('pause', updateDioramaButton);
    dioramaVideo.addEventListener('error', () => {
      playRequest += 1;
      playPending = false;
      animationWanted = false;
      dioramaVideo.classList.remove('is-ready');
      updateDioramaButton();
    });
  }
  document.addEventListener('visibilitychange', syncMotion);
  if (typeof window.IntersectionObserver === 'function') {
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => sceneVisibility.set(entry.target, entry.isIntersecting));
      syncMotion();
    }, { threshold: 0 });
    scenes.forEach(scene => sceneObserver.observe(scene));
    if (dioramaStage) new IntersectionObserver(entries => {
      dioramaVisible = entries[0].isIntersecting;
      syncDiorama();
    }, { threshold: 0 }).observe(dioramaStage);
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        revealVisibility.set(entry.target, true);
        revealObserver.unobserve(entry.target);
      });
      syncMotion();
    }, { threshold: 0.06 });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    scenes.forEach(scene => sceneVisibility.set(scene, true));
    // Older browsers get static content by default, with an explicit opt-in.
    globalPaused = true;
    dioramaVisible = true;
  }
  reducedMotion.addEventListener('change', () => {
    explicitPlayback = false;
    animationWanted = !userPaused && !reducedMotion.matches && (!connection?.saveData || explicitGlobalMotion);
    if (reducedMotion.matches) dioramaVideo?.classList.remove('is-ready');
    syncMotion();
  });
  connection?.addEventListener('change', () => {
    if (connection.saveData && !explicitGlobalMotion) globalPaused = true;
    if (!explicitPlayback) animationWanted = !userPaused && !reducedMotion.matches && (!connection.saveData || explicitGlobalMotion);
    syncMotion();
  });
  syncMotion();

  const heroImage = document.getElementById('hero-image');
  const dayControls = document.querySelector('.day-controls');
  if (dayControls) dayControls.hidden = false;
  document.querySelectorAll('[data-day]').forEach(button => {
    button.addEventListener('click', () => {
      if (!heroImage) return;
      const night = button.dataset.day === 'night';
      heroImage.src = `images/refresh/hero-${night ? 'night' : 'day'}.webp`;
      heroImage.alt = night ? 'Joe Town at night, with lit windows and glowing rooftops' : 'A bright Joe Town settlement with roads connecting its chicken civilization';
      heroImage.parentElement.href = heroImage.src;
      document.querySelectorAll('[data-day]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
  });

  // Without JavaScript every age is visible and links are ordinary anchors.
  const agePicker = document.querySelector('.age-picker');
  const ageLinks = [...(agePicker?.querySelectorAll('[data-age-select]') || [])];
  const agePanels = [...document.querySelectorAll('.age-panel')];
  const selectAge = index => {
    ageLinks.forEach((link, i) => {
      link.setAttribute('aria-selected', String(i === index));
      link.tabIndex = i === index ? 0 : -1;
      if (agePanels[i]) agePanels[i].hidden = i !== index;
    });
    syncMotion();
  };
  if (agePicker && ageLinks.length && agePanels.length === ageLinks.length) {
    agePicker.setAttribute('role', 'tablist');
    ageLinks.forEach((link, index) => {
      link.id = `age-tab-${index}`;
      link.setAttribute('role', 'tab');
      link.setAttribute('aria-controls', agePanels[index].id);
      agePanels[index].setAttribute('role', 'tabpanel');
      agePanels[index].setAttribute('aria-labelledby', link.id);
      link.addEventListener('click', event => { event.preventDefault(); selectAge(index); });
      link.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % ageLinks.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + ageLinks.length) % ageLinks.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = ageLinks.length - 1;
        if (next !== undefined) { event.preventDefault(); selectAge(next); ageLinks[next].focus(); }
      });
    });
    selectAge(0);
  }

  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const imageWrap = lightbox?.querySelector('.lightbox-image-wrap');
  const zoomButton = document.getElementById('lightbox-zoom');
  const closeButton = document.getElementById('lightbox-close');
  if (imageWrap) {
    imageWrap.tabIndex = 0;
    imageWrap.setAttribute('role', 'region');
    imageWrap.setAttribute('aria-label', 'Enlarged screenshot; use arrow keys to scroll when zoomed');
  }
  let opener;
  let previousScrollLock;
  const resetZoom = () => {
    imageWrap?.classList.remove('is-zoomed');
    if (zoomButton) { zoomButton.setAttribute('aria-pressed', 'false'); zoomButton.textContent = 'Zoom in'; }
    if (imageWrap) { imageWrap.scrollTop = 0; imageWrap.scrollLeft = 0; }
  };
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof lightbox?.showModal !== 'function' || !image || !caption) return;
      const source = link.querySelector('img');
      if (!source) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = source.alt;
      image.width = source.naturalWidth || Number(source.getAttribute('width'));
      image.height = source.naturalHeight || Number(source.getAttribute('height'));
      caption.textContent = link.dataset.caption || source.alt;
      resetZoom();
      previousScrollLock = [document.documentElement.style.overflow, document.body.style.overflow];
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lightbox.showModal();
      syncMotion();
      closeButton?.focus();
    });
  });
  zoomButton?.addEventListener('click', () => {
    if (!imageWrap) return;
    const zoomed = imageWrap.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Fit image' : 'Zoom in';
    if (zoomed) imageWrap.focus({ preventScroll: true });
  });
  closeButton?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox?.addEventListener('close', () => {
    resetZoom();
    if (previousScrollLock) {
      [document.documentElement.style.overflow, document.body.style.overflow] = previousScrollLock;
      previousScrollLock = undefined;
    }
    opener?.focus({ preventScroll: true });
    syncMotion();
  });

  document.querySelectorAll('a[href^="https://apps.apple.com/app/id6790244910"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') window.gtag('event', 'app_store_click', { link_url: link.href, link_text: link.textContent.trim() });
    });
  });
})();
