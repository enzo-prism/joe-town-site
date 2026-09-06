(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.querySelector('.day-controls').hidden = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeMenu = (restoreFocus = false) => {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  window.matchMedia('(min-width: 781px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  // Keep the poster visible until a decoded video frame is actually playing.
  // A source is selected once, at first playback, so resizing never downloads both.
  const lightbox = document.getElementById('lightbox');
  const dioramaVideo = document.getElementById('diorama-video');
  const dioramaButton = document.getElementById('diorama-toggle');
  const connection = navigator.connection;
  let animationWanted = !reducedMotion.matches && !connection?.saveData;
  let explicitPlayback = false;
  let userPaused = false;
  let dioramaVisible = false;
  let playPending = false;
  let playRequest = 0;
  const dioramaCanPlay = () => animationWanted && dioramaVisible && !document.hidden && menu.hidden && !lightbox.open;
  const updateDioramaButton = () => {
    const active = dioramaCanPlay() && (!dioramaVideo.paused || playPending);
    const label = active ? 'Pause town animation' : 'Play town animation';
    dioramaButton.setAttribute('aria-label', label);
    dioramaButton.querySelector('.diorama-toggle-icon').textContent = active ? 'Ⅱ' : '▶';
    dioramaButton.querySelector('.diorama-toggle-text').textContent = active ? 'Pause animation' : 'Play animation';
  };
  const syncDiorama = () => {
    if (!dioramaCanPlay()) {
      playRequest += 1;
      playPending = false;
      dioramaVideo.pause();
      updateDioramaButton();
      return;
    }
    if (playPending || !dioramaVideo.paused) return;
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
  document.addEventListener('visibilitychange', syncDiorama);
  new MutationObserver(syncDiorama).observe(menu, { attributes:true, attributeFilter:['hidden'] });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      dioramaVisible = entries[0].isIntersecting;
      syncDiorama();
    }, { threshold:0 }).observe(document.querySelector('.diorama-stage'));
  } else {
    dioramaVisible = true;
    syncDiorama();
  }
  reducedMotion.addEventListener('change', () => {
    explicitPlayback = false;
    animationWanted = !userPaused && !reducedMotion.matches && !connection?.saveData;
    if (reducedMotion.matches) dioramaVideo.classList.remove('is-ready');
    syncDiorama();
  });
  connection?.addEventListener('change', () => {
    if (!explicitPlayback) {
      animationWanted = !userPaused && !reducedMotion.matches && !connection.saveData;
      syncDiorama();
    }
  });

  const heroImage = document.getElementById('hero-image');
  document.querySelectorAll('[data-day]').forEach(button => {
    button.addEventListener('click', () => {
      const night = button.dataset.day === 'night';
      heroImage.src = `images/refresh/hero-${night ? 'night' : 'day'}.webp`;
      heroImage.alt = night ? 'Joe Town at night, with lit windows and glowing rooftops' : 'A bright Joe Town settlement with roads connecting its chicken civilization';
      heroImage.parentElement.href = heroImage.src;
      document.querySelectorAll('[data-day]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
  });

  const delivery = document.querySelector('.delivery');
  const motionButton = document.getElementById('motion-toggle');
  let motionPaused = reducedMotion.matches;
  const updateMotion = () => {
    delivery.classList.toggle('motion-paused', motionPaused || reducedMotion.matches);
    motionButton.textContent = reducedMotion.matches ? 'Reduced motion on' : (motionPaused ? 'Resume deliveries' : 'Pause deliveries');
    motionButton.setAttribute('aria-pressed', String(motionPaused || reducedMotion.matches));
    motionButton.disabled = reducedMotion.matches;
  };
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();

  // Without JavaScript every age is visible and links are ordinary anchors.
  const agePicker = document.querySelector('.age-picker');
  const ageLinks = [...agePicker.querySelectorAll('[data-age-select]')];
  const agePanels = [...document.querySelectorAll('.age-panel')];
  agePicker.setAttribute('role', 'tablist');
  const selectAge = index => {
    ageLinks.forEach((link, i) => {
      link.setAttribute('aria-selected', String(i === index));
      link.tabIndex = i === index ? 0 : -1;
      agePanels[i].hidden = i !== index;
    });
  };
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

  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const imageWrap = lightbox.querySelector('.lightbox-image-wrap');
  const zoomButton = document.getElementById('lightbox-zoom');
  let opener;
  const resetZoom = () => {
    imageWrap.classList.remove('is-zoomed');
    zoomButton.setAttribute('aria-pressed', 'false');
    zoomButton.textContent = 'Zoom in';
    imageWrap.scrollTop = 0;
    imageWrap.scrollLeft = 0;
  };
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof lightbox.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      const source = link.querySelector('img');
      image.src = link.href;
      image.alt = source.alt;
      image.width = source.naturalWidth || Number(source.getAttribute('width'));
      image.height = source.naturalHeight || Number(source.getAttribute('height'));
      caption.textContent = source.alt;
      resetZoom();
      lightbox.showModal();
      syncDiorama();
      document.getElementById('lightbox-close').focus();
    });
  });
  zoomButton.addEventListener('click', () => {
    const zoomed = imageWrap.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Fit image' : 'Zoom in';
  });
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => { resetZoom(); opener?.focus(); syncDiorama(); });

  document.querySelectorAll('a[href^="https://apps.apple.com/app/id6790244910"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'app_store_click', { link_url: link.href, link_text: link.textContent.trim() });
      }
    });
  });
})();
