'use strict';

const diceEl = document.querySelector('.dice');
const totalScorePlayer1 = document.querySelector('#score--0');
const totalScorePlayer2 = document.querySelector('#score--1');
const currentScorePlayer1 = document.getElementById('current--0');
const currentScorePlayer2 = document.getElementById('current--1');
const newGameBtn = document.querySelector('.btn--new');
const rolleDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let currentScore, activePlayer, isPlay, players;

const init = function () {
  totalScorePlayer1.textContent = 0;
  totalScorePlayer2.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  isPlay = true;
  players = [0, 0];

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

init();

rolleDiceBtn.addEventListener('click', function () {
  if (isPlay) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    if (randomNumber === 1) {
      diceEl.src = `dice-${randomNumber}.png`;
      switchPlayer();
    } else {
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${randomNumber}.png`;
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (isPlay) {
    players[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      players[activePlayer];
    if (players[activePlayer] >= 20) {
      isPlay = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);

function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
}
