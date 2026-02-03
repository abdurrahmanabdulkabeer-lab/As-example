// Basic interactions: nav toggle, smooth scroll, contact form validation + fake submit
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const yearEl = document.getElementById('year');

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle for small screens
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? '' : 'flex';
  });

  // Close mobile nav on link click
  navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 720) {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.style.display = '';
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Contact form: front-end validation + simulated submit
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    // simulate network request
    status.textContent = 'Sending…';
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.disabled = false;
      status.textContent = 'Thanks — your message has been sent (simulated).';
      form.reset();
    }, 900);
  });
});
