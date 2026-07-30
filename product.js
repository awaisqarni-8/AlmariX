import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productGrid = document.querySelector(".featuredProducts .productGrid");

async function loadProducts() {

  productGrid.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((doc) => {

    const product = doc.data();

    productGrid.innerHTML += `
      <div class="productCard">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>PKR ${product.price}</p>

        <small>${product.description}</small><br><br>

        <button onclick="addToCart('${doc.id}')">
          Add to Cart
        </button>

      </div>
    `;

  });

}

loadProducts();