const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

let paddle = new Paddle(
    100,
    15,
    (canvas.width - 100) / 2,
    canvas.height - 15 - 15,
    canvas.width,
);

let ball = new Ball(
    15,
    canvas.width / 2,
    paddle.y - 15,
    canvas.width / 3 * (Math.round(Math.random()) ? 1 : -1),
    canvas.width / 3 * -1,
);

let paddleDirKeyPresses = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("mousemove", mouseMoveHandler, false);

let bricks = new Bricks(
    3,
    6,
    80,
    23,
    15,
    42,
    60,
);

let score = 0;
let lives = 3;

let gameState = "idle"; // idle|running|paused|over ?

let fps = 60, lastFrameTime = Date.now(), fpsInterval = 1000 / fps;

function draw(force=false) {
    let currentFrameTime = Date.now();
    let elapsedFrameTime = currentFrameTime - lastFrameTime;
    if (force || elapsedFrameTime > fpsInterval ) {
        resetCanvas();
        drawScore();
        drawLives();
        bricks.draw();
        ball.draw();
        paddle.draw();
        if (gameState == "idle") {
            drawStartScreen();
            return;
        }
        if (gameState == "paused") {
            drawPauseScreen();
            return;
        }
        let touchedBrick = CollisionMonitor.doesBallTouchAnyBrick(
            ball,
            bricks,
            (brick) => brick.isIntact,
        );
        if (touchedBrick) {
            touchedBrick.isIntact = false;
            ball.ySpeed *= -1;
            score++;
        }
        if (score === bricks.rowCount * bricks.columnCount) {
            resetCanvas();
            drawScore();
            drawLives();
            bricks.draw();
            ball.draw();
            paddle.draw();
            drawGameOverScreen("You win! :)");
            gameState = "over";
            return;
        }
        if (CollisionMonitor.doesBallTouchVerticalWalls(ball, canvas)) {
            ball.xSpeed *= -1;
        }
        if (
            CollisionMonitor.doesBallTouchTopWall(ball, canvas)
            || CollisionMonitor.doesBallTouchPaddle(ball, paddle)
        ) {
            ball.ySpeed *= -1;
        }
        else if (CollisionMonitor.doesBallTouchBottomWall(ball, canvas)) {
            lives--;
            if (lives == 0) {
                drawGameOverScreen("You lose :(");
                gameState = "over";
                return;
            }
            else {
                ball.init(
                    15,
                    canvas.width / 2,
                    canvas.height - paddle.height - paddle.bottomMargin - 15,
                    canvas.width / 3 * (Math.round(Math.random()) ? 1 : -1),
                    canvas.width / 3 * -1,
                );
                paddle.x = (canvas.width - paddle.width) / 2;
                paddle.dir = 0;
            }
        }
        paddle.dir = 0;
        switch (paddleDirKeyPresses[0] ?? null) {
            case "right": paddle.dir = 1; break;
            case "left": paddle.dir = -1; break;
        }
        paddle.move(elapsedFrameTime);
        if (CollisionMonitor.doesPaddleTouchLeftWall(paddle, canvas)) {
            paddle.x = 0;
        }
        else if (CollisionMonitor.doesPaddleTouchRightWall(paddle, canvas)) {
            paddle.x = canvas.width - paddle.width;
        }
        ball.move(elapsedFrameTime);
        lastFrameTime = currentFrameTime - (elapsedFrameTime % fpsInterval);
    }
    raf = requestAnimationFrame(draw);
}
let raf = null;
draw(true);

window.addEventListener("keypress", (e) => {
    if (e.code == "Space") {
        if (gameState == "idle") {
            gameState = "running";
            lastFrameTime = Date.now();
            draw();
        }
        else if (gameState == "running") {
            gameState = "paused";
        }
        else if (gameState == "paused") {
            gameState = "running";
            lastFrameTime = Date.now();
            draw();
        }
        else if (gameState == "over") {
            resetGame("running");
            lastFrameTime = Date.now();
            draw();
        }
    }
});