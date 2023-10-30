import { useEffect } from "react";
import { useKeyboard } from "~/hooks/useKeyboard";
import { motion } from "framer-motion";
import { BsFillTrophyFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import {
  addNumberToRandomPlace,
  getHighScore,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  resetGame,
} from "~/stores/game/actions";
import {
  useBoard,
  useGameOver,
  useHighScore,
  useNumbers,
  useScore,
} from "~/stores/game/hooks";
import classNames from "classnames";

const Home = () => {
  useEffect(() => {
    getHighScore();
    addNumberToRandomPlace();
    addNumberToRandomPlace();
  }, []);

  let board = useBoard();
  let numbers = useNumbers();
  let score = useScore();
  let highScore = useHighScore();
  let gameOver = useGameOver();

  useKeyboard((event) => {
    switch (event.key) {
      case "ArrowLeft":
        moveLeft();
        addNumberToRandomPlace();
        break;
      case "ArrowRight":
        moveRight();
        addNumberToRandomPlace();
        break;
      case "ArrowUp":
        moveUp();
        addNumberToRandomPlace();
        break;
      case "ArrowDown":
        moveDown();
        addNumberToRandomPlace();
        break;
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-colorBg gap-4">
      <div className="flex  w-full max-w-[300px] items-center justify-between relative mb-4">
        <h1 className="text-4xl font-bold text-white flex-1 text-center">
          2048
        </h1>
        <VscDebugRestart
          onClick={() => {
            resetGame();
          }}
          className="cursor-pointer text-2xl text-white absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>

      {/* Score */}
      <div className="flex  w-full max-w-[300px]  items-center justify-between">
        <div
          className={classNames(
            "flex items-center justify-center gap-2 font-medium",
            {
              "text-white": score < highScore,
              "text-color128": score >= highScore,
            }
          )}
        >
          <span>SCORE</span>
          <span>{score}</span>
        </div>

        <div
          className={classNames("flex items-center justify-center gap-2", {
            "text-white": score < highScore,
            "text-color128": score >= highScore,
          })}
        >
          <span className="font-medium">{highScore}</span>
          <BsFillTrophyFill className="text-2xl" />
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-3 p-3 bg-colorBoard rounded-board shadow-board relative">
        {board.map((col, col_index) =>
          col.map((row, row_index) =>
            board[col_index][row_index] !== 0 ? (
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                key={row_index}
                className="w-16 h-16 rounded-cell flex items-center justify-center"
                style={{
                  backgroundColor: numbers.find(
                    (number) => number.value === board[col_index][row_index]
                  ).color,
                }}
              >
                <span
                  className={classNames("text-white font-medium", {
                    "text-[30px]": board[col_index][row_index] < 1024,
                    "text-[24px]": 1024 < board[col_index][row_index] < 10000,
                    "text-[18px]": 10000 < board[col_index][row_index],
                  })}
                >
                  {board[col_index][row_index]}
                </span>
              </motion.div>
            ) : (
              <div
                key={row_index}
                className="w-16 h-16 rounded-cell flex items-center justify-center bg-colorCell"
              ></div>
            )
          )
        )}

        {gameOver && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 rounded-board">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-colorBg text-2xl font-bold">
                Game Over!
              </span>
              <button
                onClick={() => {
                  resetGame();
                }}
                className="bg-colorAccent text-colorBg px-4 py-2 rounded"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
