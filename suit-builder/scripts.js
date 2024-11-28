/* Suit Builder */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the database
    initializeDatabase();

    const sizeForm = document.getElementById('size-form');
    if (sizeForm) {
        sizeForm.addEventListener('input', validateInput);
        initializeEventListeners();
    }

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            addToCart();
        });
    }

    const cartContainer = document.querySelector(".cart-container"); 
    if (cartContainer) {
        displayCartItems();
    }

    const suitCustomization = document.getElementById('suit-customization');
    if (suitCustomization) {
        updateItemDetails();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const selectedStyle = urlParams.get('style');
    if (selectedStyle) {
      applyStyle(selectedStyle);
    }
});

function applyStyle(style) {
    const styles = {
      'john-wick': {
        jacket: 0,
        shirt: 1,
        tie: 0,
        pants: 3,
        shoes: 0
      },
      'james-bond': {
        jacket: 1,
        shirt: 2,
        tie: 3,
        pants: 4,
        shoes: 0
      }
    };
  
    const selectedItems = styles[style];
    if (selectedItems) {
      currentJacket = selectedItems.jacket;
      currentShirt = selectedItems.shirt;
      currentTie = selectedItems.tie;
      currentPants = selectedItems.pants;
      currentShoes = selectedItems.shoes;
      updateItemDetails();
    }
  }

var currentJacket = 0;
var currentShirt = 0;
var currentTie = 0;
var currentPants = 0;
var currentShoes = 0;

window.changeImage = function(type, direction) {
    // Handle changes based on the item type
    if (type === 0 && jacketOpacity === 1) { // Jacket
        const Jackets = getJackets();
        const NUM_JACKETS = Jackets.length;
        currentJacket = (currentJacket + direction + NUM_JACKETS) % NUM_JACKETS;
        updatePreviewedJacket();
    } else if (type === 1 && shirtOpacity === 1) { // Shirt
        const Shirts = getShirts();
        const NUM_SHIRTS = Shirts.length;
        currentShirt = (currentShirt + direction + NUM_SHIRTS) % NUM_SHIRTS;
        updatePreviewedShirt();
    } else if (type === 2 && tieOpacity === 1) { // Tie
        const Ties = getTies();
        const NUM_TIES = Ties.length;
        currentTie = (currentTie + direction + NUM_TIES) % NUM_TIES;
        updatePreviewedTie();
    } else if (type === 4 && pantsOpacity === 1) { // Pants
        const Pants = getPants();
        const NUM_PANTS = Pants.length;
        currentPants = (currentPants + direction + NUM_PANTS) % NUM_PANTS;
        updatePreviewedPants();
    } else if (type === 5 && shoesOpacity === 1) { // Shoes
        const Shoes = getShoes();
        const NUM_SHOES = Shoes.length;
        currentShoes = (currentShoes + direction + NUM_SHOES) % NUM_SHOES;
        updatePreviewedShoes();
    }
}

function updatePreviewedJacket() {
    const Jackets = getJackets();
    document.getElementById("jacketImage").src = Jackets[currentJacket].image;
    document.getElementById("jacket-price").innerText = `$${Jackets[currentJacket].price}`;
    document.getElementById("jacket-name").innerText = `${Jackets[currentJacket].name}`;
    document.getElementById("jacket-rating").innerHTML = `${generateStars(Jackets[currentJacket].rating)}`;
}

function updatePreviewedShirt() {
    const Shirts = getShirts();
    document.getElementById("shirtImage").src = Shirts[currentShirt].image;
    document.getElementById("shirt-price").innerText = `$${Shirts[currentShirt].price}`;
    document.getElementById("shirt-name").innerText = `${Shirts[currentShirt].name}`;
    document.getElementById("shirt-rating").innerHTML = `${generateStars(Shirts[currentShirt].rating)}`;
}

function updatePreviewedTie() {
    const Ties = getTies();
    document.getElementById("tieImage").src = Ties[currentTie].image;
    document.getElementById("tie-price").innerText = `$${Ties[currentTie].price}`;
    document.getElementById("tie-name").innerText = `${Ties[currentTie].name}`;
    document.getElementById("tie-rating").innerHTML = `${generateStars(Ties[currentTie].rating)}`;
}

function updatePreviewedPants() {
    const Pants = getPants();
    document.getElementById("pantsImage").src = Pants[currentPants].image;
    document.getElementById("pants-price").innerText = `$${Pants[currentPants].price}`;
    document.getElementById("pants-name").innerText = `${Pants[currentPants].name}`;
    document.getElementById("pants-rating").innerHTML = `${generateStars(Pants[currentPants].rating)}`;
}

function updatePreviewedShoes() {
    const Shoes = getShoes();
    document.getElementById("shoesImage").src = Shoes[currentShoes].image;
    document.getElementById("shoes-price").innerText = `$${Shoes[currentShoes].price}`;
    document.getElementById("shoes-name").innerText = `${Shoes[currentShoes].name}`;
    document.getElementById("shoes-rating").innerHTML = `${generateStars(Shoes[currentShoes].rating)}`;
}

function updateItemDetails() {
    updatePreviewedJacket();
    updatePreviewedShirt();
    updatePreviewedTie();
    updatePreviewedPants();
    updatePreviewedShoes();
}

var jacketOpacity = 1;
var shirtOpacity = 1;
var tieOpacity = 1;
var pantsOpacity = 1;
var shoesOpacity = 1;

window.toggleDisplay = function(type) {
    if (type === 0) { // Jacket
        if (jacketOpacity === 1) {
            jacketOpacity = 0;
            document.getElementById("jacketImage").style.opacity = jacketOpacity;
            document.getElementById("jacket-toggle").src = "../database/images/offButton.png";
            document.getElementById("jacket-name").innerText = ""; // Clear the name
            document.getElementById("jacket-price").innerText = ""; // Clear the price
            document.getElementById("jacket-rating").innerHTML = ""; // Clear the rating
        } else {
            jacketOpacity = 1;
            document.getElementById("jacketImage").style.opacity = jacketOpacity;
            document.getElementById("jacket-toggle").src = "../database/images/onButton.png";
            updatePreviewedJacket(); // Restore the information
        }
    } else if (type === 1) { // Shirt
        if (shirtOpacity === 1) {
            shirtOpacity = 0;
            document.getElementById("shirtImage").style.opacity = shirtOpacity;
            document.getElementById("shirt-toggle").src = "../database/images/offButton.png";
            document.getElementById("shirt-name").innerText = ""; // Clear the name
            document.getElementById("shirt-price").innerText = ""; // Clear the price
            document.getElementById("shirt-rating").innerHTML = ""; // Clear the rating
        } else {
            shirtOpacity = 1;
            document.getElementById("shirtImage").style.opacity = shirtOpacity;
            document.getElementById("shirt-toggle").src = "../database/images/onButton.png";
            updatePreviewedShirt(); // Restore the information
        }
    } else if (type === 2) { // Tie
        if (tieOpacity === 1) {
            tieOpacity = 0;
            document.getElementById("tieImage").style.opacity = tieOpacity;
            document.getElementById("tie-toggle").src = "../database/images/offButton.png";
            document.getElementById("tie-name").innerText = ""; // Clear the name
            document.getElementById("tie-price").innerText = ""; // Clear the price
            document.getElementById("tie-rating").innerHTML = ""; // Clear the rating
        } else {
            tieOpacity = 1;
            document.getElementById("tieImage").style.opacity = tieOpacity;
            document.getElementById("tie-toggle").src = "../database/images/onButton.png";
            updatePreviewedTie(); // Restore the information
        }
    } else if (type === 4) { // Pants
        if (pantsOpacity === 1) {
            pantsOpacity = 0;
            document.getElementById("pantsImage").style.opacity = pantsOpacity;
            document.getElementById("pants-toggle").src = "../database/images/offButton.png";
            document.getElementById("pants-name").innerText = ""; // Clear the name
            document.getElementById("pants-price").innerText = ""; // Clear the price
            document.getElementById("pants-rating").innerHTML = ""; // Clear the rating
        } else {
            pantsOpacity = 1;
            document.getElementById("pantsImage").style.opacity = pantsOpacity;
            document.getElementById("pants-toggle").src = "../database/images/onButton.png";
            updatePreviewedPants(); // Restore the information
        }
    } else if (type === 5) { // Shoes
        if (shoesOpacity === 1) {
            shoesOpacity = 0;
            document.getElementById("shoesImage").style.opacity = shoesOpacity;
            document.getElementById("shoes-toggle").src = "../database/images/offButton.png";
            document.getElementById("shoes-name").innerText = ""; // Clear the name
            document.getElementById("shoes-price").innerText = ""; // Clear the price
            document.getElementById("shoes-rating").innerHTML = ""; // Clear the rating
        } else {
            shoesOpacity = 1;
            document.getElementById("shoesImage").style.opacity = shoesOpacity;
            document.getElementById("shoes-toggle").src = "../database/images/onButton.png";
            updatePreviewedShoes(); // Restore the information
        }
    }
}


window.calculateFit = function() {
    let chest = document.getElementById('chest').value;
    let neck = document.getElementById('neck').value;
    let sl = document.getElementById('sleeve-length').value;
    let hip = document.getElementById('hip').value;
    let waist = document.getElementById('waist').value;
    let sizeForm = document.getElementById('size-form');
    let currentUnit = sizeForm.getAttribute('data-unit');
    if(currentUnit !== 'in'){
        chest = chest*0.3937;
        neck = neck*0.3937;
        sl = sl*0.3937;
        hip = hip*0.3937; 
        waist = waist*0.3937;
    }

    const vestN = ((neck-14) / 0.9)
    const vestC = ((chest-34) / 3.6)
    const vestW = ((waist-28) / 4.1)
    let sizeArrC = [vestN, vestC, vestW]
    let suitVest =(sizeArrC.reduce((sum, num) => sum + num, 0) / sizeArrC.length) | 0  /*0 = small, 1=Med, 2= large, 3=xl, 4=xxl, 5=xxxl, 6=xxxxl*/ 
    let pants = ((waist - 28) / 4.5) | 0 /*0 = small, 1=Med, 2= large, 3=xl, 4=xxl,*/ 

    const Nsize = (neck - 14)
    const Csize = ((chest - 34) / 4)
    const Wsize = ((waist - 28) / 4)
    const Hsize = ((hip - 33) / 4)
    const sleeve = ((sl -32) / 2.5) | 0
    const sSize = ((sl - sleeve - 33) / 0.5)
    let  sizeArr = [Nsize, Csize, Wsize, Hsize, sSize]
    let jacket = (sizeArr.reduce((sum, num) => sum + num, 0) / sizeArr.length) | 0 // Same as pants
    userConfirmed=true
    if(suitVest < 0){
        //userConfirmed = confirm("Vest size smaller than we can provide, would you accept one that is larger?");
        if (userConfirmed) {
            suitVest = 0
        } else {
            return
        }
    } else if (suitVest > 5){
        //userConfirmed = confirm("Vest size larger than we can provide, would you accept one that is smaller?");
        if (userConfirmed) {
            suitVest = 5
        } else {
            return
        }
    }
    if(pants < 0){
        //userConfirmed = confirm("Pants size smaller than we can provide, would you accept one that is larger?");
        if (userConfirmed) {
            pants = 0
        } else {
            return
        }
    } else if( pants > 4){
        //userConfirmed = confirm("Pants size larger than we can provide, would you accept one that is smaller?");
        if (userConfirmed) {
            pants = 4
        } else {
            return
        }
    }
    if(jacket < 0){
        //userConfirmed = confirm("Jacket size smaller than we can provide, would you accept a larger one?");
        if (userConfirmed) {
            jacket = 0
        } else {
            return
        }
    } else if(jacket > 4){
        //userConfirmed = confirm("Jacket size larger than we can provide, would you accept a smaller one?");
        if (userConfirmed) {
            jacket = 4
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
window.switchToSelector = function() {
    document.getElementById('size-finder').style.setProperty('display', 'none', 'important');
    document.getElementById('size-selector').style.setProperty('display', 'block', 'important');
}

window.goBackToSizeFinder = function() {
    document.getElementById('size-finder').style.setProperty('display', 'block', 'important'); // Hide the size-finder form
    document.getElementById('size-selector').style.setProperty('display', 'none', 'important');  // Show the size-selector form
}

function getCurrentUnit() {
    const toggleSwitch = document.getElementById("toggle-unit");
    return toggleSwitch.checked ? "in" : "cm"; 
}


//Event listener for size select, when select one, deselect everything else
function initializeEventListeners() {
    const buttonGroups = document.querySelectorAll('.size-select-cot');
    buttonGroups.forEach(group => {
        group.addEventListener('click', (event) => {
            if (event.target.classList.contains('size-select-btn')) {
                const buttons = group.querySelectorAll('.size-select-btn');
                if (event.target.classList.contains('selected')){
                    event.target.classList.remove('selected');
                } else {
                    buttons.forEach(button => button.classList.remove('selected'));
                    event.target.classList.add('selected');
                }
            }
        });
    });
    document.getElementById("toggle-unit").addEventListener("change", function () {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            updateRangeInfo(input);
        });
    });
}
//Check user input every time they enter something
function updateRangeInfo(input) {//This is for range info
    const unit = getCurrentUnit(); 
    const min = input.getAttribute(`data-${unit}-min`);
    const max = input.getAttribute(`data-${unit}-max`);
    const rangeInfo = input.nextElementSibling;
    rangeInfo.textContent = `(${unit} range: ${min} - ${max})`;
}
document.querySelectorAll('input[type="number"]').forEach(input => {
    updateRangeInfo(input);
});
//When click the size option, change the text used for range suggest

function areAllSizeFilled() {
    const inputs = document.querySelectorAll('#size-form input[type="number"]');
    return Array.from(inputs).every(input => input.value.trim() !== '');
}


function validateInput(event) {
    const input = event.target;
    if (!input.matches('input[type="number"]')) return;
    const unit = getCurrentUnit(); 
    const min = parseFloat(input.getAttribute(`data-${unit}-min`));
    const max = parseFloat(input.getAttribute(`data-${unit}-max`));
    const value = parseFloat(input.value);
    const errorMessage = input.nextElementSibling.nextElementSibling;
    const rangeinfo = input.nextElementSibling;
    const calFit = document.getElementById('calculateFitBtd')
    if (isNaN(value) || (value < min || value > max)) {
        errorMessage.style.display = 'inline';
        rangeinfo.style.display = 'inline';
        input.style.borderColor = 'red';
        calFit.style.setProperty('pointer-events', 'none');
        calFit.style.setProperty('opacity', '0.5');

    } else if(!areAllSizeFilled()){
        errorMessage.style.display = 'none';
        rangeinfo.style.display = 'none';
        input.style.borderColor = '';
        calFit.style.setProperty('pointer-events', 'none');
        calFit.style.setProperty('opacity', '0.5');
    } else {
        errorMessage.style.display = 'none';
        rangeinfo.style.display = 'none';
        input.style.borderColor = '';
        calFit.style.setProperty('pointer-events', 'auto');
        calFit.style.setProperty('opacity', '1');
    }
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
function addToCart() {
    const cart = getCart();
    const currentItems = [];
    if (jacketOpacity == 1) {
        currentItems.push({ ...getJackets()[currentJacket], quantity: 1 });
    }
    if (shirtOpacity == 1) {
        currentItems.push({ ...getShirts()[currentShirt], quantity: 1 });
    }
    if (tieOpacity == 1) {
        currentItems.push({ ...getTies()[currentTie], quantity: 1 });
    }
    if (pantsOpacity == 1) {
        currentItems.push({ ...getPants()[currentPants], quantity: 1 });
    }
    if (shoesOpacity == 1) {
        currentItems.push({ ...getShoes()[currentShoes], quantity: 1 });
    }

    currentItems.forEach(newItem => {
        const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
            // Item already exists in the cart, increment the quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Item does not exist in the cart, add it
            cart.push(newItem);
        }
    });

    saveCart(cart);

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
}

// Check if the browser is Chromium-based
function isChromiumBased() {
    const userAgent = navigator.userAgent;
    return /Chrome|Chromium|Edg/.test(userAgent) && !/Firefox/.test(userAgent);
}

function getCart() {
    if (isChromiumBased()) {
        // Retrieve from localStorage if Chromium-based browser
        const cart = localStorage.getItem("shoppingCart");
        return cart ? JSON.parse(cart) : [];
    } else {
        // Retrieve from cookies otherwise
        const cookies = document.cookie.split("; ");
        const cartCookie = cookies.find(row => row.startsWith("shoppingCart="));
        return cartCookie ? JSON.parse(cartCookie.split("=")[1]) : [];
    }
}

function saveCart(cart) {
    if (isChromiumBased()) {
        // Save to localStorage if Chromium-based browser
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    } else {
        // Save to cookies otherwise
        const cartJSON = JSON.stringify(cart);
        document.cookie = `shoppingCart=${cartJSON}; path=/; max-age=86400; SameSite=Lax;`;
    }
}

function displayCartItems() {
    const cart = getCart();
    const cartContainer = document.querySelector(".cart-container");

    if (!cartContainer) {
        console.info("Cart container element not found.");
        return;
    }

    cartContainer.innerHTML = '';
    let totalPrice = 0;

    if (!cart || cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        const totalPriceElement = document.querySelector(".total-price h2");
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: $0 CAD`;
        }
        return;
    }

    // Create a button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Add the checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'checkout-button';
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = () => handleCheckout(totalPrice);
    buttonContainer.appendChild(checkoutButton);

    // Add the clear cart button
    const clearCartButton = document.createElement('button');
    clearCartButton.className = 'clear-cart-button';
    clearCartButton.textContent = 'Clear Cart';
    clearCartButton.onclick = () => clearCart();
    buttonContainer.appendChild(clearCartButton);

    // Append the button container to the cart
    cartContainer.appendChild(buttonContainer);

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.cartImage}" alt="${item.name}">
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
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: $${totalPrice} CAD`;
    }
}

function handleCheckout(totalPrice) {
    // Lock scrolling
    document.body.style.overflow = 'hidden';

    // Create the checkout modal
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.innerHTML = `
        <div class="checkout-modal-content">
            <h2>Checkout</h2>
            <p>Total Price: $${totalPrice} CAD</p>
            <button id="pay-button">Pay</button>
            <button id="cancel-button">Cancel</button>
        </div>
    `;
    document.body.appendChild(checkoutModal);

    // Add event listeners for the buttons
    document.getElementById('pay-button').addEventListener('click', () => {
        // Remove the checkout modal
        document.body.removeChild(checkoutModal);

        // Create the thank-you and review modal
        const thankYouModal = document.createElement('div');
        thankYouModal.className = 'checkout-modal';
        thankYouModal.innerHTML = `
            <div class="checkout-modal-content">
                <h2>Thank You for Your Order!</h2>
                <p>Your order has been successfully placed. We appreciate your support!</p>
                <h3>But Wait!</h3>
                <p>We'd love to hear your thoughts! Please leave us a review and make our day brighter 🌟.</p>
                <textarea id="review-text" placeholder="Write your review here..." rows="4" style="width: 100%; margin-top: 10px;"></textarea>
                <div style="margin-top: 20px;">
                    <button id="submit-review-button">Submit Review</button>
                    <button id="skip-review-button">Skip Review</button>
                </div>
            </div>
        `;
        document.body.appendChild(thankYouModal);
        
        // Handle review submission
        document.getElementById('submit-review-button').addEventListener('click', () => {
            const reviewText = document.getElementById('review-text').value;

            // Create a styled notification modal
            const notificationModal = document.createElement('div');
            notificationModal.className = 'checkout-modal';
            notificationModal.innerHTML = `
                <div class="checkout-modal-content">
                    <h2>${reviewText.trim() ? "Thank you for your feedback!" : "No review? That's okay, we still appreciate you!"}</h2>
                    <p>${reviewText.trim() ? "Your thoughts mean a lot to us!" : "Have a great day!"}</p>
                </div>
            `;
            document.body.appendChild(notificationModal);

            // Add event listener to close on click
            notificationModal.addEventListener('click', () => {
                document.body.removeChild(notificationModal);
                // Unlock scrolling
                document.body.style.overflow = '';
            });

            // Automatically remove the modal after 5 seconds
            setTimeout(() => {
                if (document.body.contains(notificationModal)) {
                    document.body.removeChild(notificationModal);
                    // Unlock scrolling
                    document.body.style.overflow = '';
                }
            }, 5000);

            // Remove the thank-you modal
            document.body.removeChild(thankYouModal);
        });

        // Handle skipping the review
        document.getElementById('skip-review-button').addEventListener('click', () => {
            document.body.removeChild(thankYouModal);
            // Unlock scrolling
            document.body.style.overflow = '';
        });

        // Clear the cart
        clearCart();
    });

    document.getElementById('cancel-button').addEventListener('click', () => {
        // Remove the checkout modal
        document.body.removeChild(checkoutModal);

        // Unlock scrolling
        document.body.style.overflow = '';
    });
}

function clearCart() {
    if (isChromiumBased()) {
        // Clear from localStorage
        localStorage.removeItem("shoppingCart");
    } else {
        // Clear from cookies
        document.cookie = "shoppingCart=; path=/; max-age=0; SameSite=Lax;";
    }

    displayCartItems();
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
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCartItems();
}

function increaseQuantity(index) {
    const cart = getCart();
    cart[index].quantity += 1;
    saveCart(cart);
    displayCartItems();
}

function decreaseQuantity(index) {
    const cart = getCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart(cart);
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
        cartImage: "../database/cartImages/jackets/j0.png",
        rating: 4
    },
    {
        id: "jacket1",
        name: "Modern Trim Jacket",
        type: "jacket",
        color: "Grey",
        price: 180,
        image: "../database/images/jackets/j1.png",
        cartImage: "../database/cartImages/jackets/j1.png",
        rating: 5
    },
    {
        id: "jacket2",
        name: "Jetted Jacket",
        type: "jacket",
        color: "Blue",
        price: 160,
        image: "../database/images/jackets/j2.png",
        cartImage: "../database/cartImages/jackets/j2.png",
        rating: 2
    },
    {
        id: "jacket3",
        name: "Center Vent Jacket",
        type: "jacket",
        color: "Brown",
        price: 200,
        image: "../database/images/jackets/j3.png",
        cartImage: "../database/cartImages/jackets/j3.png",
        rating: 3
    },
    {
        id: "jacket4",
        name: "Tailored Jacket",
        type: "jacket",
        color: "Black",
        price: 220,
        image: "../database/images/jackets/j4.png",
        cartImage: "../database/cartImages/jackets/j4.png",
        rating: 4
    },
    {
        id: "jacket5",
        name: "Classic Jacket",
        type: "jacket",
        color: "Black",
        price: 110,
        image: "../database/images/jackets/j5.png",
        cartImage: "../database/cartImages/jackets/j5.png",
        rating: 5
    },
    {
        id: "jacket6",
        name: "Slim Trim Jacket",
        type: "jacket",
        color: "Grey",
        price: 80,
        image: "../database/images/jackets/j6.png",
        cartImage: "../database/cartImages/jackets/j6.png",
        rating: 2
    },
    {
        id: "jacket7",
        name: "Modern Trim Jacket",
        type: "jacket",
        color: "Blue",
        price: 300,
        image: "../database/images/jackets/j7.png",
        cartImage: "../database/cartImages/jackets/j7.png",
        rating: 3
    },
    {
        id: "jacket8",
        name: "Jetted Jacket",
        type: "jacket",
        color: "Brown",
        price: 170,
        image: "../database/images/jackets/j8.png",
        cartImage: "../database/cartImages/jackets/j8.png",
        rating: 4
    },
];

// Pants Database
const pantsDatabase = [
    {
        id: "pant0",
        name: "Slim Trim Pant",
        type: "pant",
        color: "Grey",
        price: 80,
        image: "../database/images/pants/p0.png",
        cartImage: "../database/cartImages/pants/p0.png",
        rating: 5
    },
    {
        id: "pant1",
        name: "Modern Trim Pant",
        type: "pant",
        color: "Beige",
        price: 100,
        image: "../database/images/pants/p1.png",
        cartImage: "../database/cartImages/pants/p1.png",
        rating: 4
    },
    {
        id: "pant2",
        name: "Jetted Pant",
        type: "pant",
        color: "Red",
        price: 75,
        image: "../database/images/pants/p2.png",
        cartImage: "../database/cartImages/pants/p2.png",
        rating: 3
    },
    {
        id: "pant3",
        name: "Formal Pant",
        type: "pant",
        color: "Black",
        price: 100,
        image: "../database/images/pants/p3.png",
        cartImage: "../database/cartImages/pants/p3.png",
        rating: 5
    },
    {
        id: "pant4",
        name: "Casual Pant",
        type: "pant",
        color: "Blue",
        price: 80,
        image: "../database/images/pants/p4.png",
        cartImage: "../database/cartImages/pants/p4.png",
        rating: 5
    },
    {
        id: "pant5",
        name: "Modern Trim Pant",
        type: "pant",
        color: "Coral",
        price: 90,
        image: "../database/images/pants/p5.png",
        cartImage: "../database/cartImages/pants/p5.png",
        rating: 2
    },
    {
        id: "pant6",
        name: "Fun Jetted Pant",
        type: "pant",
        color: "Pink",
        price: 75,
        image: "../database/images/pants/p6.png",
        cartImage: "../database/cartImages/pants/p6.png",
        rating: 4
    },
];

// Shirts Database
const shirtsDatabase = [
    {
        id: "shirt0",
        name: "Slim Trim Shirt",
        type: "shirt",
        color: "Black",
        price: 50,
        image: "../database/images/shirts/s0.png",
        cartImage: "../database/cartImages/shirts/s0.png",
        rating: 2
    },
    {
        id: "shirt1",
        name: "Modern Trim Shirt",
        type: "shirt",
        color: "Grey",
        price: 30,
        image: "../database/images/shirts/s1.png",
        cartImage: "../database/cartImages/shirts/s1.png",
        rating: 3
    },
    {
        id: "shirt2",
        name: "Jetted Shirt",
        type: "shirt",
        color: "Blue",
        price: 55,
        image: "../database/images/shirts/s2.png",
        cartImage: "../database/cartImages/shirts/s2.png",
        rating: 4
    },
    {
        id: "shirt3",
        name: "Center Vent Shirt",
        type: "shirt",
        color: "Brown",
        price: 50,
        image: "../database/images/shirts/s3.png",
        cartImage: "../database/cartImages/shirts/s3.png",
        rating: 5
    },
    {
        id: "shirt4",
        name: "Tailored Shirt",
        type: "shirt",
        color: "Black",
        price: 60,
        image: "../database/images/shirts/s4.png",
        cartImage: "../database/cartImages/shirts/s4.png",
        rating: 2
    },
    {
        id: "shirt5",
        name: "Classic Shirt",
        type: "shirt",
        color: "Black",
        price: 30,
        image: "../database/images/shirts/s5.png",
        cartImage: "../database/cartImages/shirts/s5.png",
        rating: 3
    },
    {
        id: "shirt6",
        name: "Slim Trim Shirt",
        type: "shirt",
        color: "Grey",
        price: 50,
        image: "../database/images/shirts/s6.png",
        cartImage: "../database/cartImages/shirts/s6.png",
        rating: 4
    },
    {
        id: "shirt7",
        name: "Modern Trim Shirt",
        type: "shirt",
        color: "Blue",
        price: 40,
        image: "../database/images/shirts/s7.png",
        cartImage: "../database/cartImages/shirts/s7.png",
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
        price: 120,
        image: "../database/images/shoes/f0.png",
        cartImage: "../database/cartImages/shoes/f0.png",
        rating: 4
    },
    {
        id: "shoe1",
        name: "Modern Trim Shoe",
        type: "shoe",
        color: "Grey",
        price: 80,
        image: "../database/images/shoes/f1.png",
        cartImage: "../database/cartImages/shoes/f1.png",
        rating: 5
    },
    {
        id: "shoe2",
        name: "Jetted Shoe",
        type: "shoe",
        color: "Blue",
        price: 100,
        image: "../database/images/shoes/f2.png",
        cartImage: "../database/cartImages/shoes/f2.png",
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
        cartImage: "../database/cartImages/ties/t0.png",
        rating: 3
    },
    {
        id: "tie1",
        name: "Modern Trim Tie",
        type: "tie",
        color: "Grey",
        price: 50,
        image: "../database/images/ties/t1.png",
        cartImage: "../database/cartImages/ties/t1.png",
        rating: 4
    },
    {
        id: "tie2",
        name: "Jetted Tie",
        type: "tie",
        color: "Blue",
        price: 65,
        image: "../database/images/ties/t2.png",
        cartImage: "../database/cartImages/ties/t2.png",
        rating: 5
    },
    {
        id: "tie3",
        name: "Center Vent Tie",
        type: "tie",
        color: "Brown",
        price: 40,
        image: "../database/images/ties/t3.png",
        cartImage: "../database/cartImages/ties/t3.png",
        rating: 2
    },
    {
        id: "tie4",
        name: "Tailored Tie",
        type: "tie",
        color: "Black",
        price: 30,
        image: "../database/images/ties/t4.png",
        cartImage: "../database/cartImages/ties/t4.png",
        rating: 3
    },
    {
        id: "tie5",
        name: "Classic Tie",
        type: "tie",
        color: "Black",
        price: 90,
        image: "../database/images/ties/t5.png",
        cartImage: "../database/cartImages/ties/t5.png",
        rating: 4
    },
    {
        id: "tie6",
        name: "Slim Trim Tie",
        type: "tie",
        color: "Grey",
        price: 25,
        image: "../database/images/ties/t6.png",
        cartImage: "../database/cartImages/ties/t6.png",
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

function notImplemented() {
    // Show the popup
    const popup = document.createElement('div');
    popup.className = 'unimplemented-popup';
    popup.textContent = 'Feature Not Implemented!';

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
}