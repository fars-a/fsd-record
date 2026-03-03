function addToCart(id){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}
function renderCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let output = "";
    let total = 0;
    cart.forEach(item => {
        total += Number(item.price);
        output += `<p>${item.name} - ₹${item.price}</p>`;
    });
    output += `<h4>Total: ₹${total}</h4>`;
    document.getElementById("cartItems").innerHTML = output;
}
renderCart();