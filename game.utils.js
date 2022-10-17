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
    const relativeX = e.offsetX;
    paddle.x = relativeX - paddle.width / 2;
    paddle.x = Math.max(paddle.x, 0);
    paddle.x = Math.min(paddle.x, canvas.width - paddle.width);
}

function collisionDetection() {
    for (let colIndex = 0; colIndex < bricks.columnCount; colIndex++) {
        for (let rowIndex = 0; rowIndex < bricks.rowCount; rowIndex++) {
            const brick = bricks.bricks[colIndex][rowIndex];
            if (brick.isIntact) {
                if (
                    ball.x > brick.x &&
                    ball.x < brick.x + brick.width &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brick.height
                ) {
                    ball.ySpeed *= -1;
                    brick.isIntact = false;
                    score++;
                }
            }
        }
    }
}

function getPixelInTime(pixelsPerSecond, elapsedFrameTime) {
    return elapsedFrameTime / 1000 * pixelsPerSecond;
}

function resetGame(state) {
    bricks.build();
    ball.init(
        10,
        canvas.width / 2,
        canvas.height - paddle.height - paddle.bottomMargin - 10,
        (10 * 10) * (Math.round(Math.random()) ? 1 : -1),
        (10 * 10) * -1,
    );
    paddle.x = (canvas.width - paddle.width) / 2;
    paddle.dir = 0;
    score = 0;
    lives = 3;
    gameState = state || "idle";
}