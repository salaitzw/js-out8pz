// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app')
const imgContainer = document.createElement('div')

appDiv.innerHTML = `
<button class = "shuffleCards">Shuffle cards</button>
<button class = "drawCard">draw card</button>
`
const shuffleCards = document.querySelector(".shuffleCards")
const drawCardButton = document.querySelector('.drawCard')

let deckId = "new"
const goShuffleCards = () => {
  console.log("testing of deckId", deckId)
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          deckId = data.deck_id
      })
}

const goFetchCard = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      appDiv.appendChild(imgContainer);
      imgContainer.innerHTML = data.cards
        .map(
          (card) =>
            `
          <img src = '${card.images.svg}'>
        `
        )
        .join('');
    });
};
shuffleCards.addEventListener('click', goShuffleCards )
drawCardButton.addEventListener('click', goFetchCard)
