import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productGrid = document.querySelector(".featuredProducts .productGrid");

async function loadProducts() {

if (!productGrid) {
console.log("Product Grid Not Found");
return;
}

productGrid.innerHTML = "";

const snapshot = await getDocs(collection(db, "products"));
snapshot.forEach((item) => {

const product = item.data();

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

loadProducts();
        