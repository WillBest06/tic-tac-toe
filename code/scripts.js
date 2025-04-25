function createPlayer (playerNum) {
    const name = prompt(`Enter player number ${playerNum}'s name:`);
    const symbol = prompt('X or O?').toLowerCase();
    let wins = 0;

    function getWins() {
        return wins;
    };
    function increaseWins() {
        wins++;
    };

    return {name, symbol, wins};
}

function createGame (player1, player2, gameboard, startingPlayer) {
    let currentPlayer = startingPlayer;
    let isGameFinished = false;
    let turnNum = 1;
    function checkForWin () {
        const winningCombos = {
            'row 1': [1, 2, 3],
            'row 2': [4, 5, 6],
            'row 3': [7, 8, 9],
            'col 1': [1, 4, 7],
            'col 2': [2, 5, 8],
            'col 3': [3, 6, 9],
            'diag 1': [1, 5, 9],
            'diag 2': [7, 5, 3]
        };

        for (let combo in winningCombos) {
            const lineToCheck = winningCombos[combo];
            if (gameboard[lineToCheck[0]] === gameboard[lineToCheck[1]] && gameboard[lineToCheck[1]] === gameboard[lineToCheck[2]]) {
                return {'gameWon': true, 'winningCombo': combo, 'winningSymbol': gameboard[lineToCheck[0]]};
            }
        }

        return {'gameWon': false, 'winningCombo': undefined, 'winningSymbol': undefined};
    };

    function newTurn() {
        while (true) {
            const square = prompt('Choose a square between 1 & 9');
            if (['x', 'o'].includes(gameboard[square]) === false) {
                gameboard[square] = currentPlayer.symbol;
                displayGameboard();
                break;
            } else {
                alert('That square is already occupied, try another.');
                continue;
            };
        };

        const result = checkForWin();
        
        if (result.gameWon === true) {
            currentPlayer.increaseWins();
            isGameFinished = true;
            console.log(`Winner: ${result.winningSymbol}`);
        };

        swapCurrentPlayer();
        turnNum++;
    };

    function swapCurrentPlayer () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else if (currentPlayer === player2) {
            currentPlayer = player1;
        };
    };

    function displayGameboard () {
        console.log(gameboard.slice(1, 4));
        console.log(gameboard.slice(4, 7));
        console.log(gameboard.slice(7));
    }

    function getTurnNum () {
        return turnNum;
    }

    return {newTurn, finished: isGameFinished, getTurnNum};
};

function startGame() {
    const player1 = createPlayer(1);
    const player2 = createPlayer(2);
    const gameboard = (function () {
        const arr = ['dummy value', 
            'topL', 'topM', 'topR',
            'midL', 'midM', 'midR',
            'botL', 'botM', 'botR'
        ];
        return arr;
    })();

    const game = createGame(player1, player2, gameboard, player1);

    while (game.finished === false) {
        console.log(`Turn ${game.getTurnNum()}:`);
        game.newTurn();
    }
};

const playBTN = document.querySelector('.play');

playBTN.addEventListener('click', () => startGame());