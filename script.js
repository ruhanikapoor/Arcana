let cards = [];
fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    cards = data;
  })
  .catch((error) => console.error("Cpuld not load cards : ", error));

document.getElementById("draw-card").addEventListener("click", () => {
  if (cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  const isReversed = Math.random() < 0.5;
  const meaning = isReversed ? card.meaning_rev : card.meaning_up;

  document.getElementById("card-container").innerHTML = `
  <div class="card-flip">
    <div class="card-inner ${isReversed ? "reversed" : ""}">
      <div class="card-front">
        <img src="assets/card-back.png" alt="Card Back">
      </div>
      <div class="card-back">
        <img src="${card.image}" alt="${card.name}">
        <h2>${card.name} ${isReversed ? "(Reversed)" : ""}</h2>
        <p>${meaning}</p>
        <small>Keywords: ${card.keywords.join(", ")}</small>
      </div>
    </div>
  </div>
`;

  const cardInner = document.querySelector(".card-inner");
  cardInner.addEventListener("click", () => {
    cardInner.classList.toggle("flipped");
  });
});
