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
        <p class="container__level">Arcade</p>
        <p class="container__fee">$9/mo</p>
      </div>
    </div>
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="images/icon-advanced.svg" alt="">
      </div>
      <div class="container__plan-div">
        <p class="container__level">Advanced</p>
        <p class="container__fee">$12/mo</p>
      </div>
    </div>
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="images/icon-pro.svg" alt="">
      </div>
      <div class="container__plan-div">
        <p class="container__level">Pro</p>
        <p class="container__fee">$15/mo</p>
      </div>
    </div>

  </section>


  <div class="duration">
    <button class="duration__button duration__button--active">Monthly</button> 
    <div class="duration__switch">
      <div class="switch__white"></div>
    </div>
    <button class="duration__button">Yearly</button>
  </div>
`

document.querySelector('.js-second-page').innerHTML = html;

const selectPlan = document.querySelector('.js-section');

selectPlan.forEach((div) => {
  div.addEventListener('click', () => {
    console.log('print')
  })
})
  
