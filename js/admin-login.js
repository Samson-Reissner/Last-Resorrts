// Predefined admin credentials - Only one person can access
const ADMIN_CREDENTIALS = {
    fullName: "Samson Zerubabbel Reissner",
    password: "re$$ner49",
    role: "admin"
};

document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    adminLoginForm.parentNode.insertBefore(errorMessage, adminLoginForm);
    
    // Check if user is already logged in as admin
    checkExistingAdminSession();
    
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authenticateAdmin();
    });
});

function checkExistingAdminSession() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin' && user.fullName === ADMIN_CREDENTIALS.fullName) {
        // User is already authenticated as admin, redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    }
}

function authenticateAdmin() {
    const nameInput = document.getElementById('adminName');
    const passwordInput = document.getElementById('adminPassword');
    const submitButton = document.querySelector('.btn-admin');
    const errorMessage = document.querySelector('.error-message');
    
    const enteredName = nameInput.value.trim();
    const enteredPassword = passwordInput.value;
    
    // Show loading state
    submitButton.classList.add('btn-loading');
    submitButton.disabled = true;
    
    // Simulate authentication process
    setTimeout(() => {
        // Remove loading state
        submitButton.classList.remove('btn-loading');
        submitButton.disabled = false;
        
        // Validate credentials
        if (enteredName === ADMIN_CREDENTIALS.fullName && enteredPassword === ADMIN_CREDENTIALS.password) {
            // Successful login
            errorMessage.style.display = 'none';
            nameInput.parentElement.classList.remove('error');
            passwordInput.parentElement.classList.remove('error');
            
            // Store admin session
            const adminUser = {
                fullName: ADMIN_CREDENTIALS.fullName,
                role: ADMIN_CREDENTIALS.role,
                loginTime: new Date().toISOString(),
                sessionId: generateSessionId()
            };
            
            localStorage.setItem('user', JSON.stringify(adminUser));
            localStorage.setItem('adminSession', 'active');
            
            // Show success and redirect
            showSuccessMessage('Authentication successful! Redirecting to dashboard...');
            
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
            
        } else {
            // Failed login
            errorMessage.textContent = 'Invalid credentials. Access denied.';
            errorMessage.style.display = 'block';
            nameInput.parentElement.classList.add('error');
            passwordInput.parentElement.classList.add('error');
            
            // Clear password field for security
            passwordInput.value = '';
            
            // Log failed attempt (in real app, this would go to server)
            logFailedAttempt(enteredName);
        }
    }, 1000); // Simulate network delay
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    
    const form = document.getElementById('adminLoginForm');
    form.parentNode.insertBefore(successMessage, form);
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function generateSessionId() {
    return 'admin_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function logFailedAttempt(attemptedName) {
    const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts') || '[]');
    
    failedAttempts.push({
        attemptedName: attemptedName,
        timestamp: new Date().toISOString(),
        ip: 'local' // In real app, this would capture actual IP
    });
    
    // Keep only last 10 attempts
    if (failedAttempts.length > 10) {
        failedAttempts.shift();
    }
    
    localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
    
    console.warn('Failed admin login attempt:', {
        attemptedName: attemptedName,
        time: new Date().toLocaleString()
    });
}

// Add security: Clear admin session when page is closed/refreshed in some cases
window.addEventListener('beforeunload', function() {
    // In a real application, you might want to implement more sophisticated session management
    // For this prototype, we'll keep the session in localStorage
});

// Prevent going back to login page after successful login
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        checkExistingAdminSession();
    }
});