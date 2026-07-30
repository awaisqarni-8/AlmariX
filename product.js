import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productGrid = document.querySelector(".productGrid");

async function loadProducts(){

if(!productGrid) return;

productGrid.innerHTML = "";

const snapshot = await getDocs(collection(db,"products"));

snapshot.forEach((doc)=>{

const product = doc.data();
const card = document.createElement("div");

card.className = "productCard";

card.innerHTML = `

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button>Add to Cart</button>

`;

productGrid.appendChild(card);

});

}

loadProducts();