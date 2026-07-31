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
const productList = document.getElementById("productList");

const imageInput = document.getElementById("productImageFile");
const preview = document.getElementById("previewImage");

imageInput.addEventListener("change", () => {

const file = imageInput.files[0];

if(file){

preview.src = URL.createObjectURL(file);

preview.style.display = "block";

}

});

async function uploadImage(file){

const storageRef = ref(
storage,
"products/" + Date.now() + "_" + file.name
);

await uploadBytes(storageRef, file);

return await getDownloadURL(storageRef);

}
form.addEventListener("submit", async (e) => {

e.preventDefault();

try{

const file = imageInput.files[0];

if(!file){

alert("Please select an image.");

return;

}

const imageURL = await uploadImage(file);

const product = {

name: document.getElementById("productName").value.trim(),

price: Number(document.getElementById("productPrice").value),

category: document.getElementById("productCategory").value,

stock: Number(document.getElementById("productStock").value),

description: document.getElementById("productDescription").value.trim(),

image: imageURL,

createdAt: serverTimestamp()

};

await addDoc(collection(db,"products"),product);

alert("✅ Product Added Successfully");

form.reset();

preview.style.display = "none";

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

<button onclick="editProduct('${item.id}')">Edit</button>

<button onclick="deleteProduct('${item.id}')">Delete</button>

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

alert("✅ Product Updated");

loadProducts();

};

loadProducts();