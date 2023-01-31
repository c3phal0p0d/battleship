const Gameboard = require("./gameboard");

const Player = () => {
    const gameboard = Gameboard();

    const attack = (enemyGameboard, coordinates) => {
        enemyGameboard.receiveAttack(coordinates);
    }

    const automatedAttack = (enemyGameboard) => {
        let coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        let square = enemyGameboard.getSquare(coordinates[0], coordinates[1]);

        // Check if square has not already been attacked
        while (square[1]=="miss" | square[1]=="sunk" | square[1]=="hit") {
            coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
            square = enemyGameboard.getSquare(coordinates[0], coordinates[1]);
        }

        enemyGameboard.receiveAttack(coordinates);
        return coordinates;
    }

    return {
        get gameboard() {
            return gameboard;
        },
        attack,
        automatedAttack
    }
};

module.exports = Player;