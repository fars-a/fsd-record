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
  if (confirm("Are you sure you want to delete this product?")) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

// Edit Product prompts
window.editProduct = function (id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) return;

  let newName = prompt("Enter new product name:", products[productIndex].name);
  if (newName === null) return; // cancelled

  let newPrice = prompt("Enter new product price (₹):", products[productIndex].price);
  if (newPrice === null) return; // cancelled

  if (newName.trim() === "" || newPrice.trim() === "") {
    alert("Name and Price cannot be empty!");
    return;
  }

  products[productIndex].name = newName.trim();
  products[productIndex].price = newPrice.trim();

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

document.getElementById("addProductForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

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