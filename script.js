
// =====================================
// SAVOUR - FOOD WEBSITE
// JavaScript Functionality
// =====================================

// FOOD MENU DATA

const foodItems = [
    {
        id: 1,
        name: "Crispy Bruschetta",
        category: "starters",
        price: 249,
        tag: "Popular",
        description: "Toasted bread with fresh tomatoes, basil and olive oil.",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=700"
    },
    {
        id: 2,
        name: "Paneer Tikka",
        category: "starters",
        price: 299,
        tag: "Chef's Choice",
        description: "Marinated paneer grilled with aromatic Indian spices.",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700"
    },
    {
        id: 3,
        name: "Classic Margherita",
        category: "main",
        price: 399,
        tag: "Bestseller",
        description: "Fresh mozzarella, tomato sauce and fragrant basil.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700"
    },
    {
        id: 4,
        name: "Creamy Pasta",
        category: "main",
        price: 349,
        tag: "Popular",
        description: "Rich creamy sauce with herbs and parmesan cheese.",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700"
    },
    {
        id: 5,
        name: "Grilled Steak",
        category: "main",
        price: 599,
        tag: "Premium",
        description: "Perfectly grilled steak served with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700"
    },
    {
        id: 6,
        name: "Chocolate Brownie",
        category: "desserts",
        price: 199,
        tag: "Sweet Treat",
        description: "Warm chocolate brownie with a rich chocolate centre.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700"
    },
    {
        id: 7,
        name: "Strawberry Cheesecake",
        category: "desserts",
        price: 249,
        tag: "Favourite",
        description: "Smooth cheesecake topped with fresh strawberries.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700"
    },
    {
        id: 8,
        name: "Fresh Lime Cooler",
        category: "drinks",
        price: 129,
        tag: "Refreshing",
        description: "A refreshing blend of lime, mint and sparkling water.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=700"
    },
    {
        id: 9,
        name: "Cold Coffee",
        category: "drinks",
        price: 159,
        tag: "Popular",
        description: "Chilled coffee blended with creamy milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700"
    }
];

// CART DATA

let cart = [];

// DOM ELEMENTS

const menuGrid = document.getElementById("menuGrid");
const menuFilters = document.getElementById("menuFilters");
const cartDetails = document.getElementById("cartDetails");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// DISPLAY FOOD ITEMS

function displayFoodItems(category = "all") {

    const filteredItems = category === "all"
        ? foodItems
        : foodItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map(item => `
        <article class="food-card">

            <div class="food-image">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >
                <span class="food-tag">${item.tag}</span>
            </div>

            <div class="food-info">
                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="food-bottom">

                    <span class="food-price">
                        ₹${item.price}
                    </span>

                    <button
                        class="add-btn"
                        data-id="${item.id}"
                    >
                        + Add to Cart
                    </button>

                </div>
            </div>

        </article>
    `).join("");
}

// CATEGORY FILTERS

menuFilters.addEventListener("click", function(event) {

    const button = event.target.closest(".filter-btn");

    if (!button) return;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    displayFoodItems(category);
});

// ADD TO CART

menuGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    const itemId = Number(button.dataset.id);

    const selectedItem = foodItems.find(item => item.id === itemId);

    if (!selectedItem) return;

    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...selectedItem,
            quantity: 1
        });
    }

    updateCart();

    button.textContent = "✓ Added";

    setTimeout(() => {
        button.textContent = "+ Add to Cart";
    }, 800);

});

// UPDATE CART

function updateCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    if (totalItems === 0) {

        cartDetails.textContent = "Your cart is empty.";

    } else {

        cartDetails.textContent = cart.map(item =>
            `${item.name} × ${item.quantity}`
        ).join(" | ");

    }

    cartTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

    checkoutBtn.disabled = totalItems === 0;

    checkoutBtn.textContent = totalItems > 0
        ? `Checkout (${totalItems})`
        : "Checkout";
}

// CHECKOUT

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) return;

    const orderSummary = cart.map(item =>
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "YOUR ORDER SUMMARY\n\n" +
        orderSummary +
        "\n\nTotal: ₹" + total.toLocaleString("en-IN") +
        "\n\nThank you for choosing Savour!"
    );

});

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);

});

// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// TABLE RESERVATION

const reservationForm = document.getElementById("reservationForm");

const reservationMessage = document.getElementById(
    "reservationMessage"
);

const bookingDate = document.getElementById("bookingDate");

// Prevent selecting a past date

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

bookingDate.min = localToday;

reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const email = document.getElementById("guestEmail").value.trim();
    const date = bookingDate.value;
    const guests = document.getElementById("guestCount").value;
    const time = document.getElementById("bookingTime").value;

    if (!name || !email || !date || !time) {
        reservationMessage.textContent =
            "Please complete all required fields.";
        return;
    }

    if (date < localToday) {
        reservationMessage.textContent =
            "Please select a future date.";
        return;
    }

    reservationMessage.textContent =
        `Thank you, ${name}! Your reservation request for ${guests} guest(s) on ${date} at ${time} has been received.`;

    reservationForm.reset();

});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// INITIALIZE WEBSITE

displayFoodItems();
updateCart();
