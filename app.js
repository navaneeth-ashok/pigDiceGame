/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, gamePlaying, lastDice;
gamePlaying = true



function generateRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function init(){
    
    // Initialise the score
    scores = [0, 0]
    roundScores = 0
    activePlayer = 0
    topScore = document.querySelector('.top-score').value != false ? document.querySelector('.top-score').value : 15
    lastDice = false
    // Initialising the game 
    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    gamePlaying = true
    
}

function rollDice(){
    if(gamePlaying){

        // Generate Random Number
        var dice = generateRandomInteger(1,6)
        
        // Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        // Update the result
        if (dice > 1) {
            // Add score
            roundScores+= dice
            document.querySelector('#current-' + activePlayer).textContent = roundScores
            
//          // Two simulatneous 6 will reset the score            
//            if(dice == 6){
//                if(lastDice == true){
//                    scores[activePlayer] = 0
//                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] 
//                    togglePlayer()
//                } else {
//                    lastDice = true    
//                }                
//            } else {
//                lastDice = false
//            }
        
        } else {
            togglePlayer()
        }    
    }
}

function togglePlayer(){
    
    // Toggle Player
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0
    
    // Reset round score
    roundScores = 0
    lastDice = false
    
    // Reflect score in the UI
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    
    // Toggle the active player panel
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    
    // Hiding the dice for toggled player
    document.querySelector('.dice').style.display = 'none'
}

//dice = generateRandomInteger(1,6)
//console.log(dice)
//
//document.querySelector('#current-' + activePlayer).textContent = dice
//document.querySelector('.dice').style.display = 'none'




init()
document.querySelector('.btn-roll').addEventListener('click', rollDice)
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        
        // add current score to global score
        scores[activePlayer] += roundScores
        
        // update the UI
        document.getElementById('score-' + activePlayer ).textContent = scores[activePlayer]

        // check for winning condition
        if (scores[activePlayer] >= topScore){
            document.getElementById('name-' + activePlayer).innerHTML = '<b>Winner!!!</b>'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        } else {
            // toggle active player
            togglePlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init)
                                                    