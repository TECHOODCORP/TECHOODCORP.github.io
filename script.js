const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
    signupBtn.click();
    return false;
};

// Simulate a user database
const users = [];

// Function to sign up a new user
function signUpUser(firstName, lastName, email, password) {
    const user = {
        firstName,
        lastName,
        email,
        password
    };
    users.push(user);
    alert('Sign up successful! Please log in.');
}

// Function to log in a user
function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        alert('Login successful!');
        return true;
    } else {
        alert('No account found or incorrect credentials. Please sign up.');
        return false;
    }
}

// Simulate login state
let isLoggedIn = false; // Change this to true to simulate a logged-in user

// Function to update the dropdown menu based on login state
function updateDropdownMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu-end');
    if (isLoggedIn) {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#" id="viewProfile"><i class="fas fa-user-circle"></i> View Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings & Privacy</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle"></i> Help & Support</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        `;
    } else {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#" id="viewProfile"><i class="fas fa-user-circle"></i> View Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings & Privacy</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle"></i> Help & Support</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="signIn"><i class="fas fa-sign-in-alt"></i> Sign In</a></li>
        `;
    }

    // Add event listeners for the new dropdown items
    document.getElementById('viewProfile')?.addEventListener('click', function(event) {
        if (!isLoggedIn) {
            event.preventDefault();
            alert('Please sign in to proceed.');
        }
    });

    document.getElementById('signIn')?.addEventListener('click', function(event) {
        event.preventDefault();
        // Redirect to login page or show login form
        alert('Redirecting to login page...');
    });

    document.getElementById('logout')?.addEventListener('click', function(event) {
        event.preventDefault();
        isLoggedIn = false;
        updateDropdownMenu();
        alert('You have been logged out.');
    });
}

// Initialize the dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    updateDropdownMenu();

    const loginForm = document.querySelector('form.login');
    const signupForm = document.querySelector('form.signup');

    document.getElementById('loginButton').addEventListener('click', function() {
        const email = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (loginUser(email, password)) {
            isLoggedIn = true;
            updateDropdownMenu();
        }
    });

    document.getElementById('signupButton').addEventListener('click', function() {
        const firstName = signupForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = signupForm.querySelector('input[placeholder="Last Name"]').value;
        const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
        const password = signupForm.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = signupForm.querySelector('input[placeholder="Confirm password"]').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        signUpUser(firstName, lastName, email, password);
    });
});