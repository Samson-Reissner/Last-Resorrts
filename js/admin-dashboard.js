document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    setupAdminNavigation();
    loadAdminWelcome();
});

function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || user.role !== 'admin' || user.fullName !== "Samson Zerubabbel Reissner") {
        // Redirect to admin login if not authenticated
        window.location.href = 'admin-login.html';
        return;
    }
}

function loadAdminWelcome() {
    const user = JSON.parse(localStorage.getItem('user'));
    const welcomeElement = document.getElementById('admin-welcome');
    
    if (welcomeElement && user) {
        welcomeElement.textContent = `Welcome, ${user.fullName}`;
    }
}

function setupAdminNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sectionContents = document.querySelectorAll('.section-content');
    const sectionTitle = document.getElementById('section-title');
    
    // Section titles mapping
    const sectionTitles = {
        'dashboard': 'Dashboard Overview',
        'users': 'User Management',
        'products': 'Product Management', 
        'orders': 'Order Management',
        'payments': 'Payment Verification',
        'tutorials': 'Tutorial Management'
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sectionContents.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const targetElement = document.getElementById(`${targetSection}-section`);
            if (targetElement) {
                targetElement.classList.add('active');
                sectionTitle.textContent = sectionTitles[targetSection] || 'Admin Dashboard';
            }
        });
    });
}

function logout() {
    // Clear admin session
    localStorage.removeItem('user');
    localStorage.removeItem('adminSession');
    
    // Redirect to admin login page
    window.location.href = 'admin-login.html';
}

// Add some interactive functionality
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
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

// Add CSS for animations if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking on a link (mobile)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
            toggleSidebar();
        }
    });
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 1024 && 
        sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) && 
        !toggle.contains(event.target)) {
        toggleSidebar();
    }
});