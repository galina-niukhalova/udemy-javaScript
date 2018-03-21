/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, previousScore, activePlayer, gamePlaying, winnerScore;
var diceDOM;

diceDOM = document.getElementsByClassName('dice');

var entireScore = 'score-',
    currentScore = 'current-',
    playerName = 'name-';

var player1 = document.querySelector('.player-0-panel'),
    player2 = document.querySelector('.player-1-panel');


init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    previousScore = [0, 0];
    activePlayer = 0;
    winnerScore = 100;
    gamePlaying = true;

    displayDices(false);

    document.getElementById(entireScore + '0').textContent = '0';
    document.getElementById(entireScore + '1').textContent = '0';
    document.getElementById(currentScore + '0').textContent = '0';
    document.getElementById(currentScore + '0').textContent = '0';

    document.getElementById(playerName + '0').textContent = "Player 1";
    document.getElementById(playerName + '1').textContent = "Player 2";

    player1.classList.remove('winner');
    player2.classList.remove('winner');

    player1.classList.remove('active');
    player2.classList.remove('active');

    player1.classList.add('active');
}

function displayDices(display) {

    for (var dice of diceDOM)
        dice.style.display = (display ? 'block' : 'none');
}

function nextPlayer() {
    roundScore = 0;
    document.getElementById(currentScore + activePlayer).textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    player1.classList.toggle('active');
    player2.classList.toggle('active')

    displayDices(false);
}


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

        // 2. Display a result
        displayDices(true);
        for (var i = 0; i < diceDOM.length; i++)
            diceDOM[i].src = 'dice-' + dice[i] + '.png';

        // 3. Update the round score IF the rolled number was not a 1
        if (dice.includes(6) && previousScore.includes(6)) {
            document.getElementById(entireScore + activePlayer).textContent = 0;
            nextPlayer();
        }
        else if (dice.includes(1)) {
            nextPlayer();
        }
        else {
            roundScore += dice[0] + dice[1];
            previousScore = [dice[0], dice[1]];
            document.getElementById(currentScore + activePlayer).textContent = roundScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to Global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById(entireScore + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] > winnerScore) {
            document.getElementById(playerName + activePlayer).textContent = "Winner!";
            displayDices(false);

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.winner-score').addEventListener('change', function () {
    if(this.value)
        winnerScore = this.value;
});