import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let product = {};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("productContainer");


// ===============================
// SEO HELPER
// ===============================

function setMetaTag(name, content) {

  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}


function setPropertyMeta(property, content) {

  let meta = document.querySelector(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}


// ===============================
// PRODUCT SEO
// ===============================

function setupProductSEO() {

  const productName = product.name || "Product";
  const price = product.price || "";
  const category = product.category || "Online Shopping";
  const description =
    product.description ||
    `${productName} available at AlmariX. Shop online in Pakistan.`;

  const image =
    product.image ||
    "https://almarixcom.vercel.app/favicon.png";

  const productUrl =
    `${window.location.origin}/product-details.html?id=${encodeURIComponent(id)}`;


  // Page title

  document.title =
    `${productName} | AlmariX Pakistan`;


  // Meta description

  setMetaTag(
    "description",
    `${productName} - ${category}. Price PKR ${price}. Shop online at AlmariX Pakistan. ${description}`
      .replace(/\s+/g, " ")
      .slice(0, 300)
  );


  // Robots

  setMetaTag(
    "robots",
    "index, follow"
  );


  // Canonical URL

  let canonical =
    document.querySelector('link[rel="canonical"]');

  if (!canonical) {

    canonical = document.createElement("link");

    canonical.setAttribute(
      "rel",
      "canonical"
    );

    document.head.appendChild(canonical);
  }

  canonical.setAttribute(
    "href",
    productUrl
  );


  // Open Graph

  setPropertyMeta(
    "og:title",
    `${productName} | AlmariX`
  );

  setPropertyMeta(
    "og:description",
    description
  );

  setPropertyMeta(
    "og:image",
    image
  );

  setPropertyMeta(
    "og:url",
    productUrl
  );

  setPropertyMeta(
    "og:type",
    "product"
  );

  setPropertyMeta(
    "og:site_name",
    "AlmariX"
  );


  // Twitter

  setMetaTag(
    "twitter:card",
    "summary_large_image"
  );

  setMetaTag(
    "twitter:title",
    `${productName} | AlmariX`
  );

  setMetaTag(
    "twitter:description",
    description
  );

  setMetaTag(
    "twitter:image",
    image
  );


  // ===============================
  // GOOGLE PRODUCT STRUCTURED DATA
  // ===============================

  const oldSchema =
    document.getElementById("almarixProductSchema");

  if (oldSchema) {
    oldSchema.remove();
  }


  const schema = {

    "@context": "https://schema.org",

    "@type": "Product",

    "name": productName,

    "description": description,

    "image": [
      image
    ],

    "category": category,

    "brand": {
      "@type": "Brand",
      "name": "AlmariX"
    },

    "offers": {

      "@type": "Offer",

      "url": productUrl,

      "priceCurrency": "PKR",

      "price": String(price),

      "availability":
        Number(product.stock || 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      "itemCondition":
        "https://schema.org/NewCondition"

    }

  };


  if (product.image2) {
    schema.image.push(product.image2);
  }


  const schemaScript =
    document.createElement("script");

  schemaScript.type =
    "application/ld+json";

  schemaScript.id =
    "almarixProductSchema";

  schemaScript.textContent =
    JSON.stringify(schema);


  document.head.appendChild(
    schemaScript
  );

}


// ===============================
// LOAD PRODUCT
// ===============================

async function loadProduct() {

  if (!id) {

    container.innerHTML =
      "<h2>Product Not Found</h2>";

    return;
  }


  try {

    const snap =
      await getDoc(
        doc(db, "products", id)
      );


    if (!snap.exists()) {

      container.innerHTML =
        "<h2>Product Not Found</h2>";

      document.title =
        "Product Not Found | AlmariX";

      return;
    }


    product =
      snap.data();


    // SEO

    setupProductSEO();


    // ===============================
    // PRODUCT PAGE
    // ===============================

    container.innerHTML = `

      <div class="productImages">

        <img
          id="mainImage"
          src="${product.image || ""}"
          alt="${product.name || "AlmariX Product"}"
          class="mainImage"
        >


        <div class="thumbs">

          ${
            product.image
              ? `
                <img
                  src="${product.image}"
                  alt="${product.name || "Product Image"}"
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
                  alt="${product.name || "Product Image 2"}"
                  onclick="
                    document.getElementById('mainImage').src='${product.image2}'
                  "
                >
              `
              : ""
          }

        </div>

      </div>


      <div class="info">

        <h1>${product.name || "Product"}</h1>


        <h2>
          PKR ${product.price || 0}
        </h2>


        <div class="productDescription">

          <ul>

            ${
              String(product.description || "")
                .split("\n")
                .filter(line => line.trim() !== "")
                .map(line => `
                  <li>
                    ${line
                      .replace(/^•\s*/, "")
                      .trim()}
                  </li>
                `)
                .join("")
            }

          </ul>

        </div>


        <p>
          <b>Category:</b>
          ${product.category || "-"}
        </p>


        <p>
          <b>Stock:</b>
          ${product.stock || 0}
        </p>


        <!-- SIZE -->

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


        <!-- COLOR -->

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


      </div>

    `;


  } catch (error) {

    console.error(
      "Product loading error:",
      error
    );

    container.innerHTML =
      "<h2>Unable to load product</h2>";

  }

}


// ===============================
// ADD TO CART
// ===============================

window.addToCart = () => {

  let cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];


  const selectedSize =
    document.getElementById(
      "selectedSize"
    )?.value || "";


  const selectedColor =
    document.getElementById(
      "selectedColor"
    )?.value || "";


  cart.push({

    id: id,

    name: product.name,

    price: product.price,

    image: product.image,

    qty: 1,

    selectedSize: selectedSize,

    selectedColor: selectedColor

  });


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  alert(
    "✅ Product Added To Cart"
  );

};


// ===============================
// BUY NOW
// ===============================

window.buyNow = () => {

  const selectedSize =
    document.getElementById(
      "selectedSize"
    )?.value || "";


  const selectedColor =
    document.getElementById(
      "selectedColor"
    )?.value || "";


  localStorage.setItem(

    "buyNowProduct",

    JSON.stringify({

      ...product,

      selectedSize:
        selectedSize,

      selectedColor:
        selectedColor

    })

  );


  window.location.href =
    "checkout.html";

};


// ===============================
// START
// ===============================

loadProduct();