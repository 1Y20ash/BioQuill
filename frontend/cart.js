// 🔐 Protect page
if (!localStorage.getItem("user")) {
    alert("Please login first");
    window.location.href = "login.html";
}

const cartContainer = document.getElementById("cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    cartContainer.innerHTML = "";

    let total = 0;

    // ✅ EMPTY CART CHECK
    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty ❌</h2>";
        return;
    }

    // ✅ SHOW ITEMS
    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-card");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>

            <div class="cart-actions">
                <button onclick="increaseQty(${item.id})">+</button>
                <button onclick="decreaseQty(${item.id})">-</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    // ✅ TOTAL
    const totalDiv = document.createElement("h2");
    totalDiv.innerText = "Total: ₹" + total;
    totalDiv.classList.add("total");

    cartContainer.appendChild(totalDiv);

    // ✅ ONLY ONE CHECKOUT BUTTON (OUTSIDE LOOP)
    const checkoutBtn = document.createElement("button");
    checkoutBtn.innerText = "Checkout ✅";
    checkoutBtn.onclick = checkout;

    cartContainer.appendChild(checkoutBtn);
}

function increaseQty(id) {
    cart.forEach(item => {
        if (item.id === id) item.quantity++;
    });
    updateCart();
}

function decreaseQty(id) {
    cart.forEach(item => {
        if (item.id === id && item.quantity > 1) item.quantity--;
    });
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
    }

    alert("Order placed successfully 🎉");

    localStorage.removeItem("cart");

    window.location.href = "order-success.html";
}
displayCart();