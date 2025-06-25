// Logic Variables
let playerScore = 0
let computerScore = 0
let humanChoice, computerChoice

// UI Elements
const playerChoiceImage = document.getElementById("player_choice_image")
const computerChoiceImage = document.getElementById("computer_choice_image")
const playerChoice = document.getElementById("choice")
const playerScoreUI = document.getElementById("player_score")
const computerScoreUI = document.getElementById("computer_score")
const winnerText = document.getElementById("winner__text")
const winnerTextDescription = document.getElementById("winner__text__description")

// Changes player choice image when player picks their choice on the dropdown menu
document.getElementById("choice").onchange = (event) => {
  changeChoiceImage(playerChoiceImage, event.target.value)
  humanChoice = event.target.value
}

function getComputerChoice() {
  computerChoice = Math.floor(Math.random() * 3)
  changeChoiceImage(computerChoiceImage, computerChoice)
  return computerChoice
}

function getHumamChoice() {
  humanChoice = filterPlayerChoice(playerChoice.value)
  return humanChoice
}

function whoWon(computerChoice, humanChoice) {
  if(computerChoice == humanChoice) return "TIE"
  
  // 0 - Rock, 1 - Paper, 2 - Scissor
  switch (computerChoice) {
    case 0:
      return humanChoice == 2  ? "COMPUTER" : "PLAYER"
    case 1:
      return humanChoice == 0 ? "COMPUTER" : "PLAYER"
    case 2:
      return humanChoice == 1 ? "COMPUTER" : "PLAYER"
    default:
      return "Something went wrong"
  }

}

const updateScoreUI = function()
{
  playerScoreUI.textContent = `Player: ${playerScore}`
  computerScoreUI.textContent = `Computer: ${computerScore}`
}

function updateScore(winner) {
  if (winner === "TIE") return
  winner === "PLAYER" ? playerScore++ : computerScore++
  updateScoreUI()
}

function updateGameUI(winner) {
  switch (winner) {
    case "COMPUTER":
      winnerText.textContent = "Computer wins!";
      winnerTextDescription.textContent = `${computerChoice} beats ${humanChoice}`;
      break;
    case "PLAYER":
      winnerText.textContent = "Player wins!";
      winnerTextDescription.textContent = `${humanChoice} beats ${computerChoice}`;
      break;
    case "TIE":
      winnerText.textContent = "It´s a tie!";
      winnerTextDescription.textContent = `${humanChoice} ties with ${computerChoice}`;
      break;
    default:
      break;
  }
}

function round() {
  const winner = whoWon(getComputerChoice(), getHumamChoice())
  updateScore(winner)
  updateGameUI(winner)
}

function reset() {
  playerScore = 0
  computerScore = 0
  updateScoreUI()
}

function changeChoiceImage(element, value) {
  switch (value) {
    case 0:
    case "Rock":
      element.src = "/img/rock.png"
      break;
    case 1:
    case "Paper":
      element.src = "/img/paper.png"
      break;
    case 2:
    case "Scissors":
      element.src = "/img/scissors.png"
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