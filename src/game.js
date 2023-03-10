const Player = require("./player");
const Ship = require("./ship");
const Display = require("./display");

const Game = () => {
    let playerFleet = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];
    let enemyFleet = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];
    let display;
    let player;
    let enemy;
    let currentPlayerTurn;
    let isHorizontal;
    let shipIndex;
    let readyToPlay;

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
        // initialize values
        display = Display();
        player = Player();
        enemy = Player();
        currentPlayerTurn = "player";
        isHorizontal = true;
        shipIndex = 0;
        readyToPlay = false;

        initializePlaceShipsView();
    }
    
    const initializePlaceShipsView = () => {
        display.renderPlaceShipsView();
        display.displayShipType(playerFleet[shipIndex].type);

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
                if (!readyToPlay && isValidShipPosition(coordinates, playerFleet[shipIndex], isHorizontal, player.gameboard)){
                    display.renderShipToBePlaced(playerFleet[shipIndex], coordinates, isHorizontal);
                }
            });
            squares[i].addEventListener("mouseout", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (!readyToPlay && isValidShipPosition(coordinates, playerFleet[shipIndex], isHorizontal, player.gameboard)){
                    display.clearShipToBePlaced(playerFleet[shipIndex], coordinates, isHorizontal);
                }
            });
            squares[i].addEventListener("click", (event) => {
                let coordinates = getCoordinates(event.currentTarget);
                if (!readyToPlay && isValidShipPosition(coordinates, playerFleet[shipIndex], isHorizontal, player.gameboard)){
                    addShipToBoard(playerFleet[shipIndex], isHorizontal ,coordinates, player.gameboard);
                    display.renderShip(playerFleet[shipIndex], coordinates, isHorizontal);
                    if (shipIndex==playerFleet.length-1){
                        document.querySelector("#ship-type-container").innerHTML = "";
                        readyToPlay = true;
                        display.renderPlayButton();
                        addPlayButtonEventListener();
                        return;
                    }
                    shipIndex++;
                    display.displayShipType(playerFleet[shipIndex].type);
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

    const addPlayAgainButtonEventListener = () => {
        document.querySelector("#play-again-button").addEventListener("click", (e) => start());
    }

    /*** INITIALIZE SHIP POSITIONS ***/
    const generateRandomShipPositions = (board) => {
        let coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        let isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);

        for (let i=0; i<enemyFleet.length; i++){
            while (!isValidShipPosition(coordinates, enemyFleet[i], isHorizontal, board)){
                coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                isHorizontal = (Math.floor(Math.random() * 2)==1 ? true : false);
            }
            addShipToBoard(enemyFleet[i], isHorizontal, coordinates, board);
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
        if (currentPlayerTurn=="player"){
            player.attack(enemy.gameboard, coordinates);
            display.renderMove(coordinates, getMoveOutcome(coordinates, enemy.gameboard), "enemy");
            renderSunkShips(enemy.gameboard, "enemy");
            currentPlayerTurn = "computer";
            display.displayCurrentPlayerTurn(currentPlayerTurn);
            if (isGameOver()){
                return;
            }

            // computer's turn
            coordinates = enemy.automatedAttack(player.gameboard);
            
            setTimeout(function () {
                currentPlayerTurn = "player";
                display.displayCurrentPlayerTurn(currentPlayerTurn);
                display.renderMove(coordinates, getMoveOutcome(coordinates, player.gameboard), "player");
                renderSunkShips(player.gameboard, "player");
                if (isGameOver()){
                    return;
                }
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
        let shipFleet = (enemyPlayer=="player") ? playerFleet : enemyFleet;
        for (let i=0; i<shipFleet.length; i++){
            if (checkSunkShip(shipFleet[i], board)) {
                renderSunkShip(shipFleet[i], board, enemyPlayer);
            }
        }
    }

    const checkSunkShip = (ship, board) => {
        for (let i=0; i<10; i++){
            for (let j=0; j<10; j++){
                if (board.getSquare(i, j)[0]==ship && board.getSquare(i, j)[1] == "sunk"){
                    return true;
                }
            }
        }
        return false;
    }

    const renderSunkShip = (ship, board, enemyPlayer) => {
        for (let i=0; i<10; i++){
            for (let j=0; j<10; j++){
                if (board.getSquare(i, j)[0]==ship){
                    display.renderMove([i, j], "sunk", enemyPlayer);
                }
            }
        }
    }

    /*** GAME OVER LOGIC ***/
    const isGameOver = () => {
        if (player.gameboard.allShipsSunk()){
            display.displayGameOver("You lost");
            display.renderPlayAgainButton();
            addPlayAgainButtonEventListener();
            return true;
        } else if (enemy.gameboard.allShipsSunk()){
            display.displayGameOver("You won!");
            display.renderPlayAgainButton();
            addPlayAgainButtonEventListener();
            return true;
        }
        return false;
    }


    return {
        start
    }
}

module.exports = Game;