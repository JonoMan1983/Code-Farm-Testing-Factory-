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

  /* Explanatory illustrations: loop their build every 5s while visible */
  var exArt = document.querySelectorAll('svg.stage-art, svg.log-art, svg.tool-icon, .log-art svg, .tool-icon svg');
  if (exArt.length && !reduce && 'IntersectionObserver' in window) {
    exArt.forEach(function (svg) {
      Array.prototype.forEach.call(svg.children, function (el, i) { el.style.setProperty('--i', i); });
      svg.querySelectorAll('.draw').forEach(function (el, i) { el.style.setProperty('--i', i + 2); });
    });
    var exIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('ex-play', e.isIntersecting); });
    }, { threshold: .35 });
    exArt.forEach(function (svg) { exIO.observe(svg); });
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
    var CONNECT_MAX_DIST = 165;
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
        glow: glow, colorIdx: colorIdx, lineRgb: lineRgb, depth: depth,
        baseAlpha: glow ? 0.3 + Math.random() * 0.25 : 0.2 + Math.random() * 0.5,
        twFreq: 0.2 + Math.random() * 1.3, twPhase: Math.random() * Math.PI * 2,
        vx: 0, vy: 0, tx: 0, ty: 0, nextRoll: 0,
        bobFreq: 0.12 + Math.random() * 0.28, bobPhase: Math.random() * Math.PI * 2, bobAmp: 3 + depth * 11,
        pulseFreq: 0.1 + Math.random() * 0.2, pulsePhase: Math.random() * Math.PI * 2
      };
    }
    function buildStars(w, h) {
      var count = Math.round(Math.min(260, Math.max(90, (w * h) / 9000)));
      var glowCnt = Math.max(10, Math.round(count * 0.1));
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

      var lineBase = 0.23;
      for (var i = 0; i < stars.length; i++) {
        var a = stars[i];
        for (var j = i + 1; j < stars.length; j++) {
          var b = stars[j];
          var ddx = a._px - b._px; if (ddx > CONNECT_MAX_DIST || ddx < -CONNECT_MAX_DIST) continue;
          var ddy = a._py - b._py; if (ddy > CONNECT_MAX_DIST || ddy < -CONNECT_MAX_DIST) continue;
          var dist = Math.sqrt(ddx * ddx + ddy * ddy); if (dist >= CONNECT_MAX_DIST) continue;
          var falloff = Math.pow(1 - dist / CONNECT_MAX_DIST, 1.7);
          var proxBoost = 1 + ((a._prox + b._prox) * 0.5) * 0.35;
          var lineAlpha = Math.min(0.42, lineBase * falloff * ((a._alpha + b._alpha) * 0.5) * proxBoost);
          if (lineAlpha < 0.012) continue;
          var grad = ctx.createLinearGradient(a._px, a._py, b._px, b._py);
          grad.addColorStop(0, 'rgba(' + a.lineRgb[0] + ',' + a.lineRgb[1] + ',' + a.lineRgb[2] + ',' + lineAlpha + ')');
          grad.addColorStop(1, 'rgba(' + b.lineRgb[0] + ',' + b.lineRgb[1] + ',' + b.lineRgb[2] + ',' + lineAlpha + ')');
          ctx.beginPath(); ctx.moveTo(a._px, a._py); ctx.lineTo(b._px, b._py);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 + Math.min(1, ((a._r + b._r) * 0.5) / 9) * 1.0;
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
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha + ')';
        ctx.fill();
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

  /* Print button (resume) */
  document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
