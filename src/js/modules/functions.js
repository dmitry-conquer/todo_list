// - - - - - - - [console message] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export function consoleInfo() {
   console.log('%cЗроблено з натхненням! %chttps://www.instagram.com/dmitry_conquer/', 'color: #8AC6E8; font-size: 14px; padding: 10px 0;', 'color: blue; font-size: 11px; padding: 5px 0;');
}

/* === Проверка мобильного браузера === */
export const isMobile = {
   Android() {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
   },
};

/*  === Проверка поддержки webp, добавление класса webp или no-webp для HTML === */
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function() {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   // Добавление класса _webp или _no-webp для HTML
   testWebP((support) => {
      const className = support === true ? 'webp' : 'no-webp';
      document.documentElement.classList.add(className);
   });
}

// - - - - - - - [dynamicTitle] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export function dynamicTitle(pageName) {
   const sections = document.querySelectorAll('[data-section]');
   const options = {
      threshold: 0.3,
      rootMargin: '0px'
   };

   function callback(entries, observer) {
      entries.forEach(function(entry) {
         if (entry.isIntersecting) {
            const currentSectionTitle = entry.target.dataset.section;
            document.title = `${pageName} - ${currentSectionTitle}`;
            observer.unobserve(entry.target);
         }
      });
   }

   const sectionObserver = new IntersectionObserver(callback, options);

   sections.forEach(function(section) {
      sectionObserver.observe(section);
   });
}