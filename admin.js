import { db } from "./firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productForm = document.getElementById("productForm");

if(productForm){

productForm.addEventListener("submit", async(e)=>{

e.preventDefault();

const name =
document.getElementById("productName").value.trim();

const price =
document.getElementById("productPrice").value.trim();

const image =
document.getElementById("productImage").value.trim();

const category =
document.getElementById("productCategory").value.trim();

if(!name || !price || !image || !category){

alert("Please fill all fields.");

return;

}