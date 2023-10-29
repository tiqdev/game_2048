import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    numbers: [
        {
            value: 2,
            color: '#06434C'
        },
        {
            value: 4,
            color: '#116073'
        },
        {
            value: 8,
            color: '#0C7F96'
        },
        {
            value: 16,
            color: '#109687'
        },
        {
            value: 32,
            color: '#3EB26B'
        },
        {
            value: 64,
            color: '#91C357'
        },
        {
            value: 128,
            color: '#E0B237'
        },
        {
            value: 256,
            color: '#DD9351'
        },
        {
            value: 512,
            color: '#D85E69'
        },
        {
            value: 1024,
            color: '#BE639B'
        },
        {
            value: 2048,
            color: '#AA7ABF'
        },
    ],
    highScore: 0,
    score: 0,
    gameOver: false,
}

const game = createSlice({
    name: 'game',
    initialState,
    reducers: {
        _setBoard: (state, action) => {
            state.board = action.payload;
        },

        _setNumbers: (state, action) => {
            state.numbers = action.payload;
        },

        _setHighScore: (state, action) => {
            state.highScore = action.payload;
        },

        _setScore: (state, action) => {
            state.score = action.payload;
        },

        _setGameOver: (state, action) => {
            state.gameOver = action.payload;
        }
    }
})

export const {
    _setBoard,
    _setHighScore,
    _setScore,
    _setGameOver,
    _setNumbers,
} = game.actions;

export default game.reducer;
