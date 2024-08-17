import {products} from '../data/products.js'
import { calculateCartQuantity, cart, removeFromCart } from '../data/cart.js';


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId
  
  let matchingProduct = '';


  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $20.95
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label 
              js-quantity-label-${matchingProduct.id}">
              ${cartItem.quantity}
              </span>
            </span>
            <span class="update-quantity-link link-primary 
            js-update-quantity-link" 
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="input-quantity-link 
            js-input-quantity-${matchingProduct.id}
            js-input-quantity"
            data-product-id="${matchingProduct.id}"></input>
            <span class="link-primary 
            save-quantity-link 
            js-save-quantity-link"
            data-product-id="${matchingProduct.id}">
            Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    
    removeFromCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)

    updateCartQuantity();
    container.remove();
  })
});


function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();


document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      
    });
  });


document.querySelectorAll(`.js-save-quantity-link`)
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container =  document.querySelector(`.js-cart-item-container-${productId}`);

    let quantityElem = document.querySelector(`.js-input-quantity-${productId}`).value
    
    let newQuantity = Number(quantityElem);

    if (!cautionAlert(newQuantity)) {
      return; // Halt further execution if the input is invalid
    }

    updateQuantity(productId, newQuantity);

    container.classList.remove('is-editing-quantity');
    
  });
});


function updateQuantity(productId, newQuantity) {
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
    }
  });
  
  updateCartQuantity();
}

document.querySelectorAll('.js-input-quantity')
  .forEach((input) => {
    input.addEventListener('keydown', (event) => {
      
      if (event.key === 'Enter') {
        const productId = input.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        let quantityElem = document.querySelector(`.js-input-quantity-${productId}`).value;
        
        const newQuantity = Number(quantityElem);

        if (!cautionAlert(newQuantity)) {
          return; // Halt further execution if the input is invalid
        }

        updateQuantity(productId, newQuantity);
        
        container.classList.remove('is-editing-quantity')
      }
    });
  });

function cautionAlert(newQuantity) {
  if (isNaN(newQuantity)) {
    alert('Please input numbers only')
    return false;
  }

  if (!Number.isInteger(newQuantity)) {
    alert ('Only whole numbers allowed')
    return false;
  }

  if (newQuantity < 1 || newQuantity > 999) {
    alert('Number must be at least 1 and below 1000')
    return false;
  }

  return true; // If all checks pass, return true
}