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

function creaArray2D(f, c) {
    let obj = new Array(c);
    for (y = 0; y < c; y++) {
        obj[y] = new Array(f);
    }
    return obj;
}
//agentes o turmita
let Agente = function(x, y, estado) {
    this.x = x;
    this.y = y;
    this.estado = estado; //vivo = 1, muerto = 2
    this.estadoProx = this.estado; // estado qe tendra el siguiente ciclo
    this.vecinos = []; //guardamos el vecino
    //Metdo que añade los vecinos del objeto actual
    this.addVecinos = function() {
        let xVecino;
        let yVecino;

        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                xVecino = (this.x + j + columnas) % columnas;
                yVecino = (this.y + i + filas) % filas;

                if (i != 0 || j != 0) {
                    this.vecinos.push(tablero[yVecino][xVecino])
                }
            }
        }
    }
    this.dibuja = function() {
        let color;
        if (this.estado == 1) {
            color = BLANCO;
        } else
            color = NEGRO;
        ctx.fillStyle = color;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    }

    //leyes de Conway

    this.nuevoCiclo = function() {
        let suma = 0;
        for (i = 0; i <= vecinos.length; i++) {
            suma = suma + vecino[i].estado;
        }

        this.estadoProx = this.estado; //por defecto queda igual

        //Muerte: tiene menos de 2 o mas de 3
        if (suma < 2 || suma > 3) {
            this.estadoProx = 0;
        }
        //Tiene exactamente 3 vecinos
        if (suma == 3) {
            this.estadoProx = 1;
        }

    }


}

function iniciaTablero(obj) {
    let estado;
    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            estado = Math.floor(Math.random() * 2);
            obj[y][x] = new Agente(y, x, estado)

        }
    }

    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].addVecinos();
        }
    }

}

function inicializa() {

    //asociamos el canvas
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2d');

    //ajustamos a un tamaño CONSTANTE
    canvas.width = CANVASX;
    canvas.height = CANVASY;

    //creamos el tablero
    tablero = creaArray2D(filas, columnas);

    //inicializa tablero
    iniciaTablero(tablero);


    //calcular el valor de cada cuadricula
    tileX = Math.floor(CANVASX / filas);
    tileY = Math.floor(CANVASY / columnas);

    setInterval(function() {
        principal();
    }, 1000 / FPS);
}

function dibujaTablero(obj) {
    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].dibuja();
        }
    }
}

function borraCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;

}

function principal() {
    borraCanvas();
    dibujaTablero(tablero);

}