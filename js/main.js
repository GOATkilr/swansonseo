/* ==========================================================
   SWANSON SEO — Main JavaScript
   Progressive enhancement: site works fully without JS
   ========================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------
  // Footer year
  // --------------------------------------------------------
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------
  // Mobile navigation
  // --------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  body.appendChild(overlay);

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    overlay.classList.remove('active');
    body.style.overflow = '';
  }

  function toggleNav() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', toggleNav);
    overlay.addEventListener('click', closeNav);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close when a nav link is clicked (anchor links on same page)
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // --------------------------------------------------------
  // Sticky header scroll behavior
  // --------------------------------------------------------
  const header = document.getElementById('site-header');

  if (header) {
    // Use a sentinel element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    body.prepend(sentinel);

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            header.classList.remove('scrolled');
          } else {
            header.classList.add('scrolled');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
  }

  // --------------------------------------------------------
  // Smooth scroll with header offset
  // --------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return; // logo link to top

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, '', targetId);
      }
    });
  });

  // --------------------------------------------------------
  // Contact form handling
  // --------------------------------------------------------
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var isValid = true;

      [name, email, message].forEach(function (field) {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        }
      });

      // Email format check
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all required fields with valid information.';
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Collect form data
      var formData = new FormData(form);

      // Submit via fetch
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you for reaching out! I\'ll get back to you within one business day.';
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Something went wrong. Please try again or email stanford@swansonseo.com directly.';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send My Inquiry &mdash; It\u2019s Free';
        });
    });

    // Remove error styling on input
    form.querySelectorAll('.form-input').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('error');
      });
    });
  }

  // --------------------------------------------------------
  // Scroll-triggered fade-in animations
  // --------------------------------------------------------
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Add fade-in class to animatable elements
    var animatable = document.querySelectorAll(
      '.service-card, .process-step, .stat, .about-photo, .about-content, .contact-form, .contact-info, .client-logo, .results-cta'
    );

    animatable.forEach(function (el) {
      el.classList.add('fade-in');
    });

    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatable.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  // --------------------------------------------------------
  // Stat number count-up animation
  // --------------------------------------------------------
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var text = el.textContent.trim();
            var match = text.match(/^(\d+)(\+?)$/);
            if (match) {
              var target = parseInt(match[1], 10);
              var suffix = match[2] || '';
              var duration = 1200;
              var start = performance.now();
              el.textContent = '0' + suffix;

              function step(now) {
                var progress = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) {
                  requestAnimationFrame(step);
                }
              }
              requestAnimationFrame(step);
            }
            statObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(function (el) {
        statObserver.observe(el);
      });
    }
  }
})();
