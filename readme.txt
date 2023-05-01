1. Інструкції з встановлення

 - Встановіть Node.js на свій комп'ютер, якщо він ще не встановлений. Ви можете завантажити його з офіційного сайту: https://nodejs.org/en/.
 - Склонуйте репозиторій проекту на свій локальний комп'ютер.
 - Відкрийте термінал і перейдіть у директорію проекту.
 - Введіть команду npm install для встановлення всіх залежностей проекту.

- - - - - - - - - - - -

2. Інструкції з використання

 - Запустіть проект у режимі розробки: npm run dev
   Ця команда запускає проект у режимі розробки, в якому файли автоматично перебираються при зміні вихідного коду.

 - Зіберіть проект для продакшену: npm run build
   Ця команда збирає проект для продакшену, оптимізуючи файли для швидкого завантаження та мінімізуючи їх розмір.

- - - - - - - - - - - -

3. Структура проекту

 - gulpfile.js - файл, в якому імпортовано завдання для Gulp.
 - gulp/tasks/ - безпосередньо файли завдань Gulp.
 - gulp/config/ - файли налаштувань.
 - src/ - директорія, в якій знаходяться вихідні файли проекту.
 - dist/ - директорія, в яку Gulp збирає проект для продакшену.

- - - - - - - - - - - -

4. Зміна конфігурації

 - gulpfile.js - у цьому файлі можна змінювати конфігурацію Gulp, додавати або видаляти завдання, налаштовувати їх параметри та ін.

- - - - - - - - - - - -

5. Розширення функціональності

 Ви можете додавати нові завдання в gulpfile.js, щоб розширити функціональність проекту. 
 При цьому слід переконатися, що ці завдання виконуються у потрібному порядку, і не призводять до помилок у збірці проекту.


_____________________________________________________________________________________________________________________________________________
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



1. Installation instructions

  - Install Node.js on your computer if it is not already installed. You can download it from the official site: https://nodejs.org/en/.
  - Clone the project repository to your local computer.
  - Open a terminal and go to the project directory.
  - Type npm install command to install all project dependencies.

- - - - - - - - - - - -

2. Instructions for use

  - Run the project in development mode: npm run dev
    This command starts the project in development mode, in which files are automatically iterated over when the source code changes.

  - Build the project for production: npm run build
    This team assembles the project for production, optimizing the files for fast download and minimizing their size.

- - - - - - - - - - - -

3. Project structure

  - gulpfile.js - the file in which the task for Gulp is imported.
  - gulp/tasks/ - Gulp task files directly.
  - gulp/config/ - settings files.
  - src/ - the directory where the source files of the project are located.
  - dist/ - the directory into which Gulp collects the project for production.

- - - - - - - - - - - -

4. Changing the configuration

  - gulpfile.js - in this file, you can change the configuration of Gulp, add or remove tasks, adjust their parameters, etc.

- - - - - - - - - - - -

5. Expanding functionality

  You can add new tasks to gulpfile.js to extend the functionality of the project.
  At the same time, you should make sure that these tasks are performed in the right order and do not lead to errors in the project assembly.
