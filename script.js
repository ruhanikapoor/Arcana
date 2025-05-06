const isOneCardPage = window.location.pathname.includes("onecard.html")
const isYesNoPage = window.location.pathname.includes("yesno.html")
const isThreePage = window.location.pathname.includes("threecard.html")

let cards = []

fetch("/cards.json")
  .then((response) => response.json())
  .then((data) => {
    cards = data
  })
  .catch((error) => console.error("Could not load cards:", error))

function drawRandomCard() {
  if (cards.length === 0) return null

  const randomIndex = Math.floor(Math.random() * cards.length)
  const card = cards[randomIndex]
  const isReversed = Math.random() < 0.5
  const meaning = isReversed ? card.meaning_rev : card.meaning_up

  return { card, isReversed, meaning }
}

const drawCardBtn = document.getElementById("draw-card")
if (drawCardBtn) {
  drawCardBtn.addEventListener("click", () => {
    const result = drawRandomCard()
    if (!result) return

    console.log("Card drawn:", result.card.name)
  })
}

if (isOneCardPage) {
  const revealBtn = document.getElementById("reveal-btn")
  if (revealBtn) {
    revealBtn.addEventListener("click", () => {
      const result = drawRandomCard()
      if (!result) return

      const { card, isReversed, meaning } = result

      document.getElementById("one-card-container").innerHTML = `
        <div class="card ${isReversed ? "reversed" : ""}">
          <img src="../${card.image}" alt="${card.name}">
        </div>
        <div class="card-description">
          <h2>${card.name} ${isReversed ? "(Reversed)" : ""}</h2>
          <p>${meaning}</p>
          <small><strong>Keywords:</strong> ${isReversed ? card.keywords_reversed.join(", ") : card.keywords_upright.join(", ")}</small>
        </div>
      `
    })
  }
}

if (isYesNoPage) {
  document.getElementById("yesno-btn").addEventListener("click", () => {
    if (cards.length === 0) return

    const randomIndex = Math.floor(Math.random() * cards.length)
    const card = cards[randomIndex]
    const isReversed = Math.random() < 0.5
    const meaning = isReversed ? card.meaning_rev : card.meaning_up
    const verdict = isReversed ? card.verdict_reversed : card.verdict_upright
    const verdictClass = (verdict || "maybe").toLowerCase()

    document.getElementById("yesno-container").innerHTML = `
      <div class="card ${isReversed ? "reversed" : ""}">
        <img src="../${card.image}" alt="${card.name}">
      </div>
      <div class="card-description">
        <h2>${card.name} ${isReversed ? "(Reversed)" : ""}</h2>
        <p>${meaning}</p>
        <div class="verdict ${verdictClass}">${verdict}</div>
        <small><strong>Keywords:</strong> ${isReversed ? card.keywords_reversed.join(", ") : card.keywords_upright.join(", ")}</small>
      </div>
    `
  })
}

if (isThreePage) {
  document.getElementById("three-btn").addEventListener("click", () => {
    if (cards.length < 3) return

    const picked = []
    while (picked.length < 3) {
      const card = cards[Math.floor(Math.random() * cards.length)]
      if (!picked.includes(card)) picked.push(card)
    }

    const labels = ["Past", "Present", "Future"]

    const html = picked.map((card, i) => {
      const isReversed = Math.random() < 0.5
      const meaning = isReversed ? card.meaning_rev : card.meaning_up
      const keywords = isReversed ? card.keywords_reversed : card.keywords_upright

      return `
        <div class="card-block ${isReversed ? "reversed" : ""}">
          <h2>${labels[i]}</h2>
          <img src="../${card.image}" alt="${card.name}">
          <h3>${card.name} ${isReversed ? "(Reversed)" : ""}</h3>
          <p>${meaning}</p>
          <small><strong>Keywords:</strong> ${keywords.join(", ")}</small>
        </div>
      `
    }).join("")

    document.getElementById("three-container").innerHTML = html
  })
}