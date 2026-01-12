// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartCount();
    initializeCartButtons(); // New function for static products
});

function setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    console.log('🔍 Looking for sort select...');
    console.log('   - Found:', sortSelect);
    console.log('   - Has ID?', sortSelect?.id);
    console.log('   - Value:', sortSelect?.value);

    if (sortSelect) {
        console.log('✅ Sort select found, adding event listener');
        sortSelect.addEventListener('change', function() {
            console.log('🔄 Sort select changed to:', this.value);
            sortProducts(this.value);
        });
    } else {
        console.error('❌ Sort select NOT FOUND! Check HTML id="sort-select"');
    }
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = cardCategory === category ? 'flex' : 'none';
        }
    });
    
    // Show message if no products found
    showNoProductsMessage();
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');
    let foundProducts = false;
    
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const brand = card.querySelector('.product-brand').textContent.toLowerCase();
        const specs = card.querySelector('.product-specs').textContent.toLowerCase();
        
        if (searchTerm === '' || 
            title.includes(searchTerm) || 
            brand.includes(searchTerm) || 
            specs.includes(searchTerm)) {
            card.style.display = 'flex';
            foundProducts = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoProductsMessage();
}

function sortProducts(sortBy) {
    console.log('Sorting by:', sortBy);
    
    const productsGrid = document.querySelector('.products-grid') || document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }
    
    // Get ALL product cards (including hidden ones)
    const allCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    console.log('Total cards:', allCards.length);
    
    if (allCards.length === 0) {
        console.error('No product cards found!');
        return;
    }
    
    // Sort ALL cards
    allCards.sort((a, b) => {
        const aTitle = a.querySelector('.product-title')?.textContent?.trim() || '';
        const bTitle = b.querySelector('.product-title')?.textContent?.trim() || '';
        const aPrice = extractPriceFromCard(a);
        const bPrice = extractPriceFromCard(b);
        
        console.log(`Comparing: "${aTitle}" (${aPrice}) vs "${bTitle}" (${bPrice})`);
        
        if (sortBy === 'name') {
            return aTitle.localeCompare(bTitle);
        } else if (sortBy === 'price-low') {
            return aPrice - bPrice;
        } else if (sortBy === 'price-high') {
            return bPrice - aPrice;
        }
        return 0;
    });
    
    // Clear and re-add all cards
    productsGrid.innerHTML = '';
    allCards.forEach(card => {
        productsGrid.appendChild(card);
        console.log('Added:', card.querySelector('.product-title')?.textContent);
    });
    
    console.log(`Sorting complete! Sorted by: ${sortBy}`);
    // REMOVED THE ALERT LINE - No more popup message!
}

function extractPriceFromCard(card) {
    const priceElement = card.querySelector('.product-price');
    if (!priceElement) {
        console.warn('No price element found');
        return 0;
    }
    
    // Use innerHTML to handle discounted prices properly
    let priceHtml = priceElement.innerHTML;
    
    // Check if there's an old price (discounted product)
    if (priceHtml.includes('<span class="old-price">')) {
        // Get the current price (after the old price span)
        const parts = priceHtml.split('</span>');
        if (parts.length > 1) {
            priceHtml = parts[1].trim();
        }
    }
    
    // Clean the price string
    let priceText = priceHtml.replace(/<[^>]*>/g, ''); // Remove HTML tags
    priceText = priceText.replace('MWK', '').trim();
    
    // Extract numbers only
    const numericString = priceText.replace(/[^\d]/g, '');
    const priceNumber = parseInt(numericString) || 0;
    
    console.log(`💰 Price extracted: "${priceElement.textContent}" -> ${priceNumber}`);
    return priceNumber;
}

// Initialize cart buttons for static HTML products
function initializeCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productBrand = productCard.querySelector('.product-brand').textContent;
            const productImage = productCard.querySelector('.product-img').src;
            
            // Extract numeric price
            let priceText = productPrice;
            const oldPrice = productCard.querySelector('.old-price');
            if (oldPrice) {
                priceText = priceText.replace(oldPrice.textContent, '').trim();
            }
            const priceNumber = extractPriceFromText(priceText);
            
            // Add to cart
            addToCartStatic({
                name: productName,
                price: priceNumber,
                brand: productBrand,
                image: productImage,
                quantity: 1
            });
            
            showNotification(`Added ${productName} to cart!`);
        });
    });
}

function extractPriceFromText(priceText) {
    const numericString = priceText.replace(/[^\d]/g, '');
    return parseInt(numericString) || 0;
}

function addToCartStatic(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function showNotification(message) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        border-left: 5px solid #2E7D32;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function showNoProductsMessage() {
    const productCards = document.querySelectorAll('.product-card');
    let visibleCards = 0;
    
    productCards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCards++;
        }
    });
    
    // Remove existing message
    const existingMessage = document.querySelector('.no-products-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add message if no products visible
    if (visibleCards === 0) {
        const productsGrid = document.getElementById('products-grid');
        const message = document.createElement('div');
        message.className = 'no-products-message';
        message.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        productsGrid.appendChild(message);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}
