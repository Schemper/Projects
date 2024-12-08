import { renderNavBars } from "./navBar.js";
import { getFromStorage } from "./sessionStorage.js";

renderNavBars();

function renderPage(selectedPlan, selectedAddOns) {

  const capitalizedDuration = selectedPlan.duration.charAt(0).toUpperCase() + selectedPlan.duration.slice(1).toLowerCase();

  const total = calculateTotal (selectedPlan, selectedAddOns)

  const formattedDuration = selectedPlan.duration.slice(0, -2).toLowerCase();

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
      <div class="summary__block addOn__container">
        ${selectedAddOnsHTML(selectedAddOns, selectedPlan.duration)}
      </div>
    
    </div>
    <div class="summary__total-card">
      <p class="summary__desc summary__total-desc">Total (per ${formattedDuration})</p>
      <span class="summary__total">+$${total}${selectedPlan.cycle}</span>
    </div>
  `

  document.querySelector('.js-main').innerHTML = html;
}

function selectedAddOnsHTML(selectedAddOns, duration) {

  if (!Array.isArray(selectedAddOns) || selectedAddOns.length === 0) {
    return '<p>No add-ons selected</p>';
  }

  let html = "";

  selectedAddOns.forEach((addOn) => {

    const fee = addOn.billing[duration];

    html +=`
      <div class="summary__addOn">
        <p class="summary__desc">${addOn.name}</p>
        <span class="summary__additional-fee">+$${fee.fee}${fee.cycle}</span>
      </div>
    `
  })

  return html;
}

function calculateTotal (selectedPlan, selectedAddOns) {
  let total = selectedPlan.cost;

  if (Array.isArray(selectedAddOns)) {
    selectedAddOns.forEach((addOn) => {

      const fee = addOn.billing[selectedPlan.duration];
       if (fee) total += fee.fee
    })
  }

  return total;
}

function submitForm() {
  window.location.href = "Thank You.html";
}

function initializePage() {
  const { selectedPlan, selectedAddOns } = getFromStorage();

  renderPage(selectedPlan, selectedAddOns);

  document.querySelector('.footer__button').addEventListener('click', submitForm);

}

document.addEventListener('DOMContentLoaded', initializePage)