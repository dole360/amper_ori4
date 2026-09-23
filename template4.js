/* Template4 visual helper: mirrors the real hero image into a decorative
   travel-style thumbnail strip. It does not modify data, navigation, login,
   admin actions or any application logic. */
(function () {
  'use strict';

  function bootTemplate4HeroGallery() {
    var hero = document.getElementById('home');
    var overlay = document.getElementById('websiteHeroOverlay');
    if (!hero || !overlay || hero.querySelector('.template4-hero-gallery')) return;

    var gallery = document.createElement('div');
    gallery.className = 'template4-hero-gallery';
    gallery.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < 3; i += 1) {
      var item = document.createElement('span');
      item.className = 'template4-hero-gallery-item is-empty';
      gallery.appendChild(item);
    }
    hero.appendChild(gallery);

    function syncBackground() {
      var bg = window.getComputedStyle(overlay).backgroundImage || '';
      var hasImage = bg && bg !== 'none';
      gallery.querySelectorAll('.template4-hero-gallery-item').forEach(function (item) {
        if (hasImage) {
          item.style.backgroundImage = bg;
          item.classList.remove('is-empty');
        } else {
          item.style.backgroundImage = '';
          item.classList.add('is-empty');
        }
      });
    }

    syncBackground();

    var observer = new MutationObserver(syncBackground);
    observer.observe(overlay, { attributes: true, attributeFilter: ['style', 'class'] });

    window.addEventListener('load', syncBackground, { once: true });
    setTimeout(syncBackground, 300);
    setTimeout(syncBackground, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootTemplate4HeroGallery, { once: true });
  } else {
    bootTemplate4HeroGallery();
  }
})();
