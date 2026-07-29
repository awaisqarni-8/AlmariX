// =========================
// ShopHub Main Script
// =========================

// Search

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

searchBtn.addEventListener("click", () => {

const keyword = searchInput.value.trim();

if (keyword === "") {

alert("Please enter a product name.");

return;

}

alert("Searching for: " + keyword);

});

}

// Shop Now Button

const shopBtn = document.querySelector(".shopBtn");

if (shopBtn) {

shopBtn.addEventListener("click", () => {

window.scrollTo({

top: 500,

behavior: "smooth"

});

});

}

// Product Buttons

const cartButtons = document.querySelectorAll(".productCard button");

cartButtons.forEach((btn) => {

btn.addEventListener("click", () => {

alert("Product added to cart.");

});

});
// =========================
// Hero Banner Auto Slider
// =========================

const bannerTitles = [

"Big Sale",

"Mega Discounts",

"Hot Deals",

"New Arrivals"

];

const bannerTexts = [

"Up to 70% OFF on Top Brands",

"Limited Time Offers",

"Best Prices Every Day",

"Shop Latest Collections"

];

const title = document.querySelector(".bannerText h1");
const text = document.querySelector(".bannerText p");

let bannerIndex = 0;

if(title && text){

setInterval(()=>{

bannerIndex++;

if(bannerIndex>=bannerTitles.length){

bannerIndex=0;

}

title.textContent = bannerTitles[bannerIndex];

text.textContent = bannerTexts[bannerIndex];

},4000);

}

// =========================
// Wishlist
// =========================

const wishlist = [];

document.querySelectorAll(".productCard").forEach((card)=>{

card.addEventListener("dblclick",()=>{

const product = card.querySelector("h3").innerText;

wishlist.push(product);

alert(product + " added to Wishlist ❤️");

});

});
// =========================
// Product Click
// =========================

document.querySelectorAll(".productCard img").forEach((img)=>{

img.addEventListener("click",()=>{

alert("Product Details page coming soon.");

});

});

// =========================
// Navbar Shadow
// =========================

window.addEventListener("scroll",()=>{

const nav = document.querySelector(".navbar");

if(!nav) return;

if(window.scrollY>50){

nav.style.boxShadow="0 8px 25px rgba(0,0,0,.25)";

}else{

nav.style.boxShadow="0 5px 20px rgba(0,0,0,.15)";

}

});

// =========================
// Welcome
// =========================

window.addEventListener("load",()=>{

console.log("ShopHub Loaded Successfully");

});