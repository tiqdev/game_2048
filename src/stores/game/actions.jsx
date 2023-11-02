import store from "..";
import { Howl } from "howler";
import {
  _setBoard,
  _setHighScore,
  _setScore,
  _setGameOver,
  _setNumbers,
  _setIsMuted,
} from ".";

export const swipe = new Howl({
  src: ["/sounds/swipe.mp3"],
  volume: 1,
  loop: false,
  preload: true,
});

export const newgame_sound = new Howl({
  src: ["/sounds/button-press.wav"],
  volume: 1,
  loop: false,
  preload: true,
});

export const setBoard = (board) => {
  store.dispatch(_setBoard(board));
};

export const setHighScore = (highScore) => {
  store.dispatch(_setHighScore(highScore));
};

export const setScore = (score) => {
  store.dispatch(_setScore(score));
};

export const setGameOver = (gameOver) => {
  store.dispatch(_setGameOver(gameOver));
};

export const setNumbers = (numbers) => {
  store.dispatch(_setNumbers(numbers));
};

export const addNumberToRandomPlace = () => {
  let board = store.getState().game.board;
  let numbers = store.getState().game.numbers;

  let emptyCells = [];

  board.forEach((row, row_index) => {
    row.forEach((cell, cell_index) => {
      if (cell === 0) {
        emptyCells.push({ row: row_index, column: cell_index });
      }
    });
  });

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  if (randomCell === undefined) {
    return;
  }

  let randomRow = randomCell.row;
  let randomColumn = randomCell.column;

  let randomNumber = Math.random() < 0.9 ? 2 : 4;

  let newBoard = board.map((row, row_index) => {
    return row.map((cell, cell_index) => {
      if (row_index === randomRow && cell_index === randomColumn) {
        return randomNumber;
      } else {
        return cell;
      }
    });
  });

  newBoard[randomRow][randomColumn] = randomNumber;

  setBoard(newBoard);
  setNumbers(numbers);
};

export const resetGame = () => {
  let numbers = store.getState().game.numbers;

  let newBoard = [...Array(4)].map(() => [...Array(4)].map(() => 0));

  setBoard(newBoard);
  setScore(0);
  setGameOver(false);
  addNumberToRandomPlace();
  addNumberToRandomPlace();
  setNumbers(numbers);
};

export const moveLeft = () => {
  let board = store.getState().game.board;
  let score = store.getState().game.score;
  let highScore = store.getState().game.highScore;
  let numbers = store.getState().game.numbers;

  let newBoard = board.map((row) => {
    let newRow = row.filter((cell) => cell !== 0);

    for (let i = 0; i < newRow.length; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] = newRow[i] * 2;
        newRow[i + 1] = 0;
        score += newRow[i];
      }
    }

    newRow = newRow.filter((cell) => cell !== 0);

    while (newRow.length < 4) {
      newRow.push(0);
    }

    return newRow;
  });

  if (score > highScore) {
    highScore = score;
    setHighScoreToLocalStorage(highScore);
  }

  setBoard(newBoard);
  setScore(score);
  setHighScore(highScore);
  isGameOver();
  setNumbers(numbers);
};

export const moveRight = () => {
  let board = store.getState().game.board;
  let score = store.getState().game.score;
  let highScore = store.getState().game.highScore;
  let numbers = store.getState().game.numbers;

  let newBoard = board.map((row) => {
    let newRow = row.filter((cell) => cell !== 0);

    for (let i = newRow.length - 1; i >= 0; i--) {
      if (newRow[i] === newRow[i - 1]) {
        newRow[i] = newRow[i] * 2;
        newRow[i - 1] = 0;
        score += newRow[i];
      }
    }

    newRow = newRow.filter((cell) => cell !== 0);

    while (newRow.length < 4) {
      newRow.unshift(0);
    }

    return newRow;
  });

  if (score > highScore) {
    highScore = score;
    setHighScoreToLocalStorage(highScore);
  }

  setBoard(newBoard);
  setScore(score);
  setHighScore(highScore);
  isGameOver();
  setNumbers(numbers);
};

export const moveUp = () => {
  let board = store.getState().game.board;
  let score = store.getState().game.score;
  let highScore = store.getState().game.highScore;
  let numbers = store.getState().game.numbers;

  let newBoard = board.map((row, row_index) => {
    let column = [...Array(row.length)].map(
      (_, index) => board[index][row_index]
    );

    let newColumn = column.filter((cell) => cell !== 0);

    for (let i = newColumn.length - 1; i >= 0; i--) {
      if (newColumn[i] === newColumn[i - 1]) {
        newColumn[i] = newColumn[i] * 2;
        newColumn[i - 1] = 0;
        score += newColumn[i];
      }
    }

    newColumn = newColumn.filter((cell) => cell !== 0);

    while (newColumn.length < 4) {
      newColumn.push(0);
    }

    return newColumn;
  });

  let modifiedBoard = newBoard.map((row, row_index) => {
    let modified_row = [...Array(row.length)].map(
      (_, index) => newBoard[index][row_index]
    );

    return modified_row;
  });

  if (score > highScore) {
    highScore = score;
    setHighScoreToLocalStorage(highScore);
  }

  setBoard(modifiedBoard);
  setScore(score);
  setHighScore(highScore);
  isGameOver();
  setNumbers(numbers);
};

export const moveDown = () => {
  let board = store.getState().game.board;
  let score = store.getState().game.score;
  let highScore = store.getState().game.highScore;
  let numbers = store.getState().game.numbers;

  let newBoard = board.map((row, row_index) => {
    let column = [...Array(row.length)].map(
      (_, index) => board[index][row_index]
    );

    let newColumn = column.filter((cell) => cell !== 0);

    for (let i = 0; i < newColumn.length; i++) {
      if (newColumn[i] === newColumn[i + 1]) {
        newColumn[i] = newColumn[i] * 2;
        newColumn[i + 1] = 0;
        score += newColumn[i];
      }
    }

    newColumn = newColumn.filter((cell) => cell !== 0);

    while (newColumn.length < 4) {
      newColumn.unshift(0);
    }

    return newColumn;
  });

  let modifiedBoard = newBoard.map((row, row_index) => {
    let modified_row = [...Array(row.length)].map(
      (_, index) => newBoard[index][row_index]
    );

    return modified_row;
  });

  if (score > highScore) {
    highScore = score;
    setHighScoreToLocalStorage(highScore);
  }

  setBoard(modifiedBoard);
  setScore(score);
  setHighScore(highScore);
  isGameOver();
  setNumbers(numbers);
};

export const getHighScore = () => {
  //get data from local storage
  let highScore = window.localStorage.getItem("highScore");

  //if there is no data in local storage
  if (highScore === null) {
    //set high score to 0
    highScore = 0;
  }
  setHighScore(highScore);
};

export const setHighScoreToLocalStorage = (highScore) => {
  window.localStorage.setItem("highScore", highScore);
};

export const isGameOver = () => {
  let board = store.getState().game.board;
  let gameOver = store.getState().game.gameOver;

  let gameOverCheck = board.every((row) => {
    return row.every((cell) => cell !== 0);
  });

  let isLeftMovePossible = board.some((row, row_index) => {
    return row.some((cell, cell_index) => {
      if (cell === board[row_index][cell_index - 1]) {
        swipe.play();
        return true;
      } else {
        return false;
      }
    });
  });

  let isRightMovePossible = board.some((row, row_index) => {
    return row.some((cell, cell_index) => {
      if (cell === board[row_index][cell_index + 1]) {
        swipe.play();
        return true;
      } else {
        return false;
      }
    });
  });

  let isUpMovePossible = board.some((row, row_index) => {
    let column = [...Array(row.length)].map(
      (_, index) => board[index][row_index]
    );

    return column.some((cell, cell_index) => {
      if (cell === column[cell_index - 1]) {
        swipe.play();
        return true;
      } else {
        return false;
      }
    });
  });

  let isDownMovePossible = board.some((row, row_index) => {
    let column = [...Array(row.length)].map(
      (_, index) => board[index][row_index]
    );

    return column.some((cell, cell_index) => {
      if (cell === column[cell_index + 1]) {
        swipe.play();
        return true;
      } else {
        return false;
      }
    });
  });

  if (
    gameOverCheck &&
    !isLeftMovePossible &&
    !isRightMovePossible &&
    !isUpMovePossible &&
    !isDownMovePossible
  ) {
    gameOver = true;
  }

  setGameOver(gameOver);
};

export const setIsMuted = (value) => {
  store.dispatch(_setIsMuted(value));

  swipe.mute(value === "on" ? false : true);
  newgame_sound.mute(value === "on" ? false : true);

  window.localStorage.setItem("sound", value);
};
