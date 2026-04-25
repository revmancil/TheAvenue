/* ============================================================
   THE AVENUE - Main JavaScript
   Handles: navbar scroll, mobile menu, fade-in animations,
            form submissions, newsletter
   ============================================================ */

/* Add .js-ready to <body> immediately so fade-in CSS kicks in.
   If JS never runs, elements remain fully visible (no opacity:0). */
document.documentElement.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('js-ready');
}, { once: true });
// Also set synchronously in case DOMContentLoaded already fired:
if (document.readyState !== 'loading') {
  document.body.classList.add('js-ready');
}

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  // Scroll -> solid navbar (only on homepage where navbar starts transparent)
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (!navbar.classList.contains('solid')) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function() {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(function(s) { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelectorAll('span').forEach(function(s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelectorAll('span').forEach(function(s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
        toggle.focus();
      }
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ── Fade-in on scroll ── */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in, .fade-in-left');
  if (!els.length) return;

  // If IntersectionObserver not supported, just show everything
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Small stagger based on sibling index
        const siblings = Array.from((el.parentElement || document.body).children);
        const idx = siblings.indexOf(el);
        const delay = Math.min(idx * 80, 280);
        setTimeout(function() {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(function(el) { observer.observe(el); });
}

/* ── Form handler with success message ── */
function initForms() {
  document.querySelectorAll('form[data-form]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var wrapper   = this.closest('[class]') || this.parentElement;
      var successEl = wrapper.querySelector('.form-success');
      this.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    });
  });
}

/* ── Newsletter form ── */
function initNewsletter() {
  var forms = document.querySelectorAll('#newsletterForm, #eventsNewsletterForm');
  forms.forEach(function(form) {
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn   = this.querySelector('button[type="submit"]');
      var input = this.querySelector('input[type="email"]');
      if (btn)   { btn.textContent = 'Subscribed!'; btn.style.background = '#166534'; btn.disabled = true; }
      if (input) { input.disabled = true; }
    });
  });
}

/* ── Smooth scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navH = (document.getElementById('navbar') || {offsetHeight: 80}).offsetHeight || 80;
        var top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Init on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function() {
  // nav-include.js also fires on DOMContentLoaded.
  // Short timeout ensures nav/footer are injected before we query them.
  setTimeout(function() {
    document.body.classList.add('js-ready'); // ensure it's set
    initNavbar();
    initFadeIn();
    initForms();
    initNewsletter();
    initSmoothScroll();
  }, 50);
});
