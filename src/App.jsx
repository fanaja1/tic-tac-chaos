import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(
    Array(5).fill().map(() => Array(5).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [offsetRow, setOffsetRow] = useState(0);
  const [offsetCol, setOffsetCol] = useState(0);

  function randomizeMap() {
    setOffsetRow(Math.floor(Math.random() * 3) - 1); // -1,0,1
    setOffsetCol(Math.floor(Math.random() * 3) - 1);
  }

  function handleClick(r, c) {
    if (board[r][c]) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      alert(`${winner} a gagné ! 😎`);
      // reset du board
      setBoard(Array(5).fill().map(() => Array(5).fill(null)));
      setOffsetRow(0);
      setOffsetCol(0);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    randomizeMap();
  }


  function checkWinner(board) {
    const size = board.length;
    const winCount = 4;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const player = board[r][c];
        if (!player) continue;

        // Horizontal
        if (c + winCount - 1 < size) {
          let win = true;
          for (let i = 0; i < winCount; i++) {
            if (board[r][c + i] !== player) win = false;
          }
          if (win) return player;
        }

        // Vertical
        if (r + winCount - 1 < size) {
          let win = true;
          for (let i = 0; i < winCount; i++) {
            if (board[r + i][c] !== player) win = false;
          }
          if (win) return player;
        }

        // Diagonale descendante (\)
        if (r + winCount - 1 < size && c + winCount - 1 < size) {
          let win = true;
          for (let i = 0; i < winCount; i++) {
            if (board[r + i][c + i] !== player) win = false;
          }
          if (win) return player;
        }

        // Diagonale montante (/)
        if (r - (winCount - 1) >= 0 && c + winCount - 1 < size) {
          let win = true;
          for (let i = 0; i < winCount; i++) {
            if (board[r - i][c + i] !== player) win = false;
          }
          if (win) return player;
        }
      }
    }

    return null;
  }

  return (
    <div className="container">
      <h1>Tic Tac Chaos 😈</h1>

      <div className="viewport">
        {/* Grille 5x5 */}
        <div
          className="map"
          style={{
            transform: `translate(${offsetCol * 20}%, ${offsetRow * 20}%)`
          }}
        >
          {board.map((row, rIndex) =>
            row.map((cell, cIndex) => (
              <div
                key={`${rIndex}-${cIndex}`}
                className="cell"
                onClick={() => handleClick(rIndex, cIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {/* Zone centrale 3x3 */}
        <div className="clear-overlay"></div>
      </div>

      {/* joueur courant */}
      <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>
        Joueur actuel : {currentPlayer}
      </p>
    </div>

  );
}

export default App;
