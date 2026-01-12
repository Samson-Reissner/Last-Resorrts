// ==============================================
// DELETE EVERYTHING ABOVE THIS LINE AND REPLACE WITH:
// ==============================================

// Tutorials database ONLY - NO PRODUCTS
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

// ==============================================
// DOM CONTENT LOADED - NO PRODUCT LOADING
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Static HTML products loaded - NO JS PRODUCT LOADING');
    
    // Initialize cart buttons for your static HTML products
    initializeAddToCartButtons();
    updateCartCount();
    
    // Optional: Load tutorials if you have that section
    if (document.getElementById('tutorials-preview')) {
        loadTutorialsPreview();
    }
    
    // CRITICAL: Remove any existing product loading
    disableProductLoading();
});

// ==============================================
// CRITICAL FUNCTION: Disable all product loading
// ==============================================
function disableProductLoading() {
    console.log('🚫 Disabling all product loading functions');
    
    // Override any existing loadFeaturedProducts function
    window.loadFeaturedProducts = function() {
        console.log('❌ PRODUCT LOADING BLOCKED: Using static HTML instead');
        return false;
    };
    
    // Also block other common product loading functions
    window.loadProducts = function() {
        console.log('❌ PRODUCT LOADING BLOCKED');
        return false;
    };
    
    // Find and stop any product grid modifications
    const productGrids = document.querySelectorAll('.products-grid, .featured-products-grid');
    productGrids.forEach(grid => {
        // Add a marker to prevent JavaScript from modifying this grid
        grid.setAttribute('data-js-blocked', 'true');
    });
}

// ==============================================
// Cart functionality for STATIC HTML products
// ==============================================
function initializeAddToCartButtons() {
    console.log('🛒 Initializing cart buttons');
    
    const buttons = document.querySelectorAll('.btn-primary.btn-block, .btn-block');
    console.log('Found', buttons.length, 'cart buttons');
    
    buttons.forEach(button => {
        // Remove any existing click listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-select buttons after cloning
    const newButtons = document.querySelectorAll('.btn-primary.btn-block, .btn-block');
    
    newButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productName = productCard.querySelector('.product-title')?.textContent || 'Product';
            
            // Add to cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                name: productName,
                time: new Date(),
                quantity: 1
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show notification
            showNotification(`✅ Added "${productName}" to cart!`);
        });
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
        console.log('🛒 Cart updated:', cart.length, 'items');
    }
}

// ==============================================
// Notification system
// ==============================================
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

// ==============================================
// Tutorials functions (optional)
// ==============================================
function loadTutorialsPreview() {
    const tutorialsGrid = document.getElementById('tutorials-preview');
    if (!tutorialsGrid) return;
    
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

// ==============================================
// CRITICAL: Delete/Override old functions
// ==============================================

// DELETE THIS - Override with empty function
window.viewProduct = function() {
    console.log('❌ viewProduct() disabled - using static HTML');
    return false;
};

// DELETE THIS - Override with empty function  
window.loadFeaturedProducts = function() {
    console.log('❌ loadFeaturedProducts() disabled - using static HTML');
    return false;
};

console.log('🚀 Static HTML Product System Initialized');
console.log('📱 24 Static Products will display from HTML');
console.log('🚫 JavaScript product loading is DISABLED');