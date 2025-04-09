const menu = document.querySelector('.navbar__menu-icon');
const navBar = document.querySelector('.js-sidebar');
const closeIcon = document.querySelector('.js-sidebar__close-icon');

menu.addEventListener('click', () => {
  navBar.classList.add('sidebar--visible');
});


closeIcon.addEventListener('click', () => {
  navBar.classList.remove('sidebar--visible')
});

const arrowButton = document.querySelectorAll('.sidebar__menu-arrow');



arrowButton.forEach((button) => {
  button.addEventListener('click', () => {
    const imgElem = button.querySelector('img');
    const submenu = button.parentElement.querySelector('.sidebar__submenu');

    if (imgElem.src.endsWith('/resources/icon-arrow-down.svg')) {
      imgElem.src='./resources/icon-arrow-up.svg';
      submenu.classList.add('submenu--visible');
    } else {
      imgElem.src='./resources/icon-arrow-down.svg';
      submenu.classList.remove('submenu--visible');
    }
  });
});