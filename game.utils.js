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

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBricks() {
    ctx.save();
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
    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(120, 60%, 50%)";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function drawPaddle() {
    ctx.save();
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - paddleMargin, paddleWidth, paddleHeight);
    ctx.fillStyle = "hsl(210, 60%, 50%)";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
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
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        cancelAnimationFrame(raf);
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function drawScore() {
    ctx.save();
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 8, 22);
    ctx.restore();
}

function drawLives() {
    ctx.save();
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 22);
    ctx.restore();
}

function getPixelInTime(pixelsPerSecond, elapsedFrameTime) {
    return elapsedFrameTime / 1000 * pixelsPerSecond;
}

function drawStartScreen() {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl(0, 0%, 0%, 0.5)";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    let text = "Press space key to start";
    let textMeasure = ctx.measureText(text);
    ctx.strokeStyle = "hsl(0, 0%, 0%, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeText(text, (canvas.width - textMeasure.width) / 2, canvas.height / 2);
    ctx.fillText(text, (canvas.width - textMeasure.width) / 2, canvas.height / 2);
    ctx.restore();
}
