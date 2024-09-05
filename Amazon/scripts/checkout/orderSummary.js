import {products} from '../../data/products.js'
import { calculateCartQuantity, cart, removeFromCart } from '../../data/cart.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption, updateDeliveryOption } from '../../data/deliveryOption.js';
import formatCurrency from '../utils/money.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId
    
    let matchingProduct = '';

    const deliveryOptionId = cartItem.deliveryOptionId

    const deliveryOption = getDeliveryOption(deliveryOptionId);


    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOption)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';


    deliveryOptions.forEach((deliveryOption) => {

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE' 
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"  
        data-product-id="${matchingProduct.id}" 
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${ischecked ? 'checked' : ''} 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${calculateDeliveryDate(deliveryOption)}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;




  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      removeFromCart(productId);
      
      renderOrderSummary();
      updateCartQuantity();
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

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      const productId = dataset.productId

      element.addEventListener('click', () => {
        updateDeliveryOption(productId)
        renderOrderSummary();
      })
    })


}