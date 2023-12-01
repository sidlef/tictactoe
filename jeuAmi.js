const blocks = document.querySelectorAll('.block');
const winnerDisplay = document.getElementById('winner');
const replayButton = document.querySelector('button');


document.addEventListener("DOMContentLoaded", function() {
    const blocks = document.querySelectorAll('.block');
    let currentPlayer = 'X';
    let moves = 0;
    let gameOver = false;
  
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
      [0, 4, 8], [2, 4, 6] // diagonales
    ];
  
    const winnerDisplay = document.getElementById('winner');
  
    blocks.forEach(block => {
        block.addEventListener('click', () => {
          if (!gameOver && block.textContent === '') {
            block.textContent = currentPlayer;
            block.classList.add('occupied');
            let result = checkWinner();
            if (result) {
              if (result === 'tie') {
              } else {
                winnerDisplay.textContent = `Le joueur ${result} a gagné !`;
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
  
    function checkWinner() {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (blocks[a].textContent !== '' &&
            blocks[a].textContent === blocks[b].textContent &&
            blocks[a].textContent === blocks[c].textContent) {
          return currentPlayer;
        }
      }
  
      moves++;
      if (moves === 9) {
        return 'Egalité';
      }
  
      return null;
    }

    function resetGame() {
        blocks.forEach(block => {
          block.textContent = '';
          block.classList.remove('occupied', 'win-block');
        });
        winnerDisplay.textContent = '';
        gameOver = false; // Indique si le jeu est terminé ou pas
        currentPlayer = 'X'; // Stocke le symbole du joueur actuel
      }
      
      // Ajouter un écouteur d'événement pour le bouton de rejeu
      replayButton.addEventListener('click', resetGame);
    
  });

  resetGame();