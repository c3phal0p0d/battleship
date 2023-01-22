const Gameboard = () => {
    let board = [];
    let shipsCount = 0;
    let sunkShipsCount = 0;

    // initialize board
    for (let i=0; i<10; i++){
        board[i] = [];
        for (let j=0; j<10; j++){
            board[i][j] = null;
        }
    }

    const placeShip = (ship, coordinatesArray) => {
        for (let i=0; i<coordinatesArray.length; i++){
            coordinates = coordinatesArray[i];
            board[coordinates[0]][coordinates[1]] = ship;
            shipsCount++;
        }
    }

    const receiveAttack = (coordinates) => {
        let square = board[coordinates[0]][coordinates[1]];
        if (square && typeof(square)=="object") { 
            square.hit();
            if (square.isSunk) {
                sunkShipsCount++;
                board[coordinates[0]][coordinates[1]] = "s";
            }
        } else {
            board[coordinates[0]][coordinates[1]] = "m";
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
        placeShip,
        receiveAttack,
        allShipsSunk
    }
};

module.exports = Gameboard;