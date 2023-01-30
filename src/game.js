const Player = require("./player");
const Gameboard = require("./gameboard");
const Ship = require("./ship");
const Display = require("./display");

const Game = () => {
    const ships = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];

    const player = Player();
    const enemy = Player();

    let currentPlayerTurn = "player";

    /*** INITIALIZE SHIP POSITIONS ***/
    const generateRandomShipPositions = (board) => {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);

        for (let i=0; i<ships.length; i++){
            while (!isValidShipPosition(row, column, ships[i], isHorizontal, board)){
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
                isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);
            }
            addShipToBoard(row, column, ships[i], isHorizontal, board);
        }
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

    /*** GAMEPLAY ***/
    const isValidMove = (row, column, board) => {
        // check if computer is currently making its move
        console.log(currentPlayerTurn);
        if (currentPlayerTurn=="computer"){
            return false;
        }

        // check if square has already been hit
        if (board.getSquare(row, column)=="m" | board.getSquare(row, column)=="s"){
            return false;
        }

        return true;
    }

    const makeMove = (coordinates=null) => {
        console.log(currentPlayerTurn);
        if (currentPlayerTurn=="player"){
            player.attack(enemy.gameboard, coordinates);
            currentPlayerTurn = "computer";
            Display.displayCurrentPlayerTurn();
            makeMove();
        } else {
            console.log("e");
            enemy.automatedAttack(player.gameboard);
            currentPlayerTurn = "player";
        }
    }

    return {
        get player() {
            return player;
        },
        get enemy() {
            return enemy;
        },
        get currentPlayerTurn() {
            return currentPlayerTurn;
        },
        set currentPlayerTurn(currentPlayerTurn) {},
        generateRandomShipPositions,
        isValidShipPosition,
        addShipToBoard,
        isValidMove,
        makeMove
    }
}

module.exports = Game;