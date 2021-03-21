//Best move for AI
function bestMove(go) {
    let bestScore = -Infinity;
    let move;
    //loop through all the possible spaces
    for (let i = 0; i < 9; i++) {
        //check that the space is free
        if (
            (board[i] != human) &&
            (board[i] != computer)
        ) {
            board[i] = computer;
            let score = minimax(board, 0, false)
            board[i] = i;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = computer;
    $('#' + move).css("background-image", "url(images/0-dark-blue.png)");
    takeSpace(move, go)
}

//in favour of the ai
let scores = {
    c: 1,
    h: -1,
    tie: 0
}

function minimax(board, depth, isMaximizing) {

    let result = winner();
    if (result !== null) {
        return scores[result];
    }


    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            //check that the space is free
            if (
                (board[i] != human) &&
                (board[i] != computer)
            ) {
                board[i] = computer;
                let score = minimax(board, depth + 1, false);
                board[i] = i;
                if (score > bestScore) {
                    bestScore = score;
                }

            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            //check that the space is free
            if (
                (board[i] != human) &&
                (board[i] != computer)
            ) {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = i;
                if (score < bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore;
    }
}
