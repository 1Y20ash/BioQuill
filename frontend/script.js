const user = JSON.parse(localStorage.getItem("user"));
fetch("https://bioquill-backend.onrender.com/products")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("products");

    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
        `;

        container.appendChild(div);
    });
});
function addToCart(id, name, price) {

    const user = localStorage.getItem("user");

    // 🔐 Check login FIRST
    if (!user) {
        alert("Please login to add items 🛒");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}

if (user) {
    document.getElementById("welcome").innerText = "Welcome, " + user.name;
}


const loginLink = document.getElementById("loginLink");
const logoutBtn = document.getElementById("logoutBtn");

if (user) {
    document.getElementById("welcome").innerText = "Welcome, " + user.name;

    loginLink.style.display = "none";   // hide login
    logoutBtn.style.display = "inline"; // show logout
} else {
    loginLink.style.display = "inline"; // show login
    logoutBtn.style.display = "none";   // hide logout
}

const welcome = document.getElementById("welcome");

if (user && welcome) {
    welcome.innerText = "Welcome, " + user.name;
}
div.innerHTML = `
    <h3>${product.name}</h3>
    <p><b>₹${product.price}</b></p>
    <p>${product.description}</p>
    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
        Add to Cart 🛒
    </button>
`;
function logout() {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "login.html";
}
const buttonHTML = user
    ? `<button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart 🛒</button>`
    : `<button onclick="alert('Login required')">Login to Add</button>`;