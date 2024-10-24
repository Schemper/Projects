import {renderNavBars} from "./navBar.js"

renderNavBars();

const html = `
  <h1 class="main__header">Personal info</h1>
  <p class="main__desc">Please provide your name, email address, and phone number.</p>

  <div class="first-page__label-group">
    <label class="first-page__label" for="Name">Name</label>
    <span class="first-page__warning">This field is required</span>
  </div>
  <input class="first-page__input first-page__input--warning" type="text" id="Name" placeholder="e.g. Stephen King" required>

  <div class="first-page__label-group">
    <label class="first-page__label" for="email">Email Address</label>
    <span class="first-page__warning">This field is required</span>
  </div>
  
  <input class="first-page__input" type="email" id="email" placeholder="e.g. stephenking@lorem.com" required>

  <div class="first-page__label-group">
    <label class="first-page__label" for="phone_number">Phone Number</label>
    <span class="first-page__warning">This field is required</span>
  </div>
  <input class="first-page__input" type="tel" id="phone_number" placeholder="e.g. +1 234 567 890" required> 
`

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-first-page').innerHTML = html;

  const button = document.querySelector('.footer__button');

  if (button) { // Check if the button exists
    button.addEventListener('click', () => {
      if (validateForm()) {
        window.location.href = 'Step_2.html';
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

  /*saved all element with the classname warning into
  a variable called warnings*/
  const warnings = document.querySelectorAll('.first-page__warning');

  let hasWarning = false;

  /*iterated over the array inputs and checked if each 
  input is empty, if empty we add a new class with that is empty */
  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      warnings[index].classList.add('empty_field');
      hasWarning = true;
    } else {
      warnings[index].classList.remove('empty_field');
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