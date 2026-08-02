import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let product = {};

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const container = document.getElementById("productContainer");

async function loadProduct() {

const snap = await getDoc(doc(db, "products", id));

if (!snap.exists()) {

container.innerHTML = "<h2>Product Not Found</h2>";

return;

}

product = snap.data();

container.innerHTML = `

<div class="productImages">

<img id="mainImage" src="${product.image}" alt="${product.name}" class="mainImage">

<div class="thumbs">

<img src="${product.image}"
onclick="document.getElementById('mainImage').src='${product.image}'">

${product.image2 ? `
<img src="${product.image2}"
onclick="document.getElementById('mainImage').src='${product.image2}'">
` : ""}

</div>

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

window.addToCart = () => {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
id: id,
name: product.name,
price: product.price,
image: product.image,
qty: 1
});

localStorage.setItem("cart", JSON.stringify(cart));

alert("✅ Product Added To Cart");

};

window.buyNow = () => {

localStorage.setItem("buyNowProduct", JSON.stringify(product));

window.location.href = "checkout.html";

};

loadProduct();