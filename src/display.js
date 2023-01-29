const Ship = require("./ship");
const Game = require("./game");
const ships = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Destroyer", 3), Ship("Submarine", 3), Ship("Patrol Boat", 2)];
const game = Game();

let isHorizontal = true;
let shipTypeIndex = 0;
let readyToPlay = false;

export function renderPlaceShipsScreen() {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Place your ships";
    content.appendChild(heading);

    const shipTypeContainer = document.createElement("div");
    shipTypeContainer.id = "ship-type-container";
    content.appendChild(shipTypeContainer);
    const shipType = document.createElement("h3");
    shipType.id = "ship-type";
    shipTypeContainer.appendChild(shipType);
    displayShipType(shipTypeIndex);

    const placeShipsContainer = document.createElement("div");
    placeShipsContainer.classList.add("place-ships-container");
    content.appendChild(placeShipsContainer);

    const board = document.createElement("div");
    board.classList.add("board");
    renderPlaceShipsBoard(board);
    placeShipsContainer.appendChild(board);

    const rotateShipButton = document.createElement("button");
    rotateShipButton.id = "rotate-ship-button";
    rotateShipButton.addEventListener("click", () => rotateShip());
    placeShipsContainer.appendChild(rotateShipButton);
    const rotateShipSymbol = document.createElement("span");
    rotateShipSymbol.classList.add("material-symbols-outlined");
    rotateShipSymbol.textContent = "rotate_right";
    rotateShipButton.appendChild(rotateShipSymbol);

}

function displayShipType(n){
    document.querySelector("#ship-type").textContent = ships[n].type;
}

function renderPlayButton(){
    const shipType = document.querySelector("#ship-type-container");
    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.textContent = "Play!";
    playButton.addEventListener("click", (e) => renderGameScreen());
    shipType.appendChild(playButton);
}

function renderShipToBePlaced(ship, square){
    let row = parseInt(square.getAttribute("data-row"));
    let column = parseInt(square.getAttribute("data-column"));

    if (!game.isValidShipPosition(row, column, ship, isHorizontal, game.player.gameboard)) {
        return;
    }

    for (let i=0; i<ship.length; i++){
        if (isHorizontal){
            square = document.querySelector(`[data-row="${row}"][data-column="${column + i}"]`);
        } else {
            square = document.querySelector(`[data-row="${row + i}"][data-column="${column}"]`);
        }
        square.style.backgroundColor = "#e5dace59";
    }
}

function clearShipToBePlaced(ship, square){
    let row = parseInt(square.getAttribute("data-row"));
    let column = parseInt(square.getAttribute("data-column"));

    if (!game.isValidShipPosition(row, column, ship, isHorizontal, game.player.gameboard)) {
        return;
    }

    for (let i=0; i<ship.length; i++){
        if (isHorizontal){
            square = document.querySelector(`[data-row="${row}"][data-column="${column + i}"]`);
        } else {
            square = document.querySelector(`[data-row="${row + i}"][data-column="${column}"]`);
        }
        square.style.backgroundColor = (square.classList[0]=="empty" ? "#1e1c32" : "#e5dace");
    }
}

function renderShip(ship, square){
    let row = parseInt(square.getAttribute("data-row"));
    let column = parseInt(square.getAttribute("data-column"));

    if (!game.isValidShipPosition(row, column, ship, isHorizontal, game.player.gameboard)) {
        return;
    }

    game.addShipToBoard(row, column, ship, isHorizontal, game.player.gameboard);

    for (let i=0; i<ship.length; i++){
        if (isHorizontal){
            square = document.querySelector(`[data-row="${row}"][data-column="${column + i}"]`);
        } else {
            square = document.querySelector(`[data-row="${row + i}"][data-column="${column}"]`);
        }
        square.style.backgroundColor = "#e5dace";
        square.style.border = "0.5px solid #1e1c32";
        square.classList.remove("empty");
        square.classList.add("hasShip");
    }

    if (shipTypeIndex==ships.length-1){
        document.querySelector("#ship-type-container").innerHTML = "";
        readyToPlay = true;
        renderPlayButton();
        return;
    }
    shipTypeIndex++;
    displayShipType(shipTypeIndex);
}

function rotateShip(){
    isHorizontal = (isHorizontal == true) ? false : true;
}


export function renderPlaceShipsBoard(boardDiv) {
    let square;
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            square = document.createElement("div");
            square.classList.add("empty");
            square.setAttribute("data-row", i);
            square.setAttribute("data-column", j);
            square.addEventListener("mouseover", (event) => {
                if (!readyToPlay){
                    if (event.currentTarget.classList[0]=="empty"){
                        renderShipToBePlaced(ships[shipTypeIndex], event.currentTarget);
                    }
                }
            });
            square.addEventListener("mouseout", (event) => {
                if (!readyToPlay){
                    if (event.currentTarget.classList[0]=="empty"){
                        clearShipToBePlaced(ships[shipTypeIndex], event.currentTarget);
                    }
                }
            });
            square.addEventListener("click", (event) => {
                if (!readyToPlay){
                    if (event.currentTarget.classList[0]=="empty"){
                        renderShip(ships[shipTypeIndex], event.currentTarget);
                    }
                }
            });
            boardDiv.appendChild(square);
        }
    }
}

export function renderGameScreen() {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    const boardsContainer = document.createElement("div");
    boardsContainer.id = "boards-container";
    content.appendChild(boardsContainer);

    const playerContainer = document.createElement("div");
    playerContainer.id = "player-container";
    boardsContainer.append(playerContainer);

    const playerHeader = document.createElement("h3");
    playerHeader.textContent = "You";
    playerContainer.appendChild(playerHeader);

    const playerBoardDiv = document.createElement("div");
    playerBoardDiv.classList.add("board");
    playerBoardDiv.classList.add("player");
    renderGameboard(game.player.gameboard, playerBoardDiv);
    playerContainer.appendChild(playerBoardDiv);

    const enemyContainer = document.createElement("div");
    enemyContainer.id = "enemy-container";
    boardsContainer.append(enemyContainer);

    const enemyHeader = document.createElement("h3");
    enemyHeader.textContent = "Computer";
    enemyContainer.appendChild(enemyHeader);

    const enemyBoardDiv = document.createElement("div");
    enemyBoardDiv.classList.add("board");
    enemyBoardDiv.classList.add("enemy");
    game.generateRandomShipPositions(game.enemy.gameboard);
    renderGameboard(game.enemy.gameboard, enemyBoardDiv);
    enemyContainer.appendChild(enemyBoardDiv);

}

export function renderGameboard(gameboard, boardDiv){
    let square;
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            square = document.createElement("div");
            square.setAttribute("data-row", i);
            square.setAttribute("data-column", j);
            if (gameboard.getSquare(i, j) && typeof(gameboard.getSquare(i, j))=="object"){
                square.style.backgroundColor = "#e5dace";
                square.style.border = "0.5px solid #1e1c32";
            }
            boardDiv.appendChild(square);
        }
    }
}