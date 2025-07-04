let GameData = [];

window.onload = async () => {
    try {
        const res = await fetch("assets/game.json");
        GameData = await res.json();
        renderGames(GameData);
    } catch (err) {
        console.error("Error loading games:", err);
    }
};

function renderGames(games) {
    const container = document.getElementById("game-container");
    container.innerHTML = "";

    const cart = getCart();
    const bought = getBought();

    games.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("game-card");

        const isInCart = isGameInList(cart, game.name);
        const isBought = isGameInList(bought, game.name);

        div.innerHTML = `
            <img src="${game.image}" alt="${game.name}"/>
            <h2>${game.name}</h2>
            <p><span>Genre:</span> ${game.genre}</p>
            <p><span>Price:</span><span class="price">${game.price}</span></p>
            <p><span>Platforms:</span> ${game.platform.join(", ")}</p>
            <p><span>Developer:</span> ${game.developer}</p>
            <p><span>Publisher:</span> ${game.publisher}</p>
            <p><span>Release Date:</span> ${game.release_date}</p>
            <p>${game.description}</p>
            <button class="add-to-cart ${isInCart ? 'clicked' : ''}">${isInCart ? "Added! 🎮" : "Add to Cart"}</button>
            <button class="buy-now ${isBought ? 'clicked' : ''}">${isBought ? "Bought! ✅" : "Buy Now"}</button>
        `;
        container.appendChild(div);

        const cartBtn = div.querySelector(".add-to-cart");
        const buyBtn = div.querySelector(".buy-now");

        // Add to Cart click
        cartBtn.addEventListener("click", () => {
            const updatedCart = getCart();
            if (!isGameInList(updatedCart, game.name)) {
                updatedCart.push(game);
                saveCart(updatedCart);
                cartBtn.textContent = "Added! 🎮";
                cartBtn.classList.add("clicked");
            }
        });

        // Buy Now click
        buyBtn.addEventListener("click", () => {
            const updatedBought = getBought();
            if (!isGameInList(updatedBought, game.name)) {
                updatedBought.push(game);
                saveBought(updatedBought);
                buyBtn.textContent = "Bought! ✅";
                buyBtn.classList.add("clicked");
            }
        });
    });
}

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", () => {
    filter(searchBar.value.trim());
});

const allBtns = [...document.getElementsByClassName("genreBtns"), ...document.getElementsByClassName("PlatformBtns")];

allBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("activeBtn");
        filter(searchBar.value.trim());
    });
});


function filter(name = "") {
    const price = document.getElementById("priceSelection").value;

    const allGenre = document.getElementsByClassName("genreBtns");
    const activeGenres = [...allGenre]
        .filter(btn => btn.classList.contains("activeBtn"))
        .map(btn => btn.getAttribute("id").toLowerCase());

    const allPlatforms = document.getElementsByClassName("PlatformBtns");
    const activePlatforms = [...allPlatforms]
        .filter(btn => btn.classList.contains("activeBtn"))
        .map(btn => btn.getAttribute("id").toLowerCase());

    const filteredGames = GameData.filter(game => {
        const genre = game.genre.toLowerCase();
        const platforms = game.platform.map(p => p.toLowerCase());
        const gamePrice = parseFloat(game.price.replace("$", "")) || 0;
        const gameName = game.name.toLowerCase();

        const genreMatch = activeGenres.length === 0 || activeGenres.some(g => genre.includes(g));
        const platformMatch = activePlatforms.length === 0 || activePlatforms.some(p => platforms.includes(p));
        const priceMatch =
            price === "all" || (price === "0" && gamePrice === 0) ||
            gamePrice <= parseFloat(price);
        const nameMatch = name === "" || gameName.includes(name.toLowerCase());

        return genreMatch && platformMatch && priceMatch && nameMatch;
    });

    renderGames(filteredGames);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function getBought() {
    return JSON.parse(localStorage.getItem("bought")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveBought(bought) {
    localStorage.setItem("bought", JSON.stringify(bought));
}

function isGameInList(list, gameName) {
    return list.some(game => game.name === gameName);
}