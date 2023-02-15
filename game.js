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
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapCols});

    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {

            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1); 
            const posY = elementsSize * (rowI + 1);

            if(col == 'O') {
                playerPosition.x = posX;
                playerPosition.y = posY;
                console.log({playerPosition});
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
            console.log('me movi hacia arriba con la flehca');
            break;
        
        case "ArrowLeft":
            console.log('me movi hacia la izquierda con la flecha');
            break;
            
        case "ArrowRight":
            console.log('me movi a la derecha con la flecha');
            break;
         
        case "ArrowDown":
            console.log('me movi hacia abajo con la flecha');
            break;  

        case "w":
            console.log('me movi hacia arriba con la flehca');
            break;
            
        case "a":
            console.log('me movi hacia la izquierda con la flecha');
            break;
                
        case "d":
            console.log('me movi a la derecha con la flecha');
            break;
             
        case "s":
            console.log('me movi hacia abajo con la flecha');
            break;  

        default:
            break;
    }
}
// FUNCIONES PARA MOVERSE
function moveUp() {
    console.log("me movi hacia arriba");
    playerPosition.y -= elementsSize;
    movePlayer();
}
    
function moveLeft() {
    console.log("me movi hacia la izquierda");
}
    
function moveRight() {
    console.log("me movi hacia la derecha");
}
    
function moveDown() {
    console.log("me movi hacia abajo");
}




