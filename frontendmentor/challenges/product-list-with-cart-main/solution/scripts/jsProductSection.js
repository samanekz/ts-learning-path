import { updateCartSection } from "./cartSection.js";

export const cartList = [];

export function findCartItem(productName) {
  const cartItem = cartList.find((cart) => cart.name === productName);

  return cartItem;
}

export function addToCart(productName, productPrice) {
  const cartItem = findCartItem(productName);
  if (!cartItem) {
    cartList.push({
      name: productName,
      quantity: 1,
      price: productPrice,
    });
  }
  updateCartSection();
}

export function removeFromCart(productName) {
  const index = cartList.findIndex((item) => item.name === productName);
  if (index !== -1) {
    cartList.splice(index, 1);
  }
}

export function decrementAction(productName) {
  const item = cartList.find((el) => el.name === productName);

  if (!item) return;

  if (item.quantity - 1 === 0) {
    removeFromCart(item.name);
  } else {
    item.quantity -= 1;
  }
}

export function incrementAction(productName) {
  const item = cartList.find((el) => el.name === productName);

  if (!item) return;

  item.quantity += 1;
}

export function fillQuantityText(product, productName) {
  const cartItem = findCartItem(productName);
  if (cartItem) {
    const currentQuantity = cartItem.quantity;
    const quantity = product.querySelector(".product__cart-quantity");
    quantity.textContent = currentQuantity;
  } else {
    product.classList.remove("selected");
  }
}
