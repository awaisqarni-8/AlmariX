import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const product = {

name: document.getElementById("productName").value,

price: Number(document.getElementById("productPrice").value),

description: document.getElementById("productDescription").value,

image: document.getElementById("productImage").value,

category: document.getElementById("productCategory").value,

stock: Number(document.getElementById("productStock").value),

createdAt: serverTimestamp()

};

try{

await addDoc(collection(db,"products"), product);

alert("✅ Product Added Successfully");

form.reset();

}catch(error){

alert(error.message);

console.log(error);

}

});
const productList = document.getElementById("productList");

async function loadAdminProducts() {

  productList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((item) => {

    const product = item.data();

    productList.innerHTML += `
      <div class="productCard">

        <img src="${product.image}" alt="${product.name}" width="120">

        <h3>${product.name}</h3>

        <p>PKR ${product.price}</p>

        <button onclick="editProduct('${item.id}')">
Edit
</button>

<button onclick="deleteProduct('${item.id}')">
Delete
</button>

      </div>
    `;

  });

}

window.deleteProduct = async (id) => {

  if(confirm("Delete this product?")){

    await deleteDoc(doc(db, "products", id));

    loadAdminProducts();

  }

};

loadAdminProducts();