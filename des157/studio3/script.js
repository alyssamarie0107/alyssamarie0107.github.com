(function(){
    let startGame = document.getElementById('startgame');
    let gameControl = document.getElementById('gamecontrol');
    let game = document.getElementById('game');
    let score = document.getElementById('score');
    let actionArea = document.getElementById('actions');

    // keeping track of game data
    let gameData = {
        dice: [
            '1die.jpg', 
            '2die.jpg', 
            '3die.jpg', 
            '4die.jpg', 
            '5die.jpg', 
            '6die.jpg'
        ],
        players: ['player 1', 'player 2'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        // randomly set game index here
        // index will be either 0 or 1
        gameData.index = Math.round(Math.random());
        console.log(gameData.index)

        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>'

        document.getElementById('quit').addEventListener('click', function(){
            // refreshes the page
            location.reload();
        });

        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
        });
    }

    function throwDice() {
        // clear out action area
        actionArea.innerHTML = '';
        // using ceil could result in a zero
        // random generates a random value between 0-1 (inclusive to 0 but not inclusive to 1)
        // rounding down and adding a 1 to get random values between 1-6
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src=${gameData.dice[gameData.roll1-1]}>
                            <img src=${gameData.dice[gameData.roll2-1]}>`;

        console.log(gameData);

        if(gameData.rollSum === 2) {
            // switch player
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';

            // zero out the score
            gameData.score[gameData.index] = 0;

            // set up turn for the next player
            // ternary operator 
            // evaulate whether gameData.index is true (gameData.index is either 0(false) or 1(true))
            // if it is a 1, set index to 0 and if it is a 0, set index to 1
            // could use an if else statement
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // show the current score...
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            // switch player
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;

            // set up turn
            setTimeout(setUpTurn, 2000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function() {
                //setUpTurn();
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function() {
                // swap player then set up the turn
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            // check to see if the player won
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game";
        }
        else {
            // update the score
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}
        ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} 
        ${gameData.score[1]}</strong></p>`;
    }
})();