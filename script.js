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
    thumb.addEventListener('mouseenter', () => { vid.load(); vid.play(); });
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
// HERO CANVAS — ATOMIC ORBIT
// ===========================
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const SIZE = 460;
  canvas.width  = SIZE * dpr;
  canvas.height = SIZE * dpr;
  ctx.scale(dpr, dpr);

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  // Three orbital rings evenly spaced at 120° (π*2/3 rad) apart
  const T = Math.PI * 2 / 3;
  const orbits = [
    { rx: 162, ry: 62, tilt: 0,     speed:  0.0080, color: '#B8A8F7', rgba: [184, 168, 247] },
    { rx: 162, ry: 62, tilt: T,     speed: -0.0062, color: '#E0115E', rgba: [224,  17,  94] },
    { rx: 162, ry: 62, tilt: T * 2, speed:  0.0048, color: '#c8c8f0', rgba: [200, 200, 240] },
  ];

  const TRAIL_LEN = 28;
  const atoms = orbits.map((_, i) => ({
    angle: (i * Math.PI * 2) / 3,
    trail: []
  }));

  function orbitalPoint(o, angle) {
    const ex = o.rx * Math.cos(angle);
    const ey = o.ry * Math.sin(angle);
    const c  = Math.cos(o.tilt);
    const s  = Math.sin(o.tilt);
    return { x: cx + ex * c - ey * s, y: cy + ex * s + ey * c };
  }

  function drawOrbits(dashOff) {
    ctx.setLineDash([2.5, 6.5]);
    ctx.lineDashOffset = dashOff;
    ctx.strokeStyle    = '#ffffff';
    ctx.globalAlpha    = 0.28;
    ctx.lineWidth      = 1.1;
    orbits.forEach(o => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(o.tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.globalAlpha    = 1;
  }

  function drawAtoms() {
    atoms.forEach((atom, i) => {
      const o        = orbits[i];
      const [r, g, b] = o.rgba;
      const pos      = orbitalPoint(o, atom.angle);

      // Record trail position before advancing
      atom.trail.push({ x: pos.x, y: pos.y });
      if (atom.trail.length > TRAIL_LEN) atom.trail.shift();

      // Trail — fades and shrinks toward the tail
      atom.trail.forEach((p, ti) => {
        const frac   = ti / TRAIL_LEN;
        const alpha  = frac * 0.55;
        const radius = 1.5 + frac * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      });

      // Glow halo
      const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 20);
      grd.addColorStop(0,    `rgba(${r},${g},${b},0.85)`);
      grd.addColorStop(0.45, `rgba(${r},${g},${b},0.30)`);
      grd.addColorStop(1,    `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();

      atom.angle += o.speed;
    });
  }

  function drawNucleus() {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 95);
    grd.addColorStop(0,   'rgba(100, 76, 220, 0.28)');
    grd.addColorStop(0.5, 'rgba(70,  50, 170, 0.12)');
    grd.addColorStop(1,   'rgba(20,  15,  50, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function drawText() {
    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    // "20+" — glow layer then crisp white fill
    ctx.font = 'bold 86px Poppins, sans-serif';

    ctx.shadowColor  = '#B8A8F7';
    ctx.shadowBlur   = 48;
    ctx.globalAlpha  = 0.55;
    ctx.fillStyle    = '#B8A8F7';
    ctx.fillText('20+', cx, cy - 14);

    ctx.shadowBlur   = 22;
    ctx.globalAlpha  = 1;
    ctx.fillStyle    = '#ffffff';
    ctx.fillText('20+', cx, cy - 14);

    ctx.shadowBlur  = 0;
    ctx.shadowColor = 'transparent';

    // "YEARS OF DESIGN" subtitle
    ctx.font        = '600 11px Poppins, sans-serif';
    try { ctx.letterSpacing = '0.2em'; } catch (_) {}
    ctx.fillStyle   = '#B8A8F7';
    ctx.globalAlpha = 0.82;
    ctx.fillText('YEARS OF DESIGN', cx, cy + 44);

    ctx.restore();
  }

  let rafId = null;

  function frame(timestamp) {
    const t       = timestamp * 0.001;                // seconds
    const dashOff = -(t * 22);                        // slow dot crawl along paths
    const floatX  = Math.sin(t * 0.38) * 4;          // gentle sway
    const floatY  = Math.sin(t * 0.55) * 7;          // gentle bob

    ctx.clearRect(0, 0, SIZE, SIZE);

    ctx.save();
    ctx.translate(floatX, floatY);   // whole scene floats together

    drawNucleus();
    drawOrbits(dashOff);
    drawAtoms();
    drawText();

    ctx.restore();
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
