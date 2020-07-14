let canvas;
let ctx;
let FPS = 30;

let CANVASX = 500;
let CANVASY = 500;

let tileX, tileY;

//variables con el tablero
let tablero;
const filas = 100;
const columnas = 100;

const BLANCO = '#ffff';
const NEGRO = '#000000';



function inicializa() {

    //asociamos el canvas
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2D');

    //ajustamos a un tamaño CONSTANTE
    canvas.width = CANVASX;
    canvas.height = CANVASY;

    //calcular el valor de cada cuadricula
    tileX = Math.floor(CANVASX / filas);
    tileY = Math.floor(CANVASY / columnas);

    setInterval(function() {
        principal();
    }, 1000 / FPS);
}

function principal() {


}