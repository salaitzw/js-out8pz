// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
<div class = "container">
  <div class = "headerBar">
    <button class = "shuffleCards">Shuffle cards</button>
    <span class = "remainingCards">???Cards remaining<span>
  </div>
  <h2 class = "statusMsg">War!</h2>
  <h3 class = "computerScore">Computer : 0 </h3>
  <div class="imgContainer">
    <div id = "imgOutline"></div>
    <div id = "imgOutline"></div>
  </div>
  <h3 class = "myScore">Me : 0 </h3>
  <button class = "drawCard">draw card</button>
</div>
`;
const shuffleCards = document.querySelector('.shuffleCards')
const drawCardButton = document.querySelector('.drawCard')
const imgContainer = document.querySelector('.imgContainer')
const remainingCards = document.querySelector(".remainingCards")
const computeScoreHtml = document.querySelector(".computerScore")
const myScoreHtml = document.querySelector(".myScore")

let computerScore = 0
let myScore = 0
console.log(remainingCards)

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
      remainingCards.innerText = data.remaining + " Cards remaining"
    });
};
const compare = (data1, data2, somefun) => {
  let card1 = somefun(data1.value)
  let card2 = somefun(data2.value)
  if(card1 === card2){
    return "War!"
  }
  else {
    if (card1 > card2 ){
      computerScore += 1      
      return "Computer Wins"
    }
    else if(card2 > card1){
      myScore += 1
      return "Me Wins"
    }
  }
}
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
      let statausMsg = compare(data.cards[0], data.cards[1], (ha) => 
      (ha === "JACK") ? 11 : (ha === "QUEEN") ? 12 : (ha === "KING") ? 13 : (ha === "ACE") ? 14 : ha 
      )
      console.log(statausMsg)
      document.querySelector(".statusMsg").textContent = statausMsg
      remainingCards.innerText = data.remaining + " Cards remaining"
      myScoreHtml.textContent = "Me : " + myScore
      computeScoreHtml.textContent = "Computer : " + computerScore
      if (data.remaining === 0) {
        drawCardButton.disabled = true
        
        let endMessage = (myScore === computerScore) ? "Both of you tied!" : (myScore > computerScore) ? "You win the Game" : "Computer Wins the Game"
        console.log("end message" + endMessage)
        document.querySelector(".statusMsg").textContent = "final result : "+ endMessage
      }
    });
};
shuffleCards.addEventListener('click', goShuffleCards);
drawCardButton.addEventListener('click', goFetchCard);
