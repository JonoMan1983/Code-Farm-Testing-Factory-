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
      d.closest('.has-drop').classList.remove('is-dismissed');
      closeDrops(d); d.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-drop')) closeDrops(); });
  /* Only one menu at a time: hovering another menu closes any menu opened by click */
  Array.prototype.forEach.call(document.querySelectorAll('.has-drop'), function (li) {
    li.addEventListener('mouseenter', function () {
      li.classList.remove('is-dismissed');
      closeDrops(li.querySelector('.drop-toggle'));
      var f = document.activeElement, host = f && f.closest ? f.closest('.has-drop') : null;
      if (host && host !== li) f.blur();   /* focus kept the other menu open via :focus-within */
    });
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) li.classList.remove('is-dismissed'); });
    /* Picking an item closes the menu (same-page jumps would otherwise leave it hanging open) */
    li.addEventListener('click', function (e) {
      if (e.target.closest('.drop a')) { closeDrops(); if (document.activeElement) document.activeElement.blur(); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openT = drops.filter(function (d) { return d.getAttribute('aria-expanded') === 'true'; })[0];
    if (openT) { closeDrops(); openT.focus(); }
    var fl = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.has-drop') : null;
    if (fl) fl.classList.add('is-dismissed');
  });

  /* Three-portals explorer: one order, every portal */
  var pxRoot = document.querySelector('[data-px-root]');
  var pxData = document.getElementById('px-data');
  if (pxRoot && pxData) {
    var px = JSON.parse(pxData.textContent);
    var pxBtns = Array.prototype.slice.call(pxRoot.querySelectorAll('[data-px]'));
    var pxShow = function (i) {
      pxBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-px') === String(i) ? 'true' : 'false'); });
      pxRoot.querySelector('[data-px-name]').textContent = px.stages[i];
      var m = px.map[String(i)];
      pxRoot.querySelectorAll('[data-px-lane]').forEach(function (ul) {
        var items = m[ul.getAttribute('data-px-lane')] || [];
        ul.innerHTML = items.length
          ? items.map(function (t, k) { return '<li style="animation-delay:' + (k * 60) + 'ms">' + t + '</li>'; }).join('')
          : '<li class="px-empty">Nothing new at this state</li>';
      });
    };
    pxBtns.forEach(function (b) { b.addEventListener('click', function () { pxShow(parseInt(b.getAttribute('data-px'), 10)); }); });
    pxRoot.querySelector('.px-spine').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var cur = pxBtns.findIndex(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
      var nxt = (cur + (e.key === 'ArrowRight' ? 1 : -1) + pxBtns.length) % pxBtns.length;
      pxShow(nxt); pxBtns[nxt].focus(); e.preventDefault();
    });
    pxShow(3);
  }

  /* Scale desktop-width embedded artefacts to fit their frames */
  Array.prototype.forEach.call(document.querySelectorAll('[data-fit-w]'), function (fr) {
    var w = parseInt(fr.getAttribute('data-fit-w'), 10);
    var ifr = fr.querySelector('iframe');
    var fit = function () {
      var k = Math.min(1, fr.clientWidth / w);
      ifr.style.width = w + 'px';
      ifr.style.transform = 'scale(' + k + ')';
      ifr.style.height = (fr.clientHeight / k) + 'px';
    };
    fit(); window.addEventListener('resize', fit);
  });

  /* Certifications: + 20 more */
  var certBtn = document.querySelector('[data-cert-toggle]');
  var certBox = document.getElementById('cert-extra');
  if (certBtn && certBox) {
    certBtn.addEventListener('click', function () {
      var open = certBtn.getAttribute('aria-expanded') !== 'true';
      certBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      certBox.hidden = !open;
      certBtn.textContent = open ? '− Show fewer' : '+ 20 more';
      var shown = document.querySelectorAll('.cert-list > li:not(.cert-more)').length;
      var n = open ? shown : shown - certBox.querySelectorAll('li').length;
      document.querySelectorAll('.cert-ticks span').forEach(function (t, i) { t.classList.toggle('on', i < n); });
    });
  }

  /* Hero: count the years up */
  var tc = document.querySelector('[data-count]');
  if (tc && !reduce) {
    var target = parseInt(tc.getAttribute('data-count'), 10), n = 0;
    tc.textContent = '0';
    setTimeout(function tick() { n += 1; tc.textContent = n; if (n < target) setTimeout(tick, 38); }, 250);
  }

  /* About facts: count up when they scroll into view */
  var facts = document.querySelectorAll('[data-fact]');
  if (facts.length && !reduce && 'IntersectionObserver' in window) {
    var fio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        fio.unobserve(e.target);
        var el = e.target, to = parseInt(el.getAttribute('data-fact'), 10), plus = /\+$/.test(el.textContent), t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var k = Math.min(1, (ts - t0) / 900), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
          el.textContent = v + (plus ? '+' : '');
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: .6 });
    facts.forEach(function (f) { fio.observe(f); });
  }

  /* Explanatory illustrations: loop in sequence per section (0.5s apart) while the section is visible */
  var exArt = Array.prototype.slice.call(document.querySelectorAll('svg.stage-art, svg.log-art, svg.tool-icon'));
  if (exArt.length && !reduce && 'IntersectionObserver' in window) {
    var exGroups = [];
    exArt.forEach(function (svg) {
      var host = svg.closest('section') || document.body, kind = svg.getAttribute('class'), g = null;
      exGroups.forEach(function (x) { if (x.host === host && x.kind === kind) g = x; });
      if (!g) { g = { host: host, kind: kind, svgs: [] }; exGroups.push(g); }
      svg.style.setProperty('--g', g.svgs.length);
      g.svgs.push(svg);
      Array.prototype.forEach.call(svg.children, function (el, i) { el.style.setProperty('--i', i); });
      svg.querySelectorAll('.draw').forEach(function (el, i) { el.style.setProperty('--i', i + 2); });
    });
    var exIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        exGroups.forEach(function (g) {
          if (g.host === e.target) g.svgs.forEach(function (s) { s.classList.toggle('ex-play', e.isIntersecting); });
        });
      });
    }, { threshold: .15 });
    exGroups.forEach(function (g) { exIO.observe(g.host); });
  }


  /* Hero starfield — ported from V1: drifting dots threaded into a polygon mesh.
     Same motion model; colours swapped to the Dig Site palette (bone / ochre / tag). */
  (function initHeroStarfield() {
    var hero = document.querySelector('.hero');
    var canvas = document.getElementById('heroStarsCanvas');
    var focusEl = document.querySelector('.hero-mark');
    if (!hero || !canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var BONE = [237, 228, 211], OCHRE = [232, 163, 61], TAG = [255, 61, 110];
    var PALETTE = [BONE, OCHRE, TAG];          // dot colours
    var GLOW = [OCHRE, TAG];                    // halo colours
    var CONNECT_MAX_DIST = 360;   // 165 × 1.6 — keeps the mesh joined at the wider spacing
    var W = 0, H = 0, stars = [];

    function makeStar(w, h, glow) {
      var roll = Math.random();
      var colorIdx = glow ? (roll < 0.55 ? 0 : 1) : (roll < 0.6 ? 0 : roll < 0.85 ? 1 : 2);
      var depth = Math.random();
      var lineRgb = glow
        ? (colorIdx === 0 ? OCHRE : TAG)
        : (colorIdx === 1 ? OCHRE : colorIdx === 2 ? TAG : (Math.random() < 0.35 ? OCHRE : TAG));
      return {
        x: Math.random() * w, y: Math.random() * h,
        r: (glow ? 1.6 + Math.random() * 2.4 : 0.5 + Math.random() * 1.6) * (0.6 + depth * 0.9),
        rot: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.3, icon: Math.floor(Math.random() * 8),
        glow: glow, colorIdx: colorIdx, lineRgb: lineRgb, depth: depth,
        baseAlpha: glow ? 0.3 + Math.random() * 0.25 : 0.2 + Math.random() * 0.5,
        twFreq: 0.2 + Math.random() * 1.3, twPhase: Math.random() * Math.PI * 2,
        vx: 0, vy: 0, tx: 0, ty: 0, nextRoll: 0,
        bobFreq: 0.12 + Math.random() * 0.28, bobPhase: Math.random() * Math.PI * 2, bobAmp: 3 + depth * 11,
        pulseFreq: 0.1 + Math.random() * 0.2, pulsePhase: Math.random() * Math.PI * 2
      };
    }
    /* Dig-site icons (ammonites, bone, brushes, shovel, T-rex skull, hammer), traced from the supplied vectors */
    var DIG_ICONS = [{"n":"ammonite","d":"M69 158 c-3 0 -3 0 2 -5 5 -4 7 -10 7 -19 0 -11 1 -13 5 -13 2 0 3 0 3 2 0 1 1 5 3 9 5 19 -3 30 -20 26z M90 154 c5 -7 5 -14 0 -26 -2 -7 -2 -7 2 -9 2 -1 3 -1 5 2 1 2 3 6 5 8 11 14 5 28 -11 28 l-3 0 2 -3z M50 154 c-4 -2 -5 -3 0 -4 7 -2 13 -10 16 -22 3 -8 4 -9 8 -8 1 0 2 1 2 2 0 1 -1 6 -1 12 -1 16 -5 21 -15 22 -4 0 -6 0 -10 -2z M110 145 c0 -7 -2 -13 -6 -18 -1 -2 -4 -5 -5 -7 l-2 -3 3 -2 3 -2 5 4 c10 7 11 8 13 12 4 8 1 15 -7 20 -5 2 -5 1 -4 -4z M38 147 c-3 -1 -6 -3 -7 -5 l-3 -3 5 0 c9 -1 15 -5 23 -18 5 -6 6 -7 9 -4 3 1 3 1 1 4 -1 2 -3 6 -3 9 -5 15 -15 22 -25 17z M23 134 c-3 -2 -9 -9 -9 -11 0 0 4 0 9 0 10 0 13 -2 22 -9 9 -7 10 -8 12 -4 l3 3 -3 2 c-1 1 -4 5 -6 8 -8 12 -20 17 -28 11z M125 134 c0 -6 -5 -13 -14 -19 -6 -4 -7 -4 -4 -8 l2 -2 8 2 c15 5 21 13 15 23 -4 6 -7 8 -7 4z M16 120 c-5 -1 -11 -10 -11 -16 l0 -3 4 2 c7 4 18 3 28 -1 12 -5 13 -5 15 -1 2 4 2 4 0 5 -2 0 -6 3 -9 6 -10 8 -19 10 -27 8z M135 117 c0 -4 -10 -11 -20 -13 l-6 -1 1 -3 c0 -2 0 -4 0 -4 1 0 4 0 9 -1 16 -1 25 7 20 19 -2 4 -4 5 -4 3z M75 116 c-22 -6 -28 -32 -12 -50 5 -6 14 -11 25 -12 4 -1 9 -1 12 -2 2 0 5 0 7 1 l4 2 -4 3 c-4 2 -9 10 -9 14 0 1 0 1 -3 0 -4 -1 -4 -6 1 -16 0 -2 0 -2 -1 -1 -3 2 -5 7 -5 12 0 4 0 4 -2 4 -3 0 -5 -6 -5 -12 1 -3 0 -3 -1 -1 -1 2 -1 6 0 10 2 4 2 4 -1 5 -2 1 -5 -2 -7 -10 l-2 -3 0 3 c0 3 2 8 4 10 2 1 2 1 0 3 -2 2 -5 1 -10 -5 -2 -2 -3 -3 -3 -2 0 2 4 7 7 8 2 2 3 2 2 4 0 3 -5 2 -14 -3 -1 0 -1 0 -1 1 0 1 6 4 10 5 3 0 4 1 4 2 0 3 -6 5 -11 3 -2 0 -4 0 -4 0 0 2 6 3 10 2 5 0 5 0 5 2 0 2 -3 3 -10 6 l-3 1 4 0 c2 0 5 -1 7 -2 3 -2 4 -2 4 0 1 2 0 3 -5 7 -4 3 -4 3 -2 3 1 0 4 -2 6 -4 6 -7 8 0 2 8 -2 1 -2 2 -1 2 2 -1 6 -7 6 -10 0 -2 1 -2 3 -1 1 1 1 2 1 6 0 3 0 6 0 6 1 0 2 -5 2 -9 -1 -4 2 -4 4 0 5 9 -1 13 -14 10z M93 112 c0 -2 -1 -4 -2 -7 -2 -3 -2 -5 1 -5 1 0 8 8 8 9 0 1 -6 5 -7 5 -1 0 -1 -1 0 -2z M100 106 c0 -2 -2 -4 -4 -5 -6 -4 -1 -7 6 -3 3 2 4 3 1 7 l-2 3 -1 -2z M11 102 c-7 -3 -11 -10 -10 -19 l1 -4 4 3 c8 7 13 8 37 5 l6 0 0 4 c1 2 1 3 1 4 0 0 -4 1 -8 2 -4 2 -9 4 -11 4 -5 2 -15 2 -20 1z M80 98 c0 -1 3 -3 4 -3 0 1 -1 4 -3 4 0 0 -1 0 -1 -1z M85 98 c0 -1 1 -2 1 -2 1 0 1 1 1 2 0 0 -1 1 -1 1 -1 0 -2 -1 -1 -1z M104 98 c-1 -1 -3 -3 -5 -3 -5 -2 -4 -4 2 -4 5 0 5 0 5 4 0 4 -1 4 -2 3z M77 96 c-2 -2 -2 -2 1 -2 3 -1 4 -1 2 2 -2 2 -2 2 -3 0z M88 97 c0 -1 0 -2 1 -2 3 -2 0 -8 -3 -7 -1 0 -1 0 -1 -1 4 -5 9 3 6 9 -1 2 -3 3 -3 1z M137 97 c-3 -4 -10 -5 -19 -5 l-8 1 0 -3 c0 -3 0 -4 6 -6 14 -6 24 -2 24 10 0 4 -1 5 -3 3z M74 90 c0 -2 0 -2 3 -1 4 1 4 3 0 3 -2 0 -3 0 -3 -2z M95 88 c1 -2 7 -5 9 -4 3 4 2 6 -4 6 -4 0 -5 -1 -5 -2z M76 87 c-1 -1 -2 -2 -1 -3 0 -2 0 -2 3 0 3 4 2 6 -2 3z M13 84 c-11 -4 -14 -12 -8 -24 l1 -3 2 3 c5 7 13 12 28 13 15 2 16 3 14 9 0 2 -1 2 -7 3 -4 0 -11 0 -15 0 -8 1 -10 1 -15 -1z M94 85 c-2 -3 3 -8 6 -6 3 1 3 3 0 4 -1 0 -3 1 -4 2 -1 1 -2 1 -2 0z M79 83 c-2 -2 -2 -2 -1 -4 1 -1 1 -1 3 1 2 5 1 7 -2 3z M107 81 c-3 -5 12 -15 19 -14 3 1 8 6 9 10 0 3 0 3 -2 2 -5 -2 -11 -1 -17 2 -7 4 -7 4 -9 0z M82 80 c-1 -2 -1 -4 1 -4 1 0 2 2 2 4 0 4 -2 4 -3 0z M87 82 c-1 0 -1 -2 -1 -4 l0 -3 5 0 c5 1 6 1 3 5 -3 4 -5 4 -4 0 2 -6 0 -5 -2 2 0 1 -1 1 -1 0z M101 75 c-2 -1 -2 -1 0 -5 5 -13 14 -16 22 -8 l2 3 -2 0 c-5 0 -12 4 -15 8 -4 5 -4 4 -7 2z M48 73 c-1 -1 -7 -2 -12 -3 -23 -3 -33 -12 -26 -26 3 -5 6 -7 7 -4 3 8 11 14 23 19 5 2 15 8 15 9 0 1 -3 6 -4 6 0 0 -2 -1 -3 -1z M53 63 c-1 -2 -7 -5 -12 -7 -23 -10 -28 -19 -18 -29 5 -5 8 -5 8 -2 1 4 8 12 16 18 4 4 9 8 11 11 l4 5 -2 3 c-3 4 -3 4 -7 1z M62 54 c-3 -5 -7 -9 -15 -15 -8 -6 -15 -14 -15 -17 0 -3 8 -9 12 -10 3 -1 5 -2 6 -2 5 -4 12 -6 16 -6 2 0 6 -1 8 -2 9 -3 35 0 39 5 4 4 3 7 -3 20 -7 14 -12 21 -16 22 -3 1 -3 0 -1 -6 5 -10 6 -24 3 -34 -3 -6 -4 -5 -2 2 3 11 -1 35 -6 38 -5 3 -6 1 -6 -5 2 -12 -4 -29 -11 -36 -2 -2 -2 -2 2 6 6 12 8 27 6 35 0 1 -6 5 -6 4 -1 0 -1 -3 -2 -6 -2 -8 -6 -16 -13 -24 -11 -14 -12 -13 -1 2 11 17 15 28 10 31 l-3 2 -2 -4z","w":141,"h":160},{"n":"bone","d":"M79 157 c-8 -4 -9 -8 -8 -21 0 -12 -1 -19 -10 -35 -14 -29 -30 -49 -43 -55 -3 -1 -7 -3 -9 -4 -14 -7 -9 -27 7 -26 8 1 9 0 11 -6 2 -6 6 -9 13 -8 12 0 17 5 17 19 0 11 2 19 10 34 16 32 31 52 45 60 10 5 13 11 11 20 -2 8 -8 12 -16 10 -6 -1 -8 -1 -9 3 -1 6 -2 8 -5 9 -5 3 -9 2 -14 0z m8 -6 c0 -1 -1 -1 -2 -1 -4 0 -7 -5 -7 -11 0 -3 0 -3 -1 -2 -2 3 -1 9 2 12 3 3 8 4 8 2z m6 -16 c1 0 4 0 5 1 4 1 1 -2 -3 -4 -6 -3 -11 3 -8 10 l1 3 1 -5 c0 -5 1 -5 4 -5z m20 -9 c-1 -1 -4 -3 -7 -3 -3 -1 -8 -4 -11 -6 -5 -4 -6 -3 -1 2 3 3 6 4 11 6 4 1 7 3 8 4 1 1 2 1 2 0 0 -1 -1 -2 -2 -3z m-26 -24 c-4 -6 -7 -10 -8 -10 -1 0 6 11 10 15 8 8 7 5 -2 -5z m-45 -50 c-3 -5 -12 -15 -14 -15 -1 0 2 4 6 8 4 4 8 9 9 10 3 4 3 3 -1 -3z m-19 -14 c0 -1 -3 -2 -5 -2 -5 -1 -8 -3 -9 -7 0 -3 0 -3 -1 -2 -1 2 0 6 2 9 3 2 16 4 13 2z m27 -11 c0 -2 0 -6 0 -8 0 -8 -5 -13 -12 -12 -3 1 -3 3 2 3 5 0 8 3 8 11 0 6 0 9 1 9 0 0 1 -1 1 -3z m-20 -5 c1 0 2 -2 2 -3 0 -1 -1 -1 -3 1 -4 4 -4 6 1 2z","w":125,"h":160},{"n":"brush","d":"M54 144 c-6 -15 -7 -16 -5 -16 2 0 14 29 13 30 -1 2 -2 0 -8 -14z M59 142 c-7 -15 -8 -16 -6 -16 1 0 4 4 6 9 2 5 5 12 6 15 2 4 3 6 2 6 -1 0 -5 -6 -8 -14z M63 140 c-8 -16 -8 -16 -6 -16 1 0 15 27 15 29 0 4 -3 -1 -9 -13z M71 144 c-9 -16 -11 -21 -10 -22 0 -1 1 -1 2 1 8 16 14 27 13 28 0 1 -3 -2 -5 -7z M72 136 c-7 -13 -8 -15 -7 -16 1 0 16 25 16 28 0 3 -2 0 -9 -12z M79 138 c-11 -18 -11 -19 -10 -20 0 -1 1 0 2 1 4 5 15 26 15 27 0 3 -2 0 -7 -8z M80 130 c-5 -9 -8 -13 -7 -14 0 -1 3 2 7 9 10 17 11 19 10 19 -1 0 -5 -6 -10 -14z M84 128 c-6 -10 -8 -14 -7 -14 1 -1 3 2 14 20 4 6 5 8 3 8 0 0 -5 -6 -10 -14z M89 126 c-5 -7 -9 -13 -9 -14 0 -3 3 1 11 12 10 15 10 15 8 15 -1 0 -5 -6 -10 -13z M94 124 c-10 -13 -11 -15 -9 -15 1 0 19 24 19 26 1 4 -3 0 -10 -11z M42 122 c-3 -5 -3 -7 1 -12 7 -10 5 -18 -7 -37 -1 -2 -3 -5 -3 -6 0 0 8 -5 9 -5 1 0 4 5 7 12 8 16 12 20 25 21 6 0 12 5 12 9 0 1 -40 22 -41 22 -1 0 -2 -2 -3 -4z M21 51 c-18 -28 -23 -41 -17 -47 9 -9 17 1 34 41 6 14 6 12 -1 16 -8 4 -7 5 -16 -10z m-6 -35 c2 -2 1 -4 -1 -6 -4 -4 -9 0 -6 5 1 2 5 3 7 1z","w":106,"h":160},{"n":"shovel","d":"M123 158 c-3 -2 -7 -11 -8 -17 0 -5 1 -3 -25 -32 -9 -10 -16 -18 -16 -19 0 -1 10 -10 11 -10 0 0 10 11 22 24 12 12 22 23 23 23 3 0 14 6 16 9 3 4 3 6 -4 12 -10 10 -15 12 -19 10z m11 -12 c6 -5 6 -7 1 -10 -10 -5 -17 3 -11 13 2 2 2 2 10 -3z M35 84 c-25 -28 -28 -31 -31 -40 -5 -15 -2 -39 5 -41 15 -5 38 1 50 11 9 9 32 35 31 36 0 1 -4 5 -8 8 l-8 6 -7 -6 c-24 -24 -34 -12 -12 13 l4 5 -8 7 c-10 7 -10 7 -16 1z M64 77 c-17 -19 -22 -29 -16 -29 4 0 18 12 30 26 l3 4 -4 4 c-6 5 -4 5 -13 -5z","w":149,"h":160},{"n":"skull","d":"M34 146 c-17 -5 -29 -21 -27 -33 1 -10 1 -21 -1 -26 -2 -3 -2 -5 -1 -7 1 -3 1 -3 -2 -5 -3 -4 -3 -6 3 -8 6 -3 9 -7 13 -14 5 -11 17 -21 28 -24 2 0 6 -2 10 -3 19 -4 26 -7 44 -17 15 -9 18 -10 28 -4 7 4 9 6 6 9 -1 1 -2 3 -2 5 0 7 -2 10 -3 3 -1 -4 -2 -5 -4 -3 0 0 -1 1 0 2 1 2 1 8 0 10 -1 1 -1 0 -3 -4 -3 -5 -6 -7 -5 -3 2 7 2 20 -1 16 0 -1 -1 -4 -2 -7 -3 -7 -7 -9 -4 -2 1 5 2 13 0 11 -6 -9 -7 -11 -8 -11 -1 0 0 1 0 3 4 6 2 10 -2 4 -4 -4 -6 -4 -5 0 2 6 1 8 -1 5 -2 -2 -3 -3 -3 -3 -1 0 -1 1 -1 3 l0 3 -2 -3 c-2 -2 -3 -2 -3 1 0 2 0 2 -2 1 -3 -2 -6 0 -15 10 -9 10 -18 16 -25 19 l-4 2 5 2 c5 2 5 2 13 0 5 -1 9 -1 12 -1 11 2 25 -3 24 -8 l0 -2 2 2 c3 3 4 3 4 -1 l0 -3 2 2 c3 3 4 2 3 -3 -1 -2 -1 -4 0 -4 0 -1 5 4 6 6 0 3 2 2 2 0 0 -6 2 -7 4 -2 2 6 3 5 2 -3 l0 -6 2 2 c2 1 4 4 5 7 3 7 4 5 3 -4 0 -8 0 -8 1 -7 3 2 6 7 6 12 2 5 3 3 3 -4 l0 -7 2 2 c1 1 3 4 3 7 1 5 3 4 3 -1 0 -5 2 -5 4 0 1 2 2 3 3 3 2 0 5 5 5 8 0 8 -4 15 -16 27 l-8 9 -19 7 c-20 8 -23 9 -32 19 l-6 6 -7 0 c-6 0 -7 0 -14 4 -10 5 -13 5 -23 1z m18 -16 c6 -3 9 -9 9 -17 -1 -8 -2 -9 -9 -12 -12 -4 -23 5 -23 18 0 10 13 17 23 11z m34 -11 c2 -2 5 -5 9 -11 6 -9 6 -9 2 -11 -2 -1 -4 -3 -5 -6 -2 -4 -2 -4 -5 -3 -2 0 -5 0 -6 0 l-3 0 0 14 c0 8 0 15 -1 16 -2 5 1 5 9 1z m25 -15 c3 -4 5 -11 3 -12 -2 -2 -12 -4 -13 -4 0 1 1 2 2 4 4 3 4 6 1 12 l-3 5 4 -1 c2 -1 4 -3 6 -4z m22 -3 c9 -5 17 -15 14 -18 -1 -2 -10 3 -11 7 -1 1 -4 4 -6 6 -4 4 -7 8 -5 8 1 0 4 -1 8 -3z","w":160,"h":150},{"n":"brush2","d":"M92 142 l-11 -16 21 -22 c12 -11 22 -21 23 -21 1 0 31 20 31 21 0 1 -4 -1 -8 -3 -10 -5 -10 -5 -1 1 l7 5 -3 4 c-1 1 -3 3 -4 3 0 0 -1 0 0 1 1 2 -1 1 -5 -2 -12 -10 -15 -11 -6 -2 l8 9 -3 3 -4 3 -6 -5 c-8 -5 -9 -4 -1 3 l5 5 -4 4 -4 4 -4 -4 c-3 -2 -6 -5 -7 -6 l-3 -2 2 3 c1 1 4 4 6 7 4 3 4 4 3 6 -2 1 -2 1 -5 -1 l-3 -3 2 2 c3 4 3 5 -2 9 l-4 3 -5 -5 c-4 -5 -4 -4 0 3 3 4 3 6 1 6 0 0 -3 -4 -6 -8 -5 -8 -10 -14 -6 -7 4 7 9 17 9 17 0 3 -4 -1 -13 -15z M75 120 c-3 -3 -4 -1 19 -26 l21 -21 4 3 3 4 -21 22 c-12 11 -22 21 -22 21 -1 0 -2 -1 -4 -3z M68 113 c0 0 -3 -3 -5 -5 -5 -6 -5 -9 -1 -18 4 -12 4 -13 -20 -33 -32 -27 -39 -35 -41 -43 0 -5 2 -10 5 -12 10 -5 21 5 57 49 13 15 14 16 28 11 5 -1 8 -2 10 -2 3 1 12 9 12 10 0 1 -42 44 -43 44 0 0 -1 0 -2 -1z m-47 -92 c2 -3 2 -6 -2 -7 -3 -1 -5 1 -5 4 0 5 5 7 7 3z","w":157,"h":160},{"n":"ammonite2","d":"M66 153 c-26 -5 -46 -21 -57 -44 -20 -42 1 -91 45 -106 9 -3 9 -3 11 4 1 2 2 4 3 5 0 1 1 2 1 3 0 3 3 10 5 10 2 1 5 7 5 10 0 4 -2 5 -7 5 -18 2 -32 22 -29 41 6 37 56 44 73 11 l3 -7 5 1 c2 0 6 1 8 2 1 1 4 2 7 2 12 2 21 6 19 10 -10 36 -54 61 -92 53z m27 -6 c2 -5 1 -18 -2 -24 -1 -2 -2 -5 -2 -6 1 -1 0 -2 0 -3 -2 -1 -2 5 0 10 3 6 4 19 2 22 -1 2 -2 3 -2 4 0 2 2 0 4 -3z m-27 -1 c5 -4 8 -14 8 -22 0 -3 0 -7 0 -8 1 -2 1 -2 -1 -1 -1 2 -1 3 -1 7 0 10 -3 18 -7 23 -5 5 -4 5 1 1z m50 -5 c2 -5 -2 -16 -8 -23 -2 -2 -4 -5 -4 -6 -1 -1 -2 -2 -2 -2 -2 0 0 5 3 9 6 6 10 14 10 20 -1 4 0 6 1 2z m-73 -6 c4 -2 13 -14 13 -18 0 -1 1 -3 2 -5 1 -1 2 -2 2 -3 -2 -1 -6 5 -6 7 0 5 -10 17 -14 18 -2 1 -4 2 -4 2 0 1 2 1 7 -1z m94 -15 c-2 -4 -12 -13 -18 -14 -1 -1 -3 -2 -4 -3 -1 -2 -3 -3 -3 -1 0 2 5 6 8 6 5 2 15 10 15 15 1 5 2 6 3 3 0 -2 -1 -4 -1 -6z m-103 -7 c3 -2 7 -5 8 -7 2 -2 4 -4 5 -5 2 0 3 -2 0 -2 0 0 -3 2 -6 5 -8 8 -13 11 -19 11 -3 0 -5 0 -5 1 0 3 11 1 17 -3z m-8 -19 c3 -1 7 -3 9 -4 2 -2 4 -3 5 -3 1 0 2 0 2 -1 0 -2 -5 -1 -7 1 -7 5 -20 7 -25 4 -4 -1 -4 0 0 2 3 2 9 2 16 1z m11 -21 c2 0 4 -1 4 -1 -1 -2 -8 -2 -10 -1 -4 2 -17 -1 -21 -4 -5 -4 -5 -2 -1 2 2 2 5 3 7 3 3 1 6 1 7 1 1 1 4 1 6 0 2 0 5 0 8 0z m6 -17 c-1 -1 -4 -2 -5 -2 -6 0 -18 -6 -20 -11 -3 -5 -5 -5 -2 0 2 6 13 13 20 13 2 0 4 1 6 1 2 2 4 1 1 -1z m9 -10 c-1 -3 -3 -5 -5 -5 -3 -1 -13 -13 -13 -15 0 -2 0 -4 0 -5 0 -4 -2 -4 -2 -1 -1 7 7 21 13 22 2 1 4 2 5 4 1 2 3 3 2 0z m8 -14 c-1 -3 -3 -8 -4 -11 -2 -6 -2 -6 0 -13 2 -4 -1 -2 -2 2 -3 5 -1 17 5 23 1 1 2 4 2 5 0 3 1 4 2 1 0 -2 -1 -5 -3 -7z M70 110 c-26 -9 -34 -42 -14 -60 l3 -3 2 2 c0 2 2 4 4 6 l4 3 -3 2 c-3 3 -9 2 -12 -2 -2 -3 -4 -2 -2 1 1 1 3 3 6 4 4 2 5 3 4 5 -1 3 -2 3 -7 3 -3 0 -6 0 -7 -1 0 -1 -1 -1 -1 0 -2 2 2 3 8 3 6 0 6 0 6 3 0 3 -4 6 -10 7 -3 0 -4 1 -3 1 3 2 9 0 11 -2 l2 -2 2 3 c3 3 -3 12 -8 12 -3 0 -1 2 1 2 2 0 6 -4 8 -7 2 -3 8 -1 6 2 0 1 -1 3 -1 5 0 2 -2 4 -4 6 -2 1 -2 2 -1 2 3 0 6 -3 7 -8 3 -9 8 -6 8 4 0 3 0 5 -1 5 -1 2 -1 3 0 2 3 0 4 -6 3 -11 0 -2 0 -3 1 -4 2 -1 5 -1 5 0 0 1 1 2 2 4 1 2 2 4 2 6 1 5 2 6 3 2 0 -2 0 -4 -2 -7 -4 -7 -4 -7 -1 -9 3 -1 10 4 12 9 l2 4 0 -4 c0 -2 -1 -4 -5 -7 -6 -5 -6 -5 -4 -7 2 -3 12 -1 16 2 2 2 3 1 1 -2 -1 -1 -8 -4 -11 -4 -2 0 -3 -2 -3 -4 1 -3 12 -6 14 -4 2 1 4 1 4 0 0 -2 -6 -3 -11 -2 -7 1 -7 1 -7 -2 -1 -4 7 -10 12 -10 2 0 3 0 3 -1 -2 -3 -8 -1 -14 4 l-2 2 -2 -2 c-3 -2 -3 -3 -1 -4 0 -1 1 -2 1 -3 0 -2 4 -6 7 -7 l3 -1 -3 -1 c-3 0 -10 6 -8 8 1 2 -4 4 -6 3 -3 -2 -2 -12 1 -16 3 -2 2 -4 -1 -1 -2 1 -4 7 -4 12 0 4 -6 5 -7 1 0 -1 -1 -2 -1 -3 -2 -3 -1 -6 1 -8 2 -1 3 -3 3 -5 1 -3 1 -3 5 -2 21 3 36 23 33 44 -4 23 -28 38 -49 32z M76 90 c-20 -6 -15 -35 6 -34 19 2 21 29 2 34 -4 1 -4 1 -8 0z m3 -5 c1 -4 3 -4 4 0 0 2 1 3 1 3 2 0 2 -3 1 -4 -1 -2 0 -4 2 -3 1 0 2 1 3 2 0 1 1 2 1 1 2 -1 1 -4 -1 -5 -3 -2 -1 -3 3 -3 1 1 3 1 3 0 0 -1 -3 -3 -5 -3 -3 0 -2 -2 1 -3 4 -2 4 -3 -1 -3 -3 1 -4 -2 0 -5 1 -1 1 -1 0 -1 -1 0 -3 1 -4 2 -2 3 -4 2 -2 -2 1 -3 1 -3 -1 -3 -1 0 -2 2 -2 3 0 3 -3 3 -3 -1 -1 -1 -2 -2 -2 -1 -1 0 -1 1 -1 3 1 3 -2 3 -3 -1 -1 -2 -1 -2 -2 0 -1 1 -1 2 1 3 2 3 1 4 -3 2 -1 -1 -2 -1 -3 -1 -1 1 2 4 4 4 1 0 1 0 0 1 -1 1 -2 2 -4 1 -2 0 -2 0 -2 1 0 1 2 2 3 2 4 0 3 2 0 4 -2 1 -2 1 -1 2 1 0 3 0 3 -1 3 -3 4 1 1 4 -1 2 -1 2 1 2 1 0 3 -1 3 -2 2 -3 3 -1 3 3 -1 1 -1 2 0 2 1 0 2 -1 2 -3z M74 77 c-4 -5 -1 -11 6 -11 4 0 7 3 7 7 0 7 -9 10 -13 4z M66 53 c-4 -3 -4 -8 0 -9 6 -3 8 -2 8 1 1 2 1 5 2 7 0 2 0 3 -2 3 -4 1 -4 1 -8 -2z","w":160,"h":156},{"n":"hammer","d":"M61 158 c0 -1 7 -6 14 -11 19 -14 24 -19 25 -29 1 -3 5 1 -61 -62 -21 -21 -37 -37 -38 -39 -1 -7 9 -17 17 -16 2 1 23 23 71 75 20 21 25 26 26 26 2 -1 4 -1 6 -1 2 0 3 -1 9 -9 8 -11 8 -11 17 -2 11 10 10 12 -1 20 -8 5 -9 5 -9 8 0 3 -1 5 -9 12 l-9 9 -3 -1 c-4 -1 -4 -1 -10 4 -9 7 -27 14 -41 16 -5 1 -5 1 -4 0z","w":156,"h":160}];
    DIG_ICONS.forEach(function (ic) { ic.path = (typeof Path2D === 'function') ? new Path2D(ic.d) : null; ic.m = Math.max(ic.w, ic.h); });
    function drawIcon(x, y, size, ang, fill, ic) {
      if (!ic.path) { ctx.beginPath(); ctx.arc(x, y, size / 5, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); return; }
      var k = size / ic.m;
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(k, -k); ctx.translate(-ic.w / 2, -ic.h / 2);
      ctx.fillStyle = fill; ctx.fill(ic.path); ctx.restore();
    }
    function buildStars(w, h) {
      var count = Math.round(Math.min(102, Math.max(35, (w * h) / 23040)));   // 1.6× spacing = density ÷ 2.56
      var glowCnt = Math.max(4, Math.round(count * 0.1));
      stars = [];
      for (var i = 0; i < count; i++) stars.push(makeStar(w, h, false));
      for (var k = 0; k < glowCnt; k++) stars.push(makeStar(w, h, true));
    }
    function resize() {
      var rect = hero.getBoundingClientRect();
      W = Math.max(1, rect.width); H = Math.max(1, rect.height);
      var dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars(W, H);
    }
    resize();
    var resizeRaf = null;
    window.addEventListener('resize', function () {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(function () { resizeRaf = null; resize(); });
    });

    var rafId = null, lastTimestamp = null, onScreen = true;
    function frame(timestamp) {
      var t = timestamp * 0.001;
      var dt = lastTimestamp === null ? 0 : Math.min((timestamp - lastTimestamp) * 0.001, 0.1);
      lastTimestamp = timestamp;
      var heroRect = hero.getBoundingClientRect();
      var focalX = W * 0.5, focalY = H * 0.45, focalR = Math.max(W, H) * 0.55;
      if (focusEl) {
        var c = focusEl.getBoundingClientRect();
        if (c.width > 0) {
          focalX = (c.left + c.width / 2) - heroRect.left;
          focalY = (c.top + c.height / 2) - heroRect.top;
          focalR = Math.max(c.width, c.height) * 0.85;
        }
      }
      var clampedTop = Math.max(-H, Math.min(0, heroRect.top));
      var scrollShift = clampedTop * -0.18;
      ctx.clearRect(0, 0, W, H);

      stars.forEach(function (s) {
        if (timestamp > s.nextRoll) {
          var speed = 10 + s.depth * 38;
          s.tx = (Math.random() - 0.5) * speed; s.ty = (Math.random() - 0.5) * speed;
          s.nextRoll = timestamp + 1000 + Math.random() * 2500;
        }
        s.vx += (s.tx - s.vx) * 0.018; s.vy += (s.ty - s.vy) * 0.018;
        s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.x < -30) s.x += W + 60; if (s.x > W + 30) s.x -= W + 60;
        if (s.y < -30) s.y += H + 60; if (s.y > H + 30) s.y -= H + 60;
        var bobX = Math.sin(t * s.bobFreq + s.bobPhase) * s.bobAmp;
        var bobY = Math.cos(t * s.bobFreq * 0.8 + s.bobPhase) * s.bobAmp;
        var px = s.x + bobX, py = s.y + bobY + scrollShift * (0.3 + s.depth * 0.9);
        var dx = px - focalX, dy = py - focalY;
        var proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / focalR);
        var tw = Math.sin(t * s.twFreq + s.twPhase) * 0.5 + 0.5;
        s._px = px; s._py = py; s._prox = proximity;
        s._alpha = Math.min(1, s.baseAlpha * (0.35 + tw * 0.65) * (1 + proximity * 1.6));
        s._r = s.r * (1 + proximity * 1.3);
        s._rgb = s.glow ? GLOW[s.colorIdx] : PALETTE[s.colorIdx];
      });

      var lineBase = 0.78;   // lines +20%
      for (var n = 0; n < stars.length; n++) stars[n]._nn = CONNECT_MAX_DIST;
      for (var i = 0; i < stars.length; i++) {
        var a = stars[i];
        for (var j = i + 1; j < stars.length; j++) {
          var b = stars[j];
          var ddx = a._px - b._px; if (ddx > CONNECT_MAX_DIST || ddx < -CONNECT_MAX_DIST) continue;
          var ddy = a._py - b._py; if (ddy > CONNECT_MAX_DIST || ddy < -CONNECT_MAX_DIST) continue;
          var dist = Math.sqrt(ddx * ddx + ddy * ddy); if (dist >= CONNECT_MAX_DIST) continue;
          if (dist < a._nn) a._nn = dist; if (dist < b._nn) b._nn = dist;
          var falloff = Math.pow(1 - dist / CONNECT_MAX_DIST, 1.2);   // gentler fade so long links stay visible
          var proxBoost = 1 + ((a._prox + b._prox) * 0.5) * 0.35;
          var lineAlpha = Math.min(1, lineBase * falloff * ((a._alpha + b._alpha) * 0.5) * proxBoost);
          if (lineAlpha < 0.012) continue;
          var grad = ctx.createLinearGradient(a._px, a._py, b._px, b._py);
          grad.addColorStop(0, 'rgba(' + a.lineRgb[0] + ',' + a.lineRgb[1] + ',' + a.lineRgb[2] + ',' + lineAlpha + ')');
          grad.addColorStop(1, 'rgba(' + b.lineRgb[0] + ',' + b.lineRgb[1] + ',' + b.lineRgb[2] + ',' + lineAlpha + ')');
          ctx.beginPath(); ctx.moveTo(a._px, a._py); ctx.lineTo(b._px, b._py);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + Math.min(1, ((a._r + b._r) * 0.5) / 9) * 0.6;   // thinner links
          ctx.stroke();
        }
      }

      stars.forEach(function (s) {
        var px = s._px, py = s._py, alpha = s._alpha, r = s._r, rgb = s._rgb;
        if (s.glow) {
          var pulse = Math.sin(t * s.pulseFreq + s.pulsePhase) * 0.5 + 0.5;
          var glowA = Math.min(1, alpha * (0.55 + pulse * 0.85));
          var glowR = r * (5 + pulse * 2.5);
          var grd = ctx.createRadialGradient(px, py, 0, px, py, glowR);
          grd.addColorStop(0, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + glowA + ')');
          grd.addColorStop(1, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0)');
          ctx.beginPath(); ctx.arc(px, py, glowR, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        }
        s.rot += s.spin * dt;
        // particle sizes: far = tiny specks (6px), near = readable icons (up to ~40px)
        var spread = Math.max(0, Math.min(1, (s._nn - 25) / 160));          // 0 = crowded, 1 = isolated
        var target = (6 + Math.pow(spread, 1.1) * 32) * (s.glow ? 1.2 : 1);
        s._sz = s._sz ? s._sz + (target - s._sz) * 0.06 : target;
        var isz = Math.min(42, s._sz);
        drawIcon(px, py, isz, s.rot, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + Math.min(0.85, Math.max(0.38, alpha * 1.36)) + ')', DIG_ICONS[s.icon]);   // icon opacity −15%
      });

      rafId = (reduce || !onScreen || document.hidden) ? null : requestAnimationFrame(frame);
    }
    function start() { if (!rafId && !reduce) { lastTimestamp = null; rafId = requestAnimationFrame(frame); } }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; } else if (onScreen) start();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        onScreen = es[0].isIntersecting;
        if (onScreen) start(); else { cancelAnimationFrame(rafId); rafId = null; }
      }).observe(hero);
    }
    if (reduce) frame(0); else start();   // reduced motion: one still frame of the mesh
  })();

  /* Contact form: build a ready-to-send email (static site, no server) */
  var cform = document.querySelector('[data-contact-form]');
  if (cform) {
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = cform.elements, err = cform.querySelector('[data-form-error]'), ok = cform.querySelector('[data-form-ok]');
      var name = f.name.value.trim(), email = f.email.value.trim(), msg = f.message.value.trim();
      var valid = name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && msg;
      err.hidden = !!valid;
      if (!valid) { (name ? (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? f.message : f.email) : f.name).focus(); return; }
      var company = f.company.value.trim(), topic = f.topic.value;
      var subject = topic + ' — from ' + name + (company ? ' (' + company + ')' : '');
      var body = msg + '\n\n— ' + name + (company ? ', ' + company : '') + '\n' + email;
      window.location.href = 'mailto:jonathanedwardnestler@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      ok.hidden = false;
    });
  }

  /* Image viewer: every content thumbnail opens a large view with prev/next through its section */
  (function initViewer() {
    var sel = '.spec-thumbs img, img.spec-shot, img.portrait, .ba img, [data-full]';
    var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) { return !el.closest('[data-gal]'); });
    if (!els.length) return;
    var dlg = document.createElement('dialog');
    dlg.className = 'gal-dialog vw';
    dlg.setAttribute('aria-label', 'Image viewer');
    dlg.innerHTML = '<div class="gal-box"><header class="gal-head"><span class="mono" data-vw-count></span><h3 data-vw-title></h3>' +
      '<button class="gal-x" type="button" data-vw-close aria-label="Close viewer">×</button></header>' +
      '<p class="vw-sub" data-vw-sub></p><div class="gal-media" data-vw-media></div>' +
      '<footer class="gal-foot"><button class="gal-nav" type="button" data-vw-prev>← Previous</button><span class="mono" data-vw-group></span><button class="gal-nav" type="button" data-vw-next>Next →</button></footer></div>';
    document.body.appendChild(dlg);
    var q = function (s) { return dlg.querySelector(s); };
    var full = function (el) {
      if (el.hasAttribute('data-full')) return el.getAttribute('data-full');
      var src = el.currentSrc || el.getAttribute('src');
      if (/\/igaming\/[^/]+\.jpg$/.test(src) && !/-full\.jpg$/.test(src)) return src.replace(/\.jpg$/, '-full.jpg');
      return src;
    };
    var info = function (el) {
      var fig = el.closest('figure'), cap = fig && fig.querySelector('figcaption');
      var title = el.getAttribute('data-vw-title') || el.getAttribute('data-alt') || el.getAttribute('alt') || '', sub = el.getAttribute('data-vw-sub') || '';
      if (cap && !el.hasAttribute('data-vw-title')) {
        var b = cap.querySelector('b');
        if (b) { title = b.textContent; sub = cap.textContent.replace(b.textContent, '').trim(); } else { sub = cap.textContent.trim(); }
      }
      return { title: title, sub: sub, alt: el.getAttribute('data-alt') || el.getAttribute('alt') || title };
    };
    var groupOf = function (el) {
      var host = el.closest('.spec, .art, .ba, .about, section') || document.body;
      return host;
    };
    var labelOf = function (host) {
      var sec = host.closest('section') || host, eb = (host.querySelector('.eyebrow') || sec.querySelector('.eyebrow'));
      return eb ? eb.textContent.trim() : '';
    };
    var groups = [], list = [], idx = 0, opener = null;
    els.forEach(function (el) {
      var host = groupOf(el), g = null;
      groups.forEach(function (x) { if (x.host === host) g = x; });
      if (!g) { g = { host: host, items: [], label: labelOf(host) }; groups.push(g); }
      g.items.push(el);
      if (el.tagName === 'IMG') { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); el.setAttribute('aria-label', 'Enlarge: ' + (el.getAttribute('alt') || 'image')); }
      el.setAttribute('data-vw', '');
      var open = function (e) {
        e.preventDefault(); e.stopPropagation();
        list = g.items; opener = el; show(list.indexOf(el), g.label);
        if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
        q('[data-vw-close]').focus();
      };
      el.addEventListener('click', open);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') open(e); });
    });
    var show = function (i, label) {
      idx = (i + list.length) % list.length;
      var el = list[idx], d = info(el), media = q('[data-vw-media]');
      q('[data-vw-title]').textContent = d.title;
      q('[data-vw-sub]').textContent = d.sub;
      q('[data-vw-count]').textContent = (idx + 1) + ' / ' + list.length;
      if (label !== undefined) q('[data-vw-group]').textContent = label;
      var multi = list.length > 1;
      q('[data-vw-prev]').style.visibility = multi ? '' : 'hidden';
      q('[data-vw-next]').style.visibility = multi ? '' : 'hidden';
      media.innerHTML = '';
      var im = document.createElement('img');
      im.src = full(el); im.alt = d.alt;
      if (el.classList.contains('portrait--tall')) im.className = 'vw-tall';
      media.appendChild(im);
    };
    q('[data-vw-close]').addEventListener('click', function () { dlg.close(); });
    q('[data-vw-prev]').addEventListener('click', function () { show(idx - 1); });
    q('[data-vw-next]').addEventListener('click', function () { show(idx + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
    dlg.addEventListener('close', function () { q('[data-vw-media]').innerHTML = ''; if (opener) opener.focus({ preventScroll: true }); });
  })();

  /* Print button (resume) */
  document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
