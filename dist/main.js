(()=>{var e={642:e=>{e.exports=()=>{const e=e=>{let t;for(let r=0;r<10;r++)for(let a=0;a<10;a++)t=document.createElement("div"),t.classList.add("square"),t.classList.add("empty"),t.setAttribute("data-row",r),t.setAttribute("data-column",a),e.appendChild(t)},t=e=>document.querySelector(`.enemy[data-row="${e[0]}"][data-column="${e[1]}"]`);return{renderPlaceShipsView:()=>{const t=document.querySelector("#content");t.innerHTML="";const r=document.createElement("h2");r.textContent="Place your ships",t.appendChild(r);const a=document.createElement("div");a.id="ship-type-container",t.appendChild(a);const o=document.createElement("h3");o.id="ship-type",a.appendChild(o);const n=document.createElement("div");n.classList.add("place-ships-container"),t.appendChild(n);const d=document.createElement("div");d.classList.add("board"),e(d),n.appendChild(d);const l=document.createElement("button");l.id="rotate-ship-button",l.addEventListener("click",(()=>rotateShip())),n.appendChild(l);const c=document.createElement("span");c.classList.add("material-symbols-outlined"),c.textContent="rotate_right",l.appendChild(c)},renderPlaceShipsBoard:e,displayShipType:e=>{document.querySelector("#ship-type").textContent=e},renderShipToBePlaced:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.style.backgroundColor="#e5dace59"},clearShipToBePlaced:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.style.backgroundColor="empty"==a.classList[1]?"#1e1c32":"#e5dace"},renderShip:(e,t,r)=>{let a;for(let o=0;o<e.length;o++)a=r?document.querySelector(`[data-row="${t[0]}"][data-column="${t[1]+o}"]`):document.querySelector(`[data-row="${t[0]+o}"][data-column="${t[1]}"]`),a.classList.add("hasShip"),a.style.backgroundColor="#e5dace",a.style.border="0.5px solid #1e1c32"},renderPlayButton:()=>{const e=document.querySelector("#ship-type-container"),t=document.createElement("button");t.id="play-button",t.textContent="Play!",e.appendChild(t)},renderGameView:()=>{const e=document.querySelector("#content");e.innerHTML="";const t=document.createElement("div");t.id="boards-container",e.appendChild(t);const r=document.createElement("div");r.id="player-container",t.append(r);const a=document.createElement("h3");a.textContent="You",a.classList.add("current-player-turn"),r.appendChild(a);const o=document.createElement("div");o.classList.add("board"),o.classList.add("player"),r.appendChild(o);const n=document.createElement("div");n.id="enemy-container",t.append(n);const d=document.createElement("h3");d.textContent="Computer",n.appendChild(d);const l=document.createElement("div");l.classList.add("board"),l.classList.add("enemy"),n.appendChild(l);const c=document.createElement("div");c.id="current-player-turn",c.textContent="Make your move",e.appendChild(c)},displayCurrentPlayerTurn:e=>{document.querySelector("#current-player-turn").textContent="player"==e?"Make your move":"Computer is making its move..."},renderGameboard:(e,t,r)=>{let a;for(let o=0;o<10;o++)for(let n=0;n<10;n++)a=document.createElement("div"),a.classList.add("square"),a.setAttribute("data-row",o),a.setAttribute("data-column",n),r?(a.classList.add("player"),e.getSquare(o,n)&&"object"==typeof e.getSquare(o,n)&&(a.style.backgroundColor="#e5dace",a.style.border="0.5px solid #1e1c32")):r||a.classList.add("enemy"),t.appendChild(a)},renderMoveToMake:(e,r)=>{t(e).style.backgroundColor="#e5dace59"},clearMoveToMake:(e,r)=>{t(e).style.backgroundColor="#1e1c32"},renderMove:(e,r,a)=>{let o=t(e);o.style.color="#e5dace",o.style.backgroundColor="#1e1c32",o.textContent="X"}}}},417:(e,t,r)=>{const a=r(507),o=r(643),n=r(642);e.exports=()=>{const e=n(),t=[o("Carrier",5),o("Battleship",4),o("Destroyer",3),o("Submarine",3),o("Patrol Boat",2)],r=a(),d=a();let l="player",c=!0,u=0,s=!1;const i=()=>{document.querySelector("#rotate-ship-button").addEventListener("click",(()=>y()))},m=()=>{let a=document.querySelectorAll(".square");for(let o=0;o<a.length;o++)a[o].addEventListener("mouseover",(a=>{let o=g(a.currentTarget);!s&&S(o,t[u],c,r.gameboard)&&e.renderShipToBePlaced(t[u],o,c)})),a[o].addEventListener("mouseout",(a=>{let o=g(a.currentTarget);!s&&S(o,t[u],c,r.gameboard)&&e.clearShipToBePlaced(t[u],o,c)})),a[o].addEventListener("click",(a=>{let o=g(a.currentTarget);if(!s&&S(o,t[u],c,r.gameboard)){if(f(t[u],c,o,r.gameboard),e.renderShip(t[u],o,c),u==t.length-1)return document.querySelector("#ship-type-container").innerHTML="",s=!0,e.renderPlayButton(),void p();u++,e.displayShipType(t[u].type)}}))},p=()=>{document.querySelector("#play-button").addEventListener("click",(t=>(b(d.gameboard),e.renderGameView(),e.displayCurrentPlayerTurn(l),e.renderGameboard(r.gameboard,document.querySelector(".board.player"),!0),e.renderGameboard(d.gameboard,document.querySelector(".board.enemy"),!1),void h())))},h=()=>{let t=document.querySelectorAll(".square.enemy");for(let r=0;r<t.length;r++)t[r].addEventListener("mouseover",(t=>{let r=g(t.currentTarget);v(r,d.gameboard)&&e.renderMoveToMake(r)})),t[r].addEventListener("mouseout",(t=>{let r=g(t.currentTarget);v(r,d.gameboard)&&e.clearMoveToMake(r)})),t[r].addEventListener("click",(t=>{let r=g(t.currentTarget);v(r,d.gameboard)&&(e.renderMove(r,"hit"),C(r))}))},y=()=>{c=1!=c},g=e=>[parseInt(e.getAttribute("data-row")),parseInt(e.getAttribute("data-column"))],b=e=>{let r=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],a=1==Math.floor(2*Math.random());for(let o=0;o<t.length;o++){for(;!S(r,t[o],a,e);)r=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],a=1==Math.floor(2*Math.random());f(t[o],a,r,e)}},S=(e,t,r,a)=>{if(r&&e[1]+t.length-1>9)return!1;if(!r&&e[0]+t.length-1>9)return!1;for(let o=0;o<t.length;o++)if(r){if(null!=a.getSquare(e[0],e[1]+o))return!1}else if(null!=a.getSquare(e[0]+o,e[1]))return!1;return!0},f=(e,t,r,a)=>{let o=[];for(let a=0;a<e.length;a++)t?o.push([r[0],r[1]+a]):o.push([r[0]+a,r[1]]);a.placeShip(e,o)},v=(e,t)=>"computer"!=l&&!("m"==t.getSquare(e[0],e[1])|"s"==t.getSquare(e[0],e[1])),C=(t=null)=>{"player"==l?(r.attack(d.gameboard,t),l="computer",e.displayCurrentPlayerTurn()):(d.automatedAttack(r.gameboard),l="player",e.displayCurrentPlayerTurn())};return{start:()=>{e.renderPlaceShipsView(),e.displayShipType(t[u].type),i(),m()}}}},498:e=>{e.exports=()=>{let e=[],t=0,r=0;for(let t=0;t<10;t++){e[t]=[];for(let r=0;r<10;r++)e[t][r]=null}return{get missedAttacks(){return missedAttacks},get board(){return e},getSquare:(t,r)=>e[t][r],placeShip:(r,a)=>{for(let o=0;o<a.length;o++)coordinates=a[o],e[coordinates[0]][coordinates[1]]=r,t++},receiveAttack:t=>{let a=e[t[0]][t[1]];a&&"object"==typeof a?(a.hit(),a.isSunk&&(r++,e[t[0]][t[1]]="s")):e[t[0]][t[1]]="m"},allShipsSunk:()=>r==t}}},507:(e,t,r)=>{const a=r(498);r(642),e.exports=()=>{const e=a();return{get gameboard(){return e},attack:(e,t)=>{e.receiveAttack(t)},automatedAttack:async function(e){let t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],r=e.getSquare(t[0],t[1]);for(;"m"==r|"s"==r;)t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],r=e.getSquare(t[0],t[1]);setTimeout((function(){e.receiveAttack(t)}),2e3)}}}},643:e=>{e.exports=(e,t)=>{let r=0;return{get type(){return e},get length(){return t},hit:()=>{r++},isSunk:()=>t==r}}}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(642),r(643);const e=r(417);document.querySelector("#start-button").addEventListener("click",(t=>{e().start()}))})()})();