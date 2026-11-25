/* ==========================================================================
   Kareem Zaghloul — Portfolio Core Interaction Script
   Vanilla JS, zero globals, defer-loaded
   ========================================================================== */
(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js');

  /* 1. Footer Year
     ---------------------------------------------------------------------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* 2. Header Scrolled State & Top Scroll Progress Bar
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var progressBar = document.querySelector('.scroll-progress-bar');

  function updateScrollUI() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    if (header) {
      if (scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    if (progressBar) {
      var maxScroll = docEl.scrollHeight - window.innerHeight;
      var ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      progressBar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }
  }

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });

  /* 3. Mobile Navigation Drawer
     ---------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenuOpen(open) {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('nav-open', open);
    if (!open) {
      navToggle.focus();
    } else {
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });

    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenuOpen(false);
      }
    });
  }

  /* 4. Scroll-Spy for Anchor Navigation
     ---------------------------------------------------------------------- */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav .nav-link[href^="#"]')
  );

  if (spyLinks.length > 0 && 'IntersectionObserver' in window) {
    var sectionMap = [];
    spyLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (target) {
        sectionMap.push({ link: link, target: target });
      }
    });

    if (sectionMap.length > 0) {
      var spyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              sectionMap.forEach(function (item) {
                var active = item.target === entry.target;
                if (active) {
                  item.link.setAttribute('aria-current', 'true');
                } else {
                  item.link.removeAttribute('aria-current');
                }
              });
            }
          });
        },
        { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
      );

      sectionMap.forEach(function (item) {
        spyObserver.observe(item.target);
      });
    }
  }

  /* 5. Reveal Observer
     ---------------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length > 0) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* 6. Hero Crosshair Coordinate Readout (Desktop pointer: fine)
     ---------------------------------------------------------------------- */
  var heroEl = document.querySelector('.hero');
  var coordsEl = document.getElementById('hero-coords-readout');

  if (
    heroEl &&
    coordsEl &&
    !prefersReduced &&
    window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches
  ) {
    heroEl.addEventListener(
      'pointermove',
      function (e) {
        var rect = heroEl.getBoundingClientRect();
        var x = Math.max(0, e.clientX - rect.left);
        var y = Math.max(0, e.clientY - rect.top);
        var xMm = (x * 0.25).toFixed(2).padStart(6, '0');
        var yMm = (y * 0.25).toFixed(2).padStart(6, '0');
        coordsEl.textContent = 'X ' + xMm + '  Y ' + yMm + ' mm';
      },
      { passive: true }
    );
  }

  /* 7. Project Status Filter Chips
     ---------------------------------------------------------------------- */
  var filterChips = Array.prototype.slice.call(document.querySelectorAll('.filter-chip[data-filter]'));
  var projectItems = Array.prototype.slice.call(document.querySelectorAll('[data-project-card][data-status]'));
  var filterStatusEl = document.getElementById('projects-filter-status');

  if (filterChips.length > 0 && projectItems.length > 0) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;

        filterChips.forEach(function (btn) {
          btn.setAttribute('aria-pressed', btn === chip ? 'true' : 'false');
        });

        projectItems.forEach(function (card) {
          var status = card.getAttribute('data-status');
          var show = filter === 'all' || status === filter;
          card.classList.toggle('is-hidden', !show);
          if (show) visibleCount += 1;
        });

        if (filterStatusEl) {
          filterStatusEl.textContent =
            'Showing ' + visibleCount + ' of ' + projectItems.length + ' projects';
        }
      });
    });
  }
})();
