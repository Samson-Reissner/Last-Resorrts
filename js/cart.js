// cart.js - FIXED VERSION

// Get cart from localStorage
function getCart() {
    const cartData = localStorage.getItem('cart');
    console.log("Raw cart data from localStorage:", cartData);
    
    if (!cartData) return [];
    
    try {
        const cart = JSON.parse(cartData);
        console.log("Parsed cart:", cart);
        
        // FIX: Ensure all prices and quantities are numbers
        cart.forEach(item => {
            if (item) {
                item.price = Number(item.price) || 0;
                item.quantity = Number(item.quantity) || 1;
                console.log(`Fixed item: ${item.name}, price: ${item.price}, quantity: ${item.quantity}`);
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
    console.log("=== LOADING CART ITEMS ===");
    
    const container = document.getElementById('cart-items-container');
    if (!container) {
        console.error("Cart container not found!");
        return;
    }

    const cart = getCart();
    console.log("Cart after fix:", cart);
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        updateCartSummary(0);
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        console.log(`Processing: ${item.name}, price: ${item.price}, quantity: ${item.quantity}`);
        
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        console.log(`Item total: ${itemTotal}, Running subtotal: ${subtotal}`);

        html += `
            <div class="cart-item">
                <div class="item-image">${item.image || '📱'}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">MWK ${item.price.toLocaleString()}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="item-total">MWK ${itemTotal.toLocaleString()}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
    });

    console.log("FINAL SUBTOTAL:", subtotal);
    container.innerHTML = html;
    updateCartSummary(subtotal);
}

// Update item quantity
function updateQuantity(productId, change) {
    console.log(`Updating quantity for ${productId} by ${change}`);
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    console.log(`Removing item ${productId}`);
    
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems();
}

// Update cart summary
function updateCartSummary(subtotal) {
    console.log(`Updating summary with subtotal: ${subtotal}`);
    
    const shipping = subtotal > 0 ? 5000 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    console.log("Elements found - subtotalEl:", subtotalEl, "totalEl:", totalEl);

    if (subtotalEl) {
        subtotalEl.textContent = `MWK ${subtotal.toLocaleString()}`;
        console.log("Updated subtotal to:", subtotalEl.textContent);
    }
    if (totalEl) {
        totalEl.textContent = `MWK ${total.toLocaleString()}`;
        console.log("Updated total to:", totalEl.textContent);
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
    
    alert(`Proceeding to checkout!\n\nSubtotal: MWK ${subtotal.toLocaleString()}\nShipping: MWK ${shipping.toLocaleString()}\nTotal: MWK ${total.toLocaleString()}`);
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== CART PAGE LOADED ===");
    loadCartItems();
});

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;