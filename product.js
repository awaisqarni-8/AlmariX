import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productGrid = document.querySelector(".featuredProducts .productGrid");

let currentCategory = "All";

async function loadProducts() {

if (!productGrid) {
console.log("Product Grid Not Found");
return;
}

productGrid.innerHTML = "";

const snapshot = await getDocs(collection(db, "products"));

snapshot.forEach((item) => {

const product = item.data();

if (
currentCategory !== "All" &&
product.category !== currentCategory
){
return;
}

const originalPrice = product.price || 0;
const discountedPrice = Math.round(originalPrice * 0.6);

productGrid.innerHTML += `
<div class="productCard"
onclick="window.location.href='product.html?id=${item.id}'">

  <div class="img-wrapper">
    <img src="\( {product.image}" alt=" \){product.name}">
    <span class="discount-badge">40% OFF</span>
  </div>

  <h3>${product.name}</h3>

  <div class="price-box">
    <span class="old-price">PKR ${originalPrice}</span>
    <span class="new-price">PKR ${discountedPrice}</span>
  </div>

</div>
`;

});

}

document.querySelectorAll(".categoryBar a").forEach((link)=>{

link.addEventListener("click",(e)=>{

e.preventDefault();
document.querySelectorAll(".categoryBar a").forEach(a=>{
a.classList.remove("active");
});

link.classList.add("active");

currentCategory = link.dataset.category;

loadProducts();

});

});

loadProducts();