const game = () => {
    let playerScore = 0;
    let computerScore = 0;

    // Start the game 
    const startGame = () => {
        const playBtn = document.getElementById('playBtn');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };
    // Play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button')
        const playerHand = document.querySelector('.playerHand');
        const computerHand = document.querySelector('.computerHand');
        const hands = document.querySelectorAll('.hands img');
        const optionsDiv = document.querySelector('.options');

        hands.forEach((hand) => {
            hand.addEventListener('animationend', function () {
                this.style.animation = "";
            });
        });
        // Computer options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach((option) => {
            option.addEventListener('click', function () {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                optionsDiv.classList.add('disabled');

                setTimeout(() => {
                    // player choice and computer choice
                    compareHands(this.textContent, computerChoice);
                    optionsDiv.classList.remove('disabled')

                    playerHand.src = `img/${this.textContent}.png`;
                    computerHand.src = `img/${computerChoice}.png`
                }, 2000)
                //Animation
                playerHand.style.animation = "shakePlayer 2s ease"
                computerHand.style.animation = "shakeComputer 2s ease"
            });
        });
        const updateScore = () => {
            const playerScoreDOM = document.querySelector('.playerScore p');
            const computerScoreDOM = document.querySelector('.computerScore p');
            playerScoreDOM.textContent = playerScore;
            computerScoreDOM.textContent = computerScore;
            modal(playerScore,computerScore);
        };
        const compareHands = (playerChoice, computerChoice) => {
            const winner = document.querySelector('.winner');
            if (playerChoice === computerChoice) {
                winner.textContent = "It's a tie"
                tieResult();
                return;
            }
            // Check for rock
            if (playerChoice === 'rock') {
                if (computerChoice === 'scissors') {
                    winner.textContent = 'Player Wins'
                    playerWins();
                    playerScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Computer Wins';
                    computerWins();
                    computerScore++;
                    updateScore();
                    return;
                }
            }
            //Check for Paper
            if (playerChoice === 'paper') {
                if (computerChoice === 'scissors') {
                    winner.textContent = 'Computer Wins'
                    computerWins();
                    computerScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Player Wins';
                    playerWins();
                    playerScore++;
                    updateScore();
                    return;
                }
            }
            //Check for Scissors
            if (playerChoice === 'scissors') {
                if (computerChoice === 'rock') {
                    winner.textContent = 'Computer Wins'
                    computerWins();
                    computerScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Player Wins';
                    playerWins();
                    playerScore++;
                    updateScore();
                    return;
                }
            }

        };
    };
    startGame();
    playMatch();
    modal();
}
game();

function playerWins() {
    document.querySelector('.playerScore').classList.add('success');
    document.querySelector('.computerScore').classList.add('lose');
    setTimeout(() => {
        document.querySelector('.playerScore').classList.remove('success');
        document.querySelector('.computerScore').classList.remove('lose');
    }, 2000)
}
function computerWins() {
    document.querySelector('.computerScore').classList.add('success');
    document.querySelector('.playerScore').classList.add('lose');
    setTimeout(() => {
        document.querySelector('.playerScore').classList.remove('lose');
        document.querySelector('.computerScore').classList.remove('success');
    }, 2000)
}
function tieResult() {
    document.querySelector('.computerScore').classList.add('tie');
    document.querySelector('.playerScore').classList.add('tie');
    setTimeout(() => {
        document.querySelector('.playerScore').classList.remove('tie');
        document.querySelector('.computerScore').classList.remove('tie');
    }, 2000)
}
function modal(playerScore,computerScore) {
    const gameModal = document.querySelector('.gameModal');
    const modalText = document.querySelector('.modalText');
    const game = document.querySelector('.game');
    if (playerScore == 3) {
        game.classList.add('hide');
        modalText.textContent = "Player Wins!"
        gameModal.classList.add('show');
    } else if (computerScore == 3) {
        game.classList.add('hide');
        modalText.textContent = "Computer Wins!"
        gameModal.classList.add('show');
    }
}
function repeatGame() {
    window.location.reload();
}