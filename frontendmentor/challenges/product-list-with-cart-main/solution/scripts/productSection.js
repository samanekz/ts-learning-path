import { updateCartSection } from "./cartSection.js";
import {
  decrementAction,
  addToCart,
  incrementAction,
  fillQuantityText,
  cartList,
} from "./jsProductSection.js";

export function renderProductSection() {
  const productSection = createProductListHTML();
  return productSection;
}

function createProductListHTML() {
  const productsSection = document.createElement("section");
  productsSection.classList.add("products");

  const productTitle = document.createElement("h2");
  productTitle.textContent = "Desserts";
  productTitle.classList.add("products__title");

  const productsList = createProductsList();

  productsSection.appendChild(productTitle);
  productsSection.appendChild(productsList);
  return productsSection;
}
export function updateProductSection() {
  const allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product) => {
    const productName = product.dataset.product;
    const inCart = cartList.some((item) => item.name === productName);

    if (inCart) {
      product.classList.add("selected");
      fillQuantityText(product, productName);
    } else {
      product.classList.remove("selected");
    }
  });
}

function createProductsList() {
  const productsList = document.createElement("ul");
  productsList.classList.add("products__list");

  fetch("./data.json")
    .then((response) => response.json())
    .then((foods) => {
      foods.forEach((food) => {
        const foodItem = createPruductItemBox(
          food.image.desktop,
          food.name,
          food.category,
          food.price
        );

        productsList.appendChild(foodItem);
      });
    })
    .catch((error) => console.error("error to load json", error));

  return productsList;
}

function createPruductItemBox(image, name, category, price) {
  const productItemBox = document.createElement("li");
  productItemBox.classList.add("product");
  productItemBox.dataset.product = name;

  const productImg = document.createElement("img");
  productImg.src = image;
  productImg.classList.add("product__img");

  const productCategory = document.createElement("p");
  productCategory.textContent = category;
  productCategory.classList.add("product__category");

  const productName = document.createElement("h3");
  productName.textContent = name;
  productName.classList.add("product__name");

  const productPrice = document.createElement("p");
  productPrice.textContent = `$${price}`;
  productPrice.classList.add("product__price");

  const productActions = createProductActions();

  productItemBox.appendChild(productImg);
  productItemBox.appendChild(productCategory);
  productItemBox.appendChild(productName);
  productItemBox.appendChild(productPrice);
  productItemBox.appendChild(productActions);

  return productItemBox;
}

export function createProductActions() {
  const productActions = document.createElement("div");
  productActions.classList.add("product__actions");

  const productAddToCartBtn = createProductAddToCArtBtn();
  const productCartActions = createProductCartActions();

  productActions.appendChild(productAddToCartBtn);
  productActions.appendChild(productCartActions);
  return productActions;
}

function createProductAddToCArtBtn() {
  const productAddToCartBtn = document.createElement("button");
  productAddToCartBtn.textContent = "Add to Cart";
  productAddToCartBtn.classList.add("product__add-to-cart-button");

  const productAddtoCartIcon = document.createElement("img");
  productAddtoCartIcon.src = "./assets/images/icon-add-to-cart.svg";
  productAddtoCartIcon.classList.add("product__add-to-cart-icon");
  productAddToCartBtn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const productName = product.dataset.product;
    const productImg = product.querySelector(".product__img").src;
    const productPrice = product
      .querySelector(".product__price")
      .textContent.replace("$", "")
      .trim();
    addToCart(productName, productPrice, productImg);
    product.classList.add("selected");
    fillQuantityText(product, productName);
  });
  productAddToCartBtn.appendChild(productAddtoCartIcon);

  return productAddToCartBtn;
}

function createProductCartActions() {
  const productCartActions = document.createElement("div");
  productCartActions.classList.add("product__cart-actions");

  const productCartActionDecrementBtn = document.createElement("button");
  productCartActionDecrementBtn.classList.add("product__cart-action-btn");
  productCartActionDecrementBtn.classList.add("cart-item-decrement-btn");
  const productCartActionDecremenIcon = document.createElement("img");
  productCartActionDecremenIcon.src =
    "./assets/images/icon-decrement-quantity.svg";
  productCartActionDecremenIcon.alt = "Decrement Item Quantity";
  productCartActionDecrementBtn.appendChild(productCartActionDecremenIcon);
  productCartActionDecrementBtn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const productName = product.dataset.product;
    decrementAction(productName);
    fillQuantityText(product, productName);
    updateCartSection();
  });

  const productCartQuantity = document.createElement("span");
  productCartQuantity.classList.add("product__cart-quantity");
  productCartQuantity.textContent = 0;

  const productCartActionIncrementBtn = document.createElement("button");
  productCartActionIncrementBtn.classList.add("product__cart-action-btn");
  productCartActionIncrementBtn.classList.add("cart-item-increment-btn");
  const productCartActionIncrementIcon = document.createElement("img");
  productCartActionIncrementIcon.src =
    "./assets/images/icon-increment-quantity.svg";
  productCartActionIncrementIcon.alt = "Increment Item Quantity";
  productCartActionIncrementBtn.appendChild(productCartActionIncrementIcon);
  productCartActionIncrementBtn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const productName = product.dataset.product;
    incrementAction(productName);
    fillQuantityText(product, productName);
    updateCartSection();
  });

  productCartActions.appendChild(productCartActionDecrementBtn);
  productCartActions.appendChild(productCartQuantity);
  productCartActions.appendChild(productCartActionIncrementBtn);

  return productCartActions;
}
