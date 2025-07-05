const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

let currentSlide = 0;
const slider = document.getElementById("slider");
const totalSlides = document.querySelectorAll(".slide").length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // loop to 0 after last
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // loop to last if < 0
    updateSlider();
}

prevBtn.addEventListener("click", () => { prevSlide() });
nextBtn.addEventListener("click", () => { nextSlide() });

setInterval(nextSlide, 5000);