const Display = () => {

    /*** PLACE SHIPS VIEW ***/
    const renderPlaceShipsView = () => {
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
    
        const placeShipsContainer = document.createElement("div");
        placeShipsContainer.classList.add("place-ships-container");
        content.appendChild(placeShipsContainer);
    
        const board = document.createElement("div");
        board.classList.add("board");
        renderPlaceShipsBoard(board);
        placeShipsContainer.appendChild(board);
    
        const rotateShipButton = document.createElement("button");
        rotateShipButton.id = "rotate-ship-button";
        placeShipsContainer.appendChild(rotateShipButton);
        const rotateShipSymbol = document.createElement("span");
        rotateShipSymbol.classList.add("material-symbols-outlined");
        rotateShipSymbol.textContent = "rotate_right";
        rotateShipButton.appendChild(rotateShipSymbol);
    }

    const renderPlaceShipsBoard = (boardDiv) => {
        let square;
        for (let i=0; i<10; i++){
            for (let j=0; j<10; j++){
                square = document.createElement("div");
                square.classList.add("square");
                square.classList.add("empty");
                square.setAttribute("data-row", i);
                square.setAttribute("data-column", j);
                boardDiv.appendChild(square);
            }
        }
    }
    
    const displayShipType = (shipType) => {
        document.querySelector("#ship-type").textContent = shipType;
    }
    
    const renderShipToBePlaced = (ship, coordinates, isHorizontal) => {
        let square;
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                square = document.querySelector(`[data-row="${coordinates[0]}"][data-column="${coordinates[1] + i}"]`);
            } else {
                square = document.querySelector(`[data-row="${coordinates[0] + i}"][data-column="${coordinates[1]}"]`);
            }
            square.style.backgroundColor = "#e5dace59";
        }
    }
    
    const clearShipToBePlaced = (ship, coordinates, isHorizontal) => {
        let square;
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                square = document.querySelector(`[data-row="${coordinates[0]}"][data-column="${coordinates[1] + i}"]`);
            } else {
                square = document.querySelector(`[data-row="${coordinates[0] + i}"][data-column="${coordinates[1]}"]`);
            }
            square.style.backgroundColor = (square.classList[1]=="empty" ? "#1e1c32" : "#e5dace");
        }
    }
    
    const renderShip = (ship, coordinates, isHorizontal) => {
        let square;
        for (let i=0; i<ship.length; i++){
            if (isHorizontal){
                square = document.querySelector(`[data-row="${coordinates[0]}"][data-column="${coordinates[1] + i}"]`);
            } else {
                square = document.querySelector(`[data-row="${coordinates[0] + i}"][data-column="${coordinates[1]}"]`);
            }
            square.classList.add("hasShip");
            square.style.backgroundColor = "#e5dace";
            square.style.border = "0.5px solid #1e1c32";
        }
    }

    const renderPlayButton = () => {
        const shipType = document.querySelector("#ship-type-container");
        const playButton = document.createElement("button");
        playButton.id = "play-button";
        playButton.textContent = "Play!";
        shipType.appendChild(playButton);
    }
    

    /*** GAME VIEW ***/
    const renderGameView = () => {
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
        playerHeader.classList.add("current-player-turn");
        playerContainer.appendChild(playerHeader);
    
        const playerBoardDiv = document.createElement("div");
        playerBoardDiv.classList.add("board");
        playerBoardDiv.classList.add("player");
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
        enemyContainer.appendChild(enemyBoardDiv);
    
        const currentPlayerTurnDiv = document.createElement("div");
        currentPlayerTurnDiv.id = "current-player-turn";
        currentPlayerTurnDiv.textContent = "Make your move";
        content.appendChild(currentPlayerTurnDiv);
    
    }
    
    const renderGameboard = (gameboard, boardDiv, isPlayerBoard) => {
        let square;
        for (let i=0; i<10; i++){
            for (let j=0; j<10; j++){
                square = document.createElement("div");
                square.classList.add("square");
                square.setAttribute("data-row", i);
                square.setAttribute("data-column", j);
                if (isPlayerBoard) {
                    square.classList.add("player");
                    if (typeof(gameboard.getSquare(i, j))[0]=="object"){
                        square.style.backgroundColor = "#e5dace";
                        square.style.border = "0.5px solid #1e1c32";
                    }
                } else if (!isPlayerBoard) {
                    square.classList.add("enemy");
                }
                
                boardDiv.appendChild(square);
            }
        }
    }

    const displayCurrentPlayerTurn = (currentPlayerTurn) => {
        document.querySelector("#current-player-turn").textContent = (currentPlayerTurn=="player") ? "Make your move" : "Computer is making its move...";
    }
    
    const renderMoveToMake = (coordinates, enemyPlayer) => {
        getSquareFromCoordinates(coordinates, enemyPlayer).style.backgroundColor = "#e5dace59";
    }
    
    
    const clearMoveToMake = (coordinates, enemyPlayer) => {
        getSquareFromCoordinates(coordinates, enemyPlayer).style.backgroundColor = "#1e1c32";
    }
    
    const renderMove = (coordinates, moveOutcome, enemyPlayer) => {
        let square = getSquareFromCoordinates(coordinates, enemyPlayer);
        
        switch (moveOutcome){
            case "hit":
                square.classList.add("hit");
                square.style.color =  "#1e1c32";
                square.style.backgroundColor = "#e5dace";
                square.style.border = "0.5px solid #1e1c32";
                square.textContent = "X";
                break;
            case "sunk":
                square.style.color =  "#e5dace";
                square.style.backgroundColor = "#e5dace59";
                square.style.border = "0.5px solid #e5dace";
                square.textContent = "X";
                break;
            case "miss":
                square.style.color = "#e5dace";
                square.style.backgroundColor = "#1e1c32";
                square.style.border = "0.5px solid #e5dace";
                square.textContent = "*";
                break;
        }
    }

    const getSquareFromCoordinates = (coordinates, enemyPlayer) => {
        
        return document.querySelector(`.${enemyPlayer}[data-row="${coordinates[0]}"][data-column="${coordinates[1]}"]`);
    }

    return {
        renderPlaceShipsView,
        renderPlaceShipsBoard,
        displayShipType,
        renderShipToBePlaced,
        clearShipToBePlaced,
        renderShip,
        renderPlayButton,
        renderGameView,
        displayCurrentPlayerTurn,
        renderGameboard,
        renderMoveToMake,
        clearMoveToMake,
        renderMove
    }
};

module.exports = Display;