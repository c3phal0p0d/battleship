const Gameboard = require("./gameboard");

const Player = () => {
    const gameboard = Gameboard();

    const makeMove = (enemyGameboard, coordinates) => {
        enemyGameboard.receiveAttack(coordinates)

    }

    return {
        get gameboard() {
            return gameboard;
        },
        makeMove
    }
};

module.exports = Player;