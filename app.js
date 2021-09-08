const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.getElementById('winningMessage');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const restartBtn = document.getElementById('restartButton');
const board = document.getElementById('board');
let isCircleTurn = false;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
let currentClass = X_CLASS;
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cellElements.forEach(cell => {
    cell.addEventListener('click', handelClick, {once: true})
})
setHoverBoardClass();

function setHoverBoardClass() {
    if( isCircleTurn ) {
        board.classList.add(CIRCLE_CLASS);
        board.classList.remove(X_CLASS);
    } else {
        board.classList.add(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
    }
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    winningMessage.classList.remove('show');
    // cellElements.
}

function handelClick(e){
    // console.log("clicked");
    // add 'X' or 'circle' class
    let cell = e.target;
    if (isCircleTurn === true) {
        currentClass = CIRCLE_CLASS;
    } else {
        currentClass = X_CLASS;
    }
    cell.classList.add(currentClass);
    // Draw or win
    const isAllCellsFilled = isCellsFilled();
    console.log(isAllCellsFilled)

    if(checkWin(currentClass)) {
        winningMessage.classList.add('show');
        const msg = currentClass === X_CLASS ? 'X Wins!' : 'O Wins'
        winningMessageText.textContent = msg;
        console.log(currentClass);
    } else {
        if(isAllCellsFilled) {
            winningMessage.classList.add('show');
            winningMessageText.textContent = "It's A DRAW!!"
        }
    }

    // swap player
    isCircleTurn = !isCircleTurn;
    setHoverBoardClass();
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isCellsFilled() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}