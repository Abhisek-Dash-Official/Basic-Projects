// Email validator
const ValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Password validator
const ValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
};

// Username validator
const ValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
};

// Add new user to localStorage
const addNewUser = (users, username, email, password) => {
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}

function signup() {
    const errorMsg = document.getElementById("signup-error-msg");
    errorMsg.style.display = "none";
    errorMsg.textContent = ""; // Reset msg

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const termsChecked = document.getElementById("signup-terms").checked;

    // Username check
    if (!ValidUsername(username)) {
        errorMsg.textContent = "Username must be at least 3 characters and contain only letters, numbers, or underscores.";
        errorMsg.style.display = "block";
        return;
    }

    // Email check
    if (!ValidEmail(email)) {
        errorMsg.textContent = "Please enter a valid email address.";
        errorMsg.style.display = "block";
        return;
    }

    // Password strength check
    if (!ValidPassword(password)) {
        errorMsg.textContent = "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.";
        errorMsg.style.display = "block";
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        errorMsg.textContent = "Confirm Password do not match.";
        errorMsg.style.display = "block";
        return;
    }

    // Terms checkbox check
    if (!termsChecked) {
        errorMsg.textContent = "You must agree to the terms & conditions.";
        errorMsg.style.display = "block";
        return;
    }

    // Check if email already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        errorMsg.textContent = "Email already exists!";
        errorMsg.style.display = "block";
        return;
    }

    // Add new user if everything is valid and email is unique
    addNewUser(users, username, email, password);

    alert("Signup successful!");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email && user.password === password);

    if (!existingUser) {
        const errorMsg = document.getElementById("login-error-msg");
        errorMsg.textContent = "Email or Password is incorrect.";
        errorMsg.style.display = "block";
        return;
    } else {
        // Store the logged-in user info (except password for security)
        const username = existingUser.username;
        const email = existingUser.email;
        localStorage.setItem("currentUser", JSON.stringify({ username, email }));
    }

    alert("Login successful!");
    window.location.href = "home.html";
}