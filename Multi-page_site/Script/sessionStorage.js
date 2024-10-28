export function getFromStorage() {
  let userInput = JSON.parse(sessionStorage.getItem('userInput'));
}


function saveToStorage() {
  sessionStorage.setItem('userInput', JSON.stringify({
    name: document.getElementById('Name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone_number').value
  }));
}

export default saveToStorage; 