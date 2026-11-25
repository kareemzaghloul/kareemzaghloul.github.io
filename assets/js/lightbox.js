/* ==========================================================================
   Kareem Zaghloul — Engineering Lightbox Module
   Accessible dialog, zoom/pan, keyboard & touch swipe, image preloading
   ========================================================================== */
(function () {
  'use strict';

  var triggers = Array.prototype.slice.call(
    document.querySelectorAll('[data-lightbox]')
  );

  if (triggers.length === 0) return;

  // Build dialog once
  var dialog = document.createElement('div');
  dialog.className = 'lightbox';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'lightbox-caption');
  dialog.setAttribute('aria-hidden', 'true');

  dialog.innerHTML = [
    '<div class="lightbox-bar">',
    '  <span class="lightbox-counter" id="lightbox-counter">01 / 01</span>',
    '  <div class="lightbox-controls">',
    '    <button type="button" class="lightbox-btn" id="lightbox-zoom-btn" aria-pressed="false">Zoom 2x</button>',
    '    <button type="button" class="lightbox-btn" id="lightbox-close-btn" aria-label="Close viewer">Close [Esc]</button>',
    '  </div>',
    '</div>',
    '<div class="lightbox-stage">',
    '  <button type="button" class="lightbox-nav lightbox-nav--prev" id="lightbox-prev-btn" aria-label="Previous image">&larr;</button>',
    '  <div class="lightbox-img-wrap" id="lightbox-img-wrap">',
    '    <img class="lightbox-img" id="lightbox-img" src="" alt="">',
    '  </div>',
    '  <button type="button" class="lightbox-nav lightbox-nav--next" id="lightbox-next-btn" aria-label="Next image">&rarr;</button>',
    '</div>',
    '<div class="lightbox-caption-bar">',
    '  <p class="lightbox-caption" id="lightbox-caption"></p>',
    '  <span class="lightbox-hint">Click image to toggle 2x zoom &middot; Arrow keys to navigate &middot; Esc to close</span>',
    '</div>'
  ].join('');

  document.body.appendChild(dialog);

  var counterEl = document.getElementById('lightbox-counter');
  var zoomBtn = document.getElementById('lightbox-zoom-btn');
  var closeBtn = document.getElementById('lightbox-close-btn');
  var prevBtn = document.getElementById('lightbox-prev-btn');
  var nextBtn = document.getElementById('lightbox-next-btn');
  var imgWrap = document.getElementById('lightbox-img-wrap');
  var imgEl = document.getElementById('lightbox-img');
  var captionEl = document.getElementById('lightbox-caption');

  var currentGroup = [];
  var currentIndex = 0;
  var lastFocused = null;
  var isZoomed = false;
  var panX = 0;
  var panY = 0;
  var dragging = false;
  var movedDuringDrag = false;
  var dragStartX = 0;
  var dragStartY = 0;
  var touchStartX = 0;
  var touchStartY = 0;

  function applyTransform() {
    if (isZoomed) {
      imgEl.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(2)';
    } else {
      imgEl.style.transform = 'translate(0px, 0px) scale(1)';
    }
  }

  function resetZoom() {
    isZoomed = false;
    panX = 0;
    panY = 0;
    dragging = false;
    imgWrap.classList.remove('is-zoomed', 'is-dragging');
    zoomBtn.setAttribute('aria-pressed', 'false');
    zoomBtn.textContent = 'Zoom 2x';
    applyTransform();
  }

  function toggleZoom() {
    if (isZoomed) {
      resetZoom();
    } else {
      isZoomed = true;
      panX = 0;
      panY = 0;
      imgWrap.classList.add('is-zoomed');
      zoomBtn.setAttribute('aria-pressed', 'true');
      zoomBtn.textContent = 'Reset 1x';
      applyTransform();
    }
  }

  function preloadIndex(idx) {
    if (currentGroup.length === 0) return;
    var normalized = (idx + currentGroup.length) % currentGroup.length;
    var item = currentGroup[normalized];
    if (item && item.src) {
      var img = new Image();
      img.src = item.src;
    }
  }

  function renderSlide() {
    if (currentGroup.length === 0) return;
    resetZoom();
    var item = currentGroup[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    captionEl.textContent = item.caption || item.alt;
    var cur = String(currentIndex + 1).padStart(2, '0');
    var tot = String(currentGroup.length).padStart(2, '0');
    counterEl.textContent = cur + ' / ' + tot;

    var single = currentGroup.length <= 1;
    prevBtn.hidden = single;
    nextBtn.hidden = single;

    preloadIndex(currentIndex + 1);
    preloadIndex(currentIndex - 1);
  }

  function openLightbox(trigger) {
    var groupName = trigger.getAttribute('data-lightbox') || 'default';
    var groupTriggers = Array.prototype.slice.call(
      document.querySelectorAll('[data-lightbox="' + groupName + '"]')
    );

    currentGroup = groupTriggers.map(function (el) {
      var thumb = el.querySelector('img');
      return {
        el: el,
        src: el.getAttribute('data-src') || (thumb ? thumb.getAttribute('src') : ''),
        alt: el.getAttribute('data-alt') || (thumb ? thumb.getAttribute('alt') : ''),
        caption: el.getAttribute('data-caption') || ''
      };
    });

    currentIndex = Math.max(0, groupTriggers.indexOf(trigger));
    lastFocused = document.activeElement;

    renderSlide();
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    resetZoom();
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function step(delta) {
    if (currentGroup.length <= 1) return;
    currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
    renderSlide();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openLightbox(trigger);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  zoomBtn.addEventListener('click', toggleZoom);

  // Backdrop click to close
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });

  // Pointer drag pan when zoomed, click to toggle zoom
  imgWrap.addEventListener('pointerdown', function (e) {
    movedDuringDrag = false;
    if (!isZoomed) return;
    dragging = true;
    dragStartX = e.clientX - panX;
    dragStartY = e.clientY - panY;
    imgWrap.classList.add('is-dragging');
    imgWrap.setPointerCapture(e.pointerId);
  });

  imgWrap.addEventListener('pointermove', function (e) {
    if (!dragging || !isZoomed) return;
    var nextX = e.clientX - dragStartX;
    var nextY = e.clientY - dragStartY;
    if (Math.abs(nextX - panX) > 3 || Math.abs(nextY - panY) > 3) {
      movedDuringDrag = true;
    }
    panX = nextX;
    panY = nextY;
    applyTransform();
  });

  function endDrag() {
    dragging = false;
    imgWrap.classList.remove('is-dragging');
  }

  imgWrap.addEventListener('pointerup', endDrag);
  imgWrap.addEventListener('pointercancel', endDrag);

  imgWrap.addEventListener('click', function () {
    if (movedDuringDrag) {
      movedDuringDrag = false;
      return;
    }
    toggleZoom();
  });

  // Touch swipe navigation on unzoomed view
  var stage = dialog.querySelector('.lightbox-stage');
  stage.addEventListener(
    'touchstart',
    function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );

  stage.addEventListener(
    'touchend',
    function (e) {
      if (isZoomed || e.changedTouches.length !== 1) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        step(dx < 0 ? 1 : -1);
      }
    },
    { passive: true }
  );

  // Keyboard & Focus Trap
  document.addEventListener('keydown', function (e) {
    if (!dialog.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
      return;
    }
    if (e.key === 'Tab') {
      var focusables = Array.prototype.slice.call(
        dialog.querySelectorAll('button:not([hidden])')
      );
      if (focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
