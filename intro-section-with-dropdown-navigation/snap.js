const menu = document.querySelector('.navbar__menu-icon');
const navBar = document.querySelector('.js-sidebar');
const closeIcon = document.querySelector('.js-sidebar__close-icon');

menu.addEventListener('click', () => {
  console.log("Working")
  navBar.classList.add('sidebar--visible');
});


closeIcon.addEventListener('click', () => {
  console.log('Clicking')
  navBar.classList.remove('sidebar--visible')
});