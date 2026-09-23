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
      var h = rail.clientHeight - 60;
      read.style.top = (20 + p * h) + 'px';
      read.innerHTML = '<b>' + current.getAttribute('data-depth') + '</b>' + (current.getAttribute('data-era') || '');
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

  /* Print button (resume) */
  document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
