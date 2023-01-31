const Gameboard = () => {
    let board = [];
    let shipsCount = 0;
    let sunkShipsCount = 0;

    // initialize board
    for (let i=0; i<10; i++){
        board[i] = [];
        for (let j=0; j<10; j++){
            board[i][j] = ["empty", ""];
        }
    }

    const getSquare = (row, column) => {
        return board[row][column];
    }

    const placeShip = (ship, coordinatesArray) => {
        for (let i=0; i<coordinatesArray.length; i++){
            coordinates = coordinatesArray[i];
            board[coordinates[0]][coordinates[1]][0] = ship;
        }
        shipsCount++;
    }

    const receiveAttack = (coordinates) => {
        let square = board[coordinates[0]][coordinates[1]];
        if (typeof(square[0])=="object") { 
            board[coordinates[0]][coordinates[1]][0].hit();
            board[coordinates[0]][coordinates[1]][1] = "hit";
            if (board[coordinates[0]][coordinates[1]][0].isSunk()) {
                sunkShipsCount++;

                let count = 0;
                for (let i=0; i<10; i++){
                    for (let j=0; j<10; j++){
                        if (board[i][j][0].type==board[coordinates[0]][coordinates[1]][0].type){
                            board[i][j][1] = "sunk";
                            count++;
                            if (count==board[coordinates[0]][coordinates[1]][0].length){
                                break;
                            }
                        }
                    }
                }
                board[coordinates[0]][coordinates[1]][1] = "sunk";
            }
        } else {
            board[coordinates[0]][coordinates[1]][1] = "miss";
        }
    }

    const allShipsSunk = () => {
        return (sunkShipsCount == shipsCount);
    }

    return {
        get missedAttacks() {
            return missedAttacks;
        },
        get board() {
            return board;
        },
        getSquare,
        placeShip,
        receiveAttack,
        allShipsSunk
    }
};

module.exports = Gameboard;