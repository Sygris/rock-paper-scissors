// Logic Variables
let playerScore = 0
let computerScore = 0
let humanChoice, computerChoice

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

// Changes player choice image when player picks their choice on the dropdown menu
document.getElementById("choice").onchange = (event) => {
  changeChoiceImage(playerChoiceImage, event.target.value)
  humanChoice = event.target.value
}

// Adds onclick behaviour to buttons
document.querySelector(".btn--play").addEventListener("click", round)
document.querySelector(".btn--reset").addEventListener("click", reset)

class Game {
  constructor() {
    this.playerScore = 0
    this.computerChoice = 0
  }

  // Retruns computer choise
  getComputerChoice() {
    // Generates a random number between 0 - 2
    computerChoice = Math.floor(Math.random() * 3)
    // Updates computer choice UI
    changeChoiceImage(computerChoiceImage, computerChoice)
    return computerChoice
  }

  // Returns player choice
  getHumanChoice() {
    humanChoice = filterPlayerChoice(playerChoice.value)
    return humanChoice
  }
}

// // Retruns computer choise
// function getComputerChoice() {
//   // Generates a random number between 0 - 2
//   computerChoice = Math.floor(Math.random() * 3)
//   // Updates computer choice UI
//   changeChoiceImage(computerChoiceImage, computerChoice)
//   return computerChoice
// }

// // Returns player choice
// function getHumanChoice() {
//   humanChoice = filterPlayerChoice(playerChoice.value)
//   return humanChoice
// }

// Returns who the winner is
function whoWon(computerChoice, humanChoice) {
  // Guard clause in case of tie
  if (computerChoice == humanChoice) return "TIE"

  // 0 - Rock, 1 - Paper, 2 - Scissor
  switch (computerChoice) {
    case CHOICES.ROCK:
      return humanChoice == CHOICES.SCISSORS ? "COMPUTER" : "PLAYER"
    case CHOICES.PAPER:
      return humanChoice == CHOICES.ROCK ? "COMPUTER" : "PLAYER"
    case CHOICES.SCISSORS:
      return humanChoice == CHOICES.PAPER ? "COMPUTER" : "PLAYER"
    default:
      return "Something went wrong"
  }
}

function updateScore(winner) {
  if (winner === "TIE") return
  winner === "PLAYER" ? playerScore++ : computerScore++
  updateScoreUI()
}

const updateScoreUI = function () {
  playerScoreUI.textContent = `Player: ${playerScore}`
  computerScoreUI.textContent = `Computer: ${computerScore}`
}

function updateGameUI(winner) {
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

function round() {
  const winner = whoWon(getComputerChoice(), getHumanChoice())


  updateScore(winner)
  updateGameUI(winner)
  if (computerScore === 5 || humanChoice === 5) {
    alert(`Game Finished - ${winner} won!`)
    reset()
  }
}

function resetGameUI() {
  winnerText.textContent = "Choose your hand!"
  winnerTextDescription.textContent = "First to get 5 points wins"
  updateScoreUI()
}

function reset() {
  playerScore = 0
  computerScore = 0
  resetGameUI()
}

function changeChoiceImage(element, value) {
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

function filterPlayerChoice(choice) {
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

