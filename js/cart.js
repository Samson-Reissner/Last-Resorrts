// cart.js - FIXED VERSION

// Get cart from localStorage
function getCart() {
    const cartData = localStorage.getItem('cart');
    
    if (!cartData) return [];
    
    try {
        const cart = JSON.parse(cartData);
        
        // FIX: Ensure all prices and quantities are numbers and IDs are consistent
        cart.forEach(item => {
            if (item) {
                item.price = Number(item.price) || 0;
                item.quantity = Number(item.quantity) || 1;
                // Ensure ID is a number for comparison
                item.id = Number(item.id) || item.id;
            }
        });
        
        return cart;
    } catch (error) {
        console.error("Error parsing cart:", error);
        return [];
    }
}

// Load cart items on cart page
function loadCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    const cart = getCart();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="../pages/products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        updateCartSummary(0);
        updateCartCount();
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // FIX: Properly display image
        // If item.image is a full URL, extract just the filename
        let imagePath = '';
        if (item.image) {
            // Check if it's a full URL
            if (item.image.includes('http://') || item.image.includes('https://') || item.image.includes('127.0.0.1')) {
                // Extract just the filename
                const filename = item.image.split('/').pop();
                imagePath = `../images/${filename}`;
            } else {
                // It's already a relative path
                imagePath = item.image;
            }
        }
        
        const imageHTML = imagePath ? 
            `<img src="${imagePath}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : 
            '📱';

        html += `
            <div class="cart-item">
                <div class="item-image">${imageHTML}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">MWK ${item.price.toLocaleString()}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <div class="item-total" id="total-${item.id}">MWK ${itemTotal.toLocaleString()}</div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
    });

    container.innerHTML = html;
    updateCartSummary(subtotal);
    updateCartCount();
}

// Update item quantity - FIXED VERSION
function updateQuantity(productId, change) {
    console.log(`Updating quantity for ${productId} by ${change}`);
    
    const cart = getCart();
    const item = cart.find(item => String(item.id) === String(productId));
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update just the quantity and total for this item
            const quantitySpan = document.getElementById(`quantity-${productId}`);
            const totalSpan = document.getElementById(`total-${productId}`);
            
            if (quantitySpan) {
                quantitySpan.textContent = item.quantity;
            }
            if (totalSpan) {
                const itemTotal = item.price * item.quantity;
                totalSpan.textContent = `MWK ${itemTotal.toLocaleString()}`;
            }
            
            // Recalculate and update summary
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            updateCartSummary(subtotal);
            updateCartCount();
        }
    }
}

// Remove item from cart - FIXED VERSION
function removeFromCart(productId) {
    console.log(`Removing item ${productId}`);
    
    const cart = getCart();
    // FIX: Use String comparison to ensure IDs match correctly
    const updatedCart = cart.filter(item => String(item.id) !== String(productId));
    
    console.log(`Original cart had ${cart.length} items, new cart has ${updatedCart.length} items`);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems(); // Reload the entire cart display
}

// Update cart summary
function updateCartSummary(subtotal) {
    const shipping = subtotal > 0 ? 5000 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) {
        subtotalEl.textContent = `MWK ${subtotal.toLocaleString()}`;
    }
    if (totalEl) {
        totalEl.textContent = `MWK ${total.toLocaleString()}`;
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Checkout function
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5000;
    const total = subtotal + shipping;
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Add event listener for checkout button
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    
    // Add click event to checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            checkout();
        });
    }
});

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;