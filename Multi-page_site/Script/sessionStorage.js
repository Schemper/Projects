import { selectedPlan } from "./data.js";

export function getFromStorage() {
  const userInput = JSON.parse(sessionStorage.getItem('userInput')) || {};
  const selectedPlan = JSON.parse(sessionStorage.getItem('selectedPlan')) || {};
  return { userInput, selectedPlan }; // Return both as an object
}


export function saveToStorage(selectedPlan) {  
  sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
}

export function saveUserInput() {
  sessionStorage.setItem('userInput', JSON.stringify({
    name: document.getElementById('Name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone_number').value,
  }));
}
