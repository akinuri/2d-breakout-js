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

function drawPauseScreen() {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl(0, 0%, 0%, 0.5)";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px Arial";
    ctx.fillStyle = "hsl(0, 0%, 100%)";
    ctx.strokeStyle = "hsl(0, 0%, 0%, 0.5)";
    ctx.lineWidth = 2;
    let textOffset = 24;
    let text1 = "Game is paused";
    let text1_measure = ctx.measureText(text1);
    let text1_x = (canvas.width - text1_measure.width) / 2;
    let text1_y = canvas.height / 2;
    ctx.strokeText(text1, text1_x, text1_y - textOffset);
    ctx.fillText(text1, text1_x, text1_y - textOffset);
    ctx.font = "24px Arial";
    let text2 = "Press space key to continue";
    let text2_measure = ctx.measureText(text2);
    let text2_x = (canvas.width - text2_measure.width) / 2;
    let text2_y = canvas.height / 2;
    ctx.fillStyle = "hsl(0, 0%, 90%)";
    ctx.strokeText(text2, text2_x, text2_y + textOffset);
    ctx.fillText(text2, text2_x, text2_y + textOffset);
    ctx.restore();
}

function drawGameOverScreen(text1) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl(0, 0%, 0%, 0.5)";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px Arial";
    ctx.fillStyle = "hsl(0, 0%, 100%)";
    let textOffset = 24;
    let text1_measure = ctx.measureText(text1);
    let text1_x = (canvas.width - text1_measure.width) / 2;
    let text1_y = canvas.height / 2;
    ctx.strokeText(text1, text1_x, text1_y - textOffset);
    ctx.fillText(text1, text1_x, text1_y - textOffset);
    ctx.font = "24px Arial";
    let text2 = "Press space key to play again";
    let text2_measure = ctx.measureText(text2);
    let text2_x = (canvas.width - text2_measure.width) / 2;
    let text2_y = canvas.height / 2;
    ctx.fillStyle = "hsl(0, 0%, 90%)";
    ctx.strokeText(text2, text2_x, text2_y + textOffset);
    ctx.fillText(text2, text2_x, text2_y + textOffset);
    ctx.restore();
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