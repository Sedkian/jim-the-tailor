// Function to initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
    const jacketColorSelect = document.getElementById("jacket-color");
    if (jacketColorSelect) {
        const suitImage = document.getElementById("suit-image");

        // Set up event listener for jacket color change
        jacketColorSelect.addEventListener("change", updateSuitPreview);
    }

    // Initialize the database and display cart items if on cart page
    if (document.querySelector(".cart-container")) {
        initializeDatabase();
        displayCartItems();
    }
});

// Function to update the suit preview color square
// function updateSuitPreview() {
//     const jacketColor = document.getElementById("jacket-color").value;
//     const suitImage = document.getElementById("suit-image");

//     // Set background color based on selected jacket color
//     if (jacketColor === "navy") {
//         suitImage.style.backgroundColor = "#000080"; // Navy blue
//     } else if (jacketColor === "black") {
//         suitImage.style.backgroundColor = "#000000"; // Black
//     } else if (jacketColor === "grey") {
//         suitImage.style.backgroundColor = "#808080"; // Grey
//     }

//     // Remove the image source and adjust styling to show the color square
//     suitImage.src = ""; // Clear any existing image
//     suitImage.style.width = "200px"; // Set the size of the color square
//     suitImage.style.height = "200px";
//     suitImage.style.display = "inline-block"; // Ensure it appears as a square
// }

var currentJacket = 0;
var currentPants = 0;

function changeImage(type, direction) {
    // changes the currently being displayed jacket base on which button was pressed
    if(type == 0) {
        const NUM_JACKETS = 4;
        const img = document.getElementById("jacketImage");
        currentJacket = (currentJacket + direction) % NUM_JACKETS;
        img.src = "images/jackets/j" + currentJacket + ".png";
    } else if(type == 4) {
        const NUM_PANTS = 3;
        const img = document.getElementById("pantsImage");
        currentPants = (currentPants + direction) % NUM_PANTS;
        img.src = "images/pants/p" + currentPants + ".png";
    }
}

function measurementSwitchCheck(checkedButton, uncheckedButton){
    checkedButton.classList.add('checked');
    uncheckedButton.classList.remove('checked');

}
// Function to add item to cart
function addToCart() {
    // For now, just return true
    const success = true;

    if (success) {
        // Show popup
        const popup = document.getElementById("popup");
        popup.classList.add("show");
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3000); // Hide after 3 seconds
    }

    return success;
}

/* Shopping Cart */
// Function to initialize the database
function initializeDatabase() {
    const items = [
        {
            name: "Suit Jacket",
            type: "jacket",
            color: "Navy",
            price: 150,
            image: "images/suit_jacket.jpg",
            quantity: 1
        },
        {
            name: "Suit Pants",
            type: "pants",
            color: "Black",
            price: 80,
            image: "images/suit_pants.png",
            quantity: 1
        },
        {
            name: "Tie",
            type: "tie",
            color: "Red",
            price: 20,
            image: "images/suit_tie.png",
            quantity: 1
        }
    ];

    // Store items in local storage
    localStorage.setItem("items", JSON.stringify(items));
}

function displayCartItems() {
    const items = JSON.parse(localStorage.getItem("items"));
    const cartContainer = document.querySelector(".cart-container");

    let totalPrice = 0;

    items.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>Color: ${item.color}</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <p>Price: $${item.price * item.quantity} CAD</p>
            </div>
            <i class="fas fa-trash delete-icon" onclick="removeCartItem(${index})"></i>
        `;

        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.querySelector(".total-price h2");
    totalPriceElement.textContent = `Total Price: $${totalPrice} CAD`;
}

function removeCartItem(index) {
    let items = JSON.parse(localStorage.getItem("items"));
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    document.querySelector(".cart-container").innerHTML = "";
    displayCartItems();
}

function increaseQuantity(index) {
    let items = JSON.parse(localStorage.getItem("items"));
    items[index].quantity += 1;
    localStorage.setItem("items", JSON.stringify(items));
    document.querySelector(".cart-container").innerHTML = "";
    displayCartItems();
}

function decreaseQuantity(index) {
    let items = JSON.parse(localStorage.getItem("items"));
    if (items[index].quantity > 1) {
        items[index].quantity -= 1;
        localStorage.setItem("items", JSON.stringify(items));
        document.querySelector(".cart-container").innerHTML = "";
        displayCartItems();
    }
}