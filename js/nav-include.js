/* ============================================================
   THE AVENUE — Shared Nav + Footer
   Maroon / Black / White Modern Design
   ============================================================ */

const NAVBAR_HTML = `
<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__inner">
    <a href="index.html" class="navbar__brand" aria-label="THE AVENUE – Home">
      <div class="brand-mark" aria-hidden="true" style="background:transparent;width:52px;height:52px;padding:2px;">
        <img src="images/logo.png" alt="THE AVENUE Logo" style="width:100%;height:100%;object-fit:contain;" />
      </div>
      <div class="brand-text-wrap">
        <span class="b-name">The Avenue</span>
        <span class="b-sub">Avenue Progressive Baptist Church</span>
      </div>
    </a>

    <ul class="navbar__nav" role="list">
      <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
      <li class="nav-item nav-item--has-dropdown">
        <a href="about.html" class="nav-link">About &#9662;</a>
        <div class="dropdown">
          <a href="about.html">About Us</a>
          <a href="history.html">Our History</a>
          <a href="pastor.html">Our Pastor</a>
          <a href="beliefs.html">What We Believe</a>
        </div>
      </li>
      <li class="nav-item"><a href="visit.html" class="nav-link">Plan Your Visit</a></li>
      <li class="nav-item"><a href="watch.html" class="nav-link">Watch</a></li>
      <li class="nav-item"><a href="ministries.html" class="nav-link">Ministries</a></li>
      <li class="nav-item"><a href="events.html" class="nav-link">Events</a></li>
      <li class="nav-item"><a href="give.html" class="nav-link">Give</a></li>
      <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
    </ul>

    <div class="navbar__actions">
      <a href="give.html"   class="btn btn-maroon btn-sm">Give</a>
      <a href="watch.html"  class="btn btn-outline-white btn-sm">Watch Live</a>
    </div>

    <button class="navbar__toggle" id="navToggle" aria-label="Open navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
  <a href="index.html">Home</a>
  <div class="mobile-dropdown">
    <a href="about.html" style="font-weight:900;color:rgba(255,255,255,.9)">About</a>
    <a href="about.html">About Us</a>
    <a href="history.html">Our History</a>
    <a href="pastor.html">Our Pastor</a>
    <a href="beliefs.html">What We Believe</a>
  </div>
  <a href="visit.html">Plan Your Visit</a>
  <a href="watch.html">Watch Online</a>
  <a href="ministries.html">Ministries</a>
  <a href="events.html">Events</a>
  <a href="give.html">Give</a>
  <a href="contact.html">Contact</a>
  <div class="mn-ctas">
    <a href="give.html"  class="btn btn-maroon btn-sm">Give Online</a>
    <a href="watch.html" class="btn btn-outline-white btn-sm">Watch Live</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer__inner">

      <div>
        <img src="images/logo.png" alt="THE AVENUE Logo" style="width:90px;height:auto;margin-bottom:12px;display:block;opacity:0.92;" />
        <div class="footer__brand-name">The Avenue</div>
        <div class="footer__brand-sub">Avenue Progressive Baptist Church</div>
        <p class="footer__tagline">A place where faith grows, community thrives, and every person finds their purpose in God's love. Serving South Dallas since 1961.</p>
        <div class="footer__social" aria-label="Social media links">
          <a href="#" aria-label="Facebook" title="Facebook">f</a>
          <a href="#" aria-label="YouTube" title="YouTube">&#9654;</a>
          <a href="#" aria-label="Instagram" title="Instagram">&#9670;</a>
        </div>
      </div>

      <div class="footer__col">
        <div class="footer__col-heading">Quick Links</div>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="history.html">Our History</a></li>
          <li><a href="pastor.html">Our Pastor</a></li>
          <li><a href="beliefs.html">What We Believe</a></li>
          <li><a href="visit.html">Plan Your Visit</a></li>
          <li><a href="watch.html">Watch Online</a></li>
          <li><a href="ministries.html">Ministries</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="give.html">Give</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <div class="footer__col-heading">Service Times</div>
        <ul>
          <li style="padding:8px 0;border-bottom:1px solid var(--black-border)">
            <div style="font-family:var(--font-heading);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:3px">Sunday School</div>
            <div style="color:var(--white-80);font-size:.95rem;font-weight:600">10:00 AM</div>
          </li>
          <li style="padding:8px 0;border-bottom:1px solid var(--black-border)">
            <div style="font-family:var(--font-heading);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:3px">Worship Service</div>
            <div style="color:var(--white-80);font-size:.95rem;font-weight:600">11:15 AM</div>
          </li>
          <li style="padding:8px 0;border-bottom:1px solid var(--black-border)">
            <div style="font-family:var(--font-heading);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:3px">Wednesday Prayer</div>
            <div style="color:var(--white-80);font-size:.95rem;font-weight:600">6:30 PM</div>
          </li>
          <li style="padding:8px 0">
            <div style="font-family:var(--font-heading);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:3px">Wednesday Bible Study</div>
            <div style="color:var(--white-80);font-size:.95rem;font-weight:600">7:00 PM</div>
          </li>
        </ul>
      </div>

      <div class="footer__col">
        <div class="footer__col-heading">Contact</div>
        <div class="footer__contact-row">
          <span class="footer__contact-icon" aria-hidden="true">&#128205;</span>
          <span>3745 Dildock Street<br>Dallas, TX 75215</span>
        </div>
        <div class="footer__contact-row">
          <span class="footer__contact-icon" aria-hidden="true">&#128222;</span>
          <a href="tel:4693720065" style="color:var(--white-60)">469-372-0065</a>
        </div>
        <div class="footer__contact-row">
          <span class="footer__contact-icon" aria-hidden="true">&#9993;</span>
          <a href="mailto:info@avenuepbc.org" style="color:var(--white-60)">info@avenuepbc.org</a>
        </div>
        <div class="footer__contact-row">
          <span class="footer__contact-icon" aria-hidden="true">&#128336;</span>
          <span>Mon&ndash;Fri: 9 AM &ndash; 5 PM</span>
        </div>
        <a href="visit.html" class="btn btn-outline-white btn-sm btn-pill" style="margin-top:22px;display:inline-flex;">Plan Your Visit</a>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="footer__bottom">
      <span>&copy; 2025 Avenue Progressive Baptist Church &mdash; THE AVENUE. All rights reserved.</span>
      <span>3745 Dildock Street, Dallas, TX 75215 &middot; <a href="tel:4693720065">469-372-0065</a></span>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', function () {
  // Inject navbar
  const navPH = document.getElementById('nav-placeholder');
  if (navPH) navPH.outerHTML = NAVBAR_HTML;

  // Inject footer
  const footPH = document.getElementById('footer-placeholder');
  if (footPH) footPH.outerHTML = FOOTER_HTML;

  // Interior pages: always show solid navbar
  const currentPage = window.location.pathname;
  const isHomepage = currentPage === '/' ||
                     currentPage.endsWith('index.html') ||
                     currentPage === '' ||
                     currentPage === '/index.html';

  if (!isHomepage) {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.add('solid');
  }
});
