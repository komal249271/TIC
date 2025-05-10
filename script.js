const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerText = document.getElementById('winnerText');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isCircleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    cell.textContent = '';
  });
  winnerText.textContent = '';
  message.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';
  cell.classList.add(currentClass);
  cell.textContent = currentClass;

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index =>
      cells[index].classList.contains(currentClass)
    );
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('X') || cell.classList.contains('O')
  );
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = " Match Draw!";
  } else {
    winnerText.textContent = ` ${isCircleTurn ? 'O' : 'X'} Wins!`;
  }
  message.classList.add('show');

  
  setTimeout(() => {
    location.reload();
  }, 2000);
}
