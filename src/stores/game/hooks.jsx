import { useSelector } from "react-redux";

export const useBoard = () => useSelector((state) => state.game.board);
export const useHighScore = () => useSelector((state) => state.game.highScore);
export const useScore = () => useSelector((state) => state.game.score);
export const useGameOver = () => useSelector((state) => state.game.gameOver);
export const useNumbers = () => useSelector((state) => state.game.numbers);
