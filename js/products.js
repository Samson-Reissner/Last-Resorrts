// Extensive product database
const products = [
    // ===== PHONES =====
    // Samsung Phones
    {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "phones",
        subcategory: "samsung",
        price: "MWK 1,200,000",
        specs: "6.8\" Display, 12GB RAM, 512GB Storage, 200MP Camera",
        image: "📱",
        type: "Smartphone"
    },
    {
        id: 2,
        name: "Samsung Galaxy Z Fold5",
        brand: "Samsung",
        category: "phones",
        subcategory: "samsung",
        price: "MWK 1,800,000",
        specs: "Foldable 7.6\" Display, 12GB RAM, 1TB Storage, Triple Camera",
        image: "📱",
        type: "Foldable"
    },
    {
        id: 3,
        name: "Samsung Galaxy A54",
        brand: "Samsung",
        category: "phones",
        subcategory: "samsung",
        price: "MWK 450,000",
        specs: "6.4\" Display, 8GB RAM, 256GB Storage, 50MP Camera",
        image: "📱",
        type: "Mid-range"
    },

    // iPhone Phones
    {
        id: 4,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        category: "phones",
        subcategory: "iphone",
        price: "MWK 2,100,000",
        specs: "6.7\" Super Retina, 8GB RAM, 1TB Storage, 48MP Camera",
        image: "📱",
        type: "Flagship"
    },
    {
        id: 5,
        name: "iPhone 14",
        brand: "Apple",
        category: "phones",
        subcategory: "iphone",
        price: "MWK 1,100,000",
        specs: "6.1\" Display, 6GB RAM, 128GB Storage, Dual 12MP Camera",
        image: "📱",
        type: "Previous Generation"
    },
    {
        id: 6,
        name: "iPhone SE (3rd Gen)",
        brand: "Apple",
        category: "phones",
        subcategory: "iphone",
        price: "MWK 650,000",
        specs: "4.7\" Retina HD, 4GB RAM, 128GB Storage, 12MP Camera",
        image: "📱",
        type: "Compact"
    },

    // Google Pixel Phones
    {
        id: 7,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        category: "phones",
        subcategory: "google-pixel",
        price: "MWK 1,300,000",
        specs: "6.7\" Display, 12GB RAM, 512GB Storage, 50MP Camera",
        image: "📱",
        type: "Flagship"
    },
    {
        id: 8,
        name: "Google Pixel 7a",
        brand: "Google",
        category: "phones",
        subcategory: "google-pixel",
        price: "MWK 550,000",
        specs: "6.1\" Display, 8GB RAM, 128GB Storage, 64MP Camera",
        image: "📱",
        type: "Mid-range"
    },
    {
        id: 9,
        name: "Google Pixel Fold",
        brand: "Google",
        category: "phones",
        subcategory: "google-pixel",
        price: "MWK 1,700,000",
        specs: "Foldable 7.6\" Display, 12GB RAM, 512GB Storage",
        image: "📱",
        type: "Foldable"
    },

    // ===== PCs & LAPTOPS =====
    // DELL Computers
    {
        id: 10,
        name: "Dell XPS 13 Laptop",
        brand: "Dell",
        category: "pcs",
        subcategory: "dell",
        price: "MWK 1,500,000",
        specs: "13.4\" FHD, Intel i7, 16GB RAM, 512GB SSD",
        image: "💻",
        type: "Laptop"
    },
    {
        id: 11,
        name: "Dell OptiPlex Desktop",
        brand: "Dell",
        category: "pcs",
        subcategory: "dell",
        price: "MWK 850,000",
        specs: "Intel i5, 8GB RAM, 256GB SSD, Windows 11 Pro",
        image: "🖥️",
        type: "Desktop"
    },
    {
        id: 12,
        name: "Dell Alienware Gaming PC",
        brand: "Dell",
        category: "pcs",
        subcategory: "dell",
        price: "MWK 3,200,000",
        specs: "Intel i9, RTX 4080, 32GB RAM, 1TB SSD",
        image: "🖥️",
        type: "Gaming Desktop"
    },

    // MACBOOK Computers
    {
        id: 13,
        name: "MacBook Pro 16\"",
        brand: "Apple",
        category: "pcs",
        subcategory: "macbook",
        price: "MWK 4,500,000",
        specs: "M3 Pro, 36GB RAM, 1TB SSD, Liquid Retina XDR",
        image: "💻",
        type: "Laptop"
    },
    {
        id: 14,
        name: "MacBook Air 15\"",
        brand: "Apple",
        category: "pcs",
        subcategory: "macbook",
        price: "MWK 2,800,000",
        specs: "M2 Chip, 16GB RAM, 512GB SSD, Retina Display",
        image: "💻",
        type: "Laptop"
    },
    {
        id: 15,
        name: "iMac 24\"",
        brand: "Apple",
        category: "pcs",
        subcategory: "macbook",
        price: "MWK 3,100,000",
        specs: "M3 Chip, 16GB RAM, 512GB SSD, 4.5K Display",
        image: "🖥️",
        type: "All-in-One"
    },

    // Lenovo ThinkPad Computers
    {
        id: 16,
        name: "ThinkPad X1 Carbon",
        brand: "Lenovo",
        category: "pcs",
        subcategory: "lenovo",
        price: "MWK 1,800,000",
        specs: "14\" WUXGA, Intel i7, 16GB RAM, 1TB SSD",
        image: "💻",
        type: "Business Laptop"
    },
    {
        id: 17,
        name: "ThinkStation P350",
        brand: "Lenovo",
        category: "pcs",
        subcategory: "lenovo",
        price: "MWK 1,200,000",
        specs: "Intel i7, 16GB RAM, 512GB SSD, NVIDIA T400",
        image: "🖥️",
        type: "Workstation"
    },
    {
        id: 18,
        name: "ThinkPad T14s",
        brand: "Lenovo",
        category: "pcs",
        subcategory: "lenovo",
        price: "MWK 1,400,000",
        specs: "14\" FHD, AMD Ryzen 7, 16GB RAM, 512GB SSD",
        image: "💻",
        type: "Business Laptop"
    },

    // HP Computers
    {
        id: 19,
        name: "HP Spectre x360",
        brand: "HP",
        category: "pcs",
        subcategory: "hp",
        price: "MWK 1,600,000",
        specs: "13.5\" OLED, Intel i7, 16GB RAM, 1TB SSD",
        image: "💻",
        type: "2-in-1 Laptop"
    },
    {
        id: 20,
        name: "HP Omen Gaming Desktop",
        brand: "HP",
        category: "pcs",
        subcategory: "hp",
        price: "MWK 2,800,000",
        specs: "Intel i7, RTX 4070, 32GB RAM, 1TB SSD",
        image: "🖥️",
        type: "Gaming Desktop"
    },
    {
        id: 21,
        name: "HP EliteDesk 800 G9",
        brand: "HP",
        category: "pcs",
        subcategory: "hp",
        price: "MWK 950,000",
        specs: "Intel i5, 8GB RAM, 256GB SSD, Windows 11 Pro",
        image: "🖥️",
        type: "Business Desktop"
    },

    // ===== ACCESSORIES =====
    // Phone Accessories
    {
        id: 22,
        name: "Samsung Galaxy Case",
        brand: "Samsung",
        category: "accessories",
        subcategory: "phone-accessories",
        price: "MWK 25,000",
        specs: "Protective case with kickstand, clear design",
        image: "📱",
        type: "Phone Case"
    },
    {
        id: 23,
        name: "Apple AirPods Pro",
        brand: "Apple",
        category: "accessories",
        subcategory: "phone-accessories",
        price: "MWK 350,000",
        specs: "Active Noise Cancellation, Spatial Audio",
        image: "🎧",
        type: "Wireless Earbuds"
    },
    {
        id: 24,
        name: "Google Pixel Stand",
        brand: "Google",
        category: "accessories",
        subcategory: "phone-accessories",
        price: "MWK 85,000",
        specs: "Wireless Charger with fast charging support",
        image: "⚡",
        type: "Wireless Charger"
    },

    // PC Accessories
    {
        id: 25,
        name: "Dell Wireless Keyboard & Mouse",
        brand: "Dell",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 45,000",
        specs: "Quiet keyboard and precision mouse combo",
        image: "⌨️",
        type: "Keyboard & Mouse"
    },
    {
        id: 26,
        name: "HP 24-inch Monitor",
        brand: "HP",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 180,000",
        specs: "Full HD IPS display, 75Hz refresh rate",
        image: "🖥️",
        type: "Monitor"
    },
    {
        id: 27,
        name: "Lenovo USB-C Dock",
        brand: "Lenovo",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 120,000",
        specs: "Dual 4K display support, 10 ports",
        image: "🔌",
        type: "Docking Station"
    },
    {
        id: 28,
        name: "Logitech MX Master 3S",
        brand: "Logitech",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 95,000",
        specs: "Wireless mouse, 8K DPI, ergonomic design",
        image: "🖱️",
        type: "Mouse"
    },
    {
        id: 29,
        name: "Samsung T7 SSD 1TB",
        brand: "Samsung",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 150,000",
        specs: "Portable SSD, USB 3.2, 1050MB/s read speed",
        image: "💾",
        type: "External Storage"
    },
    {
        id: 30,
        name: "Apple Magic Keyboard",
        brand: "Apple",
        category: "accessories",
        subcategory: "pc-accessories",
        price: "MWK 120,000",
        specs: "Wireless keyboard with numeric keypad",
        image: "⌨️",
        type: "Keyboard"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    setupEventListeners();
    updateCartCount();
});

function loadAllProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = generateProductsHTML(products);
}

function generateProductsHTML(productsArray) {
    if (productsArray.length === 0) {
        return '<div class="no-products"><h3>No products found</h3><p>Try adjusting your search or filters</p></div>';
    }

    return productsArray.map(product => `
        <div class="product-card" data-category="${product.category}" data-subcategory="${product.subcategory}">
            <div class="product-image">
                <span>${product.image}</span>
                <div class="product-category">${product.type}</div>
            </div>
            <div class="product-content">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-specs">${product.specs}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-outline" onclick="viewProduct(${product.id})">Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

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
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
    });
}

function filterProducts(category) {
    let filteredProducts;
    
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = generateProductsHTML(filteredProducts);
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        loadAllProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.specs.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = generateProductsHTML(filteredProducts);
}

function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
            break;
    }
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = generateProductsHTML(sortedProducts);
}

function extractPrice(priceString) {
    // Convert "MWK 1,200,000" to 1200000 (number)
    if (typeof priceString === 'number') return priceString;
    if (typeof priceString !== 'string') return 0;
    
    // Remove all non-digit characters except decimal point
    const numericString = priceString.replace(/[^\d]/g, '');
    return parseInt(numericString) || 0;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // FIX: Convert price string to number and store only what cart needs
        cart.push({
            id: product.id,
            name: product.name,
            price: extractPrice(product.price), // Convert "MWK 1,200,000" to 1200000
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`Viewing details for ${product.name}`);
        // In a real app, this would navigate to a product detail page
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}