
// Enum with helper function
const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
  toString: (val) => ["Rock", "Paper", "Scissors"][val],
  toInt: (val) => ["Rock", "Paper", "Scissors"].indexOf(val)
}

// UI Elements
const playerPrevChoiceImage = document.getElementById("prev_choice")
const playerChoiceImage = document.getElementById("player_choice_image")
const playerNextChoiceImage = document.getElementById("next_choice")
const computerChoiceImage = document.getElementById("computer_choice_image")
const playerChoice = document.getElementById("choice")
const playerScoreUI = document.getElementById("player_score")
const computerScoreUI = document.getElementById("computer_score")
const winnerText = document.getElementById("winner-text")
const winnerTextDescription = document.getElementById("winner-text-description")

class Game {
  constructor(gameUI) {
    this.playerScore = 0
    this.computerScore = 0
    this.playerChoice = 0
    this.computerChoice = null
    this.gameUI = gameUI
  }

  // Retruns computer choise
  getComputerChoice() {
    // Generates a random number between 0 to how many choices there are
    // Length - 3 (because there are 2 helper functions inside the enum CHOICES)
    this.computerChoice = Math.floor(Math.random() * (Object.keys(CHOICES).length - 3))
    // Updates computer choice UI
    this.gameUI.changeChoiceImage(computerChoiceImage, this.computerChoice)
    return this.computerChoice
  }

  // Returns player choice
  getPlayerChoice() {
    return this.playerChoice
  }

  // Returns who the winner is
  whoWon() {
    // Guard clause in case of tie
    if (this.computerChoice == this.playerChoice) return "TIE"

    // 0 - Rock, 1 - Paper, 2 - Scissor
    switch (this.computerChoice) {
      case CHOICES.ROCK:
        return this.playerChoice == CHOICES.SCISSORS ? "COMPUTER" : "PLAYER"
      case CHOICES.PAPER:
        return this.playerChoice == CHOICES.ROCK ? "COMPUTER" : "PLAYER"
      case CHOICES.SCISSORS:
        return this.playerChoice == CHOICES.PAPER ? "COMPUTER" : "PLAYER"
      default:
        return "Something went wrong"
    }
  }

  updateScore(winner) {
    if (winner === "TIE") return
    winner === "PLAYER" ? this.playerScore++ : this.computerScore++
  }
  
  round() {
    try {
      this.getPlayerChoice()
    } catch (error) {
      alert("Please select Rock, Paper or Scissors before playing.")
      return
    }
    this.getComputerChoice()
    const winner = this.whoWon()
    this.updateScore(winner)
    this.gameUI.updateScoreUI(this.playerScore, this.computerScore)
    this.gameUI.updateGameUI(winner, this.playerChoice, this.computerChoice)

    if (this.computerScore === 5 || this.playerScore === 5) {
      alert(`Game Finished - ${winner} won!`)
      this.reset()
    }
  }

  reset() {
    this.playerScore = 0
    this.computerScore = 0
    this.playerChoice = 0
    this.gameUI.resetGameUI(this.playerScore, this.computerScore)
  }
}

class GameUI {
  updateScoreUI(playerScore, computerScore) {
    playerScoreUI.textContent = `Player: ${playerScore}`
    computerScoreUI.textContent = `Computer: ${computerScore}`
  }

  updateGameUI(winner, playerChoice, computerChoice) {
    switch (winner) {
      case "COMPUTER":
        winnerText.textContent = "Computer wins!";
        winnerTextDescription.textContent = `${CHOICES.toString(computerChoice)} beats ${CHOICES.toString(playerChoice)}`;
        break;
      case "PLAYER":
        winnerText.textContent = "Player wins!";
        winnerTextDescription.textContent = `${CHOICES.toString(playerChoice)} beats ${CHOICES.toString(computerChoice)}`;
        break;
      case "TIE":
        winnerText.textContent = "It´s a tie!";
        winnerTextDescription.textContent = `${CHOICES.toString(playerChoice)} ties with ${CHOICES.toString(computerChoice)}`;
        break;
      default:
        break;
    }
  }

  resetGameUI(playerScore, computerScore) {
    winnerText.textContent = "Choose your hand!"
    winnerTextDescription.textContent = "First to get 5 points wins"
    changeOption(0)
    this.updateScoreUI(playerScore, computerScore)
  }

  changeChoiceImage(element, value) {
    switch (value) {
      case 0:
        element.src = "./img/rock.png"
        break;
      case 1:
        element.src = "./img/paper.png"
        break;
      case 2:
        element.src = "./img/scissors.png"
        break;
      default:
        break;
    }
  }
}

let gameUI = new GameUI()
let game = new Game(gameUI)

function limitOption(direction) {
  // If playerChoice + direction is less than 0 sets it to the end of the array
  if (game.playerChoice + direction < 0) {
    return Object.keys(CHOICES).length - 3
  }
  // If playerChoice + direction is bigger than the choices available it sets it to 0 (Rock)
  else if(game.playerChoice + direction > Object.keys(CHOICES).length - 3) {
    return CHOICES.ROCK
  }
  else {
    return game.playerChoice + direction
  }
}

function changeOption(direction) {
  game.playerChoice = limitOption(direction)
  gameUI.changeChoiceImage(playerPrevChoiceImage, limitOption(-1))
  gameUI.changeChoiceImage(playerChoiceImage, game.playerChoice)
  gameUI.changeChoiceImage(playerNextChoiceImage, limitOption(1))
}

// Adds onclick behaviour to buttons
document.querySelector(".btn--play").addEventListener("click", () => game.round())
document.querySelector(".btn--reset").addEventListener("click", () => game.reset())
document.getElementById("prev_choice").addEventListener("click", () => changeOption(-1))
document.getElementById("next_choice").addEventListener("click", () => changeOption(1))
document.getElementById("light-dark-toggle").addEventListener("click", () => document.body.classList.toggle("light"))