/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out.)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1; // We removed dice variable declaration from the global scope and put it here because 'dice' should be accessible only by this function and also because we want it to generate a different number each time we use it.
        var dice2 = Math.floor(Math.random() * 6) + 1;
        

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1.
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
        /*
        if (dices[activePlayer] === 6 && lastDices[activePlayer] === 6) {
          scores[activePlayer] === 0;
          document.querySelector('#score-' + activePlayer) .textContent = '0';
          nextPlayer();
          console.log('two 6 in a row');
        } else if (dices[activePlayer] !== 1) {
            // Add score
            roundScore += dices[activePlayer];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dices[activePlayer] === 1) {
            // Next player
            nextPlayer();
        }*/
    }
});

// Add event listener for 'Hold' button.
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if (!input == false) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // activePlayer won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
            console.log('game over. Winning Score: ' + winningScore);
        } else {
            console.log('Hold button reads winningScore: ' + winningScore);
            // Next Player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    // Next player
        activePlayer = (activePlayer === 0) ? 1 : 0;
        roundScore = 0;
        
        // set both players' current score to 0
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        // change the active player dot between players
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // hide the dice again
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    
    // Add event listener for the 'Roll' button
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //
    //function btn() {
    //    // Do something here.
    //}
    //btn(); // using parenthesis after function name calls a function.
    //
    //document.querySelector('.btn-roll').addEventListener('click', btn); // Here we just wrote the function name 'btn' and not the parenthesis. This is because we want the 'click' event to call the function and not otherwise.

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;// selecting current-0 or current-1 will depend on the variable activePlayer.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // innerHTML will take only strings to write tags, else it will understand whatever is assigned to it as javascript variables.

//var x = document.querySelector ('#score-0').textContent;