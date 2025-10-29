// Valid users for testing
const validUsers = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" },
    { username: "test", password: "test123" }
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const togglePassword = document.getElementById('togglePassword');
const messageDiv = document.getElementById('message');

// Toggle password visibility (FIXED)
togglePassword.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁️';
    }
});

// Remember me functionality (with intentional bug for testing)
function saveCredentials() {
    const rememberMe = rememberCheckbox.checked;
    const username = usernameInput.value;
    
    if (rememberMe && username) {
        localStorage.setItem('rememberedUser', username);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberMe');
    }
}

// Load remembered user (with intentional bug)
// function loadRememberedUser() {
//     const rememberedUser = localStorage.getItem('rememberedUser');
//     const rememberMe = localStorage.getItem('rememberMe');
    
//     if (rememberedUser && rememberMe === 'true') {
//         usernameInput.value = rememberedUser;
//         rememberCheckbox.checked = true;
//     }
// }

// Show message function (FIXED)
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type} show`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// Hide message
function hideMessage() {
    messageDiv.classList.remove('show');
}

// Validate login credentials
function validateLogin(username, password) {
    return validUsers.find(user => 
        user.username === username && user.password === password
    );
}

// Handle form submission (FIXED)
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Hide any previous messages
    hideMessage();
    
    // Save credentials if remember me is checked
    saveCredentials();
    
    // Validate inputs
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Check credentials
    const user = validateLogin(username, password);
    
    if (user) {
        showMessage(`✅ Login successful! Welcome ${user.username}`, 'success');
        // Simulate successful login behavior
        loginForm.reset();
        rememberCheckbox.checked = false;
        
        // Simulate redirect to dashboard (for demo purposes)
        setTimeout(() => {
            showMessage(`🎉 Redirecting to dashboard... Welcome ${user.username}!`, 'info');
        }, 1500);
        
    } else {
        showMessage('❌ Invalid username or password. Please try again.', 'error');
        // Clear password field on failed login
        passwordInput.value = '';
        passwordInput.type = 'password';
        togglePassword.textContent = '👁️';
    }
});

// Clear message when user starts typing
usernameInput.addEventListener('input', hideMessage);
passwordInput.addEventListener('input', hideMessage);

// Load remembered user when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRememberedUser();
    
    // Show welcome message if remembered user is loaded
    if (usernameInput.value) {
        showMessage(`Welcome back ${usernameInput.value}!`, 'info');
        setTimeout(hideMessage, 3000);
    }
});

// Additional feature: Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});
