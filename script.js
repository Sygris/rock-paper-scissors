let playerScore = 0
let computerScore = 0

// Changes player choice image when player picks their choice on the dropdown menu
document.getElementById("choice").onchange = (event) => {
  changeChoiceImage(document.getElementById("player_choice_image"), event.target.value)
}

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3)
  changeChoiceImage(document.getElementById("computer_choice_image"), choice)
  return choice
}

function getHumamChoice() {
  return filterPlayerChoice(document.getElementById("choice").value)
}

function whoWon(computerChoice, humanChoice) {
  if(computerChoice == humanChoice) return "TIE"
  
  // 0 - Rock, 1 - Paper, 2 - Scissor
  switch (computerChoice) {
    case 0:
      return humanChoice == 2  ? "COMPUTER WINS" : "PLAYER WINS"
    case 1:
      return humanChoice == 0 ? "COMPUTER WINS" : "PLAYER WINS"
    case 2:
      return humanChoice == 1 ? "COMPUTER WINS" : "PLAYER WINS"
    default:
      return "Something went wrong"
  }

}

const updateScoreUI = function()
{
  document.getElementById("player_score").textContent = `Player: ${playerScore}`
  document.getElementById("computer_score").textContent = `Computer: ${computerScore}`
}

function updateScore(winner) {
  if (winner.includes("TIE")) return
  winner.includes("PLAYER") ? playerScore++ : computerScore++
  updateScoreUI()
}


function round() {
  const winner = whoWon(getComputerChoice(), getHumamChoice())
  updateScore(winner)
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