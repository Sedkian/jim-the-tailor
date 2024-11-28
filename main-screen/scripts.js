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