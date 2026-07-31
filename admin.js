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
form.addEventListener("submit", async (e) => {

e.preventDefault();

try{

const product = {

name: document.getElementById("productName").value.trim(),

price: Number(document.getElementById("productPrice").value),

category: document.getElementById("productCategory").value,

stock: Number(document.getElementById("productStock").value),

description: document.getElementById("productDescription").value.trim(),

image: document.getElementById("productImage").value.trim(),

createdAt: serverTimestamp()

};

await addDoc(collection(db,"products"), product);

alert("✅ Product Added Successfully");

form.reset();

loadProducts();

}catch(error){

console.error(error);

alert(error.message);

}

});
async function loadProducts(){

productList.innerHTML = "";

const snapshot = await getDocs(collection(db,"products"));

snapshot.forEach((item)=>{

const product = item.data();

productList.innerHTML += `

<div class="productCard">

<img src="${product.image}" width="150">

<h3>${product.name}</h3>

<p><b>PKR ${product.price}</b></p>

<p>${product.category}</p>

<p>Stock: ${product.stock}</p>

<p>${product.description}</p>

<button onclick="deleteProduct('${item.id}')">Delete</button>

<button onclick="editProduct('${item.id}')">Edit</button>

</div>

`;

});

}

window.deleteProduct = async(id)=>{

if(confirm("Delete this product?")){

await deleteDoc(doc(db,"products",id));

loadProducts();

}

};

window.editProduct = async(id)=>{

const newName = prompt("Enter New Product Name");

if(!newName) return;

await updateDoc(doc(db,"products",id),{
name:newName
});

loadProducts();

};

loadProducts();