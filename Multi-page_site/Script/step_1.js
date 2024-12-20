import {renderNavBars} from "./navBar.js"
import { getFromStorage, saveUserInput } from "./sessionStorage.js";

renderNavBars();

const html = `
  <h1 class="main__header">Personal info</h1>
  <p class="main__desc">Please provide your name, email address, and phone number.</p>

  <div class="first-page__label-group">
    <label class="first-page__label" for="Name">Name</label>
    <span class="first-page__warning"></span>
  </div>
  <input class="first-page__input" type="text" id="Name" placeholder="e.g. Stephen King" required>

  <div class="first-page__label-group">
    <label class="first-page__label" for="email">Email Address</label>
    <span class="first-page__warning"></span>
  </div>
  
  <input class="first-page__input" type="email" id="email" placeholder="e.g. stephenking@lorem.com" required>

  <div class="first-page__label-group">
    <label class="first-page__label" for="phone_number">Phone Number</label>
    <span class="first-page__warning"></span>
  </div>
  <input class="first-page__input" type="tel" id="phone_number" placeholder="e.g. +1 234 567 890" required> 
`
document.querySelector('.js-first-page').innerHTML = html;

document.addEventListener('DOMContentLoaded', () => {
  
  const {userInput} = getFromStorage();

  if (userInput) {
    document.getElementById('Name').value = userInput.name || '';
    document.getElementById('email').value = userInput.email || '';
    document.getElementById('phone_number').value = userInput.phone || '';
  }

  const button = document.querySelector('.footer__button');

  if (button) { // Check if the button exists
    button.addEventListener('click', () => {
      if (validateForm()) {
        saveUserInput();
        window.location.href = 'Step_2.html';
      }
    });
  }
});

let addedMessageTimeoutId = {};


function validateForm() {

  /*created an array and include all the input element 
  into a variable*/
  const inputs = [
    document.getElementById('Name'),
    document.getElementById('email'),
    document.getElementById('phone_number')
  ];

  const nameRegex = /^[A-Za-z]{2,} [A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?(\d[- ]?){7,15}$/;
  

  /*saved all element with the classname warning into
  a variable called warnings*/
  const warnings = document.querySelectorAll('.first-page__warning');

  let hasWarning = false;
  

  /*iterated over the array inputs and checked if each 
  input is empty, if empty we add a new class with that is empty */
  inputs.forEach((input, index) => {
    const warningElement = warnings[index];
    warningElement.textContent = '';

    if (input.value.trim() === '') {
      flashWarning(warningElement, 'This field is required', index);
      hasWarning = true;
    } else {
      if (index === 1 && !emailRegex.test(input.value)) {
        flashWarning(warningElement, 'Invalid email address', index);
        hasWarning = true;
      }

      if (index === 2 && !phoneRegex.test(input.value)) {
        flashWarning(warningElement, 'Invalid phone number', index);
        hasWarning = true;
      }
    }
  })

  return !hasWarning;
}

function flashWarning(warningElement, message, index) {
  // Clear any existing timeout for this warning
  if (addedMessageTimeoutId[index]) {
    clearTimeout(addedMessageTimeoutId[index]);
  }

  // Set the warning message
  warningElement.textContent = message;
  warningElement.classList.remove('fade-out', 'first-page__input--warning');

  addedMessageTimeoutId[index] = setTimeout(() => {
    warningElement.classList.add('fade-out', 'first-page__input--warning');

    // Clear the message after the fade-out transition (500ms delay to match CSS)
    setTimeout(() => {
      warningElement.textContent = '';
    }, 1000);
  }, 2000);
}