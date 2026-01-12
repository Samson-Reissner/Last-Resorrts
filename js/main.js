// main.js - SIMPLE WORKING VERSION
const products = [
    { id: 1, name: "Dell Latitude Laptop", price: 450000, image: "💻" },
    { id: 2, name: "iPhone 14 Pro", price: 850000, image: "📱" },
    { id: 3, name: "Wireless Mouse", price: 15000, image: "🖱️" },
    { id: 4, name: "Laptop Repair Service", price: 25000, image: "🔧" }
];

// ADD TO CART - SIMPLE VERSION
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price, // NUMBER, not string
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featured-products');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <div class="product-price">MWK ${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    updateCartCount();
});
// ADD THIS TO YOUR MAIN.JS - Products page specific functions

// Function to get product by ID (for products page)
function getProductById(productId) {
    const products = [
        { id: 1, name: "Dell Latitude Laptop", price: 450000, image: "💻" },
        { id: 2, name: "iPhone 14 Pro", price: 850000, image: "📱" },
        { id: 3, name: "Wireless Mouse", price: 15000, image: "🖱️" },
        { id: 4, name: "Laptop Repair Service", price: 25000, image: "🔧" },
        { id: 5, name: "Laptop Screen Replacement", price: 75000, image: "💻" },
        { id: 6, name: "Phone Battery Replacement", price: 35000, image: "📱" },
        { id: 7, name: "Computer Virus Removal", price: 20000, image: "🛡️" },
        { id: 8, name: "Data Recovery Service", price: 50000, image: "💾" }
    ];
    return products.find(p => p.id === productId);
}

// PROPER addToCart function for products page
function addToCartFromProducts(productId, productName, productPrice, productImage) {
    console.log("Adding to cart:", { productId, productName, productPrice, productImage });
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice, // ACTUAL PRICE
            image: productImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert(`${productName} added to cart!\nPrice: MWK ${productPrice.toLocaleString()}`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
    }
}
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Cart count update (if you have cart functionality)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);