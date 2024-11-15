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
    if (type === 0) {
        // Jacket update
        const NUM_JACKETS = 4; // Assuming 4 jackets available
        const img = document.getElementById("jacketImage");

        // Update currentJacket index
        currentJacket = (currentJacket + direction + NUM_JACKETS) % NUM_JACKETS; // Ensure no negative values
        img.src = `images/jackets/j${currentJacket}.png`;
    } else if (type === 4) {
        // Pants update
        const NUM_PANTS = 3; // Assuming 3 pants available
        const img = document.getElementById("pantsImage");

        // Update currentPants index
        currentPants = (currentPants + direction + NUM_PANTS) % NUM_PANTS; // Ensure no negative values
        img.src = `images/pants/p${currentPants}.png`;
    }
}

function measurementSwitchCheck(checkedButton, uncheckedButton) {
    checkedButton.classList.add('checked');
    uncheckedButton.classList.remove('checked');
    const sizeForm = document.getElementById('size-form');
    sizeForm.setAttribute('data-unit', checkedButton.id === "measurementSwitchToCm" ? "cm" : "in");
}

function calculateFit(){
    let chest = document.getElementById('chest').value;
    let neck = document.getElementById('neck').value;
    let sl = document.getElementById('sleeve-length').value;
    let hip = document.getElementById('hip').value;
    let waist = document.getElementById('waist').value;
    let sizeForm = document.getElementById('size-form');
    let currentUnit = sizeForm.getAttribute('data-unit');
    if(currentUnit === 'cm'){
        chest = chest*0.3937;
        neck = neck*0.3937;
        sl = sl*0.3937;
        hip = hip*0.3937; 
        waist = waist*0.3937;
    }

    let suitVest =((chest - 35) / 3) | 0 /*0 = small, 1=Med, 2= large, 3=xl, 4=xxl, 5=xxxl, 6=xxxxl*/ 
    let pants = ((waist - 28) / 4) | 0 /*0 = small, 1=Med, 2= large, 3=xl, 4=xxl,*/ 

    const Nsize = (neck - 14)
    const Csize = ((chest - 34) / 4)
    const Wsize = ((waist - 28) / 4)
    const Hsize = ((hip - 33) / 4)
    const sleeve = ((sl -32 / 2)) | 0
    const sSize = ((sl - sleeve - 33.5) / 0.5)
    const sizeArr = [Nsize, Csize, Wsize, Hsize, sSize]
    let jacket = Math.max((sizeArr.reduce((sum, num) => sum + num, 0) / sizeArr.length) | 0, 0); // Same as pants

    if(suitVest < 0){
        userConfirmed = confirm("Vest size smaller than we can provied, would you accpet one that is larger?");
        if (userConfirmed) {
            suitVest = 0
        } else {
            return
        }
    } else if (suitVest > 6){
        userConfirmed = confirm("Vest size larger than we can provied, would you accpet one that is smaller?");
        if (userConfirmed) {
            suitVest = 6
        } else {
            return
        }
    }
    if(pants < 0){
        userConfirmed = confirm("Vest size smaller than we can provied, would you accpet one that is larger?");
        if (userConfirmed) {
            pants = 0
        } else {
            return
        }
    } else if( pants > 4){
        userConfirmed = confirm("Vest size larger than we can provied, would you accpet one that is smaller?");
        if (userConfirmed) {
            pants = 4
        } else {
            return
        }
    }
    if(jacket < 0){
        userConfirmed = confirm("Vest size smaller than we can provied, would you accpet a larger one?");
        if (userConfirmed) {
            jacket = 0
        } else {
            return
        }
    } else if(jacket > 4){
        userConfirmed = confirm("Vest size larger than we can provied, would you accpet a smaller one?");
        if (userConfirmed) {
            jacket = 0
        } else {
            return
        }
    }

    preselectButton("pants-size", pants)
    preselectButton("vest-size", suitVest)
    preselectButton("jacket-size", jacket)

    document.getElementById('size-finder').style.setProperty('display', 'none', 'important');
    document.getElementById('size-selector').style.setProperty('display', 'block', 'important');

}

function goBackToSizeFinder() {
    document.getElementById('size-finder').style.setProperty('display', 'block', 'important'); // Hide the size-finder form
    document.getElementById('size-selector').style.setProperty('display', 'none', 'important');  // Show the size-selector form
}

//Event listener for size select, when select one, deselect everthing else
const buttonGroups = document.querySelectorAll('.size-select-cot');
buttonGroups.forEach(group => {
    group.addEventListener('click', (event) => {
        if (event.target.classList.contains('size-select-btn')) {
            const buttons = group.querySelectorAll('.size-select-btn');
            buttons.forEach(button => button.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });
});
//pre select size based on calculation
function preselectButton(groupId, index) {
    const group = document.getElementById(groupId);
    const buttons = group.querySelectorAll('.size-select-btn');
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[index].classList.add('selected');
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