import { cartList, calculateTotalCartPrice } from "./jsProductSection.js";
import { updateCartSection } from "./cartSection.js";
import { updateProductSection } from "./productSection.js";

export function renderOrderConfirmation() {
  const orderDialog = orderConfirmationHTML();

  return orderDialog;
}

function orderConfirmationHTML() {
  const orderModal = document.querySelector(".order-confirmation-modal");
  orderModal.showModal();
  orderModal.classList.add("order-modal");

  const orderImg = document.createElement("img");
  orderImg.src = "./assets/images/icon-order-confirmed.svg";

  const header = document.createElement("h2");
  header.textContent = "Order Confirmed";
  header.classList.add("order-modal__header");

  const message = document.createElement("p");
  message.textContent = "we hope you enjoy your food!";
  message.classList.add("oder-modal__message");

  const orderWrapper = ordersWrapper();

  const startButton = document.createElement("button");
  startButton.classList.add("order-modal__start-new-order-button");
  startButton.textContent = "Start new Order";
  startButton.addEventListener("click", () => {
    const orderModal = document.querySelector(".order-confirmation-modal");
    orderModal.innerHTML = "";
    orderModal.close();
    cartList.length = 0;
    updateCartSection();
    updateProductSection();
  });

  orderModal.appendChild(orderImg);
  orderModal.appendChild(header);
  orderModal.appendChild(message);
  orderModal.appendChild(orderWrapper);
  orderModal.appendChild(startButton);
  return orderModal;
}

function ordersWrapper() {
  const orderWrapper = document.createElement("div");
  orderWrapper.classList.add("order-modal__items-wrapper");

  const list = orderList();

  const orderItemsTotal = document.createElement("p");
  orderItemsTotal.classList.add("order-modal__items-total");
  orderItemsTotal.textContent = "Order total";

  const orderTotalPrice = document.createElement("span");
  orderTotalPrice.classList.add("order-modal__items-total-price");
  orderTotalPrice.textContent = `$${calculateTotalCartPrice(cartList)}`;

  orderItemsTotal.appendChild(orderTotalPrice);

  orderWrapper.appendChild(list);
  orderWrapper.appendChild(orderItemsTotal);

  return orderWrapper;
}

function orderList() {
  const orderList = document.createElement("ul");
  orderList.classList.add("order-modal__List");
  cartList.map((order) => {
    orderList.append(
      orderItems(order.name, order.quantity, order.price, order.img)
    );
  });
  return orderList;
}

function orderItems(name, quantity, price, image) {
  const orderItem = document.createElement("li");
  orderItem.classList.add("order-item");

  const item = document.createElement("div");

  const itemImg = document.createElement("img");
  itemImg.classList.add("order-item__thumbnail");
  itemImg.src = image;

  const itemName = document.createElement("p");
  itemName.classList.add("order-item__name");
  itemName.textContent = name;

  const itemBox = document.createElement("p");

  const itemQuantity = document.createElement("span");
  itemQuantity.classList.add("order-item__quantity");
  itemQuantity.textContent = `${quantity}x`;

  const itemPrice = document.createElement("span");
  itemPrice.classList.add("order-item__price");
  itemPrice.textContent = `$${price}`;

  itemBox.appendChild(itemQuantity);
  itemBox.appendChild(itemPrice);

  const totalPrice = document.createElement("p");
  totalPrice.classList.add("order-item__total-price");
  totalPrice.textContent = `$${quantity * price}`;

  item.appendChild(itemImg);
  item.appendChild(itemName);
  item.appendChild(itemBox);

  orderItem.appendChild(item);
  orderItem.appendChild(totalPrice);

  return orderItem;
}
