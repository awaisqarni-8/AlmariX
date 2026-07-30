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