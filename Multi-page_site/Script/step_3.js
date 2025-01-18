import { renderNavBars } from "./navBar.js";
import { addOns } from "./data.js";
import { getFromStorage, saveSelectedAddOns, validatePageAccess } from "./sessionStorage.js";

renderNavBars();


function renderPage(duration) {
  
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
      <div class="section__container step3--responsive js-section__container">
        <div>
          <input type="checkbox">
        </div>
        <div class="container__plan-div">
          <p class="container__level js-container__level">${addOn.name}</p>
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

function pickAddOns(event) {
  const targetDiv = event.target.closest('.js-section__container');


  const checkbox = targetDiv.querySelector('input[type="checkbox"]');

  if (event.target === checkbox) {
    // Sync class with checkbox state
    targetDiv.classList.toggle('active', checkbox.checked);
  } else {
    // Toggle checkbox and class when div is clicked
    checkbox.checked = !checkbox.checked;
    targetDiv.classList.toggle('active');
  }
 
}

function saveAddOns() {
  const containers = document.querySelectorAll('.js-section__container');

  containers.forEach(container => {
    const addOnName = container.querySelector('.js-container__level').textContent;
    const checkbox = container.querySelector('input[type="checkbox"]');

    // Find the matching add-on in the array and update its `selected` property
    const addOnIndex = addOns.findIndex(addOn => addOn.name === addOnName);
    if (addOnIndex > -1) {
      addOns[addOnIndex].selected = checkbox.checked;
    }
  });

  const selectedAddOns = addOns.filter(addOn => addOn.selected);
  saveSelectedAddOns(selectedAddOns);
  window.location.href = "Step_4.html";
}



function initializePage() {
  const { selectedPlan } = getFromStorage();
  const duration = selectedPlan.duration;

  const currentStep = 'Step_3.html';
  if (!validatePageAccess(currentStep)) {
    return; // Stop further execution if access is invalid
  }
  

  renderPage(duration);

  document.querySelector('.js-section').addEventListener('click', pickAddOns);
  document.querySelector(".footer__button").addEventListener("click", saveAddOns);
}

document.addEventListener('DOMContentLoaded', initializePage)