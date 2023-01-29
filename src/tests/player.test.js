const Gameboard = require("../gameboard");
const Player = require("../player");
const Ship = require('../ship');

test("test attack()", () =>{
    const player = Player();
    const enemy = Player();
    enemy.gameboard.placeShip(Ship("Ship", 1), [[0, 0]]);

    player.attack(enemy.gameboard, [0, 0]);

    expect(enemy.gameboard.board[0][0]).toEqual["s"];
});

test("test automatedAttack()", () =>{
    
    const player = Player();
    const enemy = Player();

    let originalPlayerGameboard = Gameboard();

    let ship;
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            ship = Ship("Ship", 1);
            player.gameboard.placeShip(ship, [[i, j]]);
            originalPlayerGameboard.placeShip(ship, [[i, j]]);
        }
    }

    enemy.automatedAttack(player.gameboard);
    
    let isDifferentArray = false;
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            if (player.gameboard.board[i][j]!=originalPlayerGameboard.board[i][j]){
                isDifferentArray = true;
                break;
            }
        }
    }

    expect(isDifferentArray).toEqual(true);
    
});