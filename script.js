// ===========================
// ANIMATION GALLERY — 32 clips
// ===========================
(function buildAnimGrid() {
  const grid = document.getElementById('animGrid');
  if (!grid) return;

  const TOTAL = 32;
  const BASE_PATH = 'assets/video/vfx/';

  // Build thumbnail cards
  for (let i = 1; i <= TOTAL; i++) {
    const num = String(i).padStart(2, '0');
    const thumb = document.createElement('div');
    thumb.className = 'anim-thumb';

    thumb.innerHTML = `
      <video src="${BASE_PATH}anim-${num}.mp4"
        muted playsinline preload="none"
        loop></video>
      <div class="anim-overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/>
        </svg>
      </div>
      <span class="anim-num">${num}</span>`;

    grid.appendChild(thumb);
  }

  // Hover play/pause
  grid.querySelectorAll('.anim-thumb').forEach(thumb => {
    const vid = thumb.querySelector('video');
    thumb.addEventListener('mouseenter', () => { vid.load(); vid.play(); });
    thumb.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
  });

  // IntersectionObserver — only load videos near viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const vid = entry.target.querySelector('video');
      if (entry.isIntersecting) {
        if (vid.getAttribute('preload') === 'none') {
          vid.setAttribute('preload', 'metadata');
        }
      }
    });
  }, { rootMargin: '200px' });

  grid.querySelectorAll('.anim-thumb').forEach(t => observer.observe(t));
})();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
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

// Shrink nav on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) {
    nav.style.padding = '12px 40px';
  } else {
    nav.style.padding = '';
  }
}, { passive: true });
