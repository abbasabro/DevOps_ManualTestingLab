// Valid users for testing
const validUsers = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" },
    { username: "test", password: "test123" }
];

// Toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Remember me functionality (with intentional bug)
function saveCredentials() {
    const rememberMe = document.getElementById('remember').checked;
    const username = document.getElementById('username').value;
    
    if (rememberMe && username) {
        localStorage.setItem('rememberedUser', username);
    } else {
        localStorage.removeItem('rememberedUser');
    }
}

// Load remembered user (with intentional bug - only loads on page refresh)
function loadRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}

// Validate login
function validateLogin(username, password) {
    return validUsers.find(user => 
        user.username === username && user.password === password
    );
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
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
        showMessage(`Login successful! Welcome ${user.username}`, 'success');
        // Simulate redirect to dashboard
        setTimeout(() => {
            alert(`Redirecting to Dashboard...\nWelcome ${user.username}!`);
            // In a real app: window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showMessage('Invalid username or password', 'error');
    }
});

// Load remembered user when page loads
window.addEventListener('load', function() {
    loadRememberedUser();
});

// Intentional bug: Remember me doesn't work properly on page refresh
// This will be caught during manual testing in Task 3
