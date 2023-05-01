'use strict';
// > - - - - - - - - [Import] - - - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - - - -
import { consoleInfo } from './modules/functions.js';
import { initSpoiler } from './modules/spoilers.js';
import { initModals, openModalIf } from './modules/modal.js';
// > - - - - - - - - [app development] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
document.addEventListener('DOMContentLoaded', app);

function app() {
   // - - - - - - - [app {START}] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   consoleInfo();
   initSpoiler();
   initModals();

   // entry greeting
   let userInfo = JSON.parse(localStorage.getItem('user-info')) || [];
   const userName = document.querySelector('.modal__main input');

   if (userInfo.length == 0) {
      openModalIf('modal-entry');
      document.querySelector('.modal__main').addEventListener('submit', (e) => {
         e.preventDefault();
         if (userName.value != '') {
            userInfo = { userName: userName.value, isRegistered: true }
            localStorage.setItem('user-info', JSON.stringify(userInfo));
            openModalIf('modal-greeting');
            document.querySelector('.modal-greeting__title span').innerHTML = userName.value;
         }
      });
   } else {
      document.querySelector('.modal-come-back__title span').innerText = userInfo.userName;
      openModalIf('modal-come-back');
   }


   // todo app
   let tasks = JSON.parse(localStorage.getItem('tasks-list')) || [];
   let tasksComplited = JSON.parse(localStorage.getItem('tasks-list-complited')) || [];

   const root = document.querySelector(':root');
   const addFormApp = document.querySelector('.app__add');
   const tasksList = document.querySelector('.app__list');
   const removeButton = document.querySelector('.app__remove');
   const checkAllButton = document.querySelector('.app__check-all');
   const inputFile = document.querySelector('[type=file]');
   const filesContainer = document.querySelector('._files-container');
   const colorThemeSwitcher = document.querySelector('.clr-theme__input');

   let allChecked = false;
   let uploadedImageSrc = '';

   renderList(tasks, tasksList);


   function addTask(e) {
      e.preventDefault();
      const itemObj = {
         name: this.querySelector('.add-app__input_name').value,
         desc: this.querySelector('.add-app__input_desc').value,
         time: this.querySelector('.add-app__input_time').value,
         imageSrc: uploadedImageSrc == '' ? '' : uploadedImageSrc,
         done: false
      };
      tasks.push(itemObj);
      localStorage.setItem('tasks-list', JSON.stringify(tasks));
      renderList(tasks, tasksList);
      addFormApp.reset();
      filesContainer.innerHTML = '';
      uploadedImageSrc = '';
   }

   function renderList(itemsList, itemWrapper) {
      itemWrapper.innerHTML = itemsList.length == 0 ? '<li class="_empty-list">Ой-Ой, здається ваш список порожній!</li>' : itemsList.map((item, i) => {
         return `
              <li class="app__item item-app">
                <input class="item-app__input visually-hidden" type="checkbox" id="item-${i}" data-i="${i}" ${item.done == true ? 'checked' : ''}>
                <label class="item-app__label" for="item-${i}" >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4682b4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" id="checkmark">
                      <polyline points="3 12 9 17 21 3" />
                   </svg>
                   ${item.name}
                </label>
                ${item.desc == '' && item.imageSrc == '' ? '' : `
                <button class="item-app__show-more" type="button" aria-label='Показати опис' data-spoiler>
                   <svg class='icon-arrow'>
                      <use href='./sprites/sprite.svg#icon-arrow'></use>
                   </svg>
                </button>`}
       
                <div class="item-app__desc">
                      ${item.desc != '' ? `<p>${item.desc}</p>` : ''}
                       ${item.imageSrc != '' ? `
                  <div class="item-app__image _imw">
                   <img src="${item.imageSrc}" alt="Завантажене зображення">
                
                </div>
                ` : '' }
                   ${item.time != '' ? `<p>${item.time}</p>` : ''}
                </div>
             </li>`
      }).join('');
   }

   function toggleTask(e) {
      if (e.target.matches('input')) {
         tasks[e.target.dataset.i].done = !tasks[e.target.dataset.i].done;
         localStorage.setItem('tasks-list', JSON.stringify(tasks));
      }
   }

   function removeTasks() {
      tasks.splice(0, tasks.length);
      localStorage.setItem('tasks-list', JSON.stringify(tasks));
      renderList(tasks, tasksList);
   }

   function checkAllTasks() {
      if (tasks.every(task => task.done == true)) {
         tasks.forEach(task => {
            task.done = false;
         })
      } else if (tasks.every(task => task.done == false)) {
         tasks.forEach(task => {
            task.done = true;
         })
      } else {
         tasks.forEach(task => {
            task.done = true;
         })
      }
      localStorage.setItem('tasks-list', JSON.stringify(tasks));
      renderList(tasks, tasksList)
   }

   function uploadFile() {
      const sortedFiles = [...inputFile.files].filter(file => fileValidation(file));
      const files = sortedFiles;
      filesContainer.innerHTML = '';

      files.forEach((file, i) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = function(e) {
            const previewImage = document.createElement('img');
            previewImage.classList.add('_file-preview-content');
            previewImage.src = e.target.result;
            const imageSrc = e.target.result;
            uploadedImageSrc = imageSrc;

            const fileWrapper = document.createElement('div');
            fileWrapper.classList.add('_file-wrapper');
            fileWrapper.classList.add('_imw');
            fileWrapper.appendChild(previewImage);

            filesContainer.appendChild(fileWrapper);
         };
         reader.onerror = function() {
            alert('Error!');
         };
      })
   }

   function fileValidation(file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxFileSize = 2 * 1024 * 1024;
      if (!allowedTypes.includes(file.type)) {
         alert(`Тільки зображення!`);
         return false;
      }
      if (file.size > maxFileSize) {
         alert(`Не більше 2 мегабайт!`);
         return false;
      }
      return true;
   }

   function swithThemeColor() {
      if (this.checked) {
         root.style.setProperty('--background', 'var(--background-dark)');
         root.style.setProperty('--app-border', 'var(--app-border-dark)');
         root.style.setProperty('--app-bg', 'var(--app-bg-dark)');
         root.style.setProperty('--main-title', 'var(--main-title-dark)');
         root.style.setProperty('--label-title', 'var(--label-title-dark)');
         root.style.setProperty('--text-item', 'var(--text-item-dark)');
         root.style.setProperty('--checkbox-fill', 'var(--checkbox-fill-dark)');
         root.style.setProperty('--checkbox-border', 'var(--checkbox-border-dark)');
         root.style.setProperty('--input-border', 'var(--input-border-dark)');
         root.style.setProperty('--button', 'var(--button-dark)');
      } else {
         root.style.setProperty('--background', 'var(--background-light)');
         root.style.setProperty('--app-border', 'var(--app-border-light)');
         root.style.setProperty('--app-bg', 'var(--app-bg-light)');
         root.style.setProperty('--main-title', 'var(--main-title-light)');
         root.style.setProperty('--label-title', 'var(--label-title-light)');
         root.style.setProperty('--text-item', 'var(--text-item-light)');
         root.style.setProperty('--checkbox-fill', 'var(--checkbox-fill-light)');
         root.style.setProperty('--checkbox-border', 'var(--checkbox-border-light)');
         root.style.setProperty('--input-border', 'var(--input-border-light)');
         root.style.setProperty('--button', 'var(--button-light)');
      }
   }

   inputFile.addEventListener('change', uploadFile)
   colorThemeSwitcher.addEventListener('change', swithThemeColor)
   tasksList.addEventListener('change', toggleTask);
   addFormApp.addEventListener('submit', addTask);
   removeButton.addEventListener('click', removeTasks);
   checkAllButton.addEventListener('click', checkAllTasks);









   // - - - - - - - [app {END}] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}