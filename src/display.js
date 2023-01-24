export function renderPlaceShipsScreen() {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Place your ships";
    content.appendChild(heading);

    const placeShipsContainer = document.createElement("div");
    placeShipsContainer.classList.add("place-ships-container");
    content.appendChild(placeShipsContainer);

    const shipsList = document.createElement("div");
    shipsList.id = "ships-list";
    const ships = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"];
    for (let i=0; i<ships.length; i++){
        let ship = document.createElement("p");
        ship.textContent = ships[i];
        ship.addEventListener("click", (event) => {
            changeSelectedElement(event, shipsList.children);
        });
        shipsList.appendChild(ship);
    }
    placeShipsContainer.appendChild(shipsList);

    const board = document.createElement("div");
    board.classList.add("board");
    renderBoard(board);
    placeShipsContainer.appendChild(board);

    const playButton = document.createElement("button");
    playButton.textContent = "Play!";
    playButton.addEventListener("click", (e) => renderGameScreen());
    content.appendChild(playButton);

}

function changeSelectedElement(event, elements){
    console.log(elements.length);
    for (let i=0; i<elements.length; i++){
        elements[i].classList.remove("selected");
    }

    event.currentTarget.classList.add("selected");

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

    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board");
    playerBoard.classList.add("player");
    renderBoard(playerBoard);
    playerContainer.appendChild(playerBoard);

    const enemyContainer = document.createElement("div");
    enemyContainer.id = "enemy-container";
    boardsContainer.append(enemyContainer);

    const enemyHeader = document.createElement("h3");
    enemyHeader.textContent = "Computer";
    enemyContainer.appendChild(enemyHeader);

    const enemyBoard = document.createElement("div");
    enemyBoard.classList.add("board");
    enemyBoard.classList.add("enemy");
    renderBoard(enemyBoard);
    enemyContainer.appendChild(enemyBoard);

}

export function renderBoard(element) {
    let square;
    for (let i=0; i<100; i++){
        square = document.createElement("div");
        square.setAttribute("id", i);
        element.appendChild(square);
    }
}