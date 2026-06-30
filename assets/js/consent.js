/* Cookie-Consent + Google Analytics (consent-gated)
   GA4 lädt ausschließlich nach aktiver Einwilligung. */
(function () {
  var GA_ID = 'G-YJ3FMM6R6Y';
  var KEY = 'mcc-consent';
  var lang = (document.documentElement.lang || 'de').toLowerCase().slice(0, 2);
  var de = lang !== 'en';

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  function setConsent(v) {
    store(v);
    var b = document.getElementById('cookie-consent');
    if (b) b.parentNode.removeChild(b);
    if (v === 'granted') loadGA();
  }

  function showBanner() {
    var privacy = de ? '/datenschutz/' : '/en/privacy-policy/';
    var txt = de
      ? 'Wir nutzen Google Analytics, um die Nutzung unserer Website zu analysieren. Das geschieht nur mit Ihrer Einwilligung.'
      : 'We use Google Analytics to analyse how our website is used. This only happens with your consent.';
    var accept = de ? 'Akzeptieren' : 'Accept';
    var decline = de ? 'Ablehnen' : 'Decline';
    var more = de ? 'Datenschutz' : 'Privacy Policy';

    var el = document.createElement('div');
    el.id = 'cookie-consent';
    el.className = 'cookie-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', de ? 'Cookie-Einwilligung' : 'Cookie consent');
    el.innerHTML =
      '<p class="cookie-consent__text">' + txt +
        ' <a href="' + privacy + '">' + more + '</a></p>' +
      '<div class="cookie-consent__actions">' +
        '<button type="button" class="cookie-consent__btn cookie-consent__btn--ghost" data-consent="denied">' + decline + '</button>' +
        '<button type="button" class="cookie-consent__btn cookie-consent__btn--primary" data-consent="granted">' + accept + '</button>' +
      '</div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (btn) setConsent(btn.getAttribute('data-consent'));
    });
  }

  function init() {
    var c = read();
    if (c === 'granted') loadGA();
    else if (c === 'denied') { /* kein Tracking, kein Banner */ }
    else showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
