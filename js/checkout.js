// Unique reference
const REFERENCE_NUMBER = 'REF-' + Date.now().toString().slice(-8);

window.onload = function() {
    // Get cart total
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 5000;
    
    if (cart.length > 0) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        total = subtotal + 5000;
    }
    
    // POPUP - TELL THEM TO SCREENSHOT
    alert(`📸 TAKE SCREENSHOT NOW!\n\nREFERENCE NUMBER:\n${REFERENCE_NUMBER}\n\n⚠️ IMPORTANT:\n1. SCREENSHOT THIS POPUP\n2. You'll upload it later\n3. Amount to pay: MWK ${total.toLocaleString()}\n\nClick OK to continue`);
    
    // Store reference in form (optional)
    setTimeout(() => {
        const refField = document.getElementById('reference-number');
        if (refField) refField.value = REFERENCE_NUMBER;
    }, 100);
};
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutItems();
    setupPaymentMethodToggle();
    setupCheckoutForm();
    updateCartCount();
    setupFilePreview();
});

function loadCheckoutItems() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('subtotal');
    const grandTotalElement = document.getElementById('grand-total');
    
    console.log("Checkout cart data:", cart);
    
    if (checkoutItems && cart.length > 0) {
        let subtotal = 0;
        
        checkoutItems.innerHTML = cart.map(item => {
            const price = item.price || 0;
            const itemTotal = price * (item.quantity || 1);
            subtotal += itemTotal;
            
            let imageHTML = item.image || '📱';
            if (item.image && typeof item.image === 'string') {
                if (item.image.includes('http://') || item.image.includes('https://')) {
                    const filename = item.image.split('/').pop();
                    imageHTML = `<img src="../images/${filename}" alt="${item.name}" 
                                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                } else if (item.image.includes('/images/')) {
                    imageHTML = `<img src="${item.image}" alt="${item.name}" 
                                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                }
            }
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${imageHTML}
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">MWK ${price.toLocaleString()}</div>
                        <div class="cart-item-quantity">Qty: ${item.quantity || 1}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        const shipping = subtotal > 0 ? 5000 : 0;
        const grandTotal = subtotal + shipping;
        
        // Update total displays
        if (subtotalElement) {
            subtotalElement.textContent = `MWK ${subtotal.toLocaleString()}`;
        }
        if (grandTotalElement) {
            grandTotalElement.textContent = `MWK ${grandTotal.toLocaleString()}`;
        }
        
        // Update payment amounts in payment instructions
        updatePaymentAmounts(grandTotal);
        
    } else {
        checkoutItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        if (subtotalElement) subtotalElement.textContent = 'MWK 0';
        if (grandTotalElement) grandTotalElement.textContent = 'MWK 5,000';
        updatePaymentAmounts(5000); // Default shipping only
    }
}

function updatePaymentAmounts(amount) {
    // Update Airtel Money
    document.getElementById('airtel-amount').textContent = `MWK ${amount.toLocaleString()}`;
    
    // Update TNM Mpamba
    document.getElementById('mpamba-amount').textContent = `MWK ${amount.toLocaleString()}`;
    
    // Update NATIONAL BANK (BOTH versions)
    document.getElementById('natsave-amount-app').textContent = `MWK ${amount.toLocaleString()}`;
    document.getElementById('natsave-amount-ussd').textContent = `MWK ${amount.toLocaleString()}`;
}

function setupPaymentMethodToggle() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.getElementById('payment-details');
    const proofSection = document.getElementById('payment-proof-section');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.checked) {
                // Show payment details section
                paymentDetails.style.display = 'block';
                proofSection.style.display = 'block';
                
                // Hide all payment method details
                document.querySelectorAll('.payment-method-details').forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Show selected payment method details
                const selectedMethod = this.value;
                document.getElementById(`${selectedMethod}-details`).style.display = 'block';
                
                // Update the file upload label
                const proofInput = document.getElementById('payment-proof');
                if (selectedMethod === 'natsave') {
                    proofInput.setAttribute('accept', 'image/*,.pdf');
                } else {
                    proofInput.setAttribute('accept', 'image/*');
                }
            }
        });
    });
}

function setupFilePreview() {
    const fileInput = document.getElementById('payment-proof');
    const previewContainer = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                // Check file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File is too large! Maximum size is 5MB.');
                    this.value = '';
                    previewContainer.style.display = 'none';
                    return;
                }
                
                // Check file type
                const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, PNG, or PDF files.');
                    this.value = '';
                    previewContainer.style.display = 'none';
                    return;
                }
                
                // Show preview for images
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        previewContainer.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                } else if (file.type === 'application/pdf') {
                    // For PDF, show PDF icon
                    previewImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="%232563eb" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm1 5v-2h-2v2H9v2h2v2h2v-2h2v-2h-2z"/></svg>';
                    previewImage.alt = 'PDF Document';
                    previewContainer.style.display = 'block';
                }
            } else {
                previewContainer.style.display = 'none';
            }
        });
    }
}

function getCart() {
    const cartData = localStorage.getItem('cart');
    
    if (!cartData) return [];
    
    try {
        const cart = JSON.parse(cartData);
        
        cart.forEach(item => {
            if (item) {
                item.price = Number(item.price) || 0;
                item.quantity = Number(item.quantity) || 1;
                item.id = Number(item.id) || item.id;
            }
        });
        
        return cart;
    } catch (error) {
        console.error("Error parsing cart:", error);
        return [];
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            const paymentProofInput = document.getElementById('payment-proof');
            const paymentProof = paymentProofInput ? paymentProofInput.files[0] : null;
            
            if (!paymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            if (!paymentProof) {
                alert('Please upload payment proof');
                return;
            }
            
            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 5000;
            const total = subtotal + shipping;
            
            // Generate order number
            const orderNumber = 'ORD-' + Date.now();
            
            // Show final confirmation with payment details
            const paymentDetails = {
                'airtel': {
                    name: 'Airtel Money',
                    account: '0993 456 789'
                },
                'mpamba': {
                    name: 'TNM Mpamba', 
                    account: '0888 123 456'
                },
                'natsave': {
                    name: 'NATIONAL BANK',
                    account: '1000 2345 6789'
                }
            };
            
            const selectedPayment = paymentDetails[paymentMethod.value];
            
            const confirmMessage = `
Order Summary:
---------------
Order Number: ${orderNumber}
Total Amount: MWK ${total.toLocaleString()}

Payment Instructions:
----------------------
Method: ${selectedPayment.name}
Account: ${selectedPayment.account}
Amount: MWK ${total.toLocaleString()}

Please ensure you have:
1. Paid to the account above
2. Uploaded payment proof
3. Used order number as reference

Click OK to complete your order.
            `;
            
            if (confirm(confirmMessage)) {
                // Process order
                const orderData = {
                    orderNumber: orderNumber,
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
                        methodName: selectedPayment.name,
                        account: selectedPayment.account,
                        proof: paymentProof.name,
                        amount: total
                    },
                    items: cart,
                    subtotal: subtotal,
                    shipping: shipping,
                    total: total,
                    status: 'pending',
                    date: new Date().toISOString()
                };

                console.log("Order placed:", orderData);

                // Save order
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(orderData);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Clear cart
                localStorage.removeItem('cart');
                updateCartCount();
                
                alert(`Order placed successfully!\n\nOrder Number: ${orderNumber}\nWe will verify your payment within 24 hours.\nThank you for shopping with Last Resorts!`);
                window.location.href = '../index.html';
            }
        });
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
    }
}