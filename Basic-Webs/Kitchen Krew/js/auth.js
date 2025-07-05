const goSignUp = document.getElementById("go-signup");
const goLogUp = document.getElementById("go-logup");
const logUpSection = document.getElementById("log-up-section");
const signUpSection = document.getElementById("sign-up-section");

goSignUp.addEventListener("click", () => {
    logUpSection.classList.remove("active");
    signUpSection.classList.add("active");
});

goLogUp.addEventListener("click", () => {
    signUpSection.classList.remove("active");
    logUpSection.classList.add("active");
});

const signEmail = document.getElementById("sign-email");
const signPassword = document.getElementById("sign-password");
const confirmPassword = document.getElementById("confirm-password");
const signName = document.getElementById("sign-name");
const signPhone = document.getElementById("sign-phone");
const addressLine = document.getElementById("address-line");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pin = document.getElementById("pin");
const country = document.getElementById("country");
const signErrormsg = document.getElementById("signin-error-msg");
const signupBtn = document.getElementById("signup");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("Login");
const loginErrormsg = document.getElementById("login-error-msg");

// Helper: Get all users from localStorage
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsersToStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Password validation
function isValidPassword(password) {
    const minLength = 8;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;
    return regex.test(password);
}

// Sign up functionality
signupBtn.addEventListener("click", () => {
    if (
        !signEmail.value ||
        !signPassword.value ||
        !confirmPassword.value ||
        !signName.value ||
        !signPhone.value ||
        !addressLine.value ||
        !city.value ||
        !state.value ||
        !pin.value ||
        !country.value
    ) {
        signErrormsg.textContent = "⚠️ All fields are required.";
        return;
    }

    if (signPassword.value !== confirmPassword.value) {
        signErrormsg.textContent = "Passwords do not match!";
        return;
    }

    // Check if password is strong
    if (!isValidPassword(signPassword.value)) {
        signErrormsg.textContent =
            "⚠️ Password must be at least 8 characters long, contain a number, an uppercase letter, and a special character!";
        return;
    }

    const newUser = {
        email: signEmail.value,
        password: signPassword.value,
        name: signName.value,
        phone: signPhone.value,
        address: {
            line: addressLine.value,
            city: city.value,
            state: state.value,
            pin: pin.value,
            country: country.value,
        },
    };

    // Check if the user already exists in localStorage
    const users = getUsersFromStorage();
    if (users.some((user) => user.email === newUser.email)) {
        signErrormsg.textContent = "User already exists! Please login.";
        return;
    }

    // Save new user to localStorage
    users.push(newUser);
    saveUsersToStorage(users);

    signErrormsg.style.color = "green";
    signErrormsg.textContent = "Signup successful!";
    goLogUp.click(); // Redirect to login section
});

// Login functionality
loginBtn.addEventListener("click", () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    // Check if email exists
    const users = getUsersFromStorage();
    const user = users.find((user) => user.email === email);

    if (!user) {
        loginErrormsg.style.color = "red";
        loginErrormsg.textContent = "Email does not exist!";
        return;
    }

    // Check if password matches
    if (user.password !== password) {
        loginErrormsg.style.color = "red";
        loginErrormsg.textContent = "Incorrect password!";
        return;
    }

    // If both email and password are correct
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(user));

    loginErrormsg.style.color = "green";
    loginErrormsg.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html"; // Redirect to home page or dashboard
    }, 1000);
});
