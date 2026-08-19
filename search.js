import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const productGrid = document.getElementById("productGrid");

let products = [];

async function loadProducts() {

  try {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    products = [];

    snapshot.forEach((doc) => {

      products.push({
        id: doc.id,
        ...doc.data()
      });

    });

  } catch (error) {

    console.error(error);

    productGrid.innerHTML = `
      <div class="noResults">
        Unable to load products.
      </div>
    `;

  }

}

function searchProducts() {

  const search = searchInput.value
    .trim()
    .toLowerCase();

  if (!search) {

    productGrid.innerHTML = `
      <div class="noResults">
        Type a product name to search.
      </div>
    `;

    return;
  }

  const results = products.filter((product) => {

    const name =
      String(product.name || "").toLowerCase();

    const category =
      String(product.category || "").toLowerCase();

    const description =
      String(product.description || "").toLowerCase();

    return (
      name.includes(search) ||
      category.includes(search) ||
      description.includes(search)
    );

  });

  renderProducts(results);

}

function renderProducts(results) {

  productGrid.innerHTML = "";

  if (results.length === 0) {

    productGrid.innerHTML = `
      <div class="noResults">
        <h2>No Products Found</h2>
        <p>Try another product name.</p>
      </div>
    `;

    return;
  }

  results.forEach((product) => {

    productGrid.innerHTML += `

      <div
        class="productCard"
        data-id="${product.id}"
      >

        <img
          src="${product.image || ""}"
          alt="${escapeHTML(product.name || "Product")}"
        >

        <h3>
          ${escapeHTML(product.name || "Product")}
        </h3>

        <p>
          PKR ${Number(product.price || 0).toLocaleString()}
        </p>

      </div>

    `;

  });

  document
    .querySelectorAll(".productCard")
    .forEach((card) => {

      card.addEventListener("click", () => {

        window.location.href =
          "product.html?id=" +
          encodeURIComponent(card.dataset.id);

      });

    });

}

searchBtn.addEventListener(
  "click",
  searchProducts
);

searchInput.addEventListener(
  "keydown",
  (e) => {

    if (e.key === "Enter") {
      searchProducts();
    }

  }
);

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

loadProducts();