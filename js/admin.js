document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    setupAdminNavigation();
});

function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || user.role !== 'admin') {
        window.location.href = 'admin-login.html';
        return;
    }
}

function setupAdminNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real app, this would load the corresponding section
            const section = this.getAttribute('href').substring(1);
            showNotification(`Loading ${section} section...`);
        });
    });
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

function showNotification(message) {
    // Reuse the notification function from main.js
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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