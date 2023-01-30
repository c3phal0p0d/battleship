const Player = require("./player");
const Ship = require("./ship");
const Display = require("./display");

const Game = () => {
    const display = Display();
    const fleet = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];
    const player = Player();
    const enemy = Player();

    let currentPlayerTurn = "player";
    let isHorizontal = true;
    let shipIndex = 0;
    let readyToPlay = false;

    /*** INIT ***/
    const start = () => {
        initializePlaceShipsView();
    }
    
    const initializePlaceShipsView = () => {
        display.renderPlaceShipsView();
        display.displayShipType(fleet[shipIndex].type);

        addRotateButtonEventListener();
        addPlaceShipSquareEventListeners();
    }

    const initializeGameView = () => {
        generateRandomShipPositions(enemy.gameboard);

        display.renderGameView();
        display.displayCurrentPlayerTurn(currentPlayerTurn);

        
        display.renderGameboard(player.gameboard, document.querySelector(".board.player"), true);
        display.renderGameboard(enemy.gameboard,document.querySelector(".board.enemy"), false);

        addGameSquareEventListeners();
    }


    /*** EVENT LISTENERS ***/
    const addRotateButtonEventListener = () => {
       document.querySelector("#rotate-ship-button").addEventListener("click", () => rotateShip());
    }

    const addPlaceShipSquareEventListeners = () => {
        let squares = document.querySelectorAll(".square");

        for (let i=0; i<squares.length; i++){
            squares[i].addEventListener("mouseover", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (!readyToPlay && isValidShipPosition(coordinates, fleet[shipIndex], isHorizontal, player.gameboard)){
                    display.renderShipToBePlaced(fleet[shipIndex], coordinates, isHorizontal);
                }
            });
            squares[i].addEventListener("mouseout", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (!readyToPlay && isValidShipPosition(coordinates, fleet[shipIndex], isHorizontal, player.gameboard)){
                    display.clearShipToBePlaced(fleet[shipIndex], coordinates, isHorizontal);
                }
            });
            squares[i].addEventListener("click", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (!readyToPlay && isValidShipPosition(coordinates, fleet[shipIndex], isHorizontal, player.gameboard)){
                    addShipToBoard(fleet[shipIndex], isHorizontal,coordinates, player.gameboard);
                    display.renderShip(fleet[shipIndex], coordinates, isHorizontal);
                    if (shipIndex==fleet.length-1){
                        document.querySelector("#ship-type-container").innerHTML = "";
                        readyToPlay = true;
                        display.renderPlayButton();
                        addPlayButtonEventListener();
                        return;
                    }
                    shipIndex++;
                    display.displayShipType(fleet[shipIndex].type);
                }
            });
        }
    }

    const addPlayButtonEventListener = () => {
        document.querySelector("#play-button").addEventListener("click", (e) => initializeGameView());
    }

    const addGameSquareEventListeners = () => {
        let squares = document.querySelectorAll(".square.enemy");
        
        for (let i=0; i<squares.length; i++){
            
            squares[i].addEventListener("mouseover", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (isValidMove(coordinates, enemy.gameboard)) display.renderMoveToMake(coordinates);
            });
            squares[i].addEventListener("mouseout", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (isValidMove(coordinates, enemy.gameboard)) display.clearMoveToMake(coordinates);
            });
            squares[i].addEventListener("click", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (isValidMove(coordinates, enemy.gameboard)) {
                    display.renderMove(coordinates, "hit");
                    makeMove(coordinates);
                }
            });
        }
    }

    /*** UTILS ***/
    const rotateShip = () => {
        isHorizontal = (isHorizontal == true) ? false : true;
    }

    const getCoordinates = (square) => {
        let x = parseInt(square.getAttribute("data-row"));
        let y = parseInt(square.getAttribute("data-column"));
        return [x, y];
    }

    /*** INITIALIZE SHIP POSITIONS ***/
    const generateRandomShipPositions = (board) => {
        let coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        let isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);

        for (let i=0; i<fleet.length; i++){
            while (!isValidShipPosition(coordinates, fleet[i], isHorizontal, board)){
                coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);
            }
            addShipToBoard(fleet[i], isHorizontal, coordinates, board);
        }
    }

    const isValidShipPosition = (coordinates, ship, isHorizontal, board) => {
        // check if ship goes beyond edge of board
        if (isHorizontal && (coordinates[1] + ship.length - 1 > 9)){
            return false;
        } else if (!isHorizontal && (coordinates[0] + ship.length - 1 > 9)){
            return false;
        }

        // check if ship overlaps with another ship
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                if (board.getSquare(coordinates[0], coordinates[1] + i)!=null) {
                    return false;
                }
            } else {
                if (board.getSquare(coordinates[0] + i, coordinates[1])!=null) {
                    return false;
                }
            }
        }

        return true;
    }

    const addShipToBoard = (ship, isHorizontal, coordinates, board) => {
        let coordinatesArray = [];
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                coordinatesArray.push([coordinates[0], coordinates[1] + i]);
            } else {
                coordinatesArray.push([coordinates[0] + i, coordinates[1]]);
            }
        }

        board.placeShip(ship, coordinatesArray);

    }

    /*** GAMEPLAY ***/
    const isValidMove = (coordinates, board) => {
        // prevent player move when it is computer's turn
        if (currentPlayerTurn=="computer"){
            return false;
        }

        // check if square has already been hit
        if (board.getSquare(coordinates[0], coordinates[1])=="m" | board.getSquare(coordinates[0], coordinates[1])=="s"){
            return false;
        }

        return true;
    }

    const makeMove = (coordinates=null) => {
        if (currentPlayerTurn=="player"){
            player.attack(enemy.gameboard, coordinates);
            currentPlayerTurn = "computer";
            display.displayCurrentPlayerTurn();
        } else {
            enemy.automatedAttack(player.gameboard);
            currentPlayerTurn = "player";
            display.displayCurrentPlayerTurn();
        }
    }

    return {
        start
    }
}

module.exports = Game;