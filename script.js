let playerScore = 0
let computerScore = 0

function getComputerChoice() {
  return Math.floor(Math.random() * 3)
}

function getHumamChoice() {
  return prompt()
}

function whoWon(computerChoice, humanChoice) {
  console.log(`Player choice = ${humanChoice} | Computer choice ${computerChoice}`)

  // 0 - Rock, 1 - Paper, 2 - Scissor
  if(computerChoice == humanChoice) return "TIE"

  switch (computerChoice) {
    case 0:
      return humanChoice == 2 ? "COMPUTER WINS" : "PLAYER WINS"
      break;
    case 1:
      return humanChoice == 0 ? "COMPUTER WINS" : "PLAYER WINS"
      break;
    case 2:
      return humanChoice == 1 ? "COMPUTER WINS" : "PLAYER WINS"
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

document.getElementById("choice").onchange = function() {
  console.log(document.getElementById("choice").value)
}
