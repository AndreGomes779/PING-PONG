const canvasEl = document.querySelector("canvas");
        const canvasCtx = canvasEl.getContext("2d");

        const lineWidth = 15;
        const gapX = 10;

        const mouse = {x:0, y:0}

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

            _move:function(){
                this.y = ball.y
            },

            draw: function () {
                canvasCtx.fillStyle = "#ffffff";
                canvasCtx.fillRect(this.x, this.y, this.w, this.h);
                this._move()
            },
        };

        const score = {
            human: 1,
            computer: 2,
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
            speed: 3,
            directionX: 1,
            directionY: 1,
            _calcPosition: function(){
                // Verifica se a bola atingiu a borda superior ou inferior do campo
                if(this.x > field.w){
                    if(
                        this.y+this.r > rightPaddle.y &&this.y-this.r<rightPaddle.y + rightPaddle
                    ){
                        this._reverseX()
                    }else{
                        
                    }
                }
                if (this.y + this.r >= field.h || this.y - this.r <= 0) {
                    this._reverseY(); // Inverte a direção vertical
                }
                // Verifica se a bola atingiu a borda esquerda do campo
                // Se sim, a bola passa direto (sem rebater)
                if (this.x - this.r <= 0) {
                    this.x = canvasEl.width / 2; // Reposiciona a bola no meio do campo
                    this.y = canvasEl.height / 2;
                    // Você pode adicionar aqui qualquer outra lógica desejada para lidar com a situação
                }
                // Verifica se a bola atingiu a borda direita do campo
                // Se sim, a bola passa direto (sem rebater)
                if (this.x + this.r >= field.w) {
                    this.x = canvasEl.width / 2; // Reposiciona a bola no meio do campo
                    this.y = canvasEl.height / 2;
                    // Você pode adicionar aqui qualquer outra lógica desejada para lidar com a situação
                }
                // Verifica se a bola colidiu com a raquete esquerda
                if (this.x - this.r <= leftPaddle.x + leftPaddle.w &&
                    this.y + this.r >= leftPaddle.y &&
                    this.y - this.r <= leftPaddle.y + leftPaddle.h) {
                    this._reverseX(); // Inverte a direção horizontal
                }
                // Verifica se a bola colidiu com a raquete direita
                if (this.x + this.r >= rightPaddle.x &&
                    this.y + this.r >= rightPaddle.y &&
                    this.y - this.r <= rightPaddle.y + rightPaddle.h) {
                    this._reverseX(); // Inverte a direção horizontal
                }
            },
            _reverseX: function(){
                this.directionX *= -1;
            },
            _reverseY: function(){
                this.directionY *= -1;
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

            // Definindo um espaço entre as raquetes e as bordas
            const offset = 10; // ou qualquer valor que você preferir

            // Posicionando a raquete esquerda com um espaço da borda esquerda
            leftPaddle.x = offset;
            leftPaddle.y = canvasEl.height / 2 - leftPaddle.h / 2;
            
            // Posicionando a raquete direita com um espaço da borda direita
            rightPaddle.x = canvasEl.width - rightPaddle.w - offset;
            rightPaddle.y = canvasEl.height / 2 - rightPaddle.h / 2;

            // Posicionando a bolinha no centro do canvas
            ball.x = canvasEl.width / 2;
            ball.y = canvasEl.height / 2;
        }

        function draw() {
            field.draw();
            line.draw();
            leftPaddle.draw();
            rightPaddle.draw();
            score.draw(); // Chama a função para desenhar o placar
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

        // Adicione eventos de toque
        canvasEl.addEventListener("touchmove", function(e) {
            e.preventDefault(); // Impede o comportamento padrão de rolagem da página
            var touch = e.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        });

        // Impede a rolagem da tela quando o usuário desliza sobre o canvas
        canvasEl.addEventListener("touchstart", function(e) {
            if (e.target == canvasEl) {
                e.preventDefault();
            }
        }, { passive:false });








