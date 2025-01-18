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

document.addEventListener('DOMContentLoaded', () => {
  const firstVisitKey = 'hasVisited'; // Key to track first-time visits

  // Check if the user has visited before
  const hasVisited = sessionStorage.getItem(firstVisitKey);

  if (!hasVisited) {
    // Redirect the user to Page 1
    window.location.href = 'Step_1.html';

    // Mark as visited in sessionStorage
    sessionStorage.setItem(firstVisitKey, 'true');
  }
});


export function validatePageAccess(requiredStep) {
  const { selectedPlan } = getFromStorage();

  // Redirect to Step 1 if it's the first visit
  if (!sessionStorage.getItem('hasVisited')) {
    window.location.href = 'Step_1.html';
    return false;
  }

  // Redirect to Step 2 if the plan is not selected, or planName is missing, and user is trying to access Step 3 or 4
  if (
    (!selectedPlan || !selectedPlan.planName) &&
    (requiredStep === 'Step_3.html' || requiredStep === 'Step_4.html')
  ) {
    alert('Please select a plan on Page 2 before proceeding.');
    window.location.href = 'Step_2.html';
    return false;
  }

  return true; // Access is valid
}

