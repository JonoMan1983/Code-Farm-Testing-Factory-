/* DESIGNASAURUS REX — V2 shared script */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* Depth rail + progress */
  var rail = document.querySelector('.rail');
  var read = document.querySelector('.rail-read');
  var fill = document.querySelector('.rail-fill');
  var bar = document.querySelector('.progress');
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
  var title = document.querySelector('.hero-title');
  var ticking = false;
  var digTimer = null;
  var liveCrumb = document.querySelector('[data-crumb-live]');
  var setCrumb = function (sec) {
    if (!liveCrumb) return;
    var label = sec.getAttribute('data-crumb') || '';
    if (!label) { label = sec.getAttribute('data-era') || ''; label = label.charAt(0).toUpperCase() + label.slice(1); }
    if (/^[0-9–\-\s]+$/.test(label)) label = '';
    var fixed = document.querySelectorAll('.crumbs li:not(.crumb-live)');
    var last = fixed[fixed.length - 1].textContent.trim().toLowerCase();
    if (label.toLowerCase() === last || last.indexOf(label.toLowerCase()) === 0) label = '';
    liveCrumb.textContent = label;
    liveCrumb.parentNode.hidden = !label;
  };
  var SHOVEL = '<svg class="shovel" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><rect x="8.2" y="1.4" width="7.6" height="3.4" rx="1.7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4.8V12.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M7.4 12.4h9.2v3.9c0 3.1-2 5.6-4.6 6.6-2.6-1-4.6-3.5-4.6-6.6z" fill="currentColor"/></svg>';

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, window.scrollY / max));
    if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
    if (rail && read && layers.length) {
      var current = layers[0];
      var line = window.innerHeight * 0.35;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].getBoundingClientRect().top <= line) current = layers[i];
      }
      var h = rail.clientHeight - 175;
      read.style.top = (20 + p * h) + 'px';
      setCrumb(current);
      read.innerHTML = '<span class="rail-lbl">' + SHOVEL + '<span>Current<br>dig depth</span></span><b>' + current.getAttribute('data-depth') + '</b>' + (current.getAttribute('data-era') || '');
      rail.classList.add('is-digging');
      clearTimeout(digTimer);
      digTimer = setTimeout(function () { rail.classList.remove('is-digging'); }, 700);
      if (fill) fill.style.height = (p * 100).toFixed(2) + '%';
    }
    if (title && !reduce) {
      var w = Math.round(900 - Math.min(1, window.scrollY / 600) * 500);
      title.style.setProperty('--w', w);
    }
  }
  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Live countdown in phone mocks */
  var counts = document.querySelectorAll('[data-countdown]');
  if (counts.length) {
    var secs = 8076;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var t = pad(Math.floor(secs / 3600)) + ':' + pad(Math.floor(secs % 3600 / 60)) + ':' + pad(secs % 60);
      counts.forEach(function (c) { c.textContent = t; });
      secs = secs > 0 ? secs - 1 : 8076;
    };
    tick();
    if (!reduce) setInterval(tick, 1000);
  }

  /* Hover-to-play clips (archive) */
  document.querySelectorAll('[data-hover-play]').forEach(function (v) {
    var fig = v.closest('figure') || v;
    fig.addEventListener('mouseenter', function () { v.play().catch(function () {}); });
    fig.addEventListener('mouseleave', function () { v.pause(); });
    fig.addEventListener('focusin', function () { v.play().catch(function () {}); });
    fig.addEventListener('focusout', function () { v.pause(); });
  });

  /* Lightbox (archive) */
  var box = document.querySelector('.lightbox');
  if (box) {
    var img = box.querySelector('img');
    var close = box.querySelector('button');
    var last = null;
    var shut = function () { box.classList.remove('is-open'); img.removeAttribute('src'); if (last) last.focus(); };
    document.querySelectorAll('[data-full]').forEach(function (b) {
      b.addEventListener('click', function () {
        last = b;
        img.src = b.getAttribute('data-full');
        img.alt = b.getAttribute('data-alt') || '';
        box.classList.add('is-open');
        close.focus();
      });
    });
    close.addEventListener('click', shut);
    box.addEventListener('click', function (e) { if (e.target === box) shut(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) shut(); });
  }

  /* Field reports: moving line + full-report dialog */
  var refsSec = document.querySelector('.refs');
  var dlg = document.querySelector('.ref-dialog');
  var refsData = document.getElementById('refs-data');
  if (refsSec && dlg && refsData && typeof dlg.showModal === 'function') {
    var refs = JSON.parse(refsData.textContent);
    var cur = 0, opener = null;
    var q = function (s) { return dlg.querySelector(s); };
    var showRef = function (i) {
      cur = (i + refs.length) % refs.length;
      var r = refs[cur];
      q('[data-ref-no]').textContent = r.n;
      q('[data-ref-name]').textContent = r.name;
      q('[data-ref-role]').textContent = r.role;
      q('[data-ref-body]').innerHTML = '<p>' + r.body + '</p>';
      q('[data-ref-count]').textContent = (cur + 1) + ' / ' + refs.length;
      q('.ref-paper').scrollTop = 0;
    };
    refsSec.addEventListener('click', function (e) {
      var tag = e.target.closest('[data-ref-index]');
      if (!tag) return;
      opener = tag.getAttribute('aria-hidden') ? refsSec.querySelector('.ref-set:not(.ref-set--dup) [data-ref-index="' + tag.getAttribute('data-ref-index') + '"]') : tag;
      showRef(parseInt(tag.getAttribute('data-ref-index'), 10));
      dlg.showModal();
      q('[data-ref-close]').focus();
    });
    q('[data-ref-close]').addEventListener('click', function () { dlg.close(); });
    q('[data-ref-prev]').addEventListener('click', function () { showRef(cur - 1); });
    q('[data-ref-next]').addEventListener('click', function () { showRef(cur + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') showRef(cur + 1);
      if (e.key === 'ArrowLeft') showRef(cur - 1);
    });
    dlg.addEventListener('close', function () { if (opener) opener.focus({ preventScroll: true }); });
    var pause = refsSec.querySelector('[data-ref-pause]');
    if (pause) pause.addEventListener('click', function () {
      var on = refsSec.classList.toggle('is-paused');
      pause.setAttribute('aria-pressed', on ? 'true' : 'false');
      pause.textContent = on ? 'Play the line' : 'Pause the line';
    });
  }

  /* iGaming gallery: floating preview with simple navigation */
  var gdlg = document.querySelector('.gal-dialog');
  var gitems = Array.prototype.slice.call(document.querySelectorAll('[data-gal] [data-gal-item]'));
  if (gdlg && gitems.length && typeof gdlg.showModal === 'function') {
    var gi = 0, gopener = null;
    var gq = function (s) { return gdlg.querySelector(s); };
    var showGal = function (i) {
      gi = (i + gitems.length) % gitems.length;
      var it = gitems[gi], media = gq('[data-gal-media]');
      gq('[data-gal-name]').textContent = it.getAttribute('data-gal-title');
      gq('[data-gal-count]').textContent = (gi + 1) + ' / ' + gitems.length;
      media.innerHTML = '';
      if (it.getAttribute('data-gal-type') === 'video') {
        var v = document.createElement('video');
        v.src = it.getAttribute('data-gal-src'); v.poster = it.getAttribute('data-gal-poster') || '';
        v.muted = true; v.loop = true; v.playsInline = true; v.controls = true;
        if (!reduce) v.autoplay = true;
        v.setAttribute('aria-label', it.getAttribute('data-gal-title') + ' animation');
        media.appendChild(v);
      } else {
        var im = document.createElement('img');
        im.src = it.getAttribute('data-gal-src'); im.alt = it.getAttribute('data-gal-alt') || (it.getAttribute('data-gal-title') + ' game screen');
        media.appendChild(im);
      }
    };
    gitems.forEach(function (it, i) {
      it.addEventListener('click', function () { gopener = it; showGal(i); gdlg.showModal(); gq('[data-gal-close]').focus(); });
    });
    gq('[data-gal-close]').addEventListener('click', function () { gdlg.close(); });
    gq('[data-gal-prev]').addEventListener('click', function () { showGal(gi - 1); });
    gq('[data-gal-next]').addEventListener('click', function () { showGal(gi + 1); });
    gdlg.addEventListener('click', function (e) { if (e.target === gdlg) gdlg.close(); });
    gdlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') showGal(gi + 1);
      if (e.key === 'ArrowLeft') showGal(gi - 1);
    });
    gdlg.addEventListener('close', function () { gq('[data-gal-media]').innerHTML = ''; if (gopener) gopener.focus({ preventScroll: true }); });
  }

  /* Dropdown menus: click/tap toggles, Esc closes, hover handled in CSS */
  var drops = Array.prototype.slice.call(document.querySelectorAll('.drop-toggle'));
  var closeDrops = function (except) { drops.forEach(function (d) { if (d !== except) d.setAttribute('aria-expanded', 'false'); }); };
  drops.forEach(function (d) {
    d.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = d.getAttribute('aria-expanded') !== 'true';
      closeDrops(d); d.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-drop')) closeDrops(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openT = drops.filter(function (d) { return d.getAttribute('aria-expanded') === 'true'; })[0];
    if (openT) { closeDrops(); openT.focus(); }
  });

  /* Print button (resume) */
  document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
