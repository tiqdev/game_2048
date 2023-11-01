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
import Div100vh from "react-div-100vh";
import { useSwipeable } from "react-swipeable";

const Home = () => {
  //When game starts, we add two numbers to the board and get Highscore from local storage
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

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      moveLeft();
      addNumberToRandomPlace();
    },
    onSwipedRight: () => {
      moveRight();
      addNumberToRandomPlace();
    },
    onSwipedUp: () => {
      moveUp();
      addNumberToRandomPlace();
    },
    onSwipedDown: () => {
      moveDown();
      addNumberToRandomPlace();
    },
    ...config,
  });

  return (
    <Div100vh
      {...handlers}
      className="flex flex-col items-center justify-center h-screen w-full bg-colorBg gap-4"
    >
      <div className="flex  w-full max-w-[300px] items-center justify-between relative mb-4">
        <h1 className="text-4xl font-medium text-[#f5faff] flex-1 tracking-widest text-center">
          2048
        </h1>
        <VscDebugRestart
          onClick={() => {
            resetGame();
          }}
          className="cursor-pointer text-2xl text-[#f5faff] absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>

      {/* Score */}
      <div className="flex w-full max-w-[300px] items-center justify-between">
        <div
          className={classNames(
            "flex items-center justify-center gap-2 font-medium tracking-wide",
            {
              "text-[#f5faff]": score < highScore,
              "text-color128": score >= highScore,
            }
          )}
        >
          <span>SCORE</span>
          <span>{score}</span>
        </div>

        <div
          className={classNames("flex items-center justify-center gap-2", {
            "text-[#f5faff]": score < highScore,
            "text-color128": score >= highScore,
          })}
        >
          <span className="font-normal tracking-wide">{highScore}</span>
          <BsFillTrophyFill className="text-2xl" />
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-3 p-3 h-[316px] bg-colorBoard rounded-board shadow-board relative">
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
                className="relative"
                key={row_index}
              >
                <div
                  className="w-16 h-16 rounded-cell flex items-center justify-center z-10 relative"
                  style={{
                    backgroundColor: numbers.find(
                      (number) => number.value === board[col_index][row_index]
                    ).color,
                  }}
                >
                  <span
                    className={classNames(
                      "text-[#f5faff] font-medium tracking-wide text-center",
                      {
                        "text-[30px]": board[col_index][row_index] < 1024,
                        "text-[24px]":
                          1024 < board[col_index][row_index] < 10000,
                        "text-[18px]": 10000 < board[col_index][row_index],
                      }
                    )}
                  >
                    {board[col_index][row_index]}
                  </span>
                </div>
                <div
                  className="w-16 h-[68px] rounded-cell flex items-center justify-center absolute top-0 left-0 z-0"
                  style={{
                    backgroundColor: numbers.find(
                      (number) => number.value === board[col_index][row_index]
                    ).color,
                    filter: "brightness(0.8)",
                  }}
                ></div>
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
          <div className="absolute top-0 left-0 w-full h-full flex items-center z-20 justify-center bg-[#f5faff] bg-opacity-80 rounded-board">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-colorBg text-2xl font-bold tracking-wide">
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
    </Div100vh>
  );
};

export default Home;
