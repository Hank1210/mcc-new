/* MCC Website — main.js */

// ===== NAV SCROLL BEHAVIOR =====
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav__mobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== VIDEO FALLBACK =====
const video = document.querySelector('.video-section video');
if (video) {
  video.addEventListener('error', () => {
    const fallback = video.nextElementSibling;
    if (fallback && fallback.classList.contains('video-section__fallback')) {
      video.style.display = 'none';
      fallback.style.display = 'block';
    }
  });
}

// ===== ACTIVE NAV LINK =====
(function() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link, .nav__mobile .nav__link').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (path === href || (href !== '/' && href !== '/en' && path.startsWith(href))) {
      link.classList.add('nav__link--active');
    }
  });
})();
