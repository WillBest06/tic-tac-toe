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

    return name, symbol, wins;
}

function createGame (player1, player2, gameboard) { 
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

    function newTurn(player) {
        // get players choice
        const result = checkForWin();
        if (result.gameWon === true) {
            player.increaseWins();
        }
    }
}

function initialise() {
    const player1 = createPlayer(1);
    const player2 = createPlayer(2);
    const gameboard = (function () {
        const arr = ['dummy value', 
            null, null, null,
            null, null, null,
            null, null, null
        ];
        return arr;
    })();

    return {player1, player2, gameboard};
}

initialise();