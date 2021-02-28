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
        if (taken(id, go)){
            console.log("This spot is taken")
        } else {
            if (go == 1) {
                $('#' + id).css("background-image", "url(images/0.png)");
                move(go, id);
                takeSpace(id, go)
                go = 2;
            } else {
                $('#' + id).css("background-image", "url(images/x.png)");
                move(go, id);
                go = 1;
            }
        }

    });

});

//move - first to be called
function move(go, id) {
    console.log("Go: " + go);
    console.log("Id: " + id);

    if (go == 1) {
        //set the position that the human clicked on the board
        board[id] = human;
        takenBoard[id] = human;
        if (winning(board, human)){
            console.log("Winner!!!");
        }


    } else {
        //set the position that the computer went on the board
        board[id] = computer;
        takenBoard[id] = computer;
        if (winning(board, computer)){
            console.log("Winner!!!");
        }

        
    }

}

//available spots
function available(board) {
    return board.filter(s => s != "h" && s != "c");
  }

//see if the spot that the human is about to go is taken
function taken(id) {
    if (
        (takenBoard[id] == human) ||
        (takenBoard[id] == computer)
    ) {
        document.getElementById('info').innerHTML = '<h1>That space is taken, you cannot go there!</h1>';
        return true;
    } else {
        return false;
    }
}

// take space on board
function takeSpace(id, go) {
    if (go == 1){
        takenBoard[id] = "h";
    } else {
        takenBoard[id] = "c";
    }
}


// winning combinations
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        if (player == "c") {
            document.getElementById('info').innerHTML = '<h1>You lost! The computer won!</h1>';
        } else {
            document.getElementById('info').innerHTML = '<h1>Congratulations, you won!!</h1>';
        }
        return true;
    } else {
        return false;
    }
}


