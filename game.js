const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined
};
const endPosition = {
    x: undefined,
    y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.7;
    } else {
      canvasSize = window.innerHeight * 0.7;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
  
    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
  
    const map = maps[level];

    if(!map) {
      gameWin();
      return;
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
            console.log({playerPosition});
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
    const endCollisionX = playerPosition.x.toFixed(2) == endPosition.x.toFixed(2);
    const endCollisionY = playerPosition.y.toFixed(2) == endPosition.y.toFixed(2);
    const endCollision = endCollisionX && endCollisionY;

    const enemyCollision = enemyPositions.find(enemy => {
      const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
      const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
      return enemyCollisionX && enemyCollisionY;
    });

    if(endCollision){
      levelWin();
    }

    if(enemyCollision) {
      levelFail();
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
};

function levelFail() {
  console.warn('Chocaste!');
  lives--;
  if(lives <= 0){
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  alert('¡TERMINASTE EL JUEGO👽🚀!');
}

function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
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