let lastActiveElement;

const modalWindow = {
   initModal() {
      document.addEventListener('click', function(e) {
         if (e.target.closest('[data-modal]')) {
            const modalBlockId = e.target.closest('[data-modal]').dataset.modal;
            if (modalBlockId) {
               const modalBlock = document.getElementById(modalBlockId);
               const modalBody = modalBlock.querySelector('._modal-body');
               const modalContent = modalBlock.querySelector('._modal-content');

               lastActiveElement = e.target;
               modalWindow.openModal(modalBlock, modalContent);
            }
         }
         if (e.target.matches('._modal-close-trigger')) {
            document.querySelectorAll('._modal-wrapper').forEach((modal) => {
               if (modal) {
                  const modalContent = modal.querySelector('._modal-content');
                  modalWindow.closeModal(modal, modalContent, lastActiveElement);
               }
            });
         }
      });
   },

   openModalIf(modalId) {
      if (modalId) {
         const modalBlock = document.getElementById(modalId);
         const modalBody = modalBlock.querySelector('._modal-body');
         const modalContent = modalBlock.querySelector('._modal-content');

         lastActiveElement = document.activeElement;
         modalWindow.openModal(modalBlock, modalContent);
      }
   },

   openModal(modalBlock, modalContent) {
      document.body.style.paddingRight = `${modalWindow.scrollbarWidth()}px`;
      document.body.classList.add('_lock');
      modalBlock.classList.add('_show-modal');
      modalContent.classList.add('_show-modal');
      modalWindow.tabLoopControl(modalBlock);
   },

   closeModal(modalBlock, modalContent, lastActiveElement) {
      // check header behavier
      document.body.classList.remove('_lock');
      document.body.style.paddingRight = `${0}px`;
      if (document.querySelector('.header__wrapper')) {
         document.querySelector('.header__wrapper').style.paddingRight = `${0}px`;
      }
      modalBlock.classList.remove('_show-modal');
      modalContent.classList.remove('_show-modal');
      if (lastActiveElement) {
         lastActiveElement.focus();
      }
   },

   tabLoopControl(modalBlock) {
      const focusableElements = modalBlock.querySelectorAll('a, button, input, textarea, select');

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      modalBlock.addEventListener('transitionend', () => {
         if (modalBlock.classList.contains('_show-modal')) {
            firstFocusableElement.focus();
         }
      });


      modalBlock.addEventListener('keydown', handleTabKey);

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

   },

   scrollbarWidth() {
      const documentWidth = parseInt(document.documentElement.clientWidth);
      const windowsWidth = parseInt(window.innerWidth);
      const scrollbarWidth = windowsWidth - documentWidth;
      return scrollbarWidth;
   }
};

export const initModals = modalWindow.initModal;
export const openModalIf = modalWindow.openModalIf;