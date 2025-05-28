import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeGame() {
  /**
   * This is the Main Container for the TicTacToe Classic game.
   * - Implements two local players (X and O), automatic win/draw detection, and game restart.
   * - Uses the specified light theme and color palette provided by requirements.
   */
  const EMPTY_BOARD = Array(9).fill(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Helper to determine winner or draw
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Handle a cell (square) click
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (board[idx] || winner) return; // Ignore if occupied or game ended

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);

    const win = calculateWinner(nextBoard);
    if (win) {
      setWinner(win);
      setIsDraw(false);
      return;
    }
    if (nextBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    }
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  }

  // Status display logic
  let status;
  if (winner) {
    status = (
      <span className="ttt-status-winner">
        Winner: <span>{winner}</span>
      </span>
    );
  } else if (isDraw) {
    status = <span className="ttt-status-draw">Draw!</span>;
  } else {
    status = (
      <span className="ttt-status-turn">
        Next Turn: <span>{xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  // Render single cell
  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleClick(idx)}
        aria-label={`Cell ${idx + 1}`}
        disabled={Boolean(board[idx] || winner)}
        tabIndex="0"
        key={idx}
      >
        {board[idx]}
      </button>
    );
  }

  // Board rendering (3x3 grid)
  const grid = (
    <div className="ttt-board">
      {Array(3)
        .fill(0)
        .map((_, row) => (
          <div className="ttt-row" key={row}>
            {[0, 1, 2].map(col => renderCell(row * 3 + col))}
          </div>
        ))}
    </div>
  );

  return (
    <div className="ttt-main-container">
      <h2 className="ttt-title">Tic Tac Toe Classic</h2>
      <div className="ttt-status">{status}</div>
      {grid}
      <button className="ttt-restart-btn" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToeGame;
