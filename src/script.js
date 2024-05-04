const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

const lineWidth = 15;
const gapX = 10;

const mouse = {x:0, y:0}
let gameStarted = true;

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
    y: 0,
    w: lineWidth,
    h: 200,
    _move:function(){
        this.y = mouse.y - this.h/2
    },
    draw: function () {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move()
    },
};

const rightPaddle = {
    x: canvasEl.width - lineWidth - gapX,
    y: 100,
    w: lineWidth,
    h: 200,
    speed: 5,
    _move:function(){
        if(this.y + this.h / 2 < ball.y + ball.r){
            this.y += this.speed;
        } else{
            this.y -= this.speed;
        }
    },

    draw: function () {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move()
    },
};

const score = {
    human: 0,
    computer: 0,
    increaseHuman:function(){
        this.human++;
        if (this.human === 20 || this.computer === 20) {
            this.human = 0;
            this.computer = 0;
            ball.speed = 7; // Reinicia a velocidade da bola
        }
        ball._speedUp(); // Incrementa a velocidade da bola
    },
    increaseComputer:function(){
        this.computer++;
        if (this.human === 20 || this.computer === 20) {
            this.human = 0;
            this.computer = 0;
            ball.speed = 7; // Reinicia a velocidade da bola
        }
        ball._speedUp(); // Incrementa a velocidade da bola
    },
    draw: function() {
        // Desenha o placar
        canvasCtx.font = "bold " + (canvasEl.width * 0.04) + "px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341d";
        canvasCtx.fillText(this.human, canvasEl.width * 0.25, 50);
        canvasCtx.fillText(this.computer, canvasEl.width * 0.75, 50);
    }
};

const ball = {
    x: 0,
    y: 0,
    r: 20,
    speed: 7,
    directionX: 1,
    directionY: 1,
    _calcPosition: function(){
        if (this.y + this.r >= field.h || this.y - this.r <= 0) {
            this._reverseY();
        }

        if (this.x - this.r <= leftPaddle.x + leftPaddle.w &&
            this.y + this.r >= leftPaddle.y &&
            this.y - this.r <= leftPaddle.y + leftPaddle.h) {
            this._reverseX();
        }

        if (this.x + this.r >= rightPaddle.x &&
            this.y + this.r >= rightPaddle.y &&
            this.y - this.r <= rightPaddle.y + rightPaddle.h) {
            this._reverseX();
        }

        if (this.x - this.r <= 0) {
            score.increaseComputer();
            this._resetPosition();
        }

        if (this.x + this.r >= field.w) {
            score.increaseHuman();
            this._resetPosition();
        }
    },
    _resetPosition: function() {
        this.x = canvasEl.width / 2;
        this.y = canvasEl.height / 2;
    },
    _reverseX: function(){
        this.directionX *= -1;
    },
    _reverseY: function(){
        this.directionY *= -1;
    },
    _speedUp: function(){
        this.speed += 1;
    },
    _move: function(){
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    draw: function(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();

        this._calcPosition();
        this._move();
    }
};

function setup() {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    const offset = 10;

    leftPaddle.x = offset;
    leftPaddle.y = canvasEl.height / 2 - leftPaddle.h / 2;
    
    rightPaddle.x = canvasEl.width - rightPaddle.w - offset;
    rightPaddle.y = canvasEl.height / 2 - rightPaddle.h / 2;

    ball.x = canvasEl.width / 2;
    ball.y = canvasEl.height / 2;
}

function draw() {
    field.draw();
    line.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    score.draw();
    ball.draw();
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function() {
    setup();
});

setup();
animate();

canvasEl.addEventListener("mousemove",function(e){
    mouse.x = e.pageX
    mouse.y = e.pageY
});

canvasEl.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});


















