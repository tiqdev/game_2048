import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    numbers: [
        {
            value: 2,
            color: '#ff636c'
        },
        {
            value: 4,
            color: '#ba2941'
        },
        {
            value: 8,
            color: '#d9472b'
        },
        {
            value: 16,
            color: '#992349'
        },
        {
            value: 32,
            color: '#501733'
        },
        {
            value: 64,
            color: '#71323c'
        },
        {
            value: 128,
            color: '#ae7069'
        },
        {
            value: 256,
            color: '#ff9f2e'
        },
        {
            value: 512,
            color: '#f86c27'
        },
        {
            value: 1024,
            color: '#ba3872'
        },
        {
            value: 2048,
            color: '#6c2b68'
        },
        {
            value: 4096,
            color: '#6c2b68'
        },
        {
            value: 8192,
            color: '#6c2b68'
        },
        {
            value: 16384,
            color: '#6c2b68'
        },
        {
            value: 32768,
            color: '#6c2b68'
        },
        {
            value: 65536,
            color: '#6c2b68'
        },
        {
            value: 131072,
            color: '#6c2b68'
        },
        {
            value: 262144,
            color: '#6c2b68'
        },
        {
            value: 524288,
            color: '#6c2b68'
        },
        {
            value: 1048576,
            color: '#6c2b68'
        },
        {
            value: 2097152,
            color: '#6c2b68'
        },

    ],
    highScore: 0,
    score: 0,
    gameOver: false,
    isMuted: false,
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
        },
        _setIsMuted: (state, action) => {
            state.isMuted = action.payload;
        }

    }
})

export const {
    _setBoard,
    _setHighScore,
    _setScore,
    _setGameOver,
    _setNumbers,
    _setIsMuted
} = game.actions;

export default game.reducer;
