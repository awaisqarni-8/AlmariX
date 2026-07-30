const imageInput = document.getElementById("productImageFile");
const preview = document.getElementById("previewImage");

imageInput.addEventListener("change", () => {

const file = imageInput.files[0];

if(file){

preview.src = URL.createObjectURL(file);

preview.style.display = "block";

}

});

import { db, storage } from "./firebase.js";
import {
collection,
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

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
console.error(error);
alert(error.code + "\n" + error.message);
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
window.editProduct = async (id) => {

const newName = prompt("Enter New Product Name");

if (!newName) return;

try {

await updateDoc(doc(db, "products", id), {
name: newName
});

alert("✅ Product Updated Successfully");

loadAdminProducts();

} catch (error) {

alert(error.message);

}

};

const newName = prompt("Enter New Product Name");

if(!newName) return;

alert("Edit feature selected for Product ID: " + id);

/* Next part me Firestore updateDoc() add karenge */

};