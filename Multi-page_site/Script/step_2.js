import { renderNavBars } from "./navBar.js";
import { plans, selectedPlan } from "./data.js";
import { saveToStorage, getFromStorage } from "./sessionStorage.js";

renderNavBars(); // Render navigation bars

// Render the layout
function renderPage() {
  const html = `
    <h1 class="main__header">Select your plan</h1>
    <p class="main__desc">You have the option of monthly or yearly billing.</p>
    <section class="section step2--responsive js-section"></section>
    <div class="duration js-duration">
      <button class="duration__button">Monthly</button> 
      <div class="duration__switch js-duration__switch">
        <div class="switch__white js-switch__white"></div>
      </div>
      <button class="duration__button">Yearly</button>
    </div>
  `;
  document.querySelector(".js-second-page").innerHTML = html;
}

// Render individual plan containers
function createPlanContainer(level, details, billingType) {
  const { cost, cycle, discount } = details.billing[billingType];
  const discountText = billingType === "yearly" ? discount || "" : "";

  return `
    <div class="section__container step2__container--responsive js-section__container">
      <div>
        <img class="container__img" src="${details.img}" alt="${level} image">
      </div>
      <div class="container__plan-div">
        <p class="container__level js-container__level">${level}</p>
        <p class="container__fee js-container__fee">$${cost}${cycle}</p>
        <p class="container__discount ${discount ? "" : "container__discount--hidden"}">${discountText}</p>
      </div>
    </div>
  `;
}

// Render all plans based on the selected duration
function renderPlan(billingType = "monthly") {
  const section = document.querySelector(".js-section");
  section.innerHTML = Object.entries(plans)
    .map(([level, details]) => createPlanContainer(level, details, billingType))
    .join("");
}

// Handle toggling between monthly and yearly durations
function updateSwitchPosition(duration) {
  const switchWhite = document.querySelector(".js-switch__white");
  const durationSwitch = document.querySelector(".js-duration__switch");
  const padding = 4;

  const leftPosition = padding;
  const rightPosition = durationSwitch.clientWidth - switchWhite.clientWidth - padding;

  if (duration === "yearly") {
    switchWhite.style.left = `${rightPosition}px`;
  } else {
    switchWhite.style.left = `${leftPosition}px`;
  }
}

// Set active state for duration buttons
function setActiveDurationButton(duration) {

  const buttons = document.querySelectorAll(".duration__button");
  buttons.forEach((button) => {
    button.classList.toggle(
      "duration__button--active",
      button.textContent.toLowerCase() === duration
    );
  });
}

// Handle switch clicks
function handleSwitchClick(event) {
  const isButton = event.target.classList.contains("duration__button");
  const isSwitch = event.target.classList.contains("js-duration__switch");

  if (!isButton && !isSwitch) return;

  const switchContainer = document.querySelector(".js-duration__switch");
  const containerWidth = switchContainer.getBoundingClientRect();
  const clickPosition = event.clientX - containerWidth.left;

  const duration = clickPosition < containerWidth.width / 2 ? "monthly" : "yearly";
  updateSwitchPosition(duration);
  setActiveDurationButton(duration);
  renderPlan(duration);
}

// Handle plan selection
function togglePlanSelection(event) {
  const section = document.querySelector(".js-section");
  const targetDiv = event.target.closest(".js-section__container");

  if (!targetDiv) return;

  const activeDiv = section.querySelector(".active");
  if (activeDiv) activeDiv.classList.remove("active");

  if (activeDiv !== targetDiv) {
    targetDiv.classList.add("active");
  }
}

// Save selected plan
function savePlan() {
  const activeDiv = document.querySelector(".js-section .active");

  if (!activeDiv) {
    alert("Please make a plan selection");
    return;
  }

  const planName = activeDiv.querySelector(".js-container__level").textContent;
  const planDetails = plans[planName];
  const duration = document.querySelector(".duration__button--active").textContent.toLowerCase();

  const { cost, cycle } = planDetails.billing[duration];

  selectedPlan.cost = cost;
  selectedPlan.cycle = cycle;
  selectedPlan.planName = planName;
  selectedPlan.duration = duration;

  saveToStorage(selectedPlan);

  window.location.href = "Step_3.html";
}

// Initialize the page
function initializePage() {
  renderPage();

  const { selectedPlan } = getFromStorage() || {};
  const storedPlan = selectedPlan || { duration: "monthly" };
  const duration = storedPlan.duration || "monthly";

  updateSwitchPosition(duration);
  setActiveDurationButton(duration);
  renderPlan(duration);

  document.querySelector(".js-duration").addEventListener("click", handleSwitchClick);
  document.querySelector(".js-section").addEventListener("click", togglePlanSelection);
  document.querySelector(".footer__button").addEventListener("click", savePlan);
}

document.addEventListener("DOMContentLoaded", initializePage);
