const Player = require("../player");
const Ship = require('../ship');

test("test makeMove()", () =>{
    const player = Player();
    const enemy = Player();
    enemy.gameboard.placeShip(Ship("Ship", 1), [[0, 0]]);

    player.makeMove(enemy.gameboard, [0, 0]);

    expect(enemy.gameboard.board[0][0]).toEqual["s"];
});