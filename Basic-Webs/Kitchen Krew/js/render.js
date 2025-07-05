let fullData = {};
let bbqsData = [];
let bestFoodsData = [];
let breadsData = [];
let burgersData = [];
let chocolatesData = [];
let dessertsData = [];
let drinksData = [];
let friedChickenData = [];
let iceCreamData = [];
let ourFoodsData = [];
let pizzasData = [];
let porksData = [];
let sandwichesData = [];
let sausagesData = [];
let steaksData = [];

fetch("assets/db.json")
    .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    })
    .then((data) => {
        fullData = data;
        bbqsData = fullData.bbqs;
        bestFoodsData = fullData.bestFoods;
        breadsData = fullData.breads;
        burgersData = fullData.burgers;
        chocolatesData = fullData.chocolates;
        dessertsData = fullData.desserts;
        drinksData = fullData.drinks;
        friedChickenData = fullData.friedChicken;
        iceCreamData = fullData.iceCream;
        ourFoodsData = fullData.ourFoods;
        pizzasData = fullData.pizzas;
        porksData = fullData.porks;
        sandwichesData = fullData.sandwiches;
        sausagesData = fullData.sausages;
        steaksData = fullData.steaks;

        // ✅ Safe to render only after data is loaded
        const sections = {
            bbqs: { data: bbqsData, section: document.getElementById("bbqs") },
            bestFoods: { data: bestFoodsData, section: document.getElementById("best-foods") },
            breads: { data: breadsData, section: document.getElementById("breads") },
            burgers: { data: burgersData, section: document.getElementById("burger") },
            chocolates: { data: chocolatesData, section: document.getElementById("chocolate") },
            desserts: { data: dessertsData, section: document.getElementById("desserts") },
            drinks: { data: drinksData, section: document.getElementById("drinks") },
            friedChicken: { data: friedChickenData, section: document.getElementById("fried-chicken") },
            iceCream: { data: iceCreamData, section: document.getElementById("ice-cream") },
            ourFoods: { data: ourFoodsData, section: document.getElementById("our-foods") },
            pizzas: { data: pizzasData, section: document.getElementById("pizzas") },
            porks: { data: porksData, section: document.getElementById("porks") },
            sandwiches: { data: sandwichesData, section: document.getElementById("sandwich") },
            sausages: { data: sausagesData, section: document.getElementById("sausages") },
            steaks: { data: steaksData, section: document.getElementById("steaks") }
        };

        Object.values(sections).forEach(({ data, section }) => {
            renderAllCards(data, section);
        });

    })
    .catch((error) => {
        console.error("Error loading data:", error);
    });


// 🧠 Utility functions:
const renderCard = (data, section) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${data.img}" alt=" " >
    <p class="cardTitle">${data.name}</p>
    <div class="desc-location">
      <p>${data.dsc}</p>
      <p>${data.country}</p>
    </div>
    <div class="rate-price flexbetween">
      <p class="rate">${data.rate}<span class="star">⭐</span></p>
      <p class="price">₹${data.price}</p>
    </div>
  `;
    section.appendChild(card); // ✅ Yeh line correct ki gayi hai
};

const renderAllCards = (datas, section) => {
    if (!Array.isArray(datas)) return;
    section.innerHTML = "";
    datas.forEach((data) => renderCard(data, section));
};