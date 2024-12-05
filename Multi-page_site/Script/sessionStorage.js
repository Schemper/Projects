export function getFromStorage() {
  const userInput = JSON.parse(sessionStorage.getItem('userInput')) || {};
  const selectedPlan = JSON.parse(sessionStorage.getItem('selectedPlan')) || {};
  const selectedAddOns = JSON.parse(sessionStorage.getItem('selectedAddOns')) || {};
  return { userInput, selectedPlan, selectedAddOns }; 
}


export function saveToStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function saveSelectedPlan(selectedPlan) {
  saveToStorage('selectedPlan', selectedPlan);
}

export function saveUserInput() {
  const userInput = {
    name: document.getElementById('Name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone_number').value,
  };
  saveToStorage('userInput', userInput);
}

export function saveSelectedAddOns(selectedAddOns) {
  saveToStorage('selectedAddOns', selectedAddOns);
}

