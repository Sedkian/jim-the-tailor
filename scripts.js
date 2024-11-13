// Function to initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
    const jacketColorSelect = document.getElementById("jacket-color");
    const suitImage = document.getElementById("suit-image");

    // Set up event listener for jacket color change
    jacketColorSelect.addEventListener("change", updateSuitPreview);
});

// Function to update the suit preview color square
function updateSuitPreview() {
    const jacketColor = document.getElementById("jacket-color").value;
    const suitImage = document.getElementById("suit-image");

    // Set background color based on selected jacket color
    if (jacketColor === "navy") {
        suitImage.style.backgroundColor = "#000080"; // Navy blue
    } else if (jacketColor === "black") {
        suitImage.style.backgroundColor = "#000000"; // Black
    } else if (jacketColor === "grey") {
        suitImage.style.backgroundColor = "#808080"; // Grey
    }

    // Remove the image source and adjust styling to show the color square
    suitImage.src = ""; // Clear any existing image
    suitImage.style.width = "200px"; // Set the size of the color square
    suitImage.style.height = "200px";
    suitImage.style.display = "inline-block"; // Ensure it appears as a square
}

// Function to add item to cart
function addToCart() {
    // For now, just return true
    const success = true;

    if (success) {
        // Show popup
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 3000); // Hide after 3 seconds
    }

    return success;
}