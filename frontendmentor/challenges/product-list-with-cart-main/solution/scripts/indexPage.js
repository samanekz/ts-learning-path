import { renderProductSection } from "./productSection.js";

export function renderIndexPage() {
  const mainElement = document.getElementById("items-container");
  mainElement.appendChild(renderProductSection());
  // mailElement.appendChild(renderCartSection());
}

document.body.onload = renderIndexPage;
