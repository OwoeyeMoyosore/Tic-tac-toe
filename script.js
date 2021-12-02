let gameContainer = document.getElementsByClassName('game--container')[0]
let gameStatus = document.getElementsByClassName('game--status')[0]
let resetButton = document.getElementsByClassName('game--restart')[0]
let currentPlayer = 'X'
let gameOver = false
let winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let gameBoard = loadGame()
let gameBoardElements = gameContainer.children
let gameBoardElementsArray = Array.from(gameBoardElements)

function updateElements() {
    gameBoardElementsArray.forEach((element, i) => {
        element.innerHTML = gameBoard[i]
    })
    saveGame()
}

function saveGame() {
    window.sessionStorage.setItem('gameBoard', JSON.stringify(gameBoard))
}

function loadGame() {
    let gameB = ['', '', '', '', '', '', '', '', '']

    if (window.sessionStorage.getItem('gameBoard')) {
        gameB = JSON.parse(window.sessionStorage.getItem('gameBoard'))
        return gameB
    } else {
        return gameB
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']
    gameOver = false
    currentPlayer = 'X'
    gameStatus.innerHTML = 'Next Player: X'
    updateElements()
}

function computerTurn() {
    let emptyCells = []
    gameBoard.forEach((cell, i) => {
        if (cell === '') {
            emptyCells.push(i)
        }
    })
    if (emptyCells.length === 0) {
        return
    }
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    gameBoard[randomCell] = 'O'
    updateElements()
    let winner = checkWinner()
    if (winner) {
        gameStatus.innerHTML = `O wins!`
        return
    }
}
function onClick() {
    if (!gameOver) {
        if (this.innerHTML === '') {
            gameBoard[this.getAttribute('data-cell-index')] = currentPlayer

            updateElements()
            let winner = checkWinner()
            console.log(winner)
            if (winner) {
                gameStatus.innerHTML = `${currentPlayer} wins!`
                return
            }
            if (!gameOver) {
                computerTurn()
            }
        }
    } else {
        alert('Game Over')
    }
}

function checkWinner() {
    let win = false

    winingCombinations.forEach((combination) => {
        if (
            gameBoard[combination[0]] === gameBoard[combination[1]] &&
            gameBoard[combination[1]] === gameBoard[combination[2]] &&
            gameBoard[combination[0]] !== ''
        ) {
            win = true
            console.log('enter')
            gameOver = true
            return win
        }
    })

    return win
}

gameBoardElementsArray.forEach((element, i) => {
    element.addEventListener('click', onClick)
    element.innerHTML = gameBoard[i]
})

resetButton.addEventListener('click', resetGame)
