'use strict';

// Initial values for the game

let number = Math.trunc(Math.random() * 10) + 1; // generates number 1-10
let score = 0;
let win = false;
let highscore = 0;
let lives = 3;

document.querySelector('.number').textContent = '?';
document.querySelector('.score').textContent = score;

// function to implement wrong guess score manipulation
function wrongGuess() {
  if (lives > 0) {
    const heart = document.getElementById('life' + lives);
    heart.remove();
    lives--;
  }
}

// to make message easier to send

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

console.log(number); // check console to see secret number

// starts the game with firt guess
document.querySelector('.check').addEventListener('click', function start() {
  const guess = Number(document.querySelector('.guess').value);
  if (win === true) restart();
  if (lives > 0) {
    //Wrong input
    if (!guess) {
      displayMessage('Please guess with a number');
    }
    //Player wins
    else if (guess === number) {
      displayMessage(
        'You win! Please press Again or guess another number to restart. '
      );

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = number;
      win = true;
      score++;
      document.querySelector('.score').textContent = score;

      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    }
    // Guess High
    else if (guess > number && win === false) {
      displayMessage('Too High 😅 Try again!');
      wrongGuess();
    }
    // Guess Low
    else if (guess < number && win === false) {
      displayMessage('Too low! 😅 Try again!');
      wrongGuess();
    }
  } else {
    document.querySelector('h1').textContent = ' The number was: ';
    displayMessage('Game Over!');
    wrongGuess();
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = '#dc1717';
    score = 0;
  }
});

function restart() {
  number = Math.trunc(Math.random() * 10) + 1;
  win = false;
  lives = 3;
  console.log(number); // dev cheats hehe

  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Please guess a number!';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';

  for (let i = 1; i <= 3; i++) {
    if (!document.getElementById('life' + i)) {
      const heart = document.createElement('img');
      heart.src = 'heart.svg';
      heart.alt = 'Heart Icon';
      heart.id = 'life' + i;
      document.querySelector('.right div').appendChild(heart);
    }
  }
}

document.querySelector('.again').addEventListener('click', restart());
