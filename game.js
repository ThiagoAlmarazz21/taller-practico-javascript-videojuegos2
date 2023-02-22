const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const win = document.querySelector(".win-container");
const contenedor = document.querySelector(".game-contenedor");
const spanSinVidas = document.querySelector('.sin-vidas');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const pLevel = document.querySelector('#level');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
};
const endPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.65;
    } else {
      canvasSize = window.innerHeight * 0.65;
    }
    
    spanSinVidas.classList.remove('sin-vidas');
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
    startGame();
}

function startGame() {
    showLevel();

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    win.classList.remove('win-container');

    const map = maps[level];

    if(!map) {
      gameWin();
      return;
    }

    if(!timeStart) {
      timeStart = Date.now();
      timeInterval = setInterval(showTime, 100); 
      showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
  
    showLives();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);
  
    mapRowCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);
  
        if (col == 'O') {
          if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
          }
        } else if (col == 'I') {
          endPosition.x = posX;
          endPosition.y = posY;
        } else if (col == 'X') {
            enemyPositions.push({
                x: posX,
                y: posY
            });
        }
        game.fillText(emoji, posX, posY);
      });
    });
movePlayer();
}

// EVENTOS DE LAS TECLAS (flechas y wasd)
window.addEventListener('keydown',moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movePlayer() { 
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

    const endCollisionX = playerPosition.x.toFixed(2) == endPosition.x.toFixed(2);
    const endCollisionY = playerPosition.y.toFixed(2) == endPosition.y.toFixed(2);
    const endCollision = endCollisionX && endCollisionY;

    const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
      return enemyCollisionX && enemyCollisionY;
    });

    if(endCollision){
      game.fillText(emojis['FIN_COLLISION'], playerPosition.x, playerPosition.y);
      setTimeout(()=>{levelWin();},300);
    }
    
    if(enemyCollision) {
      game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
      setTimeout(()=>{levelFail();},300);
    }
}

function levelWin() {
  level++;
  showLevel();
  startGame();
};

function levelFail() {
  console.warn('Chocaste!');
  lives--;
  if(lives <= 0){
    sinVidas();
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  panFinal();
  clearInterval(timeInterval);

  const recordTime = sessionStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if(recordTime) {
    if(recordTime>=playerTime) {
      sessionStorage.setItem('record_time',playerTime);
      pResult.innerHTML = 'Superaste el record de ' + recordTime + ' a ' + playerTime;
    } else {
        pResult.innerHTML = 'No superaste el record de '  + recordTime};
    } else {
        sessionStorage.setItem('record_time',playerTime);
        pResult.innerHTML = `¡Nuevo record! ${playerTime}`;
    }

  console.log({recordTime, playerTime});
}

function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}

function showLevel() {
  pLevel.innerHTML = `${level}`
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = sessionStorage.getItem('record_time');
}
function panFinal() {
  win.classList.remove('inactive');
  win.classList.add('win-container');
  contenedor.classList.remove('game-contenedor');
  contenedor.classList.add('inactive');
}

function sinVidas() {
  spanSinVidas.classList.remove('inactive');
  spanSinVidas.classList.add('sin-vidas');
  contenedor.classList.remove('game-contenedor')
  contenedor.classList.add('inactive');
}

// FUNCIONES PARA MOVERSE
function moveByKeys(event) {
    let tecla = event.key;
    switch (tecla) {
        case "ArrowUp":
            if ((playerPosition.y - elementsSize) < elementsSize) {
                console.log('OUT');
              } else {
                playerPosition.y -= elementsSize;
                startGame();
              }
            break;
        
        case "ArrowLeft":
            if ((playerPosition.x - elementsSize) < elementsSize) {
                console.log('OUT');
              } else {
                playerPosition.x -= elementsSize;
                startGame();
              }
            break;
            
        case "ArrowRight":
            if ((playerPosition.x + elementsSize) > canvasSize) {
                console.log('OUT');
              } else {
                playerPosition.x += elementsSize;
                startGame();
              }
            break;
         
        case "ArrowDown":
            if ((playerPosition.y + elementsSize) > canvasSize) {
                console.log('OUT');
              } else {
                playerPosition.y += elementsSize;
                startGame();
              }
            break;  

        case "w":
            if ((playerPosition.y - elementsSize) < elementsSize) {
                console.log('OUT');
              } else {
                playerPosition.y -= elementsSize;
                startGame();
              }
            break;
            
        case "a":
            if ((playerPosition.x - elementsSize) < elementsSize) {
                console.log('OUT');
              } else {
                playerPosition.x -= elementsSize;
                startGame();
              }
            break;
                
        case "d":
            if ((playerPosition.x + elementsSize) > canvasSize) {
                console.log('OUT');
              } else {
                playerPosition.x += elementsSize;
                startGame();
              }
            break;
             
        case "s":
            if ((playerPosition.y + elementsSize) > canvasSize) {
                console.log('OUT');
              } else {
                playerPosition.y += elementsSize;
                startGame();
              }
            break;  

        default:
            break;
    }
}
function moveUp() {
    if ((playerPosition.y - elementsSize) < elementsSize) {
      console.log('OUT');
    } else {
      playerPosition.y -= elementsSize;
      startGame();
    }
}
function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize) {
      console.log('OUT');
    } else {
      playerPosition.x -= elementsSize;
      startGame();
    }
}
function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
      console.log('OUT');
    } else {
      playerPosition.x += elementsSize;
      startGame();
    }
}
function moveDown() {    
    if ((playerPosition.y + elementsSize) > canvasSize) {
      console.log('OUT');
    } else {
      playerPosition.y += elementsSize;
      startGame();
    }
}
