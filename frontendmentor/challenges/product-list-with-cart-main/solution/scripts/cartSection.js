import { cartList, calculateTotalCartPrice } from "./jsProductSection.js";
import { renderOrderConfirmation } from "./orderConfirmation.js";
import { updateProductSection } from "./productSection.js";

export function renderCartSection() {
  const cartSection = createCartSectionHTML();
  return cartSection;
}

function createCartSectionHTML() {
  const cart = document.createElement("section");
  cart.classList.add("cart");

  cart.appendChild(cartHeader());
  cart.appendChild(emptyCart());

  return cart;
}

export function updateCartSection() {
  const cartSection = document.querySelector(".cart");
  if (!cartSection) return;
  cartSection.innerHTML = "";

  cartSection.appendChild(cartHeader(cartList.length));
  if (cartList.length === 0) {
    cartSection.appendChild(emptyCart());
  } else {
    cartSection.appendChild(cartOrderList());
    cartSection.appendChild(cartOrderTotalBox(cartList));
    cartSection.appendChild(cartDeliveryMesssage());
    cartSection.appendChild(confirmOrderButton());
  }
}

function cartHeader(countOrder = 0) {
  const cartHeader = document.createElement("h2");
  cartHeader.classList.add("cart__header");

  const cartTotalQuantity = document.createElement("span");
  cartTotalQuantity.classList.add("cart-quantity");

  cartHeader.textContent = `Your Cart (${countOrder})`;
  cartHeader.appendChild(cartTotalQuantity);

  return cartHeader;
}

// cart empty
function emptyCart() {
  const emptyCartContainer = document.createElement("div");
  emptyCartContainer.classList.add(".cart__empty");

  const cartEmptyImage = document.createElement("img");
  cartEmptyImage.classList.add(".cart__empty-img");
  cartEmptyImage.src = "./assets/images/illustration-empty-cart.svg";

  const emptyCartMessage = document.createElement("p");
  emptyCartMessage.classList.add("cart__empty-message");
  emptyCartMessage.textContent = "Your added items will apear here";

  emptyCartContainer.appendChild(cartEmptyImage);
  emptyCartContainer.appendChild(emptyCartMessage);

  return emptyCartContainer;
}

//have order
function cartOrderList() {
  const cartListHtml = document.createElement("ul");
  cartListHtml.classList.add("cart__list");

  cartList.map((product) =>
    cartListHtml.append(cartItem(product.name, product.quantity, product.price))
  );
  return cartListHtml;
}

function cartItem(name, quantity, price) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  cartItem.appendChild(cartInfo(name, quantity, price));
  cartItem.appendChild(removeButton(name));

  return cartItem;
}

function cartInfo(name, quantity, price) {
  const cartInfo = document.createElement("div");

  const cartItemName = document.createElement("h3");
  cartItemName.classList.add("cart-item__name");
  cartItemName.textContent = name;

  const pricePart = document.createElement("p");

  const cartItemQuantity = document.createElement("span");
  cartItemQuantity.classList.add("cart-item__quantity");
  cartItemQuantity.textContent = `${quantity}x`;

  const cartItemPrice = document.createElement("span");
  cartItemPrice.classList.add("cart-item__price");
  cartItemPrice.textContent = `$${price}`;

  const cartTotalPrice = document.createElement("span");
  cartTotalPrice.classList.add("cart-item__total-price");
  cartTotalPrice.textContent = `$${quantity * price}`;

  pricePart.appendChild(cartItemQuantity);
  pricePart.appendChild(cartItemPrice);
  pricePart.appendChild(cartTotalPrice);

  cartInfo.appendChild(cartItemName);
  cartInfo.appendChild(pricePart);

  return cartInfo;
}

function removeButton(productName) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("cart-item__remove-button");
  removeBtn.addEventListener("click", () => {
    const index = cartList.findIndex((item) => item.name === productName);
    if (index !== -1) {
      cartList.splice(index, 1);
    }
    updateCartSection();
    updateProductSection();
  });

  const removeIcon = document.createElement("img");
  removeIcon.src = "./assets/images/icon-remove-item.svg";

  removeBtn.appendChild(removeIcon);

  return removeBtn;
}

function cartOrderTotalBox() {
  const totalPart = document.createElement("p");
  totalPart.classList.add("cart__order-total");
  totalPart.textContent = "OrderTotal";

  const totalPrice = document.createElement("span");
  totalPrice.classList.add("cart__total-price");
  totalPrice.textContent = `$${calculateTotalCartPrice(cartList)}`;

  totalPart.appendChild(totalPrice);

  return totalPart;
}

function cartDeliveryMesssage() {
  const cartDeliveryMessage = document.createElement("p");
  cartDeliveryMessage.classList.add("cart__delivery-message");
  cartDeliveryMessage.textContent = "This is a carbon neutral delivery";

  const neutralImg = document.createElement("img");
  neutralImg.src = "./assets/images/icon-carbon-neutral.svg";

  cartDeliveryMessage.appendChild(neutralImg);

  return cartDeliveryMessage;
}

function confirmOrderButton() {
  const confirmOrderBtn = document.createElement("button");
  confirmOrderBtn.classList.add("cart__confirm-order-button");
  confirmOrderBtn.textContent = "Confirm Order";
  confirmOrderBtn.addEventListener("click", () => renderOrderConfirmation());

  return confirmOrderBtn;
}
