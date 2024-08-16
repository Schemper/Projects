import { saveToStorage, loadFromStorage } from '../utils/storage.js';

export let cart = loadFromStorage();

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage(cart);
}