(function () {
  'use strict';

  /* ===== Sticky header height -> CSS var (drives scroll-margin / sticky offsets) ===== */
  var header = document.querySelector('.abt-header');
  function setHeaderHeight() {
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);

  /* ===== Mobile menu ===== */
  var hamburger = document.getElementById('abt-hamburger');
  var mobileMenu = document.getElementById('abt-mobile-menu');
  function closeMobileMenu() {
    mobileMenu.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isHidden = mobileMenu.hidden;
      mobileMenu.hidden = !isHidden;
      hamburger.setAttribute('aria-expanded', String(isHidden));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ===== Testimonials carousel ===== */
  var testimonials = [
    {
      name: 'Brad F', role: 'Commercial Client', dark: true,
      quote: "We've engaged Alan's services on a number of occasions when we have had areas of work requiring an eye for detail and accuracy, such as finishing sealant work to sterile areas within an operating theatre or waterproofing work. We have no hesitation in recommending Alan, who provides a prompt, accurate and thorough tradesman finish on every project."
    },
    {
      name: 'Bevan M', role: 'Private Home Owner', dark: false,
      quote: "Alan Bush was a professional tradesman from first contact. He was easy to work with and provided fantastic advice. His tiling was awesome and the final cost matched the quote. Highly recommend."
    },
    {
      name: 'Ken G', role: 'Private Home Owner', dark: true,
      quote: "Planning, planning, planning. Visualisation of the finished result and preparation. Those were the things that convinced me we had the right man on the job. All before laying a single tile. Our end result was no accident and we are super impressed!"
    },
    {
      name: 'Glenda P', role: 'Private Home Owner', dark: false,
      quote: "Alan recently tiled our kitchen and laundry splashbacks. We are very happy with the result. Alan was friendly, punctual and communication was great."
    }
  ];

  var tmCard = document.getElementById('abt-tm-card');
  var tmDots = document.getElementById('abt-tm-dots');
  var tmPrev = document.getElementById('abt-tm-prev');
  var tmNext = document.getElementById('abt-tm-next');
  var tmIndex = 0;

  function renderTestimonial() {
    var t = testimonials[tmIndex];
    tmCard.classList.toggle('is-dark', t.dark);
    tmCard.innerHTML =
      '<svg class="abt-tm-quote-mark" width="42" height="42" viewBox="0 0 24 24" fill="' + (t.dark ? '#4d8579' : '#e0632f') + '"><path d="M9.5 5C6 6.5 4 9.5 4 13v6h7v-8H7.5c.2-2 1.4-3.4 3.5-4.3zM20 5c-3.5 1.5-5.5 4.5-5.5 8v6h7v-8h-3.5c.2-2 1.4-3.4 3.5-4.3z"/></svg>' +
      '<p class="abt-tm-text">' + t.quote + '</p>' +
      '<div class="abt-tm-name">' + t.name + '</div>' +
      '<div class="abt-tm-role">' + t.role + '</div>';

    if (tmDots) {
      tmDots.querySelectorAll('.abt-tm-dot').forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === tmIndex);
      });
    }
  }

  function buildDots() {
    if (!tmDots) return;
    testimonials.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'abt-tm-dot';
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        tmIndex = i;
        renderTestimonial();
      });
      tmDots.appendChild(dot);
    });
  }

  if (tmCard) {
    buildDots();
    renderTestimonial();
    tmPrev.addEventListener('click', function () {
      tmIndex = (tmIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial();
    });
    tmNext.addEventListener('click', function () {
      tmIndex = (tmIndex + 1) % testimonials.length;
      renderTestimonial();
    });
  }

  /* ===== Services accordion + jump nav ===== */
  var accordions = document.querySelectorAll('.abt-acc');
  var jumpLinks = document.querySelectorAll('.abt-jump-link');

  function setOpenService(id, opts) {
    opts = opts || {};
    accordions.forEach(function (acc) {
      acc.classList.toggle('is-open', acc.id === id);
    });
    jumpLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.dataset.service === id);
    });
    if (opts.scroll) {
      var el = document.getElementById(id);
      if (el) {
        var y = el.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  accordions.forEach(function (acc) {
    var head = acc.querySelector('.abt-acc-head');
    if (!head) return;
    head.addEventListener('click', function () {
      if (acc.classList.contains('is-open')) {
        acc.classList.remove('is-open');
        jumpLinks.forEach(function (link) {
          if (link.dataset.service === acc.id) link.classList.remove('is-active');
        });
      } else {
        setOpenService(acc.id, { scroll: false });
      }
    });
  });

  jumpLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      setOpenService(link.dataset.service, { scroll: false });
    });
  });

  /* ===== Contact modal ===== */
  var modalOverlay = document.getElementById('abt-modal-overlay');
  var modalClose = document.getElementById('abt-modal-close');

  function openContactModal(e) {
    if (e) e.preventDefault();
    modalOverlay.hidden = false;
  }
  function closeContactModal() {
    modalOverlay.hidden = true;
  }
  document.querySelectorAll('.js-open-contact').forEach(function (btn) {
    btn.addEventListener('click', openContactModal);
  });
  if (modalClose) modalClose.addEventListener('click', closeContactModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeContactModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modalOverlay && !modalOverlay.hidden) closeContactModal();
      closeLightbox();
    }
  });

  /* ===== Contact form ===== */
  var form = document.getElementById('abt-contact-form');
  var formSent = document.getElementById('abt-form-sent');
  var formError = document.getElementById('abt-form-error');
  var formSubmit = document.getElementById('abt-form-submit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formError.hidden = true;
      formSubmit.disabled = true;
      formSubmit.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.hidden = true;
          formSent.hidden = false;
        } else {
          formError.hidden = false;
          formSubmit.disabled = false;
          formSubmit.textContent = 'Send Enquiry';
        }
      }).catch(function () {
        formError.hidden = false;
        formSubmit.disabled = false;
        formSubmit.textContent = 'Send Enquiry';
      });
    });
  }

  /* ===== Lightbox (shared by all galleries) ===== */
  var lightbox = document.getElementById('abt-lightbox');
  var lightboxImg = document.getElementById('abt-lightbox-img');
  var lightboxClose = document.getElementById('abt-lightbox-close');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
  }
  function closeLightbox() {
    if (lightbox && !lightbox.hidden) {
      lightbox.hidden = true;
      lightboxImg.src = '';
    }
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ===== Tiling galleries (Swiper) ===== */
  document.querySelectorAll('.abt-gallery-frame').forEach(function (frame) {
    var swiperEl = frame.querySelector('.swiper');
    var prevEl = frame.querySelector('.abt-gallery-nav.prev');
    var nextEl = frame.querySelector('.abt-gallery-nav.next');
    var counterEl = frame.querySelector('.abt-gallery-counter-text');
    var total = frame.querySelectorAll('.swiper-slide').length;

    function updateCounter(sw) {
      var startI = Math.min(sw.activeIndex, total - 1);
      var perView = Math.floor(sw.params.slidesPerView) || 1;
      var endI = Math.min(startI + perView - 1, total - 1);
      counterEl.textContent = endI > startI
        ? (startI + 1) + '-' + (endI + 1) + '/' + total
        : (startI + 1) + '/' + total;
    }

    var swiper = new window.Swiper(swiperEl, {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
      loop: false,
      breakpoints: {
        0: { slidesPerView: 1, slidesPerGroup: 1 },
        640: { slidesPerView: 2, slidesPerGroup: 2 }
      },
      navigation: { prevEl: prevEl, nextEl: nextEl },
      on: { slideChange: updateCounter, init: updateCounter }
    });

    frame.querySelectorAll('.swiper-slide img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.src);
      });
    });
  });
})();
