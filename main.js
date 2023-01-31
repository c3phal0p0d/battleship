(()=>{var e={642:e=>{e.exports=()=>{const e=e=>{let t;for(let r=0;r<10;r++)for(let a=0;a<10;a++)t=document.createElement("div"),t.classList.add("square"),t.classList.add("empty"),t.setAttribute("data-row",r),t.setAttribute("data-column",a),e.appendChild(t)},t=(e,t)=>document.querySelector(`.${t}[data-row="${e[0]}"][data-column="${e[1]}"]`);return{renderPlaceShipsView:()=>{const t=document.querySelector("#content");t.innerHTML="";const r=document.createElement("h2");r.textContent="Place your ships",t.appendChild(r);const a=document.createElement("div");a.id="ship-type-container",t.appendChild(a);const o=document.createElement("h3");o.id="ship-type",a.appendChild(o);const n=document.createElement("div");n.classList.add("place-ships-container"),t.appendChild(n);const d=document.createElement("div");d.classList.add("board"),e(d),n.appendChild(d);const l=document.createElement("button");l.id="rotate-ship-button",n.appendChild(l);const c=document.createElement("span");c.classList.add("material-symbols-outlined"),c.textContent="rotate_right",l.appendChild(c)},renderPlaceShipsBoard:e,displayShipType:e=>{document.querySelector("#ship-type").textContent=e},renderShipToBePlaced:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.style.backgroundColor="#e5dace59"},clearShipToBePlaced:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.style.backgroundColor="empty"==a.classList[1]?"#1e1c32":"#e5dace"},renderShip:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.classList.add("hasShip"),a.style.backgroundColor="#e5dace",a.style.border="0.5px solid #1e1c32"},renderPlayButton:()=>{const e=document.querySelector("#ship-type-container"),t=document.createElement("button");t.id="play-button",t.textContent="Play!",e.appendChild(t)},renderGameView:()=>{const e=document.querySelector("#content");e.innerHTML="";const t=document.createElement("div");t.id="boards-container",e.appendChild(t);const r=document.createElement("div");r.id="player-container",t.append(r);const a=document.createElement("h3");a.textContent="You",a.classList.add("current-player-turn"),r.appendChild(a);const o=document.createElement("div");o.classList.add("board"),o.classList.add("player"),r.appendChild(o);const n=document.createElement("div");n.id="enemy-container",t.append(n);const d=document.createElement("h3");d.textContent="Computer",n.appendChild(d);const l=document.createElement("div");l.classList.add("board"),l.classList.add("enemy"),n.appendChild(l);const c=document.createElement("div");c.id="current-player-turn",c.textContent="Make your move",e.appendChild(c)},displayCurrentPlayerTurn:e=>{document.querySelector("#current-player-turn").textContent="player"==e?"Make your move":"Computer is making its move..."},renderGameboard:(e,t,r)=>{let a;for(let o=0;o<10;o++)for(let n=0;n<10;n++)a=document.createElement("div"),a.classList.add("square"),a.setAttribute("data-row",o),a.setAttribute("data-column",n),r?(a.classList.add("player"),"object"==typeof e.getSquare(o,n)[0]&&(a.style.backgroundColor="#e5dace",a.style.border="0.5px solid #1e1c32")):r||a.classList.add("enemy"),t.appendChild(a)},renderMoveToMake:(e,r)=>{t(e,r).style.backgroundColor="#e5dace59"},clearMoveToMake:(e,r)=>{t(e,r).style.backgroundColor="#1e1c32"},renderMove:(e,r,a)=>{let o=t(e,a);switch(r){case"hit":o.classList.add("hit"),o.style.color="#1e1c32",o.style.backgroundColor="#e5dace",o.style.border="0.5px solid #1e1c32",o.textContent="X";break;case"sunk":o.style.color="#e5dace",o.style.backgroundColor="#e5dace59",o.style.border="0.5px solid #e5dace",o.textContent="X";break;case"miss":o.style.color="#e5dace",o.style.backgroundColor="#1e1c32",o.style.border="0.5px solid #e5dace",o.textContent="*"}}}}},417:(e,t,r)=>{const a=r(507),o=r(643),n=r(642);e.exports=()=>{const e=n(),t=[o("Carrier",5),o("Battleship",4),o("Destroyer",3),o("Submarine",3),o("Patrol Boat",2)],r=a(),d=a();let l="player",c=!0,s=0,u=!1;const i=()=>{c=1!=c},m=e=>[parseInt(e.getAttribute("data-row")),parseInt(e.getAttribute("data-column"))],p=()=>{document.querySelector("#rotate-ship-button").addEventListener("click",i)},y=()=>{let a=document.querySelectorAll(".square");for(let o=0;o<a.length;o++)a[o].addEventListener("mouseover",(a=>{let o=m(a.currentTarget);!u&&f(o,t[s],c,r.gameboard)&&e.renderShipToBePlaced(t[s],o,c)})),a[o].addEventListener("mouseout",(a=>{let o=m(a.currentTarget);!u&&f(o,t[s],c,r.gameboard)&&e.clearShipToBePlaced(t[s],o,c)})),a[o].addEventListener("click",(a=>{let o=m(a.currentTarget);if(!u&&f(o,t[s],c,r.gameboard)){if(S(t[s],c,o,r.gameboard),e.renderShip(t[s],o,c),s==t.length-1)return document.querySelector("#ship-type-container").innerHTML="",u=!0,e.renderPlayButton(),void h();s++,e.displayShipType(t[s].type)}}))},h=()=>{document.querySelector("#play-button").addEventListener("click",(t=>(b(d.gameboard),e.renderGameView(),e.displayCurrentPlayerTurn(l),e.renderGameboard(r.gameboard,document.querySelector(".board.player"),!0),e.renderGameboard(d.gameboard,document.querySelector(".board.enemy"),!1),void g())))},g=()=>{let t=document.querySelectorAll(".square.enemy");for(let r=0;r<t.length;r++)t[r].addEventListener("mouseover",(t=>{let r=m(t.currentTarget);k(r,d.gameboard)&&e.renderMoveToMake(r,"enemy")})),t[r].addEventListener("mouseout",(t=>{let r=m(t.currentTarget);k(r,d.gameboard)&&e.clearMoveToMake(r,"enemy")})),t[r].addEventListener("click",(e=>{let t=m(e.currentTarget);k(t,d.gameboard)&&v(t)}))},b=e=>{let r=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],a=1==Math.floor(2*Math.random());for(let o=0;o<t.length;o++){for(;!f(r,t[o],a,e);)r=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],a=1==Math.floor(2*Math.random());S(t[o],a,r,e)}},f=(e,t,r,a)=>{if(r&&e[1]+t.length-1>9)return!1;if(!r&&e[0]+t.length-1>9)return!1;for(let o=0;o<t.length;o++)if(r){if("empty"!=a.getSquare(e[0],e[1]+o)[0])return!1}else if("empty"!=a.getSquare(e[0]+o,e[1])[0])return!1;return!0},S=(e,t,r,a)=>{let o=[];for(let a=0;a<e.length;a++)t?o.push([r[0],r[1]+a]):o.push([r[0]+a,r[1]]);a.placeShip(e,o)},v=(t=null)=>{if(console.log("make move"),"player"==l)console.log("player move"),r.attack(d.gameboard,t),e.renderMove(t,C(t,d.gameboard),"enemy"),M(d.gameboard,"enemy"),l="computer",e.displayCurrentPlayerTurn(l),v();else{console.log("enemy move");let t=d.automatedAttack(r.gameboard);setTimeout((function(){l="player",e.displayCurrentPlayerTurn(l),e.renderMove(t,C(t,r.gameboard),"player"),M(r.gameboard,"player")}),2e3)}},k=(e,t)=>{if("computer"==l)return!1;let r=t.getSquare(e[0],e[1]);return!("miss"==r[1]|"sunk"==r[1]|"hit"==r[1])},C=(e,t)=>{let r=t.getSquare(e[0],e[1]);if("object"==typeof r[0])return"hit";switch(r[1]){case"":case"miss":return"miss";case"hit":return"hit";case"sunk":return"sunk"}},M=(t,r)=>{for(let a=0;a<10;a++)for(let o=0;o<10;o++)"sunk"==t.getSquare(a,o)[1]&&e.renderMove([a,o],"sunk",r)};return{start:()=>{e.renderPlaceShipsView(),e.displayShipType(t[s].type),i(),p(),y()}}}},498:e=>{e.exports=()=>{let e=[],t=0,r=0;for(let t=0;t<10;t++){e[t]=[];for(let r=0;r<10;r++)e[t][r]=["empty",""]}return{get missedAttacks(){return missedAttacks},get board(){return e},getSquare:(t,r)=>e[t][r],placeShip:(r,a)=>{for(let o=0;o<a.length;o++)coordinates=a[o],e[coordinates[0]][coordinates[1]][0]=r,t++},receiveAttack:t=>{if("object"==typeof e[t[0]][t[1]][0]){if(e[t[0]][t[1]][0].hit(),e[t[0]][t[1]][1]="hit",e[t[0]][t[1]][0].isSunk()){r++;let a=0;for(let r=0;r<10;r++)for(let o=0;o<10&&(e[r][o][0].type!=e[t[0]][t[1]][0].type||(e[r][o][1]="sunk",a++,a!=e[t[0]][t[1]][0].length));o++);e[t[0]][t[1]][1]="sunk"}}else e[t[0]][t[1]][1]="miss"},allShipsSunk:()=>r==t}}},507:(e,t,r)=>{const a=r(498);e.exports=()=>{const e=a();return{get gameboard(){return e},attack:(e,t)=>{e.receiveAttack(t)},automatedAttack:e=>{console.log("automated attack");let t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],r=e.getSquare(t[0],t[1]);for(;"miss"==r[1]|"sunk"==r[1]|"hit"==r[1];)t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],r=e.getSquare(t[0],t[1]);return e.receiveAttack(t),t}}}},643:e=>{e.exports=(e,t)=>{let r=0;return{get type(){return e},get length(){return t},hit:()=>{r++},isSunk:()=>t==r}}}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(642),r(643);const e=r(417);document.querySelector("#start-button").addEventListener("click",(t=>{e().start()}))})()})();