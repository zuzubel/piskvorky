'use strict';

let currentPlayer = 'circle';
const gameArea = document.querySelector('.gameArea');
let currentPlayerImg = document.querySelector('#currentPlayerImg');

gameArea.addEventListener('click', (event) => {
  if (
    event.target.className === 'board__field--circle' ||
    event.target.className === 'board__field--cross'
  ) {
    console.log('sorry plno');
  } else if (currentPlayer === 'circle') {
    event.target.className = 'board__field--circle';
    currentPlayer = 'cross';
    currentPlayerImg.src = 'cross.svg';
  } else if (currentPlayer === 'cross') {
    event.target.className = 'board__field--cross';
    currentPlayer = 'circle';
    currentPlayerImg.src = 'circle.svg';
  }
});

/* dodělat bod VI. aby nešly přepisovat už vybrané tlačítka */
