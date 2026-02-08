import { renderProductSection } from "./productSection.js";
import { renderCartSection } from "./cartSection.js";
import { renderOrderConfirmation } from "./orderConfirmation.js";

export function renderIndexPage() {
  const mainElement = document.getElementById("items-container");
  mainElement.appendChild(renderProductSection());
  mainElement.appendChild(renderCartSection());
  const orderModal = document.createElement("dialog");
  orderModal.classList.add("order-confirmation-modal");
  mainElement.appendChild(orderModal);
}

document.body.onload = renderIndexPage;
