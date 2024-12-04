import { renderNavBars } from "./navBar.js";
import { getFromStorage } from "./sessionStorage.js";

renderNavBars();

function renderPage(selectedPlan, selectedAddOns) {

  const capitalizedDuration = selectedPlan.duration.charAt(0).toUpperCase() + selectedPlan.duration.slice(1).toLowerCase();

  const html = `
  <h1 class="main__header">
    Finishing up
  </h1>
  <p class="main__desc">
    Double-check everything looks OK before confirming.
  </p>

  <div class="summary">
    <div class="summary__block summary__duration">
      <div class="summary__duration--layout">
        
        ${selectedPlan.planName} (${capitalizedDuration})
        
        <a class="summary__duration-change" href="Step_2.html">
          Change
        </a>
      </div>
        
      <div class="summary__duration--layout summary__duration-price">$${selectedPlan.cost}${selectedPlan.cycle}</div>
    </div>
    <div class="summary__block js-summary__block">
      <p class="summary__desc">Online service</p>
      <span class="summary__additional-fee">+$1/mo</span>
    </div>
    <div class="summary__block">
      <p class="summary__desc">Larger storage</p>
      <span class="summary__additional-fee">+$2/mo</span>
    </div>
  </div>
  <div class="summary__total-card">
    <p class="summary__desc summary__total-desc">Total (per-month)</p>
    <span class="summary__total">+$12/mo</span>
  </div>
  `

  document.querySelector('.js-main').innerHTML = html;
}

function selectedAddOnsHTML(selectedAddOns) {
  let html = "";

  selectedAddOns.forEach((addOn) => {
    html +=`
      <p class="summary__desc">${addOn.name}</p>
      <span class="summary__additional-fee">+$1/mo</span>
    `
  })

  return html;
}

function initializePage() {
  const { selectedPlan, selectedAddOns } = getFromStorage();

  renderPage(selectedPlan);
}

document.addEventListener('DOMContentLoaded', initializePage)