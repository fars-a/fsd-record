function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  let isAdmin = loggedInUser && loggedInUser.role === "admin";

  let output = "";

  products.forEach(product => {
    let adminControls = "";
    if (isAdmin) {
      adminControls = `
            <div class="mt-3 pt-3 border-top d-flex justify-content-between">
                <button onclick="editProduct(${product.id})" class="btn btn-sm btn-outline-secondary">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="btn btn-sm btn-outline-danger">Delete</button>
            </div>
            `;
    }

    output += `
<div class="col-md-4 mb-5">
  <div class="card shadow-sm h-100 d-flex flex-column">

    <div class="mb-3" style="height:180px; background:#e8e2d8; border-radius:14px;"></div>

    <h5 class="card-title">${product.name}</h5>

    <p class="card-text flex-grow-1">
      Thoughtfully crafted essential designed for everyday elegance.
    </p>

    <div class="d-flex justify-content-between align-items-center mt-3">
        <span class="price">₹${product.price}</span>
        <button onclick="addToCart(${product.id})"
                class="btn btn-primary rounded-pill btn-sm">
            Add
        </button>
    </div>
    ${adminControls}
  </div>
</div>`;
  });

  let productListContainer = document.getElementById("productList");
  if (productListContainer) {
    productListContainer.innerHTML = output;
  }
  // Show the Add New Product button if Admin
  const addBtnContainer = document.getElementById("adminAddContainer");
  if (addBtnContainer && isAdmin) {
    addBtnContainer.classList.remove("d-none");
  }
}

renderProducts();

// Delete Product
window.deleteProduct = function (id) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  if (!loggedInUser || loggedInUser.role !== "admin") {
    alert("Unauthorized!");
    return;
  }
  if (confirm("Are you sure you want to delete this product?")) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

// Edit Product redirects to edit page
window.editProduct = function (id) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  if (!loggedInUser || loggedInUser.role !== "admin") {
    alert("Unauthorized!");
    return;
  }
  window.location.href = `edit-product.html?id=${id}`;
}

document.getElementById("addProductForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  if (!loggedInUser || loggedInUser.role !== "admin") {
    alert("Unauthorized action!");
    return;
  }

  let name = document.getElementById("pname").value;
  let price = document.getElementById("price").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.push({
    id: Date.now(),
    name,
    price
  });

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added!");
  window.location.href = "products.html";
});

document.getElementById("editProductForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  if (!loggedInUser || loggedInUser.role !== "admin") {
    alert("Unauthorized action!");
    return;
  }

  let id = document.getElementById("editProductId").value;
  let name = document.getElementById("editPname").value;
  let price = document.getElementById("editPrice").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let productIndex = products.findIndex(p => p.id == id);

  if (productIndex !== -1) {
    products[productIndex].name = name;
    products[productIndex].price = price;
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product updated!");
    window.location.href = "products.html";
  }
});

// Page Load Checks
document.addEventListener("DOMContentLoaded", () => {
  let currentUrl = window.location.href.toLowerCase();

  // Protect admin pages
  if (currentUrl.includes("add-products.html") || currentUrl.includes("edit-product.html")) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (!loggedInUser || loggedInUser.role !== "admin") {
      alert("Access Denied. Admins only.");
      window.location.href = "login.html";
      return;
    }
  }

  // Fill edit product form if on edit page
  if (currentUrl.includes("edit-product.html")) {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id) {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      let product = products.find(p => p.id == id);
      if (product) {
        document.getElementById("editProductId").value = product.id;
        document.getElementById("editPname").value = product.name;
        document.getElementById("editPrice").value = product.price;
      }
    }
  }
});