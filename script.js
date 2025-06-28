
// Enum with helper function
const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
  toString: (val) => ["Rock", "Paper", "Scissors"][val]
}

// UI Elements
const playerChoiceImage = document.getElementById("player_choice_image")
const computerChoiceImage = document.getElementById("computer_choice_image")
const playerChoice = document.getElementById("choice")
const playerScoreUI = document.getElementById("player_score")
const computerScoreUI = document.getElementById("computer_score")
const winnerText = document.getElementById("winner-text")
const winnerTextDescription = document.getElementById("winner-text-description")

class Game {  
  constructor() {
    this.playerScore = 0
    this.computerChoice = 0
    this.humanChoice = null
    this.computerChoice = null
  }

  // Retruns computer choise
  getComputerChoice() {
    // Generates a random number between 0 - 2
    this.computerChoice = Math.floor(Math.random() * 3)
    // Updates computer choice UI
    changeChoiceImage(computerChoiceImage, this.computerChoice)
    return this.computerChoice
  }

  // Returns player choice
  getHumanChoice() {
    this.humanChoice = filterPlayerChoice(playerChoice.value)
    return this.humanChoice
  }

  // Returns who the winner is
  whoWon() {
    // Guard clause in case of tie
    if (this.computerChoice == this.humanChoice) return "TIE"

    // 0 - Rock, 1 - Paper, 2 - Scissor
    switch (this.computerChoice) {
      case CHOICES.ROCK:
        return this.humanChoice == CHOICES.SCISSORS ? "COMPUTER" : "PLAYER"
      case CHOICES.PAPER:
        return this.humanChoice == CHOICES.ROCK ? "COMPUTER" : "PLAYER"
      case CHOICES.SCISSORS:
        return this.humanChoice == CHOICES.PAPER ? "COMPUTER" : "PLAYER"
      default:
        return "Something went wrong"
    }
  }

  updateScore(winner) {
    if (winner === "TIE") return
    winner === "PLAYER" ? this.playerScore++ : this.computerScore++
    updateScoreUI()
  }

  round() {
    this.getHumanChoice()
    this.getComputerChoice()
    const winner = this.whoWon()
    this.updateScore(winner)
    updateGameUI(winner)

    if (this.computerScore === 5 || this.playerScore === 5) {
      alert(`Game Finished - ${winner} won!`)
      this.reset()
    }
  }

  reset() {
    this.playerScore = 0
    this.computerScore = 0
    resetGameUI()
  }

  filterPlayerChoice(choice) {
    switch (choice) {
      case "Rock":
        return 0
      case "Paper":
        return 1
      case "Scissors":
        return 2
      default:
        break;
    }
  }
}


class GameUI {
  updateScoreUI() {
    playerScoreUI.textContent = `Player: ${playerScore}`
    computerScoreUI.textContent = `Computer: ${computerScore}`
  }
  
  updateGameUI(winner) {
    switch (winner) {
      case "COMPUTER":
        winnerText.textContent = "Computer wins!";
        winnerTextDescription.textContent = `${CHOICES.toString(computerChoice)} beats ${CHOICES.toString(humanChoice)}`;
        break;
      case "PLAYER":
        winnerText.textContent = "Player wins!";
        winnerTextDescription.textContent = `${CHOICES.toString(humanChoice)} beats ${CHOICES.toString(computerChoice)}`;
        break;
      case "TIE":
        winnerText.textContent = "It´s a tie!";
        winnerTextDescription.textContent = `${CHOICES.toString(humanChoice)} ties with ${CHOICES.toString(computerChoice)}`;
        break;
      default:
        break;
    }
  }
  
  resetGameUI() {
    winnerText.textContent = "Choose your hand!"
    winnerTextDescription.textContent = "First to get 5 points wins"
    updateScoreUI()
  }

  changeChoiceImage(element, value) {
    switch (value) {
      case 0:
      case "Rock":
        element.src = "./img/rock.png"
        break;
      case 1:
      case "Paper":
        element.src = "./img/paper.png"
        break;
      case 2:
      case "Scissors":
        element.src = "./img/scissors.png"
        break;
      default:
        break;
    }
  }
}

let game = new Game()
let gameUI = new GameUI()

// Changes player choice image when player picks their choice on the dropdown menu
document.getElementById("choice").onchange = (event) => {
  changeChoiceImage(playerChoiceImage, event.target.value)
  humanChoice = event.target.value
}

// Adds onclick behaviour to buttons
document.querySelector(".btn--play").addEventListener("click", () => game.round())
document.querySelector(".btn--reset").addEventListener("click", reset)