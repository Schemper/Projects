export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  [{
    productId: "d339adf3-e004-4c20-a120-40e8874c66cb",
    quantity: 2
  }, {
    productId: "d37a651a-d501-483b-aae6-a9659b0757a0",
    quantity: 1
  }];
}




function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    } 
  });   

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
      cart.push({
      productId,
      quantity
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {

  let newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}