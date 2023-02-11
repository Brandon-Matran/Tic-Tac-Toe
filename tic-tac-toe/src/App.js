import React, { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Scoreboard } from "./components/Scoreboard";
import { ResetButton } from "./components/ResetButton";
function App() {
  const WIN_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, i) => {
      if (i === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });
    checkWinner(updatedBoard);
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = score;
        oScore += 1;
        setScore({ ...score, oScore });
      } else {
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore });
      }
    }

    setBoard(updatedBoard);

    setXPlaying(!xPlaying);
  };
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [x, y, z] = WIN_CONDITION[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }
  return (
    <div>
      <Scoreboard score={score} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard: handleBoxClick} />
      <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
