'use strict';

const button = document.querySelector('.gameAreaButton');

let currentPlayer = 'circle';
const gameArea = document.querySelector('.gameArea');
let currentPlayerImg = document.querySelector('#currentPlayerImg');
const boardSize = 10;
const fields = document.querySelectorAll('.gameAreaButton');

gameArea.addEventListener('click', (event) => {
  if (currentPlayer === 'circle') {
    event.target.setAttribute('disabled', true);
    event.target.className = 'board__field--circle';
    currentPlayer = 'cross';
    currentPlayerImg.src = 'cross.svg';
  } else {
    event.target.setAttribute('disabled', true);
    event.target.className = 'board__field--cross';
    currentPlayer = 'circle';
    currentPlayerImg.src = 'circle.svg';
  }
  if (isWinningMove(event.target)) {
    //přidání funkce na ověření výhry
    const result = confirm(
      `Vyhrává tým${
        getSymbol(event.target) === 'circle' ? ' kolečka' : ' křížek'
      }`,
    );
    if (result === true) {
      return window.location.reload(); //jestli klikne uživatel OK, aktualizuje se stránka
    }
  }
});

//funkce, která pro dané políčko vrátí objekt s číslem řádku a sloupce
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      //field je hodnota kterou předám této funkci na vstupu. Fields jsou všechna tlačítka. If hodnota na vstupu se bude rovnat tlačítku na kterém je zrovna tento cyklus
      break;
    }
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

//funkce, která pro číslo řádku a sloupce vrátí příslušný prvek
const getField = (row, column) => {
  return fields[row * boardSize + column];
};

//funkce, která pro políčko s křížkem vrátí řetězec "cross" nebo "circle" a pro neobsazené políčko undefined
const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

//zjisti př každém tahu, jestli se nejedná o výherní tah. Funkce, která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Vrátí true nebo false
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
