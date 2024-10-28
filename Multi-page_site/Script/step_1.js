import {renderNavBars} from "./navBar.js"
import saveToStorage, { getFromStorage } from "./sessionStorage.js";

renderNavBars();

const html = `
  <h1 class="main__header">Personal info</h1>
  <p class="main__desc">Please provide your name, email address, and phone number.</p>

  <div class="first-page__label-group">
    <label class="first-page__label" for="Name">Name</label>
    <span class="first-page__warning"></span>
  </div>
  <input class="first-page__input first-page__input--warning" type="text" id="Name" placeholder="e.g. Stephen King" required>

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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-first-page').innerHTML = html;

  const button = document.querySelector('.footer__button');
  getFromStorage();

  if (button) { // Check if the button exists
    button.addEventListener('click', () => {
      if (validateForm()) {
        window.location.href = 'Step_2.html';
        saveToStorage();
      }
    });
  }
});


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
    warnings[index].textContent = '';

    if (input.value.trim() === '') {
      warnings[index].textContent = 'This field is required';
      hasWarning = true;
    } else {
      if (index === 1 && !emailRegex.test(input.value)) {
        warnings[index].textContent = 'Invalid email address'; 
        hasWarning = true;
      }

      if (index === 2 && !phoneRegex.test(input.value)) {
        warnings[index].textContent = 'Invalid phone number';
        hasWarning = true;
      }
    }
  })

  return !hasWarning;
}


/*inputs.forEach((input, index) => {
  if (input.value.trim() === '') {
    warnings[index].classList.add('not_added');
    hasWarning = true;
  } else if (input[1]  ) {
    warnings[index].classList.remove('not_added');
  }
})


const warning = [
  'This field is required',
  'This is an invalid Input'
]

function checkInput() {
  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      warning[0] 
    } else {
      warning[1] 
    }
  });
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (emailRegex.test(inputs[1].value)) {
    console.log('valid email')
  } else {
    console.log('invalid email')
  }
}*/