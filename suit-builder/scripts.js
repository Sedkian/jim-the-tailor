/* Suit Builder */
document.addEventListener("DOMContentLoaded", () => {
    initializeDatabase();
    initializeEventListeners();
});

var currentJacket = 0;
var currentShirt = 0;
var currentTie = 0;
var currentPants = 0;
var currentShoes = 0;

window.changeImage = function(type, direction) {
    // Handle changes based on the item type
    if (type === 0) { // Jacket
        const Jackets = getJackets();
        const NUM_JACKETS = Jackets.length;
        currentJacket = (currentJacket + direction + NUM_JACKETS) % NUM_JACKETS;
        document.getElementById("jacketImage").src = Jackets[currentJacket].image;
        document.getElementById("jacket-price").innerText = `$${Jackets[currentJacket].price}`;
    } else if (type === 1) { // Shirt
        const Shirts = getShirts();
        const NUM_SHIRTS = Shirts.length;
        currentShirt = (currentShirt + direction + NUM_SHIRTS) % NUM_SHIRTS;
        document.getElementById("shirtImage").src = Shirts[currentShirt].image;
        document.getElementById("shirt-price").innerText = `$${Shirts[currentShirt].price}`;
    } else if (type === 2) { // Tie
        const Ties = getTies();
        const NUM_TIES = Ties.length;
        currentTie = (currentTie + direction + NUM_TIES) % NUM_TIES;
        document.getElementById("tieImage").src = Ties[currentTie].image;
        document.getElementById("tie-price").innerText = `$${Ties[currentTie].price}`;
    } else if (type === 4) { // Pants
        const Pants = getPants();
        const NUM_PANTS = Pants.length;
        currentPants = (currentPants + direction + NUM_PANTS) % NUM_PANTS;
        document.getElementById("pantsImage").src = Pants[currentPants].image;
        document.getElementById("pants-price").innerText = `$${Pants[currentPants].price}`;
    } else if (type === 5) { // Shoes
        const Shoes = getShoes();
        const NUM_SHOES = Shoes.length;
        currentShoes = (currentShoes + direction + NUM_SHOES) % NUM_SHOES;
        document.getElementById("shoesImage").src = Shoes[currentShoes].image;
        document.getElementById("shoes-price").innerText = `$${Shoes[currentShoes].price}`;
    }
}

window.measurementSwitchCheck = function(checkedButton, uncheckedButton) {
    checkedButton.classList.add('checked');
    uncheckedButton.classList.remove('checked');
    const sizeForm = document.getElementById('size-form');
    sizeForm.setAttribute('data-unit', checkedButton.id === "measurementSwitchToCm" ? "cm" : "in");
}

window.calculateFit = function() {
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
        userConfirmed = confirm("Vest size smaller than we can provide, would you accept one that is larger?");
        if (userConfirmed) {
            suitVest = 0
        } else {
            return
        }
    } else if (suitVest > 6){
        userConfirmed = confirm("Vest size larger than we can provide, would you accept one that is smaller?");
        if (userConfirmed) {
            suitVest = 6
        } else {
            return
        }
    }
    if(pants < 0){
        userConfirmed = confirm("Pants size smaller than we can provide, would you accept one that is larger?");
        if (userConfirmed) {
            pants = 0
        } else {
            return
        }
    } else if( pants > 4){
        userConfirmed = confirm("Pants size larger than we can provide, would you accept one that is smaller?");
        if (userConfirmed) {
            pants = 4
        } else {
            return
        }
    }
    if(jacket < 0){
        userConfirmed = confirm("Jacket size smaller than we can provide, would you accept a larger one?");
        if (userConfirmed) {
            jacket = 0
        } else {
            return
        }
    } else if(jacket > 4){
        userConfirmed = confirm("Jacket size larger than we can provide, would you accept a smaller one?");
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

window.goBackToSizeFinder = function() {
    document.getElementById('size-finder').style.setProperty('display', 'block', 'important'); // Hide the size-finder form
    document.getElementById('size-selector').style.setProperty('display', 'none', 'important');  // Show the size-selector form
}

//Event listener for size select, when select one, deselect everything else
function initializeEventListeners() {
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
}

//pre select size based on calculation
window.preselectButton = function(groupId, index) {
    const group = document.getElementById(groupId);
    const buttons = group.querySelectorAll('.size-select-btn');
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[index].classList.add('selected');
}

/* Shopping Cart */
// Function to add item to cart
document.getElementById('add-to-cart').addEventListener('click', function() {
    // Add item to cart logic here (if any)

    // Show the popup
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = 'Suit items added to cart!';
    document.body.appendChild(popup);

    // Show the popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 500);
    }, 3000);
});

function displayCartItems() {
    const items = [
        ...getJackets(),
        ...getPants(),
        ...getShirts(),
        ...getShoes(),
        ...getTies()
    ];

    // Ensure each item has a quantity property
    items.forEach(item => {
        if (!item.quantity) {
            item.quantity = 1;
        }
    });

    const cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = ""; // Clear the container before adding items

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
                <div class="rating">${generateStars(item.rating)}</div>
            </div>
            <i class="fas fa-trash delete-icon" onclick="removeCartItem(${index})"></i>
        `;

        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.querySelector(".total-price h2");
    totalPriceElement.textContent = `Total Price: $${totalPrice} CAD`;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
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

/* Database */
// Jackets Database
const jacketsDatabase = [
    {
        id: "jacket0",
        name: "Slim Trim Jacket",
        type: "jacket",
        color: "Black",
        price: 150,
        image: "../database/images/jackets/j0.png",
        rating: 4
    },
    {
        id: "jacket1",
        name: "Modern Trim Jacket",
        type: "jacket",
        color: "Grey",
        price: 150,
        image: "../database/images/jackets/j1.png",
        rating: 5
    },
    {
        id: "jacket2",
        name: "Jetted Jacket",
        type: "jacket",
        color: "Blue",
        price: 150,
        image: "../database/images/jackets/j2.png",
        rating: 2
    },
    {
        id: "jacket3",
        name: "Center Vent Jacket",
        type: "jacket",
        color: "Brown",
        price: 150,
        image: "../database/images/jackets/j3.png",
        rating: 3
    },
    {
        id: "jacket4",
        name: "Tailored Jacket",
        type: "jacket",
        color: "Black",
        price: 150,
        image: "../database/images/jackets/j4.png",
        rating: 4
    },
    {
        id: "jacket5",
        name: "Classic Jacket",
        type: "jacket",
        color: "Black",
        price: 150,
        image: "../database/images/jackets/j5.png",
        rating: 5
    },
    {
        id: "jacket6",
        name: "Slim Trim Jacket",
        type: "jacket",
        color: "Grey",
        price: 150,
        image: "../database/images/jackets/j6.png",
        rating: 2
    },
    {
        id: "jacket7",
        name: "Modern Trim Jacket",
        type: "jacket",
        color: "Blue",
        price: 150,
        image: "../database/images/jackets/j7.png",
        rating: 3
    },
    {
        id: "jacket8",
        name: "Jetted Jacket",
        type: "jacket",
        color: "Brown",
        price: 150,
        image: "../database/images/jackets/j8.png",
        rating: 4
    },
];

// Pants Database
const pantsDatabase = [
    {
        id: "pant0",
        name: "Slim Trim Pant",
        type: "pant",
        color: "Black",
        price: 100,
        image: "../database/images/pants/p0.png",
        rating: 5
    },
    {
        id: "pant1",
        name: "Modern Trim Pant",
        type: "pant",
        color: "Grey",
        price: 100,
        image: "../database/images/pants/p1.png",
        rating: 4
    },
    {
        id: "pant2",
        name: "Jetted Pant",
        type: "pant",
        color: "Blue",
        price: 100,
        image: "../database/images/pants/p2.png",
        rating: 3
    },
];

// Shirts Database
const shirtsDatabase = [
    {
        id: "shirt0",
        name: "Slim Trim Shirt",
        type: "shirt",
        color: "Black",
        price: 40,
        image: "../database/images/shirts/s0.png",
        rating: 2
    },
    {
        id: "shirt1",
        name: "Modern Trim Shirt",
        type: "shirt",
        color: "Grey",
        price: 30,
        image: "../database/images/shirts/s1.png",
        rating: 3
    },
    {
        id: "shirt2",
        name: "Jetted Shirt",
        type: "shirt",
        color: "Blue",
        price: 55,
        image: "../database/images/shirts/s2.png",
        rating: 4
    },
    {
        id: "shirt3",
        name: "Center Vent Shirt",
        type: "shirt",
        color: "Brown",
        price: 50,
        image: "../database/images/shirts/s3.png",
        rating: 5
    },
    {
        id: "shirt4",
        name: "Tailored Shirt",
        type: "shirt",
        color: "Black",
        price: 60,
        image: "../database/images/shirts/s4.png",
        rating: 2
    },
    {
        id: "shirt5",
        name: "Classic Shirt",
        type: "shirt",
        color: "Black",
        price: 30,
        image: "../database/images/shirts/s5.png",
        rating: 3
    },
    {
        id: "shirt6",
        name: "Slim Trim Shirt",
        type: "shirt",
        color: "Grey",
        price: 50,
        image: "../database/images/shirts/s6.png",
        rating: 4
    },
    {
        id: "shirt7",
        name: "Modern Trim Shirt",
        type: "shirt",
        color: "Blue",
        price: 40,
        image: "../database/images/shirts/s7.png",
        rating: 5
    }
];

// Shoes Database
const shoesDatabase = [
    {
        id: "shoe0",
        name: "Slim Trim Shoe",
        type: "shoe",
        color: "Black",
        price: 80,
        image: "../database/images/shoes/f0.png",
        rating: 4
    },
    {
        id: "shoe1",
        name: "Modern Trim Shoe",
        type: "shoe",
        color: "Grey",
        price: 80,
        image: "../database/images/shoes/f1.png",
        rating: 5
    },
    {
        id: "shoe2",
        name: "Jetted Shoe",
        type: "shoe",
        color: "Blue",
        price: 80,
        image: "../database/images/shoes/f2.png",
        rating: 2
    }
]

const tiesDatabase = [
    {
        id: "tie0",
        name: "Slim Trim Tie",
        type: "tie",
        color: "Black",
        price: 30,
        image: "../database/images/ties/t0.png",
        rating: 3
    },
    {
        id: "tie1",
        name: "Modern Trim Tie",
        type: "tie",
        color: "Grey",
        price: 30,
        image: "../database/images/ties/t1.png",
        rating: 4
    },
    {
        id: "tie2",
        name: "Jetted Tie",
        type: "tie",
        color: "Blue",
        price: 30,
        image: "../database/images/ties/t2.png",
        rating: 5
    },
    {
        id: "tie3",
        name: "Center Vent Tie",
        type: "tie",
        color: "Brown",
        price: 30,
        image: "../database/images/ties/t3.png",
        rating: 2
    },
    {
        id: "tie4",
        name: "Tailored Tie",
        type: "tie",
        color: "Black",
        price: 30,
        image: "../database/images/ties/t4.png",
        rating: 3
    },
    {
        id: "tie5",
        name: "Classic Tie",
        type: "tie",
        color: "Black",
        price: 30,
        image: "../database/images/ties/t5.png",
        rating: 4
    },
    {
        id: "tie6",
        name: "Slim Trim Tie",
        type: "tie",
        color: "Grey",
        price: 30,
        image: "../database/images/ties/t6.png",
        rating: 5
    } 
]

function initializeDatabase() {
    // Store items in local storage
    localStorage.setItem("jackets", JSON.stringify(jacketsDatabase));
    localStorage.setItem("pants", JSON.stringify(pantsDatabase));
    localStorage.setItem("shirts", JSON.stringify(shirtsDatabase));
    localStorage.setItem("shoes", JSON.stringify(shoesDatabase));
    localStorage.setItem("ties", JSON.stringify(tiesDatabase));
}

function getJackets() {
    return JSON.parse(localStorage.getItem("jackets"));
}

function getPants() {
    return JSON.parse(localStorage.getItem("pants"));
}

function getShirts() {
    return JSON.parse(localStorage.getItem("shirts"));
}

function getShoes() {
    return JSON.parse(localStorage.getItem("shoes"));
}

function getTies() {
    return JSON.parse(localStorage.getItem("ties"));
}

function getItemById(type, id) {
    let items = JSON.parse(localStorage.getItem(type));
    return items.find(item => item.id === id);
}