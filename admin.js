import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editId = null;

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const product = {

      name: document.getElementById("productName").value.trim(),

      price: Number(document.getElementById("productPrice").value),

      category: document.getElementById("productCategory").value,

      stock: Number(document.getElementById("productStock").value),

      description: document.getElementById("productDescription").value.trim(),

      image: document.getElementById("productImage").value.trim(),

      image2: document.getElementById("productImage2").value.trim(),

      createdAt: serverTimestamp()

    };

    if (editId) {

      await updateDoc(doc(db, "products", editId), product);

      alert("✅ Product Updated Successfully");

      editId = null;

      form.querySelector("button").innerText = "Add Product";

    } else {

      await addDoc(collection(db, "products"), product);

      alert("✅ Product Added Successfully");

    }

    form.reset();

    loadProducts();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

});

async function loadProducts() {

  productList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((item) => {

    const product = item.data();

    productList.innerHTML += `

    <div class="productCard">

      <img src="${product.image}" width="150">

      ${product.image2 ? `<img src="${product.image2}" width="150">` : ""}

      <h3>${product.name}</h3>

      <p><b>PKR ${product.price}</b></p>

      <p>${product.category}</p>

      <p>Stock: ${product.stock}</p>

      <p>${product.description}</p>

      <div style="margin-top:15px;">
  <button style="background:#0d6efd;color:white;padding:10px 15px;border:none;border-radius:8px;cursor:pointer;"
  onclick="editProduct('${item.id}')">
  Edit
  </button>

  <button style="background:red;color:white;padding:10px 15px;border:none;border-radius:8px;cursor:pointer;margin-left:10px;"
  onclick="deleteProduct('${item.id}')">
  Delete
  </button>
</div>

    </div>

    `;

  });

}

window.deleteProduct = async (id) => {

  if (!confirm("Delete this product?")) return;

  await deleteDoc(doc(db, "products", id));

  loadProducts();

};

window.editProduct = async (id) => {

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((item) => {

    if (item.id === id) {

      const product = item.data();

      document.getElementById("productName").value = product.name;

      document.getElementById("productPrice").value = product.price;

      document.getElementById("productCategory").value = product.category;

      document.getElementById("productStock").value = product.stock;

      document.getElementById("productDescription").value = product.description;

      document.getElementById("productImage").value = product.image;

      document.getElementById("productImage2").value = product.image2 || "";

      editId = id;

      form.querySelector("button").innerText = "Update Product";

    }

  });

};

loadProducts();