const Player = require("./player");
const Gameboard = require("./gameboard");
const Ship = require("./ship");
const Display = require("./display");

const Game = () => {
    const ships = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];

    const player = Player();
    const enemy = Player();


    /*** INITIALIZE SHIP POSITIONS ***/
    const addShipToBoard = (row, column, ship, isHorizontal, board) => {
        let coordinatesArray = [];
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                coordinatesArray.push([row, column + i]);
            } else {
                coordinatesArray.push([row + i, column]);
            }
        }

        board.placeShip(ship, coordinatesArray);

    }

    const isValidShipPosition = (row, column, ship, isHorizontal, board) => {
        // check if ship goes beyond edge of board
        if (isHorizontal && (column + ship.length - 1 > 9)){
            return false;
        } else if (!isHorizontal && (row + ship.length - 1 > 9)){
            return false;
        }

        // check if ship overlaps with another ship
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                if (board.getSquare(row, column + i)!=null) {
                    return false;
                }
            } else {
                if (board.getSquare(row + i, column)!=null) {
                    return false;
                }
            }
        }

        return true;
    }

    return {
        get player() {
            return player;
        },
        get enemy() {
            return enemy;
        },
        addShipToBoard,
        isValidShipPosition
    }
}

module.exports = Game;