import { useEffect } from "react";
import { useKeyboard } from "~/hooks/useKeyboard";
import { motion } from "framer-motion";
import {
  addNumberToRandomPlace,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "~/stores/game/actions";
import { useBoard, useNumbers } from "~/stores/game/hooks";

const Home = () => {
  useEffect(() => {
    addNumberToRandomPlace();
    addNumberToRandomPlace();
  }, []);

  let board = useBoard();
  let numbers = useNumbers();

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
    <div className="flex flex-col items-center justify-center h-screen w-full bg-colorBg gap-4 ">
      <h1 className="text-4xl font-bold text-white">2048 Game</h1>

      {/* Board */}
      <div className="grid grid-cols-4 gap-3 p-3 bg-colorBoard rounded-board shadow-board">
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
                className="w-20 h-20 rounded-cell flex items-center justify-center"
                style={{
                  backgroundColor: numbers.find(
                    (number) => number.value === board[col_index][row_index]
                  ).color,
                }}
              >
                <span className="text-[30px] text-white font-medium">
                  {board[col_index][row_index]}
                </span>
              </motion.div>
            ) : (
              <div
                key={row_index}
                className="w-20 h-20 rounded-cell flex items-center justify-center bg-colorCell"
              ></div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Home;

/*
 <div
            key={index}
            className="w-20 h-20 rounded-cell flex items-center justify-center bg-colorCell"
          >
            {duo[0] === index || duo[1] === index ? (
              <span className="text-[20px] text-white">2</span>
            ) : null}
          </div>
*/
