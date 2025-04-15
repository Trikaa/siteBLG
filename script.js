// === Переключение языка ===
function changeLanguage(lang) {
  if (lang === 'pl') {
    window.location.href = '/';
  } else {
    window.location.href = `/${lang}.html`;
  }
}

// === Основной функционал ===
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const langButtons = document.querySelectorAll('.mobile-lang-buttons button');
  const langSelect = document.getElementById('language-select');
  const galleryWrapper = document.querySelector('.swiper-wrapper');

  // Закрытие бургера при клике по пункту меню
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle) menuToggle.checked = false;
    });
  });

  // Закрытие бургера при выборе языка (мобильные кнопки)
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.textContent.toLowerCase();
      if (menuToggle) menuToggle.checked = false;
      changeLanguage(lang);
    });
  });

  // Закрытие при скролле
  window.addEventListener('scroll', () => {
    if (menuToggle && menuToggle.checked) {
      menuToggle.checked = false;
    }
  });

  // Переключение языка через <select> (если используется)
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      changeLanguage(langSelect.value);
    });
  }

  // === Динамическая генерация слайдов галереи ===
  if (galleryWrapper) {
    for (let i = 1; i <= 13; i++) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      const img = document.createElement('img');
      img.src = `gallery/photo${i}.png`;
      img.alt = `Projekt ${i}`;

      slide.appendChild(img);
      galleryWrapper.appendChild(slide);
    }
  }

  // === Инициализация Swiper ===
  new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active'
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // === COOKIE BANNER ===
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');

  if (banner && acceptBtn && !localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'flex';

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.style.display = 'none';
    });
  }
});
