// Obtenez les éléments de grille du jeu
const blocks = document.querySelectorAll('.block');
const winnerDisplay = document.getElementById('winner');
const replayButton = document.querySelector('button');

let currentPlayer = 'X'; //stock le symbole du joeur actuel X ou O
let gameOver = false; //indique si le jeu est terminé 

/* Fonction pour réinitialiser le jeu en effaçant le contenu dans les cases 
et en remettant les variables à leurs valeurs initiales*/
function resetGame() {
  blocks.forEach(block => {
    block.textContent = '';
    block.classList.remove('occupied', 'win-block');
  });
  winnerDisplay.textContent = '';
  gameOver = false; // indique si le jeu es temriné ou pas
  currentPlayer = 'X'; // stock le symbole du joueur actuel
}

// Fonction pour vérifier s'il y a un gagnant en parcourant les diff conditions
function checkWinner() {
  const winningConditions = [ //si l'une des cases est remplies victoire 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      blocks[a].textContent &&
      blocks[a].textContent === blocks[b].textContent &&
      blocks[a].textContent === blocks[c].textContent
    ) {
      blocks[a].classList.add('win-block');
      blocks[b].classList.add('win-block');
      blocks[c].classList.add('win-block');
      return blocks[a].textContent;
    }
  }

  if ([...blocks].every(block => block.textContent !== '')) {
    return 'Egalité';
  }

  return null;
}





// Fonction pour gérer le tour de l'IA (Minimax)
function AIMove() {
  if (gameOver) return;

  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].textContent === '') {
      blocks[i].textContent = 'O';
      let score = minimax(blocks, 0, false);
      blocks[i].textContent = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  if (move !== undefined) {
    blocks[move].textContent = 'O';
    blocks[move].classList.add('occupied');
    currentPlayer = 'X';
    let result = checkWinner();
    if (result) {
      if (result === 'tie') {
      gameOver = true;
      } else {
        winnerDisplay.textContent = `Le joueur ${result} a gagné !`;
        winnerDisplay.style.fontSize = '80px';
        winnerDisplay.style.color = 'back';
        winnerDisplay.style.fontFamily = 'Arial, sans-serif';
        winnerDisplay.classList.add('fullscreen-winner');
        setTimeout(() => {
            winnerDisplay.classList.remove('fullscreen-winner'); // Retirer la classe après 5 secondes
            winnerDisplay.textContent = ``; 
          }, 1700);
      }
      gameOver = true;
    }
  }
}

// Fonction de l'algorithme Minimax
function minimax(blocks, depth, isMaximizing) {
  let result = checkWinner();
  if (result) {
    if (result === 'X') {
      return -10 + depth;
    } else if (result === 'O') {
      return 10 - depth;
    } else {
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].textContent === '') {
        blocks[i].textContent = 'O';
        let score = minimax(blocks, depth + 1, false);
        blocks[i].textContent = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].textContent === '') {
        blocks[i].textContent = 'X';
        let score = minimax(blocks, depth + 1, true);
        blocks[i].textContent = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Ajouter des écouteurs d'événements pour les clics sur les cases
blocks.forEach(block => {
  block.addEventListener('click', () => {
    if (!gameOver && block.textContent === '') {
      block.textContent = currentPlayer;
      block.classList.add('occupied');
      let result = checkWinner();
      if (result) {
        if (result === 'tie') {
        } else {
          winnerDisplay.textContent = `Égalité !`;
          winnerDisplay.style.fontSize = '80px';
          winnerDisplay.style.color = 'black';
          winnerDisplay.style.fontFamily = 'Arial, sans-serif';
          winnerDisplay.classList.add('fullscreen-winner');  
          setTimeout(() => {
            winnerDisplay.classList.remove('fullscreen-winner'); // Retirer la classe après 5 secondes
            winnerDisplay.textContent = ``;          
          }, 1700);      
      gameOver = true;
        }
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        AIMove();
      }
    }
  });
});

// Ajouter un écouteur d'événement pour le bouton de rejeu
replayButton.addEventListener('click', resetGame);

// Démarrez le jeu
resetGame();