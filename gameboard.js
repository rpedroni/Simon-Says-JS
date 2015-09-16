'use strict';

/*
  All visual aspects of game board and user interactions
*/

class GameBoard {

  constructor(numberOfButtons, cb) {

    // DOM manipulation
    let gameBoard = document.getElementById('game-board');
    let ledAndButton = document.getElementsByClassName('led-and-button')[0];
    this.message = document.getElementById('message');

    // Internals
    this.gameLeds = [];
    this.gameButtons = [];

    this.callback = cb;

    this.buttonsEnabled = false;

    for (let i = 0; i < numberOfButtons; i++) {
      let lab = ledAndButton.cloneNode(true);

      let button = lab.getElementsByClassName('game-button')[0];
      button.gameId = i;
      button.addEventListener('click', this.buttonClicked.bind(this));
      this.gameButtons.push(button);

      let led = lab.getElementsByClassName('led')[0];
      this.gameLeds.push(led);

      gameBoard.appendChild(lab);
    }
  }

  buttonClicked(button) {
    if (!this.buttonsEnabled) {
      console.warn('Buttons are disabled');
      return;
    }

    // Warn game which button index was pressed
    let buttonIndex = button.target.gameId;
    this.callback(buttonIndex)

    // "Light" led up
    this._lightUpLed(buttonIndex, 100)
  }

  // Enable/disable button pressing
  enableButtons() {
    this.message.textContent = "Your Turn!";
    this.buttonsEnabled = true;
  }
  disableButtons() {
    this.buttonsEnabled = false;
  }

  // "Light" led up
  _lightUpLed(index, time, done) {
    let led = this.gameLeds[index];
    led.classList.add('on');
    setTimeout(() => {
      led.classList.remove('on');
      if (done) done();
    }, time);
  }
  _lightUpLedsForSteps(steps, done) {
    if (steps.length > 0) {
      this._lightUpLed(steps[0], 650, () => {
        this._lightUpLedsForSteps(steps.slice(1), done);
      });
    } else {
      done();
    }
  }

  displaySteps(steps, done) {
    this.message.textContent = "Wait..";
    this._lightUpLedsForSteps(steps, done);
  }

  victory() {
    this.message.textContent = "Yahoo! Victory!";
    this.disableButtons();
  }
  defeat() {
    this.message.textContent = "Damn, you lose :(";
    this.disableButtons();
  }

}
