const Gameboard = require("../gameboard");
const Ship = require('../ship');

test("test placeShip()", () => {
    const gameboard = Gameboard();
    const ship = Ship("Ship", 1);
    gameboard.placeShip(ship, [[0, 0]]);
    
    expect(gameboard.board[0][0]).toEqual(ship);
});

test("test receiveAttack() on square containing ship", () => {
    const gameboard = Gameboard();
    const ship = Ship(1);
    gameboard.placeShip(ship, [[0, 0]]);

    gameboard.receiveAttack([0, 0]);
    
    expect(gameboard.board[0][0]).toEqual("s");
});

test("test receiveAttack() on empty square", () => {
    const gameboard = Gameboard();
    const ship = Ship("Ship", 1);
    gameboard.placeShip(ship, [[0, 0]]);

    gameboard.receiveAttack([0, 1]);
    
    expect(gameboard.board[0][1]).toEqual("m");
});

test("test allShipsSunk()", () => {
    const gameboard = Gameboard();
    const ship = Ship("Ship", 1);
    gameboard.placeShip(ship, [[0, 0]]);

    gameboard.receiveAttack([0, 0]);
    
    expect(gameboard.allShipsSunk()).toEqual(true);
});