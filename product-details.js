import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const container = document.getElementById("productContainer");

async function loadProduct() {

const snap = await getDoc(doc(db, "products", id));

if (!snap.exists()) {

container.innerHTML = "<h2>Product Not Found</h2>";

return;

}

const product = snap.data();

container.innerHTML = `

<div class="productDetails">

<img src="${product.image}" alt="${product.name}">

<div class="info">

<h1>${product.name}</h1>

<h2>PKR ${product.price}</h2>

<p>${product.description}</p>

<p><b>Category:</b> ${product.category}</p>

<p><b>Stock:</b> ${product.stock}</p>

<br>

<button class="cartBtn" onclick="addToCart()">
Add to Cart
</button>

<button class="buyBtn" onclick="buyNow()">
Buy Now
</button>

</div>

</div>

`;

}

loadProduct();