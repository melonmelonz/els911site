/* ── ELS911 — Main JS ──────────────────────────────────────── */

// ── Header scroll effect ──────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Active nav on scroll ──────────────────────────────────── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) => {
          l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-15% 0px -75% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// ── Smooth scroll ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70);
    window.scrollTo({ top, behavior: 'smooth' });
    closeMobileNav();
  });
});

// ── Mobile nav ────────────────────────────────────────────── */
const menuBtn   = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileNav = document.getElementById('mobileNav');
const overlay   = document.getElementById('sidebarOverlay');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  overlay.classList.add('active');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('active');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (menuBtn)   menuBtn.addEventListener('click', openMobileNav);
if (menuClose) menuClose.addEventListener('click', closeMobileNav);
if (overlay)   overlay.addEventListener('click', closeMobileNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// ── Scroll reveal (fade-up) ───────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
  );
  fadeEls.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback: show everything immediately
  fadeEls.forEach((el) => el.classList.add('visible'));
}
