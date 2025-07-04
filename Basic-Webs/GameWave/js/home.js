if (!localStorage.getItem("currentUser")) {
    alert("Please log in to access this page.");
    window.location.href = "login.html";
}

function Logout() {
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
}

const genreBtn = document.getElementById("genreFilter");
const platformsBtn = document.getElementById("platformFilter");

const genreDiv = document.getElementById("genre");
const platformsDiv = document.getElementById("platform");

let ActiveGenreBtn = false;
let ActivePlatformBtn = false;

genreBtn.addEventListener('click', () => {
    ActiveGenreBtn = !ActiveGenreBtn;
    genreDiv.style.display = ActiveGenreBtn ? "flex" : "none";
    genreDiv.style.flexDirection = "column";
});

platformsBtn.addEventListener('click', () => {
    ActivePlatformBtn = !ActivePlatformBtn;
    platformsDiv.style.display = ActivePlatformBtn ? "flex" : "none";
    platformsDiv.style.flexDirection = "column";
});