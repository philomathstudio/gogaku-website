/* Gogaku — shared page behaviour
   1. A scroll-progress bar pinned under the sticky header. On the dictionary
      page it sits under the search bar instead, since that is sticky too.
   2. A back-to-top button that appears once you have scrolled.
   Both elements are created here, so pages only need to include this file. */

(function () {
  'use strict';

  var SHOW_TOP_AFTER = 320;   // px scrolled before the arrow appears
  var reduceMotion = window.matchMedia &&
                     window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var siteNav = document.querySelector('nav');
  var dictBar = document.querySelector('.dict-bar');
  var anchor = dictBar || siteNav;
  if (!anchor) { return; }

  /* ---------- progress bar ---------- */

  var track = document.createElement('div');
  track.className = 'scroll-progress';
  track.setAttribute('aria-hidden', 'true');

  var fill = document.createElement('div');
  fill.className = 'scroll-progress-fill';
  track.appendChild(fill);

  anchor.parentNode.insertBefore(track, anchor.nextSibling);

  /* ---------- back to top ---------- */

  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- measurement ---------- */

  function measure() {
    var top = siteNav ? siteNav.offsetHeight : 0;
    if (dictBar) { top += dictBar.offsetHeight; }
    document.documentElement.style.setProperty('--progress-top', top + 'px');
  }

  function update() {
    var doc = document.documentElement;
    var scrolled = window.pageYOffset || doc.scrollTop || 0;
    var travel = (doc.scrollHeight || 0) - window.innerHeight;
    var ratio = travel > 0 ? Math.min(1, Math.max(0, scrolled / travel)) : 0;

    fill.style.width = (ratio * 100).toFixed(2) + '%';
    track.style.opacity = travel > 0 ? '1' : '0';

    if (scrolled > SHOW_TOP_AFTER) { toTop.classList.add('visible'); }
    else { toTop.classList.remove('visible'); }
  }

  var queued = false;
  function onScroll() {
    if (queued) { return; }
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      update();
    });
  }

  function refresh() { measure(); update(); }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', refresh);
  window.addEventListener('load', refresh);

  // The dictionary's filter band opens and closes, changing the bar height.
  if (dictBar && window.ResizeObserver) {
    new ResizeObserver(refresh).observe(dictBar);
  }

  refresh();
})();