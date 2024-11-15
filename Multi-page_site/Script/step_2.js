import { renderNavBars } from "./navBar.js";

renderNavBars();
  
const html = `
  <h1 class="main__header">Select your plan</h1>
  <p class="main__desc">You have the option of monthly or yearly billing.</p>

  <section class="section step2--responsive js-section">
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="images/icon-arcade.svg" alt="">
      </div>
      <div class="container__plan-div">
        <p class="container__level js-container__level">Arcade</p>
        <p class="container__fee js-container__fee">$9/mo</p>
      </div>
    </div>
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="images/icon-advanced.svg" alt="">
      </div>
      <div class="container__plan-div">
        <p class="container__level js-container__level">Advanced</p>
        <p class="container__fee js-container__fee">$12/mo</p>
      </div>
    </div>
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="images/icon-pro.svg" alt="">
      </div>
      <div class="container__plan-div">
        <p class="container__level js-container__level">Pro</p>
        <p class="container__fee js-container__fee">$15/mo</p>
      </div>
    </div>

  </section>


  <div class="duration js-duration">
    <button class="duration__button duration__button--active">Monthly</button> 
    <div class="duration__switch js-duration__switch">
      <div class="switch__white js-switch__white"></div>
    </div>
    <button class="duration__button">Yearly</button>
  </div>
`

document.querySelector('.js-second-page').innerHTML = html;

const parentContainer = document.querySelector('.js-section');
// Select the parent container
parentContainer.addEventListener('click', (event) => {
  // Find the closest container with the .js-section__container class
  const targetDiv = event.target.closest('.js-section__container');
  const levelText = targetDiv.querySelector('.js-container__level').textContent;

  // Only proceed if a valid container div was clicked
  if (targetDiv) {
    
    // Find any currently active div and remove the active class
    const activeDiv = parentContainer.querySelector('.active');
    if (activeDiv) {
      activeDiv.classList.remove('active');
    }

    // Toggle active class on the clicked div
    if (activeDiv !== targetDiv) {
      targetDiv.classList.add('active');
      // Log the text content of .js-container__level within the active div
      const levelText = targetDiv.querySelector('.js-container__level').textContent;
      console.log(levelText);
    } /*else {
      // No div is active, so display nothing
      console.clear(); // Optionally clear console when deselecting
    }*/
  }
});


const switchContainer = document.querySelector('.js-duration');
const durationSwitch = document.querySelector('.js-duration__switch');
const switchWhite = document.querySelector('.js-switch__white');

//padding for the white circle
const padding = 4;

//Calculate positions
const leftPosition = padding;
const rightPosition = durationSwitch.clientWidth - switchWhite.clientWidth - padding;

switchContainer.addEventListener('click', (event) => {

  // Check if the click is inside the durationSwitch or buttons
  const isDurationSwitch = event.target.classList.contains('js-duration__switch');
  const isButton = event.target.classList.contains('duration__button');

  if (!isDurationSwitch && !isButton) return; // Ignore clicks outside these elements
  
  const containerWidth = durationSwitch.getBoundingClientRect();
  const clickPosition = event.clientX - containerWidth.left;

  if (clickPosition < containerWidth.width / 2) {
    switchWhite.style.left = `${leftPosition}px`;
  } else {
    switchWhite.style.left = `${rightPosition}px`;
  }


  const buttons = switchContainer.querySelectorAll('.duration__button');
  buttons.forEach((button, index) => {
    if ((index === 0 && clickPosition < containerWidth.width / 2) || 
        (index === 1 && clickPosition >= containerWidth.width / 2)) {
        button.classList.add('duration__button--active');
    } else {
        button.classList.remove('duration__button--active');
    }
});
});


