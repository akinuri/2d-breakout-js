function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBricks() {
    for (let columnIndex = 0; columnIndex < brickColumnCount; columnIndex++) {
        for (let rowIndex = 0; rowIndex < brickRowCount; rowIndex++) {
            if (bricks[columnIndex][rowIndex].intact) {
                let brickX = (columnIndex * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (rowIndex * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[columnIndex][rowIndex].x = brickX;
                bricks[columnIndex][rowIndex].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "hsl(0, 60%, 50%)";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(120, 60%, 50%)";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - paddleMargin, paddleWidth, paddleHeight);
    ctx.fillStyle = "hsl(210, 60%, 50%)";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    for (let columnIndex = 0; columnIndex < brickColumnCount; columnIndex++) {
        for (let rowIndex = 0; rowIndex < brickRowCount; rowIndex++) {
            const brick = bricks[columnIndex][rowIndex];
            if (brick.intact) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    ballDeltaY *= -1;
                    brick.intact = false;
                }
            }
        }
    }
}