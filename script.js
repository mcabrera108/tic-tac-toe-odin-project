const Gameboard = (() => { //Module of Gameboard

    const rows = 3;
    const columns  = 3;
    const board = []

    for(let i = 0; i < rows; i++) //Creates an array that stores board values. These will be used to display in our HTML page
    {
        board[i] = [];
        for(let j = 0; j < columns; j++)
        {
            board[i].push(Cell())
        }
    }

    const getBoard = () => {
        return board;
    }
    const displayBoard = () => { //Displays Board and sets Event Listeners for the Grid Cells
        //WORK IN PROGRESS
        count_grid = 1;

        for(let i = 0; i < 3;i++)
        {

            for(let j=0; j < 3; j++)
            {
                const grid_square = document.querySelector('.grid-square:nth-child(' + count_grid + ')');
                grid_square.textContent = board[i][j].getCellValue();
                grid_square.addEventListener('click', function() {

                    placeMarker(grid_square,i, j);

                })
                count_grid ++;

            }
        }

        count_grid = 0;
        const restartButton = document.querySelector('.restart-button');
        restartButton.addEventListener('click', function() {
            resetBoard();
        })
    }
    const placeMarker = (grid_square,i, j) => {
        //WORK IN PROGRESS
         if(board[i][j].getCellValue() == ' ')//If Cell Array Value is empty then set the cell to the current players marker
         {
            GameController.playRound(grid_square,i,j);
         }
         else
         {
            alert('Cannot Make this Move: This cell is already occupied');
         }    
         console.log(board[i][j].getCellValue());   
    }
    const resetBoard = () => {
        for(let i = 0; i < 3; i++)
        {
            board[i] = [];
            for(let j = 0; j < 3; j++)
            {
                board[i].push(Cell())
            }
        }

        for(let i = 0; i < 10; i++)
        {
            const grid_square = document.querySelector('.grid-square:nth-child(' + i + ')');
            if(grid_square)
            {
                grid_square.textContent = ' ';
            }
        }
    }

    return {displayBoard, getBoard,resetBoard};
})();
function Cell() { //Object of Cell
    let value = ' ';
    let point = 0;

    const setCellValue = (playerMarker) => {
        value = playerMarker;
    }
    const getCellValue = () => {
        return value;
    }
    const setPointValue = (playerPoint) => {
        point = playerPoint;
    }
    const getPointValue = () => {
        return point;
    }

    return {setCellValue,getCellValue, setPointValue, getPointValue};
}
const GameController = (() => { //Module of Game Controller
    
    const players = [
        {
            name: "Player 1",
            marker: 'X',
            point: 1
        },
        {
            name: "Player 2",
            marker: 'O',
            point: -1
        }
    ];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if(activePlayer === players[0])
        {
            activePlayer = players[1];
        }
        else
        {
            activePlayer = players[0];
        }
    }

    const getActivePlayer = () => {
        return activePlayer;
    }

    const displayNewRound = () => {
        //alert("Displaying New Round");
        Gameboard.displayBoard();
    }

    const playRound = (grid_square,i,j) => {
        //WORK IN PROGRESS
        tempArr = Gameboard.getBoard();
        

        tempArr = Gameboard.getBoard();
        tempArr[i][j].setCellValue(activePlayer.marker);//Sets the Marker 'X' or 'O' into Cell
        tempArr[i][j].setPointValue(activePlayer.point);//Sets the point value of the Cell

        grid_square.textContent = tempArr[i][j].getCellValue();

        /*Write Win Condition here*/
        checkWin(tempArr)


        switchPlayerTurn();
    }
    const checkWin = (tempArr) => {

        let rowWinCounter = 0;
        let columnWinCounter = 0;
        let diagonalWinCounter = 0;
        let oppositeDiagonalWinCounter = 0;
        let rightDiagonalWinCounter = 0;
        let bottomRightDiagonalWinCounter = 0;
        let columnTracker = 0;
        let oppositeColumnTracker = 2;

        for(let i = 0; i < 3; i++)//Check Rows and Column for a Win Condition
        {
            for(let j = 0; j < 3; j++)
            {
                rowWinCounter += tempArr[i][j].getPointValue(); 
            }
            if(rowWinCounter === 3 || rowWinCounter === -3)
            {
                rowWinCounter = 0;
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!"); 
            }
            rowWinCounter = 0;

            for(let j = 0; j < 3; j++)
            {
                columnWinCounter += tempArr[j][i].getPointValue(); 
            }
            if(columnWinCounter === 3 || columnWinCounter === -3)
            {
                columnWinCounter = 0;
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!"); 
            }

            columnWinCounter = 0;

            diagonalWinCounter += tempArr[i][columnTracker].getPointValue();
            if(diagonalWinCounter === 3 || diagonalWinCounter === -3)
            {
                diagonalWinCounter = 0;
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!"); 
            }
            bottomRightDiagonalWinCounter += tempArr[i][oppositeColumnTracker].getPointValue();
            if(bottomRightDiagonalWinCounter === 3 || bottomRightDiagonalWinCounter === -3)
            {
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!");
            }

            rightDiagonalWinCounter += tempArr[i][oppositeColumnTracker].getPointValue();
            if(rightDiagonalWinCounter === 3 || rightDiagonalWinCounter === -3)
            {
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!");
            }

            oppositeDiagonalWinCounter += tempArr[i][oppositeColumnTracker].getPointValue();
            if(oppositeDiagonalWinCounter === 3 || oppositeDiagonalWinCounter === -3)
            {
                oppositeDiagonalWinCounter = 0;
                Gameboard.resetBoard();
                return alert(activePlayer.name + " has won!"); 
            }

            columnTracker++;
            oppositeColumnTracker--;


        }

    }

    displayNewRound();

    return {playRound, getActivePlayer};
})();

GameController