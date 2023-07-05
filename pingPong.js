var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");

//CRIADOR DA BOLINHA
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

function desenharBolinha() {

    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(xBolinha, yBolinha, diametro, 0, 2 * Math.PI);
    pincel.fill();
}

function apagarBolinha() {
    pincel.clearRect(0, 0, 600, 400);
}

//VELOCIDADE DA BOLINHA
var velocidadeXDaBolinha = 1;
var velocidadeYDaBolinha = 1;

function moverBolinha() {

    apagarBolinha();

    desenharBolinha();
    xBolinha += velocidadeXDaBolinha;
    yBolinha += velocidadeYDaBolinha;

    if(xBolinha + raio > tela.width || xBolinha - raio < 0) {
        velocidadeXDaBolinha *= -1;
    }

    if(yBolinha + raio > tela.height || yBolinha - raio < 0) {
        velocidadeYDaBolinha *= -1;
    }
}

//RAQUETE ESQUERDA DO USUÁRIO (W, S)
let xRaquete1 = 5;
let yRaquete1 = 150;

let xRaquete2 = 585;
let yRaquete2 = 150;

let tamanhoX = 10;
let tamanhoY = 100;

function raquete(x, y) {

    pincel.fillStyle = "white";
    pincel.rect(x, y, tamanhoX, tamanhoY);
    pincel.fill();
}

//MOVER RAQUETE
let velocidadeRaquete = 10;

document.addEventListener("keydown", function(pressionar){

    var teclaPressionada = pressionar.key;

    //TECLAS W - S
    if(teclaPressionada === "w") {
        yRaquete1 -= velocidadeRaquete;

        if(yRaquete1 <= 0) {
            yRaquete1 = 0;
        }
    }

    if(teclaPressionada === "s") {
        yRaquete1 += velocidadeRaquete;

        if(yRaquete1 + tamanhoY >= tela.height) {
            yRaquete1 = 300;
        }
    }

    //TECLAS UP - DOWN
    if(teclaPressionada === "ArrowUp") {
        yRaquete2 -= velocidadeRaquete;

        if(yRaquete2 <= 0) {
            yRaquete2 = 0;
        }
    }

    if(teclaPressionada === "ArrowDown") {
        yRaquete2 += velocidadeRaquete;

        if(yRaquete2 + tamanhoY >= tela.height) {
            yRaquete2 = 300;
        }
    }
});

//VERIFICA COLISÃO DA BOLINHA COM A RAQUETE
function colisao() {

    let esquerdaBolinha = xBolinha - raio;
    let direitaBolinha = xBolinha + raio;
    let superiorBolinha = yBolinha - raio;
    let inferiorBolinha = yBolinha + raio;

    //COLISÃO COM A RAQUETE 1
    let direitaRaquete1 = xRaquete1 + tamanhoX;
    let superiorRaquete1 = yRaquete1;
    let inferiorRaquete1 = yRaquete1 + tamanhoY;	

    if(esquerdaBolinha < direitaRaquete1 &&
        inferiorBolinha > superiorRaquete1 &&
        superiorBolinha < inferiorRaquete1) {
        velocidadeXDaBolinha *= -1;
    }

    //COLISÃO COM A RAQUETE 2 
    let esquerdaRaquete2 = xRaquete2;
    let superiorRaquete2 = yRaquete2;
    let inferiorRaquete2 = yRaquete2 + tamanhoY;

    if(direitaBolinha > esquerdaRaquete2 &&
        inferiorBolinha > superiorRaquete2 &&
        superiorBolinha < inferiorRaquete2) {
        velocidadeXDaBolinha *= -1;
    }

}

function rodar() {

    moverBolinha();
    raquete(xRaquete1, yRaquete1);
    raquete(xRaquete2, yRaquete2);
    colisao();
}

setInterval(rodar, 1);
