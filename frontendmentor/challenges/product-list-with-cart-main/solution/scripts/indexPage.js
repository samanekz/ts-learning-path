import { renderProductSection } from "./productSection.js";
import { renderCartSection } from "./cartSection.js";

export function renderIndexPage() {
  const mainElement = document.getElementById("items-container");
  mainElement.appendChild(renderProductSection());
  mainElement.appendChild(renderCartSection());
}

document.body.onload = renderIndexPage;
