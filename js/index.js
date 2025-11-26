// Extensive product database with 50+ products
const featuredProducts = [
    // Premium Phones (15 products)
    {
        id: 1,
        name: "iPhone 15 Pro Max 1TB",
        brand: "APPLE",
        category: "phones",
        price: "MWK 2,800,000",
        oldPrice: "MWK 3,200,000",
        specs: "6.7\" Super Retina, A17 Pro, 1TB, Titanium",
        image: "📱",
        badge: "exclusive",
        exclusive: "Only at Last Resorts - Limited Stock!"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "SAMSUNG",
        category: "phones",
        price: "MWK 1,950,000",
        specs: "6.8\" Dynamic AMOLED, Snapdragon 8 Gen 3, 512GB",
        image: "📱",
        badge: "new",
        exclusive: "Only at Last Resorts - AI Powered!"
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        brand: "GOOGLE",
        category: "phones",
        price: "MWK 1,650,000",
        specs: "6.7\" OLED, Tensor G3, 12GB RAM, 256GB",
        image: "📱",
        badge: "discount",
        exclusive: "Only at Last Resorts - Best Camera!"
    },
    {
        id: 4,
        name: "OnePlus 12",
        brand: "ONEPLUS",
        category: "phones",
        price: "MWK 1,200,000",
        specs: "6.82\" LTPO, Snapdragon 8 Gen 3, 16GB RAM",
        image: "📱",
        badge: "new"
    },
    {
        id: 5,
        name: "Xiaomi 14 Ultra",
        brand: "XIAOMI",
        category: "phones",
        price: "MWK 1,350,000",
        specs: "6.73\" LTPO, Snapdragon 8 Gen 3, 1-inch Sensor",
        image: "📱",
        badge: "exclusive"
    },

    // Premium Laptops (15 products)
    {
        id: 6,
        name: "MacBook Pro 16\" M3 Max",
        brand: "APPLE",
        category: "laptops",
        price: "MWK 5,200,000",
        specs: "M3 Max, 48GB RAM, 2TB SSD, Liquid Retina XDR",
        image: "💻",
        badge: "exclusive",
        exclusive: "Only at Last Resorts - Professional Grade!"
    },
    {
        id: 7,
        name: "Dell XPS 15 9530",
        brand: "DELL",
        category: "laptops",
        price: "MWK 2,800,000",
        specs: "Intel i9, RTX 4070, 32GB RAM, 1TB SSD, OLED",
        image: "💻",
        badge: "new"
    },
    {
        id: 8,
        name: "Lenovo ThinkPad X1 Carbon",
        brand: "LENOVO",
        category: "laptops",
        price: "MWK 2,100,000",
        specs: "Intel i7, 16GB RAM, 1TB SSD, 14\" 2.8K OLED",
        image: "💻",
        badge: "discount"
    },
    {
        id: 9,
        name: "HP Spectre x360 14",
        brand: "HP",
        category: "laptops",
        price: "MWK 1,950,000",
        specs: "Intel i7, 16GB RAM, 1TB SSD, 13.5\" OLED 2-in-1",
        image: "💻",
        badge: "exclusive"
    },
    {
        id: 10,
        name: "ASUS ROG Zephyrus G16",
        brand: "ASUS",
        category: "laptops",
        price: "MWK 3,500,000",
        specs: "Intel i9, RTX 4090, 32GB RAM, 2TB SSD, 240Hz",
        image: "💻",
        badge: "new"
    },

    // Desktops & Workstations (10 products)
    {
        id: 11,
        name: "Apple iMac 24\" M3",
        brand: "APPLE",
        category: "desktops",
        price: "MWK 3,200,000",
        specs: "M3 Chip, 16GB RAM, 1TB SSD, 4.5K Retina",
        image: "🖥️",
        badge: "exclusive"
    },
    {
        id: 12,
        name: "Dell Alienware Aurora R15",
        brand: "DELL",
        category: "desktops",
        price: "MWK 4,800,000",
        specs: "Intel i9, RTX 4090, 64GB RAM, 2TB SSD + 4TB HDD",
        image: "🖥️",
        badge: "new"
    },

    // Accessories (10 products)
    {
        id: 13,
        name: "Apple AirPods Pro 2",
        brand: "APPLE",
        category: "accessories",
        price: "MWK 450,000",
        specs: "Active Noise Cancellation, Spatial Audio, MagSafe",
        image: "🎧",
        badge: "discount"
    },
    {
        id: 14,
        name: "Samsung Galaxy Watch6",
        brand: "SAMSUNG",
        category: "accessories",
        price: "MWK 350,000",
        specs: "44mm, LTE, Health Monitoring, Rotating Bezel",
        image: "⌚",
        badge: "new"
    },
    {
        id: 15,
        name: "Logitech MX Master 3S",
        brand: "LOGITECH",
        category: "accessories",
        price: "MWK 120,000",
        specs: "Wireless, 8K DPI, Ergonomic, Multi-Device",
        image: "🖱️",
        badge: "exclusive"
    }
];

// Tutorials database
const tutorials = [
    {
        id: 1,
        title: "Basic PC Troubleshooting Guide",
        description: "Learn to fix common computer issues like slow performance and startup problems",
        duration: "15 min",
        level: "Beginner",
        free: true
    },
    {
        id: 2,
        title: "Laptop Maintenance & Cleaning",
        description: "Proper cleaning techniques and maintenance to extend your laptop's lifespan",
        duration: "12 min",
        level: "Beginner",
        free: true
    },
    {
        id: 3,
        title: "Windows 11 Optimization",
        description: "Speed up your Windows 11 with these optimization techniques",
        duration: "20 min",
        level: "Intermediate",
        free: true
    },
    {
        id: 4,
        title: "Virus Removal & Protection",
        description: "Complete guide to removing viruses and protecting your system",
        duration: "18 min",
        level: "Intermediate",
        free: true
    },
    {
        id: 5,
        title: "Data Backup Strategies",
        description: "Learn how to properly backup your important data and files",
        duration: "25 min",
        level: "Beginner",
        free: true
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadTutorialsPreview();
    updateCartCount();
});

function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featured-products-grid');
    
    // Shuffle and get 12 random products
    const shuffledProducts = [...featuredProducts].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 12);
    
    productsGrid.innerHTML = selectedProducts.map(product => `
        <div class="product-card">
            ${product.badge ? `<div class="product-badge ${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
            <div class="product-image">
                <span>${product.image}</span>
            </div>
            <div class="product-content">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-specs">${product.specs}</div>
                ${product.exclusive ? `<div class="product-exclusive">${product.exclusive}</div>` : ''}
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ''}
                    ${product.price}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-outline" onclick="viewProduct(${product.id})">Quick View</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeText(badgeType) {
    const badges = {
        'exclusive': '🔥 EXCLUSIVE',
        'new': '🆕 NEW',
        'discount': '💸 SALE'
    };
    return badges[badgeType] || '';
}

function loadTutorialsPreview() {
    const tutorialsGrid = document.getElementById('tutorials-preview');
    
    tutorialsGrid.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-preview-card">
            <div class="tutorial-preview-thumbnail">
                <div class="play-icon">▶</div>
            </div>
            <div class="tutorial-preview-content">
                <h4>${tutorial.title}</h4>
                <p>${tutorial.description}</p>
                <div class="tutorial-meta">
                    <span>⏱️ ${tutorial.duration}</span>
                    <span>📊 ${tutorial.level}</span>
                </div>
                <button class="btn btn-primary btn-small" onclick="redirectToTutorials()">Watch Free</button>
            </div>
        </div>
    `).join('');
}

function redirectToTutorials() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('Please login to access tutorials');
        window.location.href = 'pages/login.html';
    } else {
        window.location.href = 'pages/tutorials.html';
    }
}

function viewProduct(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Quick view: ${product.name} - ${product.price}`);
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