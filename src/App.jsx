import { useState } from "react";
import "./App.css";

function App() {
  // Grille logique 4x4
  const [board, setBoard] = useState(
    Array(4).fill().map(() => Array(4).fill(null))
  );

  const [currentPlayer, setCurrentPlayer] = useState("X");

  // Position de la vue 3x3
  const [viewRow, setViewRow] = useState(0);
  const [viewCol, setViewCol] = useState(0);

  // Déplacer la vue aléatoirement
  function randomizeView() {
    setViewRow(Math.floor(Math.random() * 2));
    setViewCol(Math.floor(Math.random() * 2));
  }

  function handleClick(r, c) {
    if (board[r][c]) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = currentPlayer;

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    randomizeView(); // effet bizarre 😈
  }

  return (
    <div className="container">
      <h1>Tic Tac Chaos 😈</h1>

      <div className="grid">
        {board.slice(viewRow, viewRow + 3).map((row, rIndex) =>
          row.slice(viewCol, viewCol + 3).map((cell, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              className="cell"
              onClick={() =>
                handleClick(rIndex + viewRow, cIndex + viewCol)
              }
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <p>Player: {currentPlayer}</p>
    </div>
  );
}

export default App;
