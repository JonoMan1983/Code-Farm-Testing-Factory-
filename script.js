// ===========================
// PLYR VIDEO PLAYERS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Plyr !== 'undefined') {
    const showreelEl = document.getElementById('showreelPlayer');
    if (showreelEl) {
      new Plyr(showreelEl, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        ratio: '16:9',
        resetOnEnd: true,
      });
    }
    document.querySelectorAll('.video-card .plyr-video').forEach(el => {
      new Plyr(el, {
        controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
        ratio: '16:9',
        resetOnEnd: true,
        lazy: true,
      });
    });
  }
});

// ===========================
// ANIMATION GALLERY — 32 clips from Cloudinary
// ===========================
(function buildAnimGrid() {
  const grid = document.getElementById('animGrid');
  if (!grid) return;

  const CDN = 'https://res.cloudinary.com/dksariyyz/video/upload';

  const ANIMATIONS = [
    { id: 'v1780033064/Mega_Panda_Frog_as8mwg',                    label: 'Mega Panda Frog' },
    { id: 'v1780033063/Red_Panda_Winning_hsf37d',                   label: 'Red Panda Winning' },
    { id: 'v1780033063/Red_Panda_Idle_yuf5zw',                      label: 'Red Panda Idle' },
    { id: 'v1780033063/Red_Panda_Landing_v7qffm',                   label: 'Red Panda Landing' },
    { id: 'v1780033062/Genie_Animation_fpw6zp',                     label: 'Genie Animation' },
    { id: 'v1780033062/Frog_004_iqluo7',                            label: 'Frog' },
    { id: 'v1780033062/Atlantis_King_xcp1co',                       label: 'Atlantis King' },
    { id: 'v1780033062/Big_Sexy_City_Reelframe_p6gb6u',             label: 'Big Sexy City Reelframe' },
    { id: 'v1780033061/Atlantis_Queen_uic0ew',                      label: 'Atlantis Queen' },
    { id: 'v1780033061/Big_Sexy_City_Scatter_Landing_icfiru',       label: 'BSC Scatter Landing' },
    { id: 'v1780033060/Big_Sexy_City_Scatter_Winning_xvx1fu',       label: 'BSC Scatter Winning' },
    { id: 'v1780033060/Big_Sexy_City_Sticky_Wild_sg9znb',           label: 'BSC Sticky Wild' },
    { id: 'v1780033059/Cupcake_Space_Unicorn_In_Game_dq8m9p',       label: 'Cupcake Space Unicorn' },
    { id: 'v1780033059/Big_Sexy_City_In_Game_tksnwc',               label: 'BSC In Game' },
    { id: 'v1780033058/Big_Sexy_City_Winning_Wild_vd1wwu',          label: 'BSC Winning Wild' },
    { id: 'v1780033058/Big_Sexy_City_Winframe_laytnj',              label: 'BSC Winframe' },
    { id: 'v1780033058/Cupcake_Space_Unicorn_Reelframe_mzqgqy',     label: 'CSU Reelframe' },
    { id: 'v1780033057/Cupcake_Space_Unicorn_Scatter_Landing_btkhrh', label: 'CSU Scatter Landing' },
    { id: 'v1780033057/Cupcake_Space_Unicorn_Scatter_Winning_krg4ra', label: 'CSU Scatter Winning' },
    { id: 'v1780033056/Geisha_Reelframe_cxusil',                    label: 'Geisha Reelframe' },
    { id: 'v1780033056/Cupcake_Space_Unicorn_Sticky_Wild_ygiyk7',   label: 'CSU Sticky Wild' },
    { id: 'v1780033056/Cupcake_Space_Unicorn_Winframe_wiaxfx',      label: 'CSU Winframe' },
    { id: 'v1780033056/Geisha_Winframe_sbscbb',                     label: 'Geisha Winframe' },
    { id: 'v1780033054/Mega_Wolf_Squirrel_strn2m',                  label: 'Mega Wolf Squirrel' },
    { id: 'v1780033054/Land_a_Leprechaun_Looping_Wild_casgbm',      label: 'Land a Leprechaun' },
    { id: 'v1780033054/Mayan_Madness_Wild_j7x05p',                  label: 'Mayan Madness Wild' },
    { id: 'v1780033054/Mayan_Madness_Bird_hrspnj',                  label: 'Mayan Madness Bird' },
    { id: 'v1780033054/Rose_of_the_West_pu7mna',                    label: 'Rose of the West' },
    { id: 'v1780033053/Samurai_Winning_xjzc3w',                     label: 'Samurai Winning' },
    { id: 'v1780033053/Samurai_Idle_vu3ypd',                        label: 'Samurai Idle' },
    { id: 'v1780033052/Samurai_Reelframe_ke6sbp',                   label: 'Samurai Reelframe' },
    { id: 'v1780033052/Samurai_Winframe_dbioec',                    label: 'Samurai Winframe' },
  ];

  ANIMATIONS.forEach((anim, i) => {
    const videoUrl  = `${CDN}/q_auto,w_400,vc_auto/${anim.id}.mp4`;
    const posterUrl = `${CDN}/f_jpg,q_auto,w_400,so_0/${anim.id}.jpg`;
    const num = String(i + 1).padStart(2, '0');

    const thumb = document.createElement('div');
    thumb.className = 'anim-thumb';
    thumb.dataset.id    = anim.id;
    thumb.dataset.label = anim.label;
    thumb.innerHTML = `
      <video src="${videoUrl}" poster="${posterUrl}"
        muted playsinline preload="none" loop></video>
      <div class="anim-overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/>
        </svg>
      </div>
      <span class="anim-label">${anim.label}</span>`;

    grid.appendChild(thumb);

    const vid = thumb.querySelector('video');
    thumb.addEventListener('mouseenter', () => { vid.load(); vid.play().catch(() => {}); });
    thumb.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
  });

  // Lazy-load videos near viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const vid = entry.target.querySelector('video');
        if (vid.getAttribute('preload') === 'none') vid.setAttribute('preload', 'metadata');
      }
    });
  }, { rootMargin: '200px' });

  grid.querySelectorAll('.anim-thumb').forEach(t => observer.observe(t));
})();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = !navLinks.classList.contains('open');
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  } else {
    closeNav();
  }
});

// Close nav on link click or outside tap
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close nav on tap outside overlay
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav();
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.hero-label, .hero-title, .hero-sub, .hero-actions, ' +
  '.section-label, h2, .about-text p, .image-placeholder, ' +
  '.case-card, .skill-group, .timeline-item, .resume-download, ' +
  '.ai-workflow-card, ' +
  '.contact-sub, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// Contact form (demo — no backend)
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  form.querySelector('button[type="submit"]').textContent = 'Sending…';
  setTimeout(() => {
    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Send Message';
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 4000);
  }, 800);
});

// Shrink nav on scroll (responsive padding)
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) {
    nav.style.padding = window.innerWidth <= 1024 ? '10px 16px' : '12px 40px';
  } else {
    nav.style.padding = '';
  }
}, { passive: true });

// ===========================
// LIGHTBOX — Artistic Expression
// ===========================
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const thumbs = Array.from(document.querySelectorAll('.art-thumb'));
  let current = 0;

  function open(index) {
    current = index;
    lightboxImg.src = thumbs[current].dataset.full;
    lightboxImg.alt = thumbs[current].dataset.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function prev() { open((current - 1 + thumbs.length) % thumbs.length); }
  function next() { open((current + 1) % thumbs.length); }

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => open(i)));

  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxPrev').addEventListener('click', prev);
  document.getElementById('lightboxNext').addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();

// ===========================
// VIDEO LIGHTBOX — Animation Reel
// ===========================
(function () {
  const lb  = document.getElementById('videoLightbox');
  if (!lb) return;
  const vid = document.getElementById('videoLightboxVid');
  const lbl = document.getElementById('videoLightboxLabel');
  const CDN = 'https://res.cloudinary.com/dksariyyz/video/upload';
  const anims = Array.from(document.querySelectorAll('.anim-thumb'));
  let cur = 0;

  function open(index) {
    cur = index;
    const t = anims[cur];
    vid.src    = `${CDN}/q_auto,w_1200,vc_auto/${t.dataset.id}.mp4`;
    vid.poster = `${CDN}/f_jpg,q_auto,w_1200,so_0/${t.dataset.id}.jpg`;
    lbl.textContent = t.dataset.label || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    vid.play().catch(() => {});
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    vid.pause();
    vid.src = '';
    vid.load();
  }

  function prev() { open((cur - 1 + anims.length) % anims.length); }
  function next() { open((cur + 1) % anims.length); }

  anims.forEach((t, i) => t.addEventListener('click', () => open(i)));
  document.getElementById('videoLightboxClose').addEventListener('click', close);
  document.getElementById('videoLightboxPrev').addEventListener('click', prev);
  document.getElementById('videoLightboxNext').addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
})();

// ===========================
// HERO CANVAS — ATOMIC ORBIT
// ===========================
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const SIZE = 920;
  canvas.width  = SIZE * dpr;
  canvas.height = SIZE * dpr;
  ctx.scale(dpr, dpr);

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  // Three orbital rings evenly spaced at 120° (π*2/3 rad) apart
  const T        = Math.PI * 2 / 3;
  const PINK_RGB = [255, 64, 184];   // base pink colour for orbit paths

  // Lerp between two [r,g,b] arrays and return an rgb() string
  function lerpRGB(a, b, f) {
    return `rgb(${~~(a[0]+(b[0]-a[0])*f)},${~~(a[1]+(b[1]-a[1])*f)},${~~(a[2]+(b[2]-a[2])*f)})`;
  }

  // Per-orbit colour oscillation frequencies and phase offsets
  const CLR_FREQ = [0.38, 0.62, 0.91];
  const CLR_PH   = [0, 2.1, 4.2];

  const orbits = [
    { rx: 373, ry: 143, tilt: 0,     speed:  0.0120, dash: [5,  14], color: '#B8A8F7', rgba: [184, 168, 247] },
    { rx: 373, ry: 143, tilt: T,     speed: -0.0093, dash: [9,  24], color: '#E0115E', rgba: [224,  17,  94] },
    { rx: 373, ry: 143, tilt: T * 2, speed:  0.0072, dash: [14, 36], color: '#c8c8f0', rgba: [200, 200, 240] },
  ];

  // Each orbit drifts independently with its own random walk speed and range
  const FLOAT_PARAMS = [
    { range: 55, minInt:  700, intRange: 1800, lerp: 0.014 },
    { range: 80, minInt: 1100, intRange: 2600, lerp: 0.009 },
    { range: 45, minInt:  500, intRange: 1400, lerp: 0.019 },
  ];
  const floatStates = orbits.map(() => ({ x: 0, y: 0, tx: 0, ty: 0, next: 0 }));

  // Single global float — whole assembly drifts as one unit
  const unitFloat  = { x: 0, y: 0, tx: 0, ty: 0, next: 0 };
  const UNIT_FLOAT = { range: 48, minInt: 3200, intRange: 4800, lerp: 0.004 };

  // Ellipse perimeter (Ramanujan) — same for all orbits since rx/ry are equal
  const _orbH    = ((orbits[0].rx - orbits[0].ry) / (orbits[0].rx + orbits[0].ry)) ** 2;
  const ORB_PERIM = Math.PI * (orbits[0].rx + orbits[0].ry) *
                    (1 + 3 * _orbH / (10 + Math.sqrt(4 - 3 * _orbH)));

  const TRAIL_LEN = 28;
  // Two electrons per orbit, offset 180° apart
  const atoms = [];
  orbits.forEach((_, i) => {
    const base = (i * Math.PI * 2) / 3;
    atoms.push({ orbitIdx: i, angle: base,             trail: [] });
    atoms.push({ orbitIdx: i, angle: base + Math.PI,   trail: [] });
  });

  function orbitalPoint(o, angle, gRot, fx, fy) {
    const ex   = o.rx * Math.cos(angle);
    const ey   = o.ry * Math.sin(angle);
    const tilt = o.tilt + gRot;
    const c    = Math.cos(tilt);
    const s    = Math.sin(tilt);
    return { x: cx + fx + ex * c - ey * s, y: cy + fy + ex * s + ey * c };
  }

  function drawOrbits(gRot, t, ux, uy) {
    // Per-orbit animation: lineWidth and dash gap each oscillate independently
    const ANIM = [
      { dot:  5, gapMin:  8, gapMax: 24, lwFreq: 0.32, lwPh: 0.0, gFreq: 0.52, gPh: 0.0 },
      { dot:  9, gapMin: 14, gapMax: 40, lwFreq: 0.57, lwPh: 2.1, gFreq: 0.88, gPh: 3.1 },
      { dot: 14, gapMin: 18, gapMax: 56, lwFreq: 0.78, lwPh: 4.2, gFreq: 1.18, gPh: 5.8 },
    ];
    ctx.globalAlpha = 0.72;
    orbits.forEach((o, i) => {
      const fs   = floatStates[i];
      const a    = ANIM[i];
      const lw   = 3.5 + (Math.sin(t * a.lwFreq + a.lwPh) * 0.5 + 0.5) * 4.5;  // 3.5–8.0
      const gap  = a.gapMin + (Math.sin(t * a.gFreq + a.gPh) * 0.5 + 0.5) * (a.gapMax - a.gapMin);
      const frac = Math.sin(t * CLR_FREQ[i] + CLR_PH[i]) * 0.5 + 0.5;
      ctx.strokeStyle = lerpRGB(PINK_RGB, o.rgba, frac);
      ctx.lineWidth   = lw;
      ctx.setLineDash([a.dot, gap]);
      // Dash starts at electron, extends clockwise — dot leads, line follows
      const p = (atoms[i * 2].angle / (2 * Math.PI)) * ORB_PERIM;
      ctx.lineDashOffset = -p;
      ctx.save();
      ctx.translate(cx + fs.x + ux, cy + fs.y + uy);
      ctx.rotate(o.tilt + gRot);
      ctx.beginPath();
      ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.globalAlpha    = 1;
  }

  const SPEED_MOD = [
    { freq: 0.38, phase: 0.0 },
    { freq: 0.55, phase: 2.1 },
    { freq: 0.28, phase: 4.2 },
  ];

  function drawAtoms(gRot, t, ux, uy) {
    atoms.forEach((atom) => {
      const i         = atom.orbitIdx;
      const o         = orbits[i];
      const [r, g, b] = o.rgba;
      const fs        = floatStates[i];

      atom.trail.push(atom.angle);
      if (atom.trail.length > TRAIL_LEN) atom.trail.shift();

      const pos = orbitalPoint(o, atom.angle, gRot, fs.x + ux, fs.y + uy);

      // Trail
      atom.trail.forEach((a, ti) => {
        const frac = ti / TRAIL_LEN;
        const tp   = orbitalPoint(o, a, gRot, fs.x + ux, fs.y + uy);
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 3 + frac * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${frac * 0.55})`;
        ctx.fill();
      });

      // Glow halo
      const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 40);
      grd.addColorStop(0,    `rgba(${r},${g},${b},0.85)`);
      grd.addColorStop(0.45, `rgba(${r},${g},${b},0.30)`);
      grd.addColorStop(1,    `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 40, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();

      const sm = SPEED_MOD[i];
      atom.angle += o.speed * (0.35 + (Math.sin(t * sm.freq + sm.phase) * 0.5 + 0.5) * 1.3);
    });
  }

  function drawNucleus(ux, uy) {
    const nx = cx + ux, ny = cy + uy;
    const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 190);
    grd.addColorStop(0,   'rgba(100, 76, 220, 0.28)');
    grd.addColorStop(0.5, 'rgba(70,  50, 170, 0.12)');
    grd.addColorStop(1,   'rgba(20,  15,  50, 0)');
    ctx.beginPath();
    ctx.arc(nx, ny, 95, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function drawText(textRot, t, ux, uy) {
    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    // "20+" — pulsing pink glow, white fill, pure white stroke
    ctx.save();
    ctx.translate(cx + ux, cy + uy + 8);
    ctx.rotate(textRot);
    ctx.font     = '900 256px Poppins, sans-serif';
    ctx.lineJoin = 'round';

    const pulse     = Math.sin(t * 2.2) * 0.5 + 0.5;   // 0 → 1
    const plusPulse = Math.sin(t * 6.0) * 0.5 + 0.5;   // fast 0 → 1

    // Glow pass (pulsing, whole string) — #E0115E matches hero title pink
    ctx.shadowColor = '#E0115E';
    ctx.shadowBlur  = 55 + pulse * 140;
    ctx.globalAlpha = 0.45 + pulse * 0.55;
    ctx.fillStyle   = '#E0115E';
    ctx.fillText('20+', 0, 0);

    // Two-colour solid fill: "20" white, "+" hero-title pink pulsing fast
    ctx.shadowBlur  = 0;
    ctx.shadowColor = 'transparent';
    ctx.textAlign   = 'left';
    const wFull  = ctx.measureText('20+').width;
    const w20    = ctx.measureText('20').width;
    const startX = -(wFull / 2);

    ctx.globalAlpha = 1;
    ctx.fillStyle   = '#ffffff';
    ctx.fillText('20', startX, 0);

    ctx.globalAlpha = 1;
    ctx.fillStyle   = lerpRGB([224, 17, 94], [255, 255, 255], plusPulse);
    ctx.fillText('+', startX + w20, 0);

    // Stroke on + only
    ctx.lineWidth   = 5;
    ctx.strokeStyle = lerpRGB([224, 17, 94], [255, 255, 255], plusPulse);
    ctx.strokeText('+', startX + w20, 0);

    ctx.restore();

    // Subtitle
    ctx.font        = '600 34px Poppins, sans-serif';
    try { ctx.letterSpacing = '0.2em'; } catch (_) {}
    ctx.fillStyle   = '#B8A8F7';
    ctx.globalAlpha = 0.82;
    ctx.fillText('YEARS OF DESIGN', cx + ux, cy + uy + 108);

    ctx.restore();
  }

  let rafId = null;

  function frame(timestamp) {
    const t    = timestamp * 0.001;
    const gRot = t * 0.10;
    const textRot = Math.sin(t * 0.35) * (5 * Math.PI / 180);

    // Per-orbit independent drift
    floatStates.forEach((fs, i) => {
      const p = FLOAT_PARAMS[i];
      if (timestamp > fs.next) {
        fs.tx   = (Math.random() - 0.5) * p.range;
        fs.ty   = (Math.random() - 0.5) * p.range;
        fs.next = timestamp + p.minInt + Math.random() * p.intRange;
      }
      fs.x += (fs.tx - fs.x) * p.lerp;
      fs.y += (fs.ty - fs.y) * p.lerp;
    });

    // Whole-assembly unit float
    if (timestamp > unitFloat.next) {
      unitFloat.tx   = (Math.random() - 0.5) * UNIT_FLOAT.range;
      unitFloat.ty   = (Math.random() - 0.5) * UNIT_FLOAT.range;
      unitFloat.next = timestamp + UNIT_FLOAT.minInt + Math.random() * UNIT_FLOAT.intRange;
    }
    unitFloat.x += (unitFloat.tx - unitFloat.x) * UNIT_FLOAT.lerp;
    unitFloat.y += (unitFloat.ty - unitFloat.y) * UNIT_FLOAT.lerp;

    const ux = unitFloat.x;
    const uy = unitFloat.y;

    ctx.clearRect(0, 0, SIZE, SIZE);

    drawNucleus(ux, uy);
    drawOrbits(gRot, t, ux, uy);
    drawAtoms(gRot, t, ux, uy);
    drawText(textRot, t, ux, uy);
    rafId = requestAnimationFrame(frame);
  }

  // Pause when tab is hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(frame);
    }
  });

  // Wait for Poppins to load before first draw
  document.fonts.ready.then(() => {
    rafId = requestAnimationFrame(frame);
  });
})();

/* ─── LEGACY DESIGNS FLIPBOOKS ──────────────────────────────── */
(function () {
  const tabs   = Array.from(document.querySelectorAll('.legacy-tab'));
  const panels = Array.from(document.querySelectorAll('.book-panel'));
  if (!tabs.length) return;

  // Lazy-load state per book
  const bookState = panels.map(() => ({ loaded: false, pageFlip: null, totalPages: 0 }));

  /* ── Tab switching ── */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panels[i].classList.add('active');
      if (!bookState[i].loaded) loadBook(i);
    });
  });

  /* ── Book controls (prev/next/pagenums) ── */
  panels.forEach((panel, i) => {
    const prevBtn  = panel.querySelector('.book-prev');
    const nextBtn  = panel.querySelector('.book-next');
    const pageNum  = panel.querySelector('.book-pagenum');

    prevBtn.addEventListener('click', () => {
      const pf = bookState[i].pageFlip;
      if (pf) pf.flipPrev('bottom');
    });
    nextBtn.addEventListener('click', () => {
      const pf = bookState[i].pageFlip;
      if (pf) pf.flipNext('bottom');
    });

    // store refs for update calls
    bookState[i].prevBtn = prevBtn;
    bookState[i].nextBtn = nextBtn;
    bookState[i].pageNum = pageNum;
  });

  function updateControls(i) {
    const state = bookState[i];
    const pf    = state.pageFlip;
    if (!pf) return;
    const cur   = pf.getCurrentPageIndex();
    const total = state.totalPages;
    const isPortrait = pf.getOrientation() === 'portrait';
    const spread = isPortrait ? 1 : 2;
    state.prevBtn.disabled = cur <= 0;
    state.nextBtn.disabled = cur + spread >= total;
    const displayPage = cur + 1;
    state.pageNum.textContent = `${displayPage} / ${total}`;
  }

  /* ── Load a single book lazily ── */
  function loadBook(i) {
    if (bookState[i].loaded) return;
    bookState[i].loaded = true;

    const panel     = panels[i];
    const loadingEl = panel.querySelector('.book-loading');
    const container = panel.querySelector('.stf-container');

    if (!window.pdfjsLib || !window.St) {
      loadingEl.querySelector('span').textContent = 'Libraries not available.';
      return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const pdfUrl = panel.dataset.pdf;

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      const totalPages = pdf.numPages;
      bookState[i].totalPages = totalPages;

      /* ── Work out dimensions from first page ── */
      return pdf.getPage(1).then(firstPage => {
        const vp       = firstPage.getViewport({ scale: 1 });
        const maxW     = Math.min(container.offsetWidth || window.innerWidth * 0.9, 960);
        const isPort   = window.innerWidth < 640;
        const bookW    = isPort ? Math.floor(maxW) : Math.floor(maxW / 2);
        const scale    = bookW / vp.width;
        const pageW    = Math.round(vp.width  * scale);
        const pageH    = Math.round(vp.height * scale);

        /* ── Pre-create one canvas per page ── */
        const canvases = [];
        for (let p = 0; p < totalPages; p++) {
          const c = document.createElement('canvas');
          c.width  = pageW;
          c.height = pageH;
          canvases.push(c);
        }

        /* ── Init StPageFlip ── */
        const pf = new St.PageFlip(container, {
          width:       pageW,
          height:      pageH,
          size:        'fixed',
          minWidth:    pageW,
          maxWidth:    pageW,
          minHeight:   pageH,
          maxHeight:   pageH,
          usePortrait: isPort,
          drawShadow:  true,
          flippingTime: 700,
          useMouseEvents: true,
          swipeDistance: 40,
          showCover: false,
          mobileScrollSupport: true,
          startPage: 0,
        });

        pf.loadFromHTML(canvases);
        pf.on('flip', () => updateControls(i));
        pf.on('changeState', () => updateControls(i));
        bookState[i].pageFlip = pf;

        loadingEl.classList.add('hidden');
        updateControls(i);

        /* ── Render pages progressively ── */
        async function renderPages() {
          for (let p = 0; p < totalPages; p++) {
            const page    = await pdf.getPage(p + 1);
            const vpScaled = page.getViewport({ scale });
            const canvas  = canvases[p];
            const ctx     = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport: vpScaled }).promise;
            pf.update();
          }
        }
        renderPages();
      });
    }).catch(err => {
      console.error('PDF load error:', err);
      loadingEl.querySelector('span').textContent = 'Could not load PDF.';
    });
  }

  /* ── Auto-load the first (active) book ── */
  const firstActive = panels.findIndex(p => p.classList.contains('active'));
  if (firstActive >= 0) {
    // defer until after PDF.js / page-flip scripts have definitely executed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => loadBook(firstActive));
    } else {
      loadBook(firstActive);
    }
  }
})();

/* ─── MEDIA OPEN / DOWNLOAD ACTIONS ────────────────────────── */
(function () {
  const ICON_OPEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const ICON_DL   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

  function attachDl(url) {
    return url.replace('/upload/', '/upload/fl_attachment/');
  }

  function overlayBtns(openUrl, dlHref, filename) {
    const wrap = document.createElement('div');
    wrap.className = 'media-actions';
    const dlAttr = filename ? `download="${filename}"` : 'download';
    wrap.innerHTML = `
      <a class="media-action-btn" href="${openUrl}" target="_blank" rel="noopener" title="Open in new window">${ICON_OPEN}</a>
      <a class="media-action-btn" href="${dlHref}" ${dlAttr} title="Download">${ICON_DL}</a>`;
    wrap.addEventListener('click', e => e.stopPropagation());
    return wrap;
  }

  function inlineBtns(openUrl, dlHref, filename) {
    const wrap = document.createElement('div');
    wrap.className = 'inline-actions';
    const dlAttr = filename ? `download="${filename}"` : 'download';
    wrap.innerHTML = `
      <a class="inline-action-btn" href="${openUrl}" target="_blank" rel="noopener">${ICON_OPEN}&nbsp;Open</a>
      <a class="inline-action-btn" href="${dlHref}" ${dlAttr}>${ICON_DL}&nbsp;Download</a>`;
    return wrap;
  }

  /* ── Art thumbnails (28 images) ── */
  document.querySelectorAll('.art-thumb').forEach(thumb => {
    const full = thumb.dataset.full;
    if (!full) return;
    thumb.appendChild(overlayBtns(full, attachDl(full)));
  });

  /* ── Case card images (3) ── */
  document.querySelectorAll('.case-image').forEach(ci => {
    const img = ci.querySelector('img');
    if (!img) return;
    const full = img.getAttribute('src')
      .replace(/w_\d+,h_\d+,c_fill,q_auto/, 'w_1600,q_auto')
      .replace(/w_\d+,h_\d+,c_fill/, 'w_1600');
    ci.appendChild(overlayBtns(full, attachDl(full)));
  });

  /* ── Animation thumbnails (32) — built by buildAnimGrid ── */
  const CDN_V = 'https://res.cloudinary.com/dksariyyz/video/upload';
  document.querySelectorAll('.anim-thumb').forEach(thumb => {
    const id    = thumb.dataset.id;
    const label = thumb.dataset.label || 'animation';
    if (!id) return;
    const openUrl = `${CDN_V}/q_auto,vc_auto/${id}.mp4`;
    const dlHref  = `${CDN_V}/fl_attachment,q_auto/${id}.mp4`;
    thumb.appendChild(overlayBtns(openUrl, dlHref, `${label}.mp4`));
  });

  /* ── Video cards (4) ── */
  document.querySelectorAll('.video-card').forEach(card => {
    const src = card.querySelector('source');
    if (!src) return;
    const url  = src.getAttribute('src');
    const body = card.querySelector('.video-card-body');
    if (body) body.appendChild(inlineBtns(url, attachDl(url)));
  });

  /* ── Showreel ── */
  const showreelEmbed = document.querySelector('.showreel-embed');
  if (showreelEmbed) {
    const src = showreelEmbed.querySelector('source');
    if (src) {
      const url = src.getAttribute('src');
      showreelEmbed.insertAdjacentElement('afterend', inlineBtns(url, attachDl(url)));
    }
  }

  /* ── Legacy PDF panels (3) ── */
  document.querySelectorAll('.book-panel').forEach(panel => {
    const pdfUrl = panel.dataset.pdf;
    if (!pdfUrl) return;
    const filename = pdfUrl.split('/').pop();
    const controls = panel.querySelector('.book-controls');
    if (!controls) return;
    const wrap = document.createElement('div');
    wrap.className = 'inline-actions';
    wrap.style.justifyContent = 'center';
    wrap.innerHTML = `
      <a class="inline-action-btn" href="${pdfUrl}" target="_blank" rel="noopener">${ICON_OPEN}&nbsp;Open PDF</a>
      <a class="inline-action-btn" href="${pdfUrl}" download="${filename}">${ICON_DL}&nbsp;Download PDF</a>`;
    controls.insertAdjacentElement('afterend', wrap);
  });

  /* ── Certification reel tiles (image-based) ── */
  document.querySelectorAll('.cert-tile:not(.cert-pdf-tile)').forEach(tile => {
    const img = tile.querySelector('img');
    if (!img) return;
    const src     = img.getAttribute('src');
    const openUrl = src.replace(/h_\d+,q_auto/, 'q_auto');
    const dlHref  = src.replace(/h_\d+,q_auto/, 'fl_attachment,q_auto');
    tile.appendChild(overlayBtns(openUrl, dlHref));
  });

  /* ── Certification reel tiles (PDF-based) ── */
  document.querySelectorAll('.cert-pdf-tile[data-cert-pdf]').forEach(tile => {
    const pdfUrl = tile.dataset.certPdf;
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const scale = tile.clientHeight / page.getViewport({ scale: 1 }).height;
        const vp    = page.getViewport({ scale: scale * window.devicePixelRatio });
        const canvas = document.createElement('canvas');
        canvas.width  = vp.width;
        canvas.height = vp.height;
        canvas.style.cssText = 'height:100%;width:auto;display:block;';
        tile.appendChild(canvas);
        page.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
        tile.appendChild(overlayBtns(pdfUrl, pdfUrl));
      });
    });
  });

  /* ── UX|UI Design Showcase strip (7 images) ── */
  document.querySelectorAll('.ui-strip-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    const src    = img.getAttribute('src');
    const openUrl = src.replace(/q_auto,w_\d+/, 'q_auto');
    const dlHref  = src.replace(/q_auto,w_\d+/, 'fl_attachment,q_auto');
    item.appendChild(overlayBtns(openUrl, dlHref));
  });

  /* ── UX diploma + Wonderlabz doc scrollers (image-based) ── */
  document.querySelectorAll('.ux-doc-scroll').forEach(docScroll => {
    const img = docScroll.querySelector('img');
    if (!img) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'ux-doc-wrap';
    docScroll.parentNode.insertBefore(wrapper, docScroll);
    wrapper.appendChild(docScroll);
    const src     = img.getAttribute('src');
    const openUrl = src.replace(/f_jpg,q_auto,w_\d+/, 'f_jpg,q_auto');
    const dlHref  = src.replace(/f_jpg,q_auto,w_\d+/, 'fl_attachment,f_jpg,q_auto');
    wrapper.appendChild(overlayBtns(openUrl, dlHref));
  });

  /* ── UX diploma PDF viewers (Projects 8 & 10) ── */
  document.querySelectorAll('.ux-pdf-doc[data-pdf]').forEach(pdfDoc => {
    const pdfUrl = pdfDoc.dataset.pdf;
    const wrapper = document.createElement('div');
    wrapper.className = 'ux-doc-wrap';
    pdfDoc.parentNode.insertBefore(wrapper, pdfDoc);
    wrapper.appendChild(pdfDoc);
    wrapper.appendChild(overlayBtns(pdfUrl, pdfUrl));
  });

  /* ── Image lightbox — open + download current image ── */
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  if (lb && lbImg) {
    const bar = document.createElement('div');
    bar.className = 'lightbox-action-bar';
    bar.innerHTML = `
      <a class="lightbox-action-btn" id="lbOpenBtn" href="#" target="_blank" rel="noopener" title="Open in new window">${ICON_OPEN}</a>
      <a class="lightbox-action-btn" id="lbDlBtn" href="#" download title="Download">${ICON_DL}</a>`;
    lb.appendChild(bar);
    const openBtn = document.getElementById('lbOpenBtn');
    const dlBtn   = document.getElementById('lbDlBtn');
    new MutationObserver(() => {
      const src = lbImg.src;
      if (src && src !== window.location.href) {
        openBtn.href = src;
        dlBtn.href   = attachDl(src);
      }
    }).observe(lbImg, { attributes: true, attributeFilter: ['src'] });
  }

  /* ── Video lightbox — open + download current video ── */
  const vlb    = document.getElementById('videoLightbox');
  const vlbVid = document.getElementById('videoLightboxVid');
  if (vlb && vlbVid) {
    const bar = document.createElement('div');
    bar.className = 'lightbox-action-bar';
    bar.innerHTML = `
      <a class="lightbox-action-btn" id="vlbOpenBtn" href="#" target="_blank" rel="noopener" title="Open in new window">${ICON_OPEN}</a>
      <a class="lightbox-action-btn" id="vlbDlBtn" href="#" download title="Download">${ICON_DL}</a>`;
    vlb.appendChild(bar);
    const openBtn = document.getElementById('vlbOpenBtn');
    const dlBtn   = document.getElementById('vlbDlBtn');
    new MutationObserver(() => {
      const src = vlbVid.src;
      if (src && src !== window.location.href) {
        openBtn.href = src;
        dlBtn.href   = attachDl(src);
      }
    }).observe(vlbVid, { attributes: true, attributeFilter: ['src'] });
  }
})();

/* ─── UX DIPLOMA PDF VIEWERS ────────────────────────────────── */
(function () {
  const viewers = document.querySelectorAll('.ux-pdf-doc[data-pdf]');
  if (!viewers.length) return;

  function renderPdf(container) {
    const pdfUrl = container.dataset.pdf;
    const loading = container.querySelector('.ux-pdf-loading');

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      if (loading) loading.remove();

      async function renderPages() {
        for (let p = 1; p <= pdf.numPages; p++) {
          const page = await pdf.getPage(p);
          const scale = container.clientWidth / page.getViewport({ scale: 1 }).width;
          const vp    = page.getViewport({ scale: scale * window.devicePixelRatio });

          const canvas = document.createElement('canvas');
          canvas.width  = vp.width;
          canvas.height = vp.height;
          container.appendChild(canvas);

          await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        }
      }
      renderPages();
    }).catch(() => {
      if (loading) loading.querySelector('span').textContent = 'Unable to load document.';
    });
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        renderPdf(entry.target);
      }
    });
  }, { threshold: 0.05 });

  viewers.forEach(v => obs.observe(v));
})();

/* ─── iGAMING UI CARDS — View Project click handler ────────── */
(function () {
  document.querySelectorAll('.ui-card-img').forEach(cardImg => {
    const img = cardImg.querySelector('img');
    if (!img) return;
    const src = img.getAttribute('src');
    // Strip crop/size transforms for both /video/upload and /image/upload thumbnails
    const fullUrl = src
      .replace(/f_jpg,q_auto,w_\d+,h_\d+,c_fill,so_\d+/, 'f_jpg,q_auto')
      .replace(/q_auto,w_\d+,h_\d+,c_fill/, 'q_auto');
    cardImg.style.cursor = 'pointer';
    cardImg.addEventListener('click', () => window.open(fullUrl, '_blank', 'noopener'));
  });
})();

/* ─── CERT GALLERY DRAG-TO-SCROLL ──────────────────────────── */
(function () {
  const wrap = document.querySelector('.cert-scroll-wrap');
  if (!wrap) return;
  let isDown = false, startX, scrollLeft;
  wrap.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });
  wrap.addEventListener('mouseleave', () => { isDown = false; });
  wrap.addEventListener('mouseup',    () => { isDown = false; });
  wrap.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.2;
    wrap.scrollLeft = scrollLeft - walk;
  });
})();

/* ─── SECTION NAV BUTTONS ───────────────────────────────────── */
(function () {
  const upBtn   = document.getElementById('sectionNavUp');
  const downBtn = document.getElementById('sectionNavDown');
  if (!upBtn || !downBtn) return;

  const sectionIds = [
    'hero','about','ux','work','showreel','videos','animations',
    'artistic','credential','skills','software','resume','legacy','contact'
  ];

  function getSections() {
    return sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  }

  function currentIndex(sections) {
    const mid = window.innerHeight / 2;
    let best = 0;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= mid) best = i;
    });
    return best;
  }

  function updateButtons() {
    const sections = getSections();
    const idx = currentIndex(sections);
    upBtn.disabled   = idx <= 0;
    downBtn.disabled = idx >= sections.length - 1;
  }

  function scrollTo(section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  upBtn.addEventListener('click', () => {
    const sections = getSections();
    const idx = currentIndex(sections);
    if (idx > 0) scrollTo(sections[idx - 1]);
  });

  downBtn.addEventListener('click', () => {
    const sections = getSections();
    const idx = currentIndex(sections);
    if (idx < sections.length - 1) scrollTo(sections[idx + 1]);
  });

  window.addEventListener('scroll', updateButtons, { passive: true });
  updateButtons();
})();

/* ─── BACKGROUND MUSIC PLAYER ───────────────────────────────── */
(function () {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Pause background music');
      audio.play().catch(() => {
        btn.classList.remove('playing');
        btn.setAttribute('aria-label', 'Play background music');
      });
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play background music');
    }
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
    btn.setAttribute('aria-label', 'Play background music');
  });
})();

/* ─── UX WHEEL ELECTRON ─────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('uxWheelCanvas');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const SIZE = 500;
  const CX = 250, CY = 250, R = 170;
  const PINK = [224, 17, 94];
  const TRAIL_LEN = 36;
  const SPEED = 0.016;
  const TAU = 2 * Math.PI;

  const nodeEls = [1,2,3,4,5].map(n => document.querySelector('.uw-node-' + n));

  // Node centres in 500×500 coordinate space (match CSS: left%*500, top%*500)
  const nodePos = [
    { x: 250, y: 80  },  // node-1: 50%,   16%
    { x: 412, y: 198 },  // node-2: 82.4%, 39.6%
    { x: 350, y: 388 },  // node-3: 70%,   77.6%
    { x: 150, y: 388 },  // node-4: 30%,   77.6%
    { x: 88,  y: 198 },  // node-5: 17.6%, 39.6%
  ];
  const PROXIMITY_PX = 60; // distance in 500px space (~20° of arc)
  const LINGER_MS    = 800; // pink stays this long after electron passes
  const lingerTimers = new Array(5).fill(null);

  let sc = 1;
  let angle = (TAU - Math.PI / 2) % TAU;
  const trail = [];

  function resize() {
    const dpr  = window.devicePixelRatio || 1;
    const side = canvas.offsetWidth;
    canvas.width  = side * dpr;
    canvas.height = side * dpr;
    sc = (side * dpr) / SIZE;
  }

  resize();
  window.addEventListener('resize', resize);

  function frame() {
    // Canvas hidden on mobile — clear lingering state and idle
    if (!canvas.offsetWidth) {
      nodeEls.forEach((el, i) => {
        if (lingerTimers[i]) { clearTimeout(lingerTimers[i]); lingerTimers[i] = null; }
        if (el) el.classList.remove('electron-near');
      });
      requestAnimationFrame(frame);
      return;
    }

    ctx.setTransform(sc, 0, 0, sc, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);

    angle = (angle + SPEED) % TAU;
    trail.push(angle);
    if (trail.length > TRAIL_LEN) trail.shift();

    const px = CX + R * Math.cos(angle);
    const py = CY + R * Math.sin(angle);

    // Highlight nodes when electron is nearby; linger for LINGER_MS after passing
    nodeEls.forEach((el, i) => {
      if (!el) return;
      const isNear = Math.hypot(px - nodePos[i].x, py - nodePos[i].y) < PROXIMITY_PX;
      if (isNear) {
        if (lingerTimers[i]) { clearTimeout(lingerTimers[i]); lingerTimers[i] = null; }
        el.classList.add('electron-near');
      } else if (el.classList.contains('electron-near') && !lingerTimers[i]) {
        lingerTimers[i] = setTimeout(() => {
          el.classList.remove('electron-near');
          lingerTimers[i] = null;
        }, LINGER_MS);
      }
    });

    // Trail
    trail.forEach((a, ti) => {
      const frac = ti / TRAIL_LEN;
      const tx = CX + R * Math.cos(a);
      const ty = CY + R * Math.sin(a);
      ctx.beginPath();
      ctx.arc(tx, ty, 2 + frac * 7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PINK[0]},${PINK[1]},${PINK[2]},${frac * 0.5})`;
      ctx.fill();
    });

    // Glow halo
    const grd = ctx.createRadialGradient(px, py, 0, px, py, 48);
    grd.addColorStop(0,    `rgba(${PINK[0]},${PINK[1]},${PINK[2]},0.88)`);
    grd.addColorStop(0.45, `rgba(${PINK[0]},${PINK[1]},${PINK[2]},0.28)`);
    grd.addColorStop(1,    `rgba(${PINK[0]},${PINK[1]},${PINK[2]},0)`);
    ctx.beginPath();
    ctx.arc(px, py, 48, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(px, py, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#E0115E';
    ctx.fill();

    requestAnimationFrame(frame);
  }

  frame();
})();
