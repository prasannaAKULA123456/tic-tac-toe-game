let currentPlayer = 'X';
let magicSquare = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
];
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let noBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let humanCount = 0
let comPos = [];
let row;
let col;
let st=document.getElementById("Resultbox");

function findIndex(k) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (magicSquare[i][j] === k) {
                return ([i, j]);
            }
        }
    }
}

function computerWin() {
    comPos = [];
    let possibleWin = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'O') {
                console.log('C');
                comPos.push(magicSquare[i][j]);
            }
        }
    }
    console.log(comPos);
    for (let i of comPos) {
        for (let j of comPos) {
            if (i !== j) {
                let k = 15 - (i + j);
                if (k > 0 && k < 10) {
                    [row, col] = findIndex(k);
                    possibleWin.push([row, col]);
                }
            }
        }
    }
    let a = 0;
    for (let i of possibleWin) {
        if (board[i[0]][i[1]] === '') {
            let a = 1;
            console.log(i);
            return (i);
        }
    }
    if (a !== 1) {
        return ([-1, -1]);
    }
}

function boxclick(row, col, id) {
    st.textContent="";
    if (board[row][col] === '' && currentPlayer === 'X') {
        board[row][col] = 'X';
        let ob = document.getElementById(id);
        ob.textContent = 'X';
        ob.style.fontSize = '30px';
        ob.style.color = "red";
        humanCount = humanCount + 1;
        humcheckWinner('XXX');
        currentPlayer = "O";
        computerMove();
    }
}

function humanWinChance() {
    humPos = [];
    let possibleWin = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'X') {
                humPos.push(magicSquare[i][j]);
            }
        }
    }
    console.log(humPos, "nnn");
    for (let i of humPos) {
        for (let j of humPos) {
            if (i !== j) {
                let k = 15 - (i + j);
                if (k > 0 && k < 10) {
                    [row, col] = findIndex(k);
                    console.log('Human', row, col);
                    possibleWin.push([row, col]);
                }
            }
        }
    }
    let a;
    for (let i of possibleWin) {
        if (board[i[0]][i[1]] === '') {
            let a = 1;
            console.log("i");
            return (i);
        }
    }
    if (a !== 1) {
        return ([-1, -1]);
    }
}

function computerMove() {
    if (currentPlayer === 'O') {
        if (humanCount >= 2) {
            [row, col] = computerWin();
            if (row === -1) {
                [row, col] = humanWinChance();
            }
            if (row === -1) {
                let availableMoves = [];
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        if (board[row][col] === '') {
                            availableMoves.push([row, col]);
                        }
                    }
                }

                if (availableMoves.length > 0) {
                    let randomIndex = Math.floor(Math.random() * availableMoves.length);
                    [row, col] = availableMoves[randomIndex];
                }
            }
        } else {
            let availableMoves = [];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (board[row][col] === '') {
                        availableMoves.push([row, col]);
                    }
                }
            }

            if (availableMoves.length > 0) {
                let randomIndex = Math.floor(Math.random() * availableMoves.length);
                [row, col] = availableMoves[randomIndex];
            }
        }
        console.log(row, col, "oo");
        let idbox = 'box0' + noBoard[row][col];
        let ob=document.getElementById(idbox)
        ob.textContent = 'O';
        ob.style.color="green";
        board[row][col] = 'O';
        currentPlayer = 'X';
        comcheckWinner("OOO");
    }
    currentPlayer = 'X';
}

function comcheckWinner(value) {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] + board[i][1] + board[i][2] === value ||
            board[0][i] + board[1][i] + board[2][i] === value
        ) {
            
            st.textContent="Computer Wins";
            resetGame();
            return;
        }
    }

    if (
        board[0][0] + board[1][1] + board[2][2] === value ||
        board[0][2] + board[1][1] + board[2][0] === value
    ) {
        st.textContent="Computer Wins";
        resetGame();
        return;
    }

    let isTie = true;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                isTie = false;
                break;
            }
        }
    }

    if (isTie) {
        st.textContent="Its a tie";
        resetGame();
        return;
    }

}

function humcheckWinner(value) {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] + board[i][1] + board[i][2] === value ||
            board[0][i] + board[1][i] + board[2][i] === value
        ) {
            st.textContent="Human Wins";
            resetGame();
            return;
        }
    }

    if (
        board[0][0] + board[1][1] + board[2][2] === value ||
        board[0][2] + board[1][1] + board[2][0] === value
    ) {
        st.textContent="Human Wins";
        resetGame();
        return;
    }

    let isTie = true;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                isTie = false;
                break;
            }
        }
    }

    if (isTie) {
        st.textContent="Its a Tie";
        resetGame();
        return;
    }

}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    for (let i = 1; i <= 9; i++) {
        document.getElementById('box0' + i).textContent = '';
    }


    currentPlayer = 'X';
}
