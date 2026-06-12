// ===========================
// THEME TOGGLE
// ===========================
(function () {
  const root   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    localStorage.setItem('jn-theme', theme);
  }

  btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });
})();

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

// Contact form — Web3Forms
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json();
    if (data.success) {
      form.reset();
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    } else {
      alert('Something went wrong. Please try again or email me directly.');
    }
  } catch {
    alert('Could not send message. Please check your connection and try again.');
  }

  btn.textContent = 'Send Message';
  btn.disabled = false;
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
// RECOMMENDATION REFERENCE MODAL
// ===========================
(function () {
  const modal = document.getElementById('referenceModal');
  if (!modal) return;

  const nameEl   = document.getElementById('referenceModalName');
  const roleEl   = document.getElementById('referenceModalRole');
  const textEl   = document.getElementById('referenceModalText');
  const closeBtn = document.getElementById('referenceModalClose');

  const REFERENCES = {
    'anne-jacobson': {
      name: 'Anne Jacobson',
      role: 'General Manager',
      text: `I am delighted to provide this reference for Jonathan Nestler, whom I had the pleasure of working with. Jonathan consistently demonstrated exceptional creativity, professionalism, and dedication. He went from Product Designer on to lead UX/UI product design across multiple portfolio brands. In this role, he played a key part in shaping product experiences, integrating Claude AI into Figma-based design workflows, driving continuous integration development initiatives, creating slot game animations, and developing cross-platform UI prototypes. Jonathan also led the creation of design collateral across multiple portfolio brands, delivering high-quality UI/UX prototypes, corporate identity systems, illustrations, and VFX animations for online slot games and digital media campaigns. His ability to combine strategic thinking with strong visual design skills consistently resulted in outstanding work that elevated both the products and brands he supported. Beyond his technical and creative expertise, Jonathan is a true team player and an outstanding collaborator. He brings positive energy to every project and is always willing to contribute ideas that improve processes, products, and outcomes. His creativity, initiative, and enthusiasm make him a valued member of any team. Jonathan is exceptionally easy to work with, dependable, and committed to excellence. He consistently goes the extra mile to ensure tasks are completed to the highest possible standard and takes great pride in delivering flawless results. His strong work ethic, attention to detail, and willingness to support colleagues make him a genuine asset to any organization. I have no hesitation in recommending Jonathan for any role that requires creativity, innovation, leadership, and collaboration. Any organization would be fortunate to have him on their team.`
    },
    'hendrik-groenewald': {
      name: 'Hendrik Groenewald',
      role: 'Art Director',
      text: `I highly recommend Jonathan without hesitation. Having worked with him for several years, I can confidently say that he is an incredibly talented and creative graphic designer. His ability to generate innovative ideas and deliver high-quality work consistently sets him apart. Not only is he a fast learner, but his broad skill set allows him to tackle a wide range of design challenges with ease. Beyond his technical skills, Jonathan is also a fantastic collaborator. He is always willing to share his knowledge with others and is open to learning new techniques himself. His positive attitude and strong work ethic make him an invaluable asset to any team. If you're looking for someone with both exceptional creativity and a willingness to grow, Jonathan is the perfect choice. I am proud to have been his mentor and manager.`
    },
    'vanessa-bohling': {
      name: 'Vanessa Bohling',
      role: 'Executive Support & Admin Controller',
      text: `I had the pleasure of working with Jonathan for just over a year. He was always a calm and dependable team member. His quiet demeanour and low maintenance competence in the workplace brought a good balance to the team. He was adaptable and showed great patience in dealing with constant changes and conflicting information and ideas that were brought to him. He brought a special artistic flair to the branding, multimedia, videos, and website design. Creative and logical with exceptional technical and organizational skills. Jonathan was always courteous and helpful with a wonderful quick wit and unique sense of humour. Jonathan is an asset to any team or organization.`
    },
    'elizabeth-joss-bethlehem': {
      name: 'Elizabeth Joss-Bethlehem',
      role: 'Managing Director & Founder',
      text: `Jonathan is a hard worker who pays exceptional attention to detail in all he does. He is a creative through and through and goes above and beyond to produce the best possible work according to the brief. He faces challenging tasks with ease and dedication. I thoroughly enjoyed working with him as he is a likeable, professional, open and interesting people's person. I hope we can work together on projects in the future.`
    },
    'justin-gieselbach': {
      name: 'Justin Gieselbach',
      role: 'Creative Leader',
      text: `Jonathan is an extremely dedicated designer, creative leader and workhorse in all of his endeavors. I had the pleasure of working with him over several years and have seen him grow exponentially into a truly innovative designer, going above and beyond in all the projects we were involved in. Jonathan has extensive experience in UI/UX as well as other fields such as video editing, photography, animation and front-end development. I have no hesitation in recommending Jonathan as his work ethic has been an inspiration to me over the years.`
    },
    'riaan-roetz': {
      name: 'Riaan Roetz',
      role: 'UX/UI Designer & Developer',
      text: `Jonathan is not only an amazing designer but also a great manager. He gets design management well, fixes problems, and gets things done. Jonathan's balanced approach to design and management is refreshing not only to new members of his team but to the entire management structure. Projects under his leadership progress smoothly from concept to deployment. I definitely recommend Jonathan for any company in need of great design skills.`
    },
    'phillip-van-coller': {
      name: 'Phillip van Coller',
      role: 'Multimedia Designer',
      text: `Jonathan is a highly skilled and very experienced creative individual. He has a very unique and inspiring perspective on any creative work and puts his own personal touch to every project. He is very respectful and always makes sure that the client needs are fulfilled. I highly recommend him for any creative work — he has my golden stamp of approval!`
    },
    'warren-raysdorf': {
      name: 'Warren Raysdorf',
      role: 'Graphic Artist & Sequential Artist',
      text: `Jonathan was an excellent colleague and friend to work with. He is really good at what he does and whenever we have had to overlap illustration with design and animation, he always brings great ideas to the table without being overbearing or controlling. This is an important quality to have when working with other creatives. Jonathan is a very good allrounder with a steady character who doesn't easily get flustered under pressure.`
    },
    'darryl-smith': {
      name: 'Darryl Smith',
      role: 'Mentor',
      text: `In my years of working with Jonathan, I have found him to be a truly inspirational creative who can visually bring his ideas together and add pure brilliance to any design task he sets his mind to. True creatives are hard to find and he is one of the best.`
    },
  };

  function open(id) {
    const ref = REFERENCES[id];
    if (!ref) return;
    nameEl.textContent = ref.name;
    roleEl.textContent = ref.role;
    textEl.textContent = ref.text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.quote-expand').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.ref));
  });

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  document.addEventListener('keydown', e => {
    if (modal.classList.contains('open') && e.key === 'Escape') close();
  });
})();

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
  const PINK_RGB    = [46, 178, 234];  // light blue — same as accent
  const ELECTRON_RGB = [234, 101, 44]; // orange electrons #EA652C

  // Lerp between two [r,g,b] arrays and return an rgb() string
  function lerpRGB(a, b, f) {
    return `rgb(${~~(a[0]+(b[0]-a[0])*f)},${~~(a[1]+(b[1]-a[1])*f)},${~~(a[2]+(b[2]-a[2])*f)})`;
  }

  // Per-orbit colour oscillation frequencies and phase offsets
  const CLR_FREQ = [0.38, 0.62, 0.91];
  const CLR_PH   = [0, 2.1, 4.2];

  const orbits = [
    { rx: 373, ry: 143, tilt: 0,     speed:  0.0120, dash: [5,  14], color: '#2EB2EA', rgba: [46, 178, 234] },
    { rx: 373, ry: 143, tilt: T,     speed: -0.0093, dash: [9,  24], color: '#2EB2EA', rgba: [46, 178, 234] },
    { rx: 373, ry: 143, tilt: T * 2, speed:  0.0072, dash: [14, 36], color: '#2EB2EA', rgba: [46, 178, 234] },
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
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    // Per-orbit animation: lineWidth and dash gap each oscillate independently
    const ANIM = [
      { dot:  5, gapMin:  8, gapMax: 24, lwFreq: 0.32, lwPh: 0.0, gFreq: 0.52, gPh: 0.0 },
      { dot:  9, gapMin: 14, gapMax: 40, lwFreq: 0.57, lwPh: 2.1, gFreq: 0.88, gPh: 3.1 },
      { dot: 14, gapMin: 18, gapMax: 56, lwFreq: 0.78, lwPh: 4.2, gFreq: 1.18, gPh: 5.8 },
    ];
    ctx.globalAlpha = isLight ? 1 : 0.72;
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
    const [r, g, b] = ELECTRON_RGB;  // orange electrons on both themes
    const coreDot  = '#EA652C';
    atoms.forEach((atom) => {
      const i  = atom.orbitIdx;
      const o  = orbits[i];
      const fs = floatStates[i];

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
      ctx.fillStyle = coreDot;
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
    const isLight     = document.documentElement.getAttribute('data-theme') === 'light';
    const glowHex     = isLight ? '#2EB2EA' : '#2EB2EA';  // blue glow on both
    const textHex     = '#EA652C';                          // orange on both
    const subtitleHex = isLight ? '#0b516f' : '#FFFFFF';  // dark teal / white

    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    ctx.save();
    ctx.translate(cx + ux, cy + uy + 8);
    ctx.rotate(textRot);
    ctx.font     = '900 256px Poppins, sans-serif';
    ctx.lineJoin = 'round';

    const pulse     = Math.sin(t * 2.2) * 0.5 + 0.5;
    const plusScale = 1 + 0.15 * Math.sin(t * 6.0);

    // Measure with left alignment so glow + solid passes line up
    ctx.textAlign = 'left';
    const wFull  = ctx.measureText('20+').width;
    const w20    = ctx.measureText('20').width;
    const wPlus  = ctx.measureText('+').width;
    const startX = -(wFull / 2);
    const plusCx = startX + w20 + wPlus / 2;

    // Glow pass — blue in dark, blue in light
    ctx.shadowColor = glowHex;
    ctx.shadowBlur  = 55 + pulse * 140;
    ctx.globalAlpha = 0.45 + pulse * 0.55;
    ctx.fillStyle   = glowHex;

    // Glow for "20"
    ctx.fillText('20', startX, 0);

    // Glow for "+" — scaled with plusScale so the halo grows/shrinks with it
    ctx.save();
    ctx.translate(plusCx, 0);
    ctx.scale(plusScale, plusScale);
    ctx.textAlign = 'center';
    ctx.fillText('+', 0, 0);
    ctx.restore();

    ctx.shadowBlur  = 0;
    ctx.shadowColor = 'transparent';

    // "20" — orange in dark, dark navy in light
    ctx.globalAlpha = 1;
    ctx.fillStyle   = textHex;
    ctx.textAlign   = 'left';
    ctx.fillText('20', startX, 0);

    // "+" — scales ±15%, orange on both
    ctx.save();
    ctx.translate(plusCx, 0);
    ctx.scale(plusScale, plusScale);
    ctx.globalAlpha  = 1;
    ctx.fillStyle    = '#EA652C';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('+', 0, 0);
    ctx.restore();

    ctx.restore();

    // Subtitle — weight 900, white in dark / deep purple in light
    ctx.font        = '900 34px Poppins, sans-serif';
    try { ctx.letterSpacing = '0.2em'; } catch (_) {}

    // Glow pass — same blue as "20+", on both light and dark
    ctx.save();
    ctx.shadowColor = glowHex;
    ctx.shadowBlur  = 55 + pulse * 140;
    ctx.globalAlpha = 0.45 + pulse * 0.55;
    ctx.fillStyle   = glowHex;
    ctx.fillText('YEARS OF DESIGN', cx + ux, cy + uy + 108);
    ctx.restore();

    ctx.globalAlpha = 1;
    ctx.fillStyle   = subtitleHex;
    ctx.fillText('YEARS OF DESIGN', cx + ux, cy + uy + 108);
    ctx.lineWidth   = 1.4;
    ctx.lineJoin    = 'round';
    ctx.strokeStyle = subtitleHex;
    ctx.strokeText('YEARS OF DESIGN', cx + ux, cy + uy + 108);

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

// ===========================
// HERO STARFIELD — ambient particles across the full hero
// ===========================
(function initHeroStarfield() {
  const hero       = document.querySelector('.hero');
  const canvas     = document.getElementById('heroStarsCanvas');
  const heroCanvas = document.getElementById('heroCanvas');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d');

  // Star colours per theme — particles are pure white in both themes; only the
  // secondary accent tone needs to darken in light mode to stay readable
  const STAR_PALETTES = {
    dark:  [[255, 255, 255], [46, 178, 234], [234, 101, 44]],
    light: [[255, 255, 255], [11,  81, 111], [234, 101, 44]],
  };
  // Glow halos always use the bright accent hues — a dark halo reads as a smudge, not a glow
  const GLOW_PALETTE = [[46, 178, 234], [234, 101, 44]];

  let W = 0, H = 0;
  let stars = [];

  // depth 0 = far (small, dim, slow, low parallax) — 1 = near (large, bright, fast, high parallax)
  function makeStar(w, h, glow) {
    const roll = Math.random();
    const colorIdx = glow ? (roll < 0.55 ? 0 : 1) : (roll < 0.6 ? 0 : roll < 0.85 ? 1 : 2);
    const depth = Math.random();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: (glow ? 1.6 + Math.random() * 2.4 : 0.5 + Math.random() * 1.6) * (0.6 + depth * 0.9),
      glow,
      colorIdx,
      depth,
      baseAlpha: glow ? 0.3 + Math.random() * 0.25 : 0.2 + Math.random() * 0.5,
      twFreq: 0.2 + Math.random() * 1.3,
      twPhase: Math.random() * Math.PI * 2,
      vx: 0, vy: 0,
      tx: 0, ty: 0,
      nextRoll: 0,
      // Slow figure-8 bob layered on top of the drift for a more "floating" feel
      bobFreq: 0.12 + Math.random() * 0.28,
      bobPhase: Math.random() * Math.PI * 2,
      bobAmp: (3 + depth * 11),
      // Glow halos breathe slowly, independent of the twinkle
      pulseFreq: 0.1 + Math.random() * 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }

  // Star density scales with hero area, clamped to a sensible range
  function buildStars(w, h) {
    const count   = Math.round(Math.min(260, Math.max(90, (w * h) / 9000)));
    const glowCnt = Math.max(10, Math.round(count * 0.1));
    stars = [
      ...Array.from({ length: count },   () => makeStar(w, h, false)),
      ...Array.from({ length: glowCnt }, () => makeStar(w, h, true)),
    ];
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars(W, H);
  }

  resize();

  let resizeRaf = null;
  window.addEventListener('resize', () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => { resizeRaf = null; resize(); });
  });

  let rafId = null;
  let lastTimestamp = null;

  function frame(timestamp) {
    const t  = timestamp * 0.001;
    const dt = lastTimestamp === null ? 0 : Math.min((timestamp - lastTimestamp) * 0.001, 0.1);
    lastTimestamp = timestamp;

    const isLight  = document.documentElement.getAttribute('data-theme') === 'light';
    const palette  = isLight ? STAR_PALETTES.light : STAR_PALETTES.dark;
    const alphaMul = isLight ? 0.85 : 1;

    // Focal point — centre of the "20+" orbit canvas, relative to the hero (recomputed
    // every frame so it stays correct across the mobile-stacked / desktop-row layouts)
    const heroRect = hero.getBoundingClientRect();
    let focalX = W * 0.5, focalY = H * 0.45, focalR = Math.max(W, H) * 0.55;
    if (heroCanvas) {
      const cRect = heroCanvas.getBoundingClientRect();
      if (cRect.width > 0) {
        focalX = (cRect.left + cRect.width  / 2) - heroRect.left;
        focalY = (cRect.top  + cRect.height / 2) - heroRect.top;
        focalR = Math.max(cRect.width, cRect.height) * 0.85;
      }
    }

    // Scroll parallax — nearer (higher depth) stars shift further as the hero scrolls
    const clampedTop  = Math.max(-H, Math.min(0, heroRect.top));
    const scrollShift = clampedTop * -0.18;

    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      // Organic drift — periodically re-roll a target velocity and ease toward it
      if (timestamp > s.nextRoll) {
        const speed = 10 + s.depth * 38;
        s.tx = (Math.random() - 0.5) * speed;
        s.ty = (Math.random() - 0.5) * speed;
        s.nextRoll = timestamp + 1000 + Math.random() * 2500;
      }
      s.vx += (s.tx - s.vx) * 0.018;
      s.vy += (s.ty - s.vy) * 0.018;
      s.x  += s.vx * dt;
      s.y  += s.vy * dt;

      if (s.x < -30) s.x += W + 60;
      if (s.x > W + 30) s.x -= W + 60;
      if (s.y < -30) s.y += H + 60;
      if (s.y > H + 30) s.y -= H + 60;

      // Slow figure-8 bob layered on top of the drift — reads as a gentle float in place
      const bobX = Math.sin(t * s.bobFreq + s.bobPhase) * s.bobAmp;
      const bobY = Math.cos(t * s.bobFreq * 0.8 + s.bobPhase) * s.bobAmp;

      const px = s.x + bobX;
      const py = s.y + bobY + scrollShift * (0.3 + s.depth * 0.9);

      const dx = px - focalX;
      const dy = py - focalY;
      const proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / focalR);

      const tw    = Math.sin(t * s.twFreq + s.twPhase) * 0.5 + 0.5;
      const alpha = Math.min(1, s.baseAlpha * (0.35 + tw * 0.65) * alphaMul * (1 + proximity * 1.6));
      const r     = s.r * (1 + proximity * 1.3);
      const rgb   = s.glow ? GLOW_PALETTE[s.colorIdx] : palette[s.colorIdx];

      if (s.glow) {
        // Slow independent breathing pulse on the glow halo
        const pulse   = Math.sin(t * s.pulseFreq + s.pulsePhase) * 0.5 + 0.5;
        const glowA   = Math.min(1, alpha * (0.55 + pulse * 0.85));
        const glowR   = r * (5 + pulse * 2.5);
        const grd = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        grd.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${glowA})`);
        grd.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // White dots get a soft dark halo in light mode so they read against the pale sky
      if (isLight && !s.glow && s.colorIdx === 0) {
        ctx.beginPath();
        ctx.arc(px, py, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(4,30,42,${alpha * 0.18})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      ctx.fill();
    });

    rafId = requestAnimationFrame(frame);
  }

  // Pause when tab is hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTimestamp = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(frame);
    }
  });

  rafId = requestAnimationFrame(frame);
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
  const PINK = [234, 101, 44];  // orange #EA652C
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
    ctx.fillStyle = '#EA652C';
    ctx.fill();

    requestAnimationFrame(frame);
  }

  frame();
})();

// ===========================
// HERO CANVAS — match height to hero copy on desktop
// ===========================
(function syncHeroCanvasSize() {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual  = document.querySelector('.hero-visual');
  const heroCanvas  = document.getElementById('heroCanvas');
  if (!heroContent || !heroVisual || !heroCanvas) return;

  function apply() {
    if (window.innerWidth < 900) {
      heroCanvas.style.removeProperty('width');
      heroCanvas.style.removeProperty('height');
      return;
    }

    const hvWidth  = heroVisual.getBoundingClientRect().width;
    const hcHeight = heroContent.getBoundingClientRect().height;
    const size = Math.min(hcHeight, hvWidth);
    heroCanvas.style.width  = size + 'px';
    heroCanvas.style.height = size + 'px';
  }

  apply();

  let raf = null;
  window.addEventListener('resize', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; apply(); });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(apply);
  }
})();

// ===========================
// QUOTES MARQUEE — drag-to-scroll + auto-scroll
// ===========================
(function () {
  const marquee = document.querySelector('.marquee-quotes');
  const track = marquee && marquee.querySelector('.marquee-track');
  if (!marquee || !track) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCROLL_DURATION = 60; // seconds per full group-width pass

  let groupWidth = 0;
  let x = 0;
  let isHovering = false;
  let isDragging = false;
  let dragMoved = false;
  let pointerId = null;
  let startX = 0;
  let startTranslate = 0;
  let lastTime = null;

  track.style.animation = 'none';

  function apply() {
    track.style.transform = `translateX(${x}px)`;
  }

  function wrap() {
    if (groupWidth <= 0) return;
    while (x > 0) x -= groupWidth;
    while (x <= -groupWidth) x += groupWidth;
  }

  function measure() {
    const newGroupWidth = track.scrollWidth / 2;
    if (newGroupWidth <= 0) return;
    if (groupWidth === 0) {
      x = -newGroupWidth;
    } else if (newGroupWidth !== groupWidth) {
      x = (x / groupWidth) * newGroupWidth;
    }
    groupWidth = newGroupWidth;
    wrap();
    apply();
  }

  function frame(time) {
    if (lastTime === null) lastTime = time;
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    if (!isDragging && !isHovering && !reduceMotion && groupWidth > 0) {
      x += (groupWidth / SCROLL_DURATION) * dt;
      wrap();
      apply();
    }

    requestAnimationFrame(frame);
  }

  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragMoved = false;
    pointerId = e.pointerId;
    startX = e.clientX;
    startTranslate = x;
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;
    const delta = e.clientX - startX;
    if (!dragMoved && Math.abs(delta) > 3) {
      dragMoved = true;
      track.classList.add('dragging');
      track.setPointerCapture(pointerId);
    }
    if (!dragMoved) return;
    x = startTranslate + delta;
    wrap();
    apply();
  });

  function endDrag(e) {
    if (!isDragging || e.pointerId !== pointerId) return;
    isDragging = false;
    if (dragMoved) {
      track.classList.remove('dragging');
      track.releasePointerCapture(pointerId);
    }
    pointerId = null;
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  track.addEventListener('click', (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
      dragMoved = false;
    }
  }, true);

  marquee.addEventListener('mouseenter', () => { isHovering = true; });
  marquee.addEventListener('mouseleave', () => { isHovering = false; });

  measure();

  let resizeRaf = null;
  window.addEventListener('resize', () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => { resizeRaf = null; measure(); });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }

  requestAnimationFrame(frame);
})();
