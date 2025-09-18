document.body.onload = createFoodItemList();

// addElement function takes an item as parameter
// the addElement function calls other functions to create the required sub components
// styling is done via classes

// 1. add html container for the items
// 2. iterate through items to add elements

// TODO: create sub functions to create each sub elements

// 3. make add button functional

function createFoodItemList() {
  const containerWrapper = document.getElementById("items-container");
  const foodItemListContainer = document.createElement("div");
  foodItemListContainer.className = "food-item-list-container-grid";

  fetch("./data.json")
    .then((response) => response.json())
    .then((foods) => {
      foods.forEach((food) => {
        const foodItem = createFoodItemBox(
          food.image.desktop,
          food.name,
          food.category,
          food.price
        );

        foodItemListContainer.appendChild(foodItem);
      });

      containerWrapper.appendChild(foodItemListContainer);
    })
    .catch((error) => console.error("error to load json", error));
}

function createFoodInfoContainer(name, category, price) {
  const foodInfoContainer = document.createElement("div");
  foodInfoContainer.className = "food-info-container";

  const foodCategory = document.createElement("p");
  foodCategory.textContent = category;

  const foodName = document.createElement("p");
  foodName.textContent = name;

  const foodPrice = document.createElement("p");
  foodPrice.textContent = `$${price}`;

  foodInfoContainer.appendChild(foodCategory);
  foodInfoContainer.appendChild(foodName);
  foodInfoContainer.appendChild(foodPrice);

  return foodInfoContainer;
}

function createAddToCartContainer() {
  const addToCartContainer = document.createElement("div");
  addToCartContainer.className = "add-food-container";

  const addBtn = document.createElement("button");
  addBtn.className = "add-button";

  const addToCartIcon = document.createElement("img");
  addToCartIcon.src = "./assets/images/icon-add-to-cart.svg";

  const addToCartText = document.createElement("p");
  addToCartText.textContent = "Add to Cart";
  addToCartText.className = "add-cart-text";

  addBtn.appendChild(addToCartIcon);
  addBtn.appendChild(addToCartText);
  addToCartContainer.appendChild(addBtn);

  return addToCartContainer;
}

function addImgToCart(image) {
  const foodImage = document.createElement("img");
  foodImage.src = image;
  foodImage.className = "food-img";

  return foodImage;
}

function createFoodItemBox(image, name, category, price) {
  const foodItemBox = document.createElement("div");
  foodItemBox.className = "food-item-box";

  const foodImg = addImgToCart(image);
  foodItemBox.appendChild(foodImg);

  const addToCartContainer = createAddToCartContainer();
  foodItemBox.appendChild(addToCartContainer);

  const foodInfoContainer = createFoodInfoContainer(name, category, price);
  foodItemBox.appendChild(foodInfoContainer);

  return foodItemBox;
}
