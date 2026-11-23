/* PinMuse — site interactions: topbar state, scroll reveal, email de-obfuscation */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Topbar gets a border once the page scrolls
  var bar = document.querySelector('.topbar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveal (skipped for reduced motion / old browsers)
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Email addresses are stored reversed in the markup
  document.querySelectorAll('a.email-rtl').forEach(function (a) {
    var email = a.textContent.trim().split('').reverse().join('');
    a.href = 'mailto:' + email;
    a.textContent = email;
    a.classList.remove('email-rtl');
  });
})();
