let cartList = [];


export function renderProductSection() {
  const productSection = createProductListHTML();

  productSection.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const productName = product.dataset.product;

    // Add to Cart button
    if (e.target.closest(".product__add-to-cart-button")) {
      addToCart(productName);
      product.classList.add("selected");
    }

    // Decrement button
    if (e.target.closest(".cart-item-decrement-btn")) {
      decrementAction(e);
    }

    // Increment button
    if (e.target.closest(".cart-item-increment-btn")) {
      incrementAction(e);
    }

    const cartItem = findCartItem(productName);
    if (cartItem) {
      const currentQuantity = cartItem.quantity;
      const quantity = product.querySelector(".product__cart-quantity");
      quantity.textContent = currentQuantity;
    } else {
      product.classList.remove("selected");
    }
  });

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

function createProductActions() {

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

  productCartActions.appendChild(productCartActionDecrementBtn);
  productCartActions.appendChild(productCartQuantity);
  productCartActions.appendChild(productCartActionIncrementBtn);

  return productCartActions;
}

function findCartItem(productName) {
  const cartItem = cartList.find((cart) => cart.name === productName);
  return cartItem;
}

function addToCart(productName) {
  const cartItem = findCartItem(productName);
  if (!cartItem) {
    cartList.push({
      name: productName,
      quantity: 1,
    });
  }
}

function removeFromCart(productName) {
  cartList = cartList.filter((cartItem) => cartItem.name !== productName);
  console.log(cartList);
  return cartList;
}

function decrementAction(e) {
  const btn = e.target.closest(".product");
  const productName = btn.closest(".product").dataset.product;
  const item = cartList.find((el) => el.name === productName);

  if (!item) return;

  if (item.quantity - 1 === 0) {
    removeFromCart(item.name);
  } else {
    item.quantity -= 1;
  }
}

function incrementAction(e) {
  const btn = e.target.closest(".product");
  const productName = btn.closest(".product").dataset.product;
  const item = cartList.find((el) => el.name === productName);

  if (!item) return;

  item.quantity += 1;
}
