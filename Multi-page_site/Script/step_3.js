import { renderNavBars } from "./navBar.js";
import { addOns } from "./data.js";
import { getFromStorage } from "./sessionStorage.js";

renderNavBars();


function renderPage() {
  const { selectedPlan } = getFromStorage();
  const duration = selectedPlan.duration;

  const html = `
  <h1 class="main__header">Pick add-ons</h1>
  <p class="main__desc">Add-ons help enhance your gaming experience.</p>

  <section class="section js-section">${addOnsHTML(duration)}</section>
  `

  document.querySelector('.js-main').innerHTML = html;
}

function addOnsHTML(billingCycle) {
  let html = "";

  addOns.forEach((addOn) => {
    const fee = addOn.billing[billingCycle];

    html +=`
      <div class="section__container step3--responsive">
        <div>
          <input type="checkbox">
        </div>
        <div class="container__plan-div">
          <p class="container__level">${addOn.name}</p>
          <p class="section__desc">${addOn.desc}</p>
        </div>
        <div class="section__extra-fee">
          +$${fee.fee}${fee.cycle}
        </div>
      </div>
    `
  })
  return html;
}


function initializePage() {
  renderPage();
}

document.addEventListener('DOMContentLoaded', initializePage)