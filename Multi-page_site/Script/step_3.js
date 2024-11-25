import { renderNavBars } from "./navBar.js";

renderNavBars();


function renderPage() {
  const html = `
  <h1 class="main__header">Pick add-ons</h1>
  <p class="main__desc">Add-ons help enhance your gaming experience.</p>

  <section class="section">
    <div class="section__container step3--responsive">
      <div>
        <input type="checkbox">
      </div>
      <div class="container__plan-div">
        <p class="container__level">Online service</p>
        <p class="section__desc">Access to multiplayer games</p>
      </div>
      <div class="section__extra-fee">
        +$1/mo
      </div>
    </div>
    <div class="section__container step3--responsive">
      <div>
        <input type="checkbox">
      </div>
      <div class="container__plan-div">
        <p class="container__level">Larger storage</p>
        <p class="section__desc">Extra 1TB of cloud save</p>
      </div>
      <div class="section__extra-fee">
        +$2/mo
      </div>
    </div>
    <div class="section__container step3--responsive">
      <div class="checkbox-div">
        <input type="checkbox">
      </div>
      <div class="container__plan-div">
        <p class="container__level">Customizable profile</p>
        <p class="section__desc">Custom theme on your profile</p>
      </div>
      <div class="section__extra-fee">
        +$2/mo
      </div>
    </div>
  </section>
  `

  document.querySelector('.js-main').innerHTML = html;
}





function initializePage() {
  renderPage();
}

document.addEventListener('DOMContentLoaded', initializePage)