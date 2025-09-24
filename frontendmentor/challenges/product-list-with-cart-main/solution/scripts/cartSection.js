
export default function renederCartSection() {}

function createCartSectionHTML() {
  const cart = document.createElement("section");
  cart.classList.add("cart");

  cart.appendChild(cartHeader);
  cart.appendChild(cartList);

  return cart;
}

function cartHeader() {
  const cartHeader = document.createElement("h2");
  cartHeader.classList.add("cart__header");

  const cartTotalQuantity = document.createElement("span");
  cartTotalQuantity.classList.add("cart-quantity");

  cartHeader.appendChild(cartTotalQuantity);

  return cartHeader;
}

function cartList() {
  const cartList = document.createElement("ul");
  cartList.classList.add("cart__list");
  //map cart list to the cart item
  const cartItems = cartItem(name, quantity, price);
  cartList.append(cartItems);
  return cartList;
}

function cartItem(name, quantity, price) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  cartItem.appendChild(cartInfo);
  cartItem.appendChild(removeButton);

  return cartItem;
}

function cartInfo() {
  const cartInfo = document.createElement("div");

  const cartItemName = document.createElement("h3");
  cartItemName.classList.add("cart-item__name");
  cartItemName.textContent = name;

  const cartItemQuantity = document.createElement("span");
  cartItemQuantity.classList.add("cart-item__quantity");
  cartItemQuantity.textContent = quantity;

  const cartItemPrice = document.createElement("span");
  cartItemPrice.classList.add("cart-item__price");
  cartItemPrice.textContent = price;

  const cartTotalPrice = document.createElement("span");
  cartTotalPrice.classList.add("cart-item__total-price");

  cartInfo.appendChild(cartItemName);
  cartInfo.appendChild(cartItemQuantity);
  cartInfo.appendChild(cartItemPrice);

  return cartInfo;
}

function removeButton() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("cart-item__remove-button");

  const removeIcon = document.createElement("img");
  removeIcon.src = "./assets/images/icon-remove-item.svg";

  removeBtn.appendChild(removeIcon);

  return removeBtn;
}
