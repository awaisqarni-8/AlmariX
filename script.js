// =========================
// ShopHub Main Script
// =========================

// Search

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

searchBtn.addEventListener("click", () => {

const keyword = searchInput.value.trim();

if (keyword === "") {

alert("Please enter a product name.");

return;

}

alert("Searching for: " + keyword);

});

}

// Shop Now Button

const shopBtn = document.querySelector(".shopBtn");

if (shopBtn) {

shopBtn.addEventListener("click", () => {

window.scrollTo({

top: 500,

behavior: "smooth"

});

});

}

// Product Buttons

const cartButtons = document.querySelectorAll(".productCard button");

cartButtons.forEach((btn) => {

btn.addEventListener("click", () => {

alert("Product added to cart.");

});

});