const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

const lineWidth = 15;
const gapX = 10;

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

const line = {
  w: lineWidth,
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(canvasEl.width / 2 - this.w / 2, 0, this.w, canvasEl.height);
  },
};

const leftPaddle = {
  x: gapX,
  y: canvasEl.height / 2 - 100,
  w: lineWidth,
  h: 200,
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

const rightPaddle = {
  x: canvasEl.width - lineWidth - gapX,
  y: canvasEl.height / 2 - 100,
  w: lineWidth,
  h: 200,
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

function setup() {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  // Atualiza as posições das raquetes e da linha central
  leftPaddle.y = canvasEl.height / 2 - leftPaddle.h / 2;
  rightPaddle.y = canvasEl.height / 2 - rightPaddle.h / 2;
}

function draw() {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();

  // Desenha a bolinha
  const ballRadius = Math.min(canvasEl.width, canvasEl.height) * 0.05;
  canvasCtx.beginPath();
  canvasCtx.arc(canvasEl.width / 3, canvasEl.height / 2, ballRadius, 0, 2 * Math.PI);
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fill();

  // Desenha o placar
  canvasCtx.font = "bold " + Math.min(canvasEl.width, canvasEl.height) * 0.05 + "px Arial";
  canvasCtx.textAlign = "center";
  canvasCtx.textBaseline = "top";
  canvasCtx.fillStyle = "#01341d";
  canvasCtx.fillText('3', canvasEl.width / 4, 50);
  canvasCtx.fillText('1', canvasEl.width / 4 + canvasEl.width / 2, 50);
}

window.addEventListener('resize', function() {
  setup();
  draw();
});

setup();
draw();




