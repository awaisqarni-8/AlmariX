import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

const adminBtn = document.getElementById("adminBtn");

if(!adminBtn) return;

if(
user &&
user.email === "almarixofficial@gmail.com"
){

adminBtn.style.display = "inline-block";

}else{

adminBtn.style.display = "none";

}

});