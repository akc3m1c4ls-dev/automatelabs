const cards = document.querySelectorAll(".hero-slide");
const progressBar = document.querySelector(".hero-progress-bar");

let currentCard = 0;
const duration = 8000;

function showCard(index) {

    cards.forEach(card => {
        card.classList.remove("active");
    });

    cards[index].classList.add("active");

    // Reset progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    // Force browser to apply the reset
    progressBar.offsetHeight;

    // Start progress animation
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = "100%";
}

function nextCard() {

    currentCard++;

    if (currentCard >= cards.length) {
        currentCard = 0;
    }

    showCard(currentCard);
}

showCard(0);

setInterval(nextCard, duration);