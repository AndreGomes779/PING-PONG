const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

function setup() {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
}

function draw() {
    const lineWidth = Math.min(window.innerWidth, window.innerHeight) * 0.01; // Largura da linha proporcional ao tamanho do canvas
    const racketWidth = Math.min(window.innerWidth, window.innerHeight) * 0.01; // Largura da raquete proporcional ao tamanho do canvas

    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    canvasCtx.fillStyle = "#ffffff";

    // Desenha a linha no centro
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2, 0, lineWidth, window.innerHeight);

    // Desenha as raquetes
    const racketHeight = Math.min(window.innerHeight * 0.4, 200); // Altura da raquete limitada a 200 pixels ou 40% da altura do canvas
    canvasCtx.fillRect(lineWidth, window.innerHeight / 2 - racketHeight / 2, racketWidth, racketHeight); // Raquete esquerda
    canvasCtx.fillRect(window.innerWidth - lineWidth - racketWidth, window.innerHeight / 2 - racketHeight / 2, racketWidth, racketHeight); // Raquete direita

    // Desenha a bolinha
    const ballRadius = Math.min(window.innerWidth, window.innerHeight) * 0.02; // Raio da bolinha proporcional ao tamanho do canvas
    canvasCtx.beginPath();
    canvasCtx.arc(window.innerWidth / 2, window.innerHeight / 2, ballRadius, 0, 2 * Math.PI);
    canvasCtx.fill();

    // Desenha o placar
    canvasCtx.font = "bold " + Math.min(window.innerWidth, window.innerHeight) * 0.05 + "px Arial"; // Tamanho da fonte proporcional ao tamanho do canvas
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341d";
    canvasCtx.fillText('3', window.innerWidth / 4, 50);
    canvasCtx.fillText('1', window.innerWidth / 4 + window.innerWidth / 2, 50);
}

window.addEventListener('resize', function() {
    setup();
    draw();
});

setup();
draw();

