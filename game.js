'use strict';

// General game object
class Game {

  constructor(config) {
    this.stepValues = [];
    this.numberOfMoves = config.numberOfMoves;
    this.numberOfButtons = config.numberOfButtons;

    this.resetGame();

    // Instantiate a new game board
    this.gameBoard = new GameBoard(this.numberOfButtons, this.userInputButtonPressed.bind(this));
  }
  resetGame() {
    this.moveNumber = 0;
    this.currentStep = 0;
  }

  // Some button was pressed
  // Check if user inputs correct sequence
  userInputButtonPressed(index) {
    // Compare button pressed with correct step value
    if (index === this.stepValues[this.currentStep]) {
      // Correct! Check next step or begin next move
      this.currentStep++;
      // If step is larger than move, this turn is over
      if (this.currentStep > this.moveNumber) {
        // Reset steps
        this.currentStep = 0;
        // Increment move
        this.moveNumber++;
        // End game or go to next move
        if (this.moveNumber === this.numberOfMoves) {
          // Victory!
          this.gameBoard.victory();
        } else {
          // Disable buttons
          // Go to next move
          this.gameBoard.disableButtons();
          this.makeNewMove();
        }
      }
    }
    // Wrong input!
    else {
      // Defeat!
      this.gameBoard.defeat();
    }
  }

  // Dummy function to just start the game
  startGame() {
    // Make a new move
    this.makeNewMove();
  }

  // Let's make a new move
  makeNewMove() {

    // Get random value
    let position = this._randomPosition(this.numberOfButtons);
    // Save it
    this.stepValues.push(position);

    // Tell game board to show all steps and on completion, enable buttons
    this.gameBoard.displaySteps(this.stepValues, () => {
      this.gameBoard.enableButtons();
    });
  }


  // Return random index from [0, max - 1]
  _randomPosition(max) {
    return Math.ceil(Math.random() * max) - 1;
  }

}
