document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    if (name === "" || email === "" || password.length < 6) {
        alert("Please fill all fields. Password must be 6+ characters.");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
        id: Date.now(),
        name,
        email,
        password,
        role: "user"
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
});
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    if (email === "admin@journal.com" && password === "admin123") {
        let adminUser = {
            id: "admin-1",
            name: "Journal Admin",
            email: "admin@journal.com",
            role: "admin"
        };
        localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
        alert("Admin Login successful!");
        window.location.href = "products.html";
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Invalid credentials");
        return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "products.html";
});