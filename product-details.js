import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

document.getElementById("reviewsSection").style.display = "block";
let product = {};

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const container = document.getElementById("productContainer");


// =========================
// LOAD PRODUCT
// =========================

async function loadProduct() {

  if (!id) {

    container.innerHTML = "<h2>Product ID missing</h2>";

    return;

  }


  try {

    const snap = await getDoc(
      doc(db, "products", id)
    );


    if (!snap.exists()) {

      container.innerHTML =
        "<h2>Product Not Found</h2>";

      return;

    }


    product = snap.data();


    container.innerHTML = `

      <div class="productDetails">


        <div class="productImages">

          <img
            id="mainImage"
            src="${product.image || ""}"
            alt="${product.name || "Product"}"
            class="mainImage"
          >


          <div class="thumbs">

            ${
              product.image
                ? `
                  <img
                    src="${product.image}"
                    onclick="
                      document.getElementById('mainImage').src='${product.image}'
                    "
                  >
                `
                : ""
            }


            ${
              product.image2
                ? `
                  <img
                    src="${product.image2}"
                    onclick="
                      document.getElementById('mainImage').src='${product.image2}'
                    "
                  >
                `
                : ""
            }


            ${
              product.image3
                ? `
                  <img
                    src="${product.image3}"
                    onclick="
                      document.getElementById('mainImage').src='${product.image3}'
                    "
                  >
                `
                : ""
            }

          </div>

        </div>



        <div class="info">


          <h1>
            ${product.name || "Product"}
          </h1>


          <h2>
            PKR ${product.price || 0}
          </h2>  

          <p>
            <b>Category:</b>
            ${product.category || "N/A"}
          </p>


          <p>
            <b>Stock:</b>
            ${product.stock || 0}
          </p>



          <div style="margin-top:15px;">

            <label>
              <b>Size:</b>
            </label>

            <br>


            <select id="selectedSize">

              <option value="">
                Select Size
              </option>


              ${
                product.size1
                  ? `
                    <option value="${product.size1}">
                      ${product.size1}
                    </option>
                  `
                  : ""
              }


              ${
                product.size2
                  ? `
                    <option value="${product.size2}">
                      ${product.size2}
                    </option>
                  `
                  : ""
              }


              ${
                product.size3
                  ? `
                    <option value="${product.size3}">
                      ${product.size3}
                    </option>
                  `
                  : ""
              }

            </select>

          </div>



          <div style="margin-top:15px;">

            <label>
              <b>Color:</b>
            </label>

            <br>


            <select id="selectedColor">

              <option value="">
                Select Color
              </option>


              ${
                product.color1
                  ? `
                    <option value="${product.color1}">
                      ${product.color1}
                    </option>
                  `
                  : ""
              }


              ${
                product.color2
                  ? `
                    <option value="${product.color2}">
                      ${product.color2}
                    </option>
                  `
                  : ""
              }
               
               
                ${
                product.color3
                  ? `
                    <option value="${product.color3}">
                      ${product.color3}
                    </option>
                  `
                  : ""
              }


                ${
                product.color4
                  ? `
                    <option value="${product.color4}">
                      ${product.color4}
                    </option>
                  `
                  : ""
              }



            </select>

          </div>


          <br>


          <button
            class="cartBtn"
            onclick="addToCart()"
          >
            Add to Cart
          </button>


          <button
            class="buyBtn"
            onclick="buyNow()"
          >
            Buy Now
          </button>
<div class="productDescription">

            ${
              product.description
                ? product.description
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map(line => {

                      const text =
                        line.replace(/^•\s*/, "").trim();

                      return `<p>• ${text}</p>`;

                    })
                    .join("")
                : "<p>No description available.</p>"
            }

          </div>



        </div>

      </div>

    `;


    loadReviews();


  } catch (error) {

    console.error(error);

    container.innerHTML =
      "<h2>Unable to load product.</h2>";

  }

}



// =========================
// ADD TO CART
// =========================

window.addToCart = () => {

  let cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];


  cart.push({

    id: id,

    name: product.name,

    price: product.price,

    image: product.image,

    qty: 1,

    selectedSize:
      document.getElementById("selectedSize")?.value || "",

    selectedColor:
      document.getElementById("selectedColor")?.value || ""

  });


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  alert("✅ Product Added To Cart");

};



// =========================
// BUY NOW
// =========================

window.buyNow = () => {

  localStorage.setItem(

    "buyNowProduct",

    JSON.stringify({

      ...product,

      id: id,

      selectedSize:
        document.getElementById("selectedSize")?.value || "",

      selectedColor:
        document.getElementById("selectedColor")?.value || ""

    })

  );


  window.location.href =
    "checkout.html";

};



// =========================
// LOAD REVIEWS
// =========================

async function loadReviews() {

  const reviewsList =
    document.getElementById("reviewsList");


  if (!reviewsList) return;


  reviewsList.innerHTML =
    "<p>Loading reviews...</p>";


  try {


    const reviewsRef =
      collection(db, "reviews");


    const q =
      query(

        reviewsRef,

        where("productId", "==", id),

        orderBy("createdAt", "desc")

      );


    const snapshot =
      await getDocs(q);


    if (snapshot.empty) {

      reviewsList.innerHTML =
        "<p>No reviews yet. Be the first to review this product!</p>";

      return;

    }


    let html = "";


    snapshot.forEach(reviewDoc => {

      const review =
        reviewDoc.data();


      const rating =
        Number(review.rating) || 5;


      const stars =
        "★".repeat(rating) +
        "☆".repeat(5 - rating);


      html += `

        <div class="review">

          <div class="reviewName">

            ${escapeHTML(review.name || "Customer")}

          </div>


          <div class="reviewStars">

            ${stars}

          </div>


          <div class="reviewText">

            ${escapeHTML(review.text || "")}

          </div>

        </div>

      `;

    });


    reviewsList.innerHTML =
      html;


  } catch (error) {

    console.error(
      "Reviews error:",
      error
    );


    reviewsList.innerHTML =
      "<p>Reviews could not be loaded.</p>";

  }

}



// =========================
// SUBMIT REVIEW
// =========================

const submitReview =
  document.getElementById("submitReview");


if (submitReview) {

  submitReview.addEventListener(
    "click",
    submitReviewHandler
  );

}



async function submitReviewHandler() {


  const nameInput =
    document.getElementById("reviewName");


  const ratingInput =
    document.getElementById("reviewRating");


  const textInput =
    document.getElementById("reviewText");


  const name =
    nameInput.value.trim();


  const rating =
    Number(ratingInput.value);


  const text =
    textInput.value.trim();



  if (!name) {

    alert("Please enter your name.");

    return;

  }


  if (!text) {

    alert("Please write your review.");

    return;

  }


  if (!rating) {

    alert("Please select a rating.");

    return;

  }



  submitReview.disabled =
    true;


  submitReview.textContent =
    "Submitting...";


  try {


    await addDoc(

      collection(db, "reviews"),

      {

        productId: id,

        productName:
          product.name || "",

        name: name,

        rating: rating,

        text: text,

        createdAt:
          serverTimestamp()

      }

    );


    nameInput.value = "";

    ratingInput.value = "5";

    textInput.value = "";


    alert(
      "✅ Your review has been submitted!"
    );


    await loadReviews();


  } catch (error) {

    console.error(error);


    alert(
      "❌ Review could not be submitted."
    );

  }


  submitReview.disabled =
    false;


  submitReview.textContent =
    "Submit Review";

}



// =========================
// SECURITY: HTML ESCAPE
// =========================

function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}



// =========================
// START
// =========================

loadProduct();