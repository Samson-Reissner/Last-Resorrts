// Authentication System for Last Resorts

// Initialize users array in localStorage if it doesn't exist
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                fname: 'Admin',
                lname: 'User',
                email: 'admin@lastresorts.com',
                phone: '+260962284039',
                password: 'admin123',
                role: 'admin'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        console.log('Default users initialized');
    }
}

// Check if user is logged in
function checkAuthStatus() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Register new user
function registerUser(userData) {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Existing users:', users);
        
        // Check if email already exists
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            return {
                success: false,
                message: 'The email you have entered already exists. Please use a different email or login.'
            };
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            role: 'user',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('New user added:', newUser);
        
        // Auto-login after registration
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        return {
            success: true,
            message: 'Account created successfully! Redirecting...',
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'An error occurred during registration. Please try again.'
        };
    }
}

// Login user
function loginUser(email, password) {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Available users:', users);
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password. Please try again.'
            };
        }
        
        // Remove password from stored user object for security
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        return {
            success: true,
            message: 'Login successful! Redirecting...',
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login. Please try again.'
        };
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Update navigation based on auth status
function updateNavigation() {
    const authSection = document.getElementById('auth-section');
    const currentUser = getCurrentUser();
    
    if (authSection) {
        if (currentUser) {
            authSection.innerHTML = `
                <div class="user-nav">
                    <span class="welcome-user">Welcome, ${currentUser.fname}</span>
                    <a href="cart.html" class="nav-link cart-link">🛒 Cart</a>
                    <button onclick="logout()" class="btn btn-secondary btn-small">Logout</button>
                </div>
            `;
        } else {
            authSection.innerHTML = `
                <div class="auth-links">
                    <a href="login.html" class="nav-link">Login</a>
                    <a href="signup.html" class="btn btn-primary btn-small">Sign Up</a>
                </div>
            `;
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth system initializing...');
    initializeUsers();
    updateNavigation();
});

// Global logout function
function logout() {
    logoutUser();
}

// Make functions globally available
window.initializeUsers = initializeUsers;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;
window.checkAuthStatus = checkAuthStatus;
window.updateNavigation = updateNavigation;