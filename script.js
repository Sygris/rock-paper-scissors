let playerScore = 0
let computerScore = 0

function getComputerChoice() {
  const choice = Math.floor((Math.random() * 3))
  changeChoiceImage(document.getElementById("computer_choice_image"), choice)
  return choice
}

function getHumamChoice() {
  return document.getElementById("choice").value
}

function whoWon(computerChoice, humanChoice) {
  console.log(`Player choice = ${humanChoice} | Computer choice ${computerChoice}`)

  // 0 - Rock, 1 - Paper, 2 - Scissor
  if(computerChoice == humanChoice) return "TIE"

  switch (computerChoice) {
    case 0:
      return humanChoice == "Scissors"  ? "COMPUTER WINS" : "PLAYER WINS"
      break;
    case 1:
      return humanChoice == "Rock" ? "COMPUTER WINS" : "PLAYER WINS"
      break;
    case 2:
      return humanChoice == "Paper" ? "COMPUTER WINS" : "PLAYER WINS"
      break;
    default:
      return "Your mom"
      break;
  }

}

function updateScore(winner) {
  if (winner.includes("TIE")) return
  winner.includes("PLAYER") ? playerScore++ : computerScore++
  document.getElementById("player_score").textContent = `Player Score = ${playerScore}`
  document.getElementById("computer_score").textContent = `Computer Score = ${computerScore}`
}

function round() {
  const winner = whoWon(getComputerChoice(), getHumamChoice())
  updateScore(winner)
}

document.getElementById("choice").onchange = (event) => {
  changeChoiceImage(document.getElementById("player_choice_image"), event.target.value)
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