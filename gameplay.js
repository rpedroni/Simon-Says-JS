'use strict';

/*
  MOVES: sequence of steps user must later input correctly. Each move subsequente move has one aditional step
  STEPS: each random position (led & button) user must try to remember. Move #1 has 1 step, move #2 has 2 steps, etc.
*/

// Constants
const NUMBER_BUTTONS = 5;
const NUMBER_MOVES = 10;
const TIMING = {
  STEP_ON: 2000,
  STEP_OFF: 500
};

let game = new Game({
  numberOfMoves: NUMBER_MOVES,
  numberOfButtons: NUMBER_BUTTONS,
});

game.startGame();
