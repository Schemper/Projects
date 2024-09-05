import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js'

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')


  const dateString = deliveryDate.format('dddd, MMMM D')
  return dateString;
}

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  });

  return deliveryOption || deliveryOption[0];
}

export function updateDeliveryOption(productId) {
  
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem
    }
  })
  const deliveryOption = matchingItem.deliveryOption
  return deliveryOption
}