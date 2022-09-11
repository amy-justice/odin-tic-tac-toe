gameBoard = (() => {
    // board array
    boardArray = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    // clear
    const clearBoard = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        gameOver = false;
        displayController.fillBoard();
    }
    const checkWin = () => {
        const winMap = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (i = 0; i < winMap.length; i++) {
            console.log(winMap[i][0])
            if (boardArray[winMap[i][0]] != '' && boardArray[winMap[i][0]] == boardArray[winMap[i][1]] && boardArray[winMap[i][1]] == boardArray[winMap[i][2]]) {
                gameOver = true;
                return gameOver
            } else {
                gameOver = false;
            }
        }
        return gameOver;
    }
    return { boardArray, clearBoard, checkWin }
})();

displayController = (() => {
    gameSquares = document.querySelectorAll('.game-square')
    const fillBoard = () => {
        for (i = 0; i < boardArray.length; i++) {
            gameSquares[i].innerHTML = boardArray[i];
        }
    }
    // place a marker
    const placeMarker = (e, player) => {
        if (e.target.innerHTML === '') {
            boardArray[e.target.id] = player.marker;
            e.target.innerHTML = player.marker;
            console.log(boardArray)
        }
        endGame = gameBoard.checkWin();
        if (endGame) {
            showWinScreen();
        }
    }

    const showWinScreen = () => {
        gameBoard = document.getElementById('gameboard');
        gameBoard.style.display = 'none';
    }
    return { gameSquares, fillBoard, placeMarker, showWinScreen }
})();

const Player = marker => {
    // set marker
    const getMarker = () => marker;
    return { marker }
}

const game = () => {
    const playerOne = Player('X');
    const playerTwo = Player('O');

    let currentPlayer = playerOne;
    
    displayController.fillBoard();

    displayController.gameSquares.forEach(square => {
        square.addEventListener('click', e => {
            displayController.placeMarker(e, currentPlayer);
            if (currentPlayer == playerOne) {
                currentPlayer = playerTwo
            } else if (currentPlayer == playerTwo) {
                currentPlayer = playerOne
            }
        })
    })
    // check win con
    // control score
    // clear board on win
};

game();