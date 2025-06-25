let playerScore = 0
let computerScore = 0

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3)
  changeChoiceImage(document.getElementById("computer_choice_image"), choice)
  return choice
}

function getHumamChoice() {
  return filterPlayerChoice(document.getElementById("choice").value)
}

function whoWon(computerChoice, humanChoice) {
  console.log(`Player choice = ${humanChoice} | Computer choice ${computerChoice}`)

  // 0 - Rock, 1 - Paper, 2 - Scissor
  if(computerChoice == humanChoice) return "TIE"

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

function updateScore(winner) {
  if (winner.includes("TIE")) return
  winner.includes("PLAYER") ? playerScore++ : computerScore++
  document.getElementById("player_score").textContent = playerScore
  document.getElementById("computer_score").textContent = computerScore
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