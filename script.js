'use strict';

// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
let scores, currentscore, currentPlayer, playing;

// initial values assigned
const initial = function () {
  // variables
  scores = [0, 0];
  currentscore = 0;
  currentPlayer = 0;
  playing = true;
  //  Targeting the Elements
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
initial();
// switching players function

const switchPlayer = function () {
  //  switch players & make the current-score to zero for the active player
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentscore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  // Background-visual qhen switching player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1.Dice should visible
    dice.classList.remove('hidden');
    //  2.random number should be created
    const dices = Math.trunc(Math.random() * 6) + 1;
    //   3.Dice roll visible random numbers
    dice.src = `dice-${dices}.png`;
    //   4.Adding diceroll number to currentscore
    if (dices !== 1) {
      // add dice number to currentscore
      currentscore += dices;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentscore;
      // current0.textContent = currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current-score to the currentplayer's total score..
    scores[currentPlayer] += currentscore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    // 2.if currentplayer score >=100 ,finish the game(no buttons should work,background visual will be in green to indicate the winner!!)..
    if (scores[currentPlayer] >= 50) {
      dice.classList.add('hidden');
      playing = false;

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--activer');
    } else {
      // 3.switch the next player..
      switchPlayer();
    }
  }
});
btnnew.addEventListener('click', initial);
