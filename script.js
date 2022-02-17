const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//stores cards that are face up
let faceUp = [];

function handleCardClick(e) {
  //stores class name (color) for selected card
  const color = e.target.className;

  //limit face up cards to 2
  //prevents selection of same card twice
  if(faceUp.length < 2 && e.target !== faceUp[0]){
    faceUp.push(e.target);

    //sets color for clicked card
    e.target.style.backgroundColor = color;
  }

  colorsAreMatched();
  gameIsDone();
}

function colorsAreMatched(){
  //if faceUp array is length 2 - check if colors matching or not matching
  if(faceUp.length === 2) {
    const firstColor = faceUp[0].style.backgroundColor;
    const secondColor = faceUp[1].style.backgroundColor;

    //prevents the selection of any cards while two cards are face up
    gameContainer.style.pointerEvents = 'none';

    //if same color cards, prevent anymore clicks on them and reset faceUp counter
    //if not same color, reset faceup counter, card color, and enable card selection after 1 sec
    if(firstColor === secondColor) {
      faceUp[0].style.pointerEvents = 'none';
      faceUp[1].style.pointerEvents = 'none';
      faceUp = [];
      gameContainer.style.pointerEvents = '';
    } else {
      setTimeout(function(){
        faceUp[0].style.backgroundColor = '';
        faceUp[1].style.backgroundColor = '';
        faceUp = [];
        gameContainer.style.pointerEvents = '';
      },1000)
    }
  }
}

function gameIsDone(){
  const divArray = Array.from(gameContainer.children)

  //checks if every card is face up
  const done = divArray.every(function(div){
    return div.style.backgroundColor !== '';
  })

  if(done){
    alert('Congratulations - you won!! Click "Reset" to play again.');
    gameContainer.style.pointerEvents = 'none';
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


//resets the board when reset button is clicked
const reset = document.querySelector('#reset-btn');

reset.addEventListener('click',function(){
  const divArray = Array.from(gameContainer.children)

  //reset background and pointerEvent for each card
  divArray.forEach(function(div){
    div.style.backgroundColor = '';
    div.style.pointerEvents = '';
  })

  faceUp = [];
  score.innerText = '';
  scoreCount = 0;
  gameContainer.style.pointerEvents = '';
})

//keeps track of user score
const score = document.querySelector('#score');
let scoreCount = 0;

gameContainer.addEventListener('click',function(e){
  //if a card div is clicked, increment counter and display score
  if(e.target.id !== 'game' && e.target !== faceUp[0]) {
    scoreCount+=1;
    score.innerText = `Your score is: ${Math.round(scoreCount)}`;
  }
})