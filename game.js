const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.75;
    } else {
      canvasSize = window.innerHeight * 0.75;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
  
    startGame();
  }

function startGame() {
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Roboto';
    game.textAlign = 'end';

    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapCols});

    game.clearRect(0,0,canvasSize,canvasSize);
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {

            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1); 
            const posY = elementsSize * (rowI + 1);

            if(col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }
            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// EVENTOS DE LAS TECLAS (flechas y wasd)
window.addEventListener('keydown',moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

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
// FUNCIONES PARA MOVERSE
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
  
  




