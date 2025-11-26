document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutItems();
    setupPaymentMethodToggle();
    setupCheckoutForm();
    updateCartCount();
});

function loadCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('subtotal');
    const grandTotalElement = document.getElementById('grand-total');
    
    if (checkoutItems && cart.length > 0) {
        let subtotal = 0;
        
        checkoutItems.innerHTML = cart.map(item => {
            // Extract numeric price from string like "MWK 450,000"
            const price = parseInt(item.price.replace(/[^\d]/g, ''));
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <span>${item.image}</span>
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        const shipping = 5000;
        const grandTotal = subtotal + shipping;
        
        // Format numbers with commas
        subtotalElement.textContent = `MWK ${subtotal.toLocaleString()}`;
        grandTotalElement.textContent = `MWK ${grandTotal.toLocaleString()}`;
    } else {
        checkoutItems.innerHTML = '<p>Your cart is empty</p>';
        subtotalElement.textContent = 'MWK 0';
        grandTotalElement.textContent = 'MWK 5,000';
    }
}

function setupPaymentMethodToggle() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const proofSection = document.getElementById('payment-proof-section');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.checked) {
                proofSection.style.display = 'block';
            }
        });
    });
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            const paymentProof = document.getElementById('payment-proof').files[0];
            
            if (!paymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            if (!paymentProof) {
                alert('Please upload payment proof screenshot');
                return;
            }
            
            // Simulate order processing
            const orderData = {
                customer: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    region: document.getElementById('region').value
                },
                payment: {
                    method: paymentMethod.value,
                    proof: paymentProof.name
                },
                items: cart,
                total: document.getElementById('grand-total').textContent,
                status: 'pending',
                date: new Date().toISOString()
            };
            
            // Save order to localStorage (in real app, send to backend)
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart
            localStorage.removeItem('cart');
            
            alert('Order placed successfully! Your payment is being verified.');
            window.location.href = '../index.html';
        });
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}