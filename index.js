// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
<div class = "container">
  <button class = "shuffleCards">Shuffle cards</button>
  <div class="imgContainer">
    <div id = "imgOutline"></div>
    <div id = "imgOutline"></div>
  </div>
  <button class = "drawCard">draw card</button>
</div>
`;
const shuffleCards = document.querySelector('.shuffleCards')
const drawCardButton = document.querySelector('.drawCard')
const imgContainer = document.querySelector('.imgContainer')

/*let deckId = 'new'
i will comment the above variable because i dont want to request too many new id from the api server*/
let deckId = "8102zucikz1r"
const goShuffleCards = () => {
  console.log('testing of deckId', deckId);
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=false`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
};

const goFetchCard = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let imgData = data.cards
        .map(
          (card) =>
            `
          <img src = '${card.image}'>
        `
        )
        .join('');
      console.log(imgData);
      imgContainer.innerHTML = imgData
    });
};
shuffleCards.addEventListener('click', goShuffleCards);
drawCardButton.addEventListener('click', goFetchCard);
