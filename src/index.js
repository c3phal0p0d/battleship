import * as display from "./display";

const Ship = require("./ship");
const Game = require("./game");

document.querySelector("#start-button").addEventListener("click", (e) => startGame());

function startGame(){
    let game = Game();
    game.start();
}