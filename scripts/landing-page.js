const inputElem = document.querySelector('.js-fifth-section-input input');
let timeoutId;
  

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitEmail() {
  const email = inputElem.value;
  const warning = document.querySelector('.warning')

  if (email === "" || !validateEmail(email)) {
    warning.classList.add('wrong_email_format');

    if(timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      warning.classList.remove('wrong_email_format');
    }, 3000);

  } else {
    inputElem.value = "";
    alert('Thank you for Signing up');
  }
}

document.querySelector('.js-fifth-section-button').addEventListener('click', () => {
  submitEmail();
  
});

inputElem.addEventListener('keydown', (event) => {

  if (event.key === 'Enter'){
    submitEmail();
  }
});

document.querySelector('.get-started-btn').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default action if needed
  const target = document.querySelector('.fifth-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});