import { isMobile } from './functions.js';

export function initHeader() {
   const header = document.querySelector('.header');
   if (header) {
      const headerIcon = document.querySelector('._menu-icon');
      const headerMenu = document.querySelector('._menu-header');
      const headerContainer = document.querySelector('.header__container');
      const burgerAppearenceWidth = 991.98;

      if (window.innerWidth < burgerAppearenceWidth) {
         headerMenu.querySelectorAll('a, button, input, textarea, select').forEach((link) => {
            link.setAttribute('tabIndex', -1);
         });
      }

      document.addEventListener('click', (e) => {
         const targetElement = e.target;
         // - - - - - - - [ICON ACTIONS] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
         if (window.innerWidth < burgerAppearenceWidth) {
            if (targetElement.classList.contains('_menu-icon') || targetElement.closest('._menu-link')) {
               toggleMenu()
            }
         }
         // - - - - - - - [SHOW / REMOVE SUB_LIST] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
         if (window.innerWidth >= 768 && isMobile.any()) {
            if (targetElement.closest('._open-sublist')) {
               triggerSubmenu.classList.toggle('_active-trigger-sublist');
               targetElement.closest('._open-sublist').nextElementSibling.classList.toggle('_active-sublist');
            }
            if (!targetElement.closest('._open-sublist').nextElementSibling) {
               triggerSubmenu.classList.remove('_active-trigger-sublist');
               triggerSubmenu.nextElementSibling.classList.remove('_active-sublist');
            }
         } else if (window.innerWidth < 768 && isMobile.any()) {
            if (targetElement.closest('._open-sublist')) {
               triggerSubmenu.nextElementSibling.style.maxHeight = triggerSubmenu.nextElementSibling.style.maxHeight ?
                  null :
                  `${triggerSubmenu.nextElementSibling.scrollHeight}px`;
               triggerSubmenu.classList.toggle('_active-trigger-sublist');
            }
         }
      });

      document.addEventListener('keydown', function(e) {
         if (event.key === 'Escape') {
            if (headerMenu.classList.contains('_active-menu-header')) {
               toggleMenu();
            }
         }
      });


      // - - - - - - - [header scroll] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const headerOffset = 60;

      function scrollHeader() {
         let scrolled = document.documentElement.scrollTop;
         if (scrolled > headerOffset && !header.classList.contains('_scroll')) {
            header.classList.add('_scroll');
         } else if (scrolled < headerOffset && header.classList.contains('_scroll')) {
            header.classList.remove('_scroll');
         }
      }
      scrollHeader()
      document.addEventListener('scroll', () => {
         scrollHeader()
      })
      // - - - - - - - [add functions] - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      function tabLoopControl() {
         const focusableElements = headerMenu.querySelectorAll('a, button, input, textarea, select');
         const firstFocusableElement = focusableElements[0];
         const lastFocusableElement = focusableElements[focusableElements.length - 1];
         firstFocusableElement.focus()

         if (headerMenu.classList.contains('_active-menu-header')) {
            headerContainer.addEventListener('keydown', handleTabKey);
            focusableElements.forEach((link) => {
               link.removeAttribute('tabIndex');
            });
         } else {
            headerContainer.removeEventListener('keydown', handleTabKey);
            focusableElements.forEach((link) => {
               link.setAttribute('tabIndex', '-1');
            });
            headerIcon.focus();
         }

         function handleTabKey(e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            if (!isTabPressed) return;

            if (e.shiftKey) {
               if (document.activeElement === firstFocusableElement) {
                  e.preventDefault();
                  lastFocusableElement.focus();
               }
            } else {
               if (document.activeElement === lastFocusableElement) {
                  e.preventDefault();
                  firstFocusableElement.focus();
               }
            }
         };
      }

      function toggleMenu() {
         document.body.classList.toggle('_lock');
         headerIcon.classList.toggle('_active-menu-icon');
         headerMenu.classList.toggle('_active-menu-header');

         tabLoopControl();

         const menuItems = headerMenu.querySelectorAll('._menu-item');
         menuItems.forEach((item, i) => {
            item.style.setProperty('--i', `${i}`);
            item.classList.toggle('_anim-menu-item');
         });
      }
   }
}