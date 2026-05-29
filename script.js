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
  document.body.style.overflow = '';
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    closeNav();
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeNav();
  });
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
    nav.style.padding = window.innerWidth <= 768 ? '10px 20px' : '12px 40px';
  } else {
    nav.style.padding = '';
  }
}, { passive: true });
