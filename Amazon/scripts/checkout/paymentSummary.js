import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  
  function total() {
    let totalSum = 0;
    let totalShipping = 0;

    cart.forEach((cartItem) => {
      
      const productId = cartItem.productId
      let matchingProduct = getProduct(productId);
      

      let shipping = getDeliveryOption(cartItem.deliveryOptionId).priceCents;


      let total = cartItem.quantity * matchingProduct.priceCents;

      totalSum += total;
      totalShipping += shipping;
    });

    return { totalSum, totalShipping };
  }
 
  const totals = total();
  const totalBeforeTax = totals.totalSum + totals.totalShipping;
  const tax = totalBeforeTax * 0.1;
  const totalAfterTax = totalBeforeTax + tax;

  let html = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(totals.totalSum)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(totals.totalShipping)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary')
  .innerHTML = html;
 
}


