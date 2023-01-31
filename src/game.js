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

    /*** UTILS ***/
    const rotateShip = () => {
        isHorizontal = (isHorizontal == true) ? false : true;
    }

    const getCoordinates = (square) => {
        let x = parseInt(square.getAttribute("data-row"));
        let y = parseInt(square.getAttribute("data-column"));
        return [x, y];
    }

    /*** INIT ***/
    const start = () => {
        initializePlaceShipsView();
    }
    
    const initializePlaceShipsView = () => {
        display.renderPlaceShipsView();
        display.displayShipType(fleet[shipIndex].type);

        rotateShip();
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
       document.querySelector("#rotate-ship-button").addEventListener("click", rotateShip);
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
                if (isValidMove(coordinates, enemy.gameboard)) display.renderMoveToMake(coordinates, "enemy");
            });
            squares[i].addEventListener("mouseout", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (isValidMove(coordinates, enemy.gameboard)) display.clearMoveToMake(coordinates,"enemy");
            });
            squares[i].addEventListener("click", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (isValidMove(coordinates, enemy.gameboard)) {
                    makeMove(coordinates);
                }
            });
        }
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
                if (board.getSquare(coordinates[0], coordinates[1] + i)[0]!="empty") {
                    return false;
                }
            } else {
                if (board.getSquare(coordinates[0] + i, coordinates[1])[0]!="empty") {
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
    const makeMove = (coordinates=null) => {
        console.log("make move");
        if (currentPlayerTurn=="player"){
            console.log("player move");
            player.attack(enemy.gameboard, coordinates);
            display.renderMove(coordinates, getMoveOutcome(coordinates, enemy.gameboard), "enemy");
            renderSunkShips(enemy.gameboard, "enemy");
            currentPlayerTurn = "computer";
            display.displayCurrentPlayerTurn(currentPlayerTurn);
            makeMove();
        } else {
            console.log("enemy move");
            let coordinates = enemy.automatedAttack(player.gameboard);
            
            setTimeout(function () {
                currentPlayerTurn = "player";
                display.displayCurrentPlayerTurn(currentPlayerTurn);
                display.renderMove(coordinates, getMoveOutcome(coordinates, player.gameboard), "player");
                renderSunkShips(player.gameboard, "player");
            }, 2000);
        }
    }

    const isValidMove = (coordinates, board) => {
        // prevent player move when it is computer's turn
        if (currentPlayerTurn=="computer"){
            return false;
        }

        // check if square has already been hit
        let square = board.getSquare(coordinates[0], coordinates[1]);
        if (square[1]=="miss" | square[1]=="sunk" | square[1]=="hit"){
            return false;
        }

        return true;
    }

    const getMoveOutcome = (coordinates, enemyBoard) => {
        let square = enemyBoard.getSquare(coordinates[0], coordinates[1]);

        if (typeof(square[0])=="object"){
            return "hit";
        }

        switch (square[1]) {
            case (""):
            case ("miss"):
                return "miss";
            case ("hit"):
                return "hit";
            case ("sunk"):
                return "sunk";
        }
    }

    const renderSunkShips = (board, enemyPlayer) => {
        for (let i=0; i<10; i++){
            for (let j=0; j<10; j++){
                if (board.getSquare(i, j)[1]== "sunk"){
                    display.renderMove([i, j], "sunk", enemyPlayer);
                }
            }
        }
    }

    return {
        start
    }
}

module.exports = Game;