var game = true;

//human - 1 (x)
//computer - 2 (o)

//define key variables
var go = 1;
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var takenBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var human = "h";
var computer = "c";

$(document).ready(function () {
    $("td").click(function () {

        var id = $(this).attr('id');

        if (taken(id, go)) {
            // Print out to screen
        } else {
            //set space to shape
            $('#' + id).css("background-image", "url(images/x-red.png)");
            move(go, id);
            takeSpace(id, go)
            go = 2;

            //a slight random delay to make is more realistic for the user; i.e. computer is thinking
            setTimeout(function () {
                //let ai calculate best move to go and go there
                move(go, id);
                takeSpace(id, go)

                go = 1;
            }, (400 + (Math.random() * 500)));
        }
    });

});

//called for each player
function move(go, id) {
    if (go == 1) {
        if (winner() === null) {
            //set the position that the human clicked on the board
            board[id] = human;
            if (winner() === human) {
                document.getElementById('game-info').innerHTML = '<h1>You won! Well done!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
            }
        }
        else if (winner() === computer) {
            document.getElementById('game-info').innerHTML = '<h1>Computer won! Better luck next time!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        } else if (winner() === human) {
            document.getElementById('game-info').innerHTML = '<h1>You won! Well done!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        } else {
            document.getElementById('game-info').innerHTML = '<h1>Tie! Well played!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        }


    } else {
        if (winner() === null) {
            //let ai decide the best move to go
            bestMove(go);
            if (winner() === computer) {
                document.getElementById('game-info').innerHTML = '<h1>Computer won! Better luck next time!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
            }
        }
        else if (winner() === computer) {
            document.getElementById('game-info').innerHTML = '<h1>Computer won! Better luck next time!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        } else if (winner() === human) {
            document.getElementById('game-info').innerHTML = '<h1>You won! Well done!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        } else {
            document.getElementById('game-info').innerHTML = '<h1>Tie! Well played!<br/><button onclick="reload()" class="button">Play Again <i class="fas fa-redo"></i></button></h1>';
        }
    }
}


//see if the spot that the human is about to go is taken
function taken(id) {
    if (
        (takenBoard[id] == human) ||
        (takenBoard[id] == computer)
    ) {
        document.getElementById('game-info').innerHTML = '<h1>That space is taken, you cannot go there!</h1>';
        return true;
    } else {
        return false;
    }
}

// take space on board
function takeSpace(id, go) {
    if (go == 1) {
        takenBoard[id] = "h";
    } else {
        takenBoard[id] = "c";
    }
}


//check for winner
function winner() {

    let winner = null; // no winner known yet

    // Check if computer has won first row
    if ((board[0] === computer) && (board[1] === computer) && (board[2] === computer)) {
        winner = computer;
    }
    // Check if computer has won second row
    if ((board[3] === computer) && (board[4] === computer) && (board[5] === computer)) {
        winner = computer;
    }
    // Check if computer has won third row
    if ((board[6] === computer) && (board[7] === computer) && (board[8] === computer)) {
        winner = computer;
    }
    // Check if computer won first column
    if ((board[0] === computer) && (board[3] === computer) && (board[6] === computer)) {
        winner = computer;
    }

    // Check if computer won second column
    if ((board[1] === computer) && (board[4] === computer) && (board[7] === computer)) {
        winner = computer;
    }

    // Check if computer won third column
    if ((board[2] === computer) && (board[5] === computer) && (board[8] === computer)) {
        winner = computer;
    }

    //Check if computer won diagonal (Top Left to Bottom Right)
    if ((board[0] === computer) && (board[4] === computer) && (board[8] === computer)) {
        winner = computer;
    }

    //Check if computer won diagonal (Top Right to Bottom Left)
    if ((board[2] === computer) && (board[4] === computer) && (board[6] === computer)) {
        winner = computer;
    }

    // Check if human has won first row
    if ((board[0] === human) && (board[1] === human) && (board[2] === human)) {
        winner = human;
    }
    // Check if human has won second row
    if ((board[3] === human) && (board[4] === human) && (board[5] === human)) {
        winner = human;
    }
    // Check if human has won third row
    if ((board[6] === human) && (board[7] === human) && (board[8] === human)) {
        winner = human;
    }
    // Check if human won first column
    if ((board[0] === human) && (board[3] === human) && (board[6] === human)) {
        winner = human;
    }

    // Check if human won second column
    if ((board[1] === human) && (board[4] === human) && (board[7] === human)) {
        winner = human;
    }

    // Check if human won third column
    if ((board[2] === human) && (board[5] === human) && (board[8] === human)) {
        winner = human;
    }

    //Check if human won diagonal
    if ((board[0] === human) && (board[4] === human) && (board[8] === human)) {
        winner = human;
    }

    //Check if human won diagonal
    if ((board[2] === human) && (board[4] === human) && (board[6] === human)) {
        winner = human;
    }

    //if no winner and the board is full return tie else return winner
    if ((winner === null) && (board[0] != 0 && board[1] != 1 && board[2] != 2 && board[3] != 3 && board[4] != 4 && board[5] != 5 && board[6] != 6 && board[7] != 7 && board[8] != 8)) {
        return "tie";
    } else {
        return winner;
    }

}

function reload() {
    window.location = window.location;
}