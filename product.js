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

productGrid.innerHTML += `
<div class="productCard"
onclick="window.location.href='product.html?id=${item.id}'">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>PKR ${product.price}</p>

</div>
`;

});

}

document.querySelectorAll(".categoryBar a").forEach((link)=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

currentCategory = link.dataset.category;

loadProducts();

});

});

loadProducts();