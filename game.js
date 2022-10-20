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

let gameState = "idle"; // idle|running|paused|over-win|over-lose

let fps = 60;
let fpsInterval = 1000 / fps;
let lastFrameTime = Date.now();
let mainHandle = null;
function main(callback, ignoreTime=false) {
    let currentFrameTime = Date.now();
    let elapsedFrameTime = currentFrameTime - lastFrameTime;
    let shouldContinue = true;
    if (ignoreTime || elapsedFrameTime > fpsInterval) {
        lastFrameTime = currentFrameTime - (elapsedFrameTime % fpsInterval);
        if (callback) {
            shouldContinue = callback(elapsedFrameTime);
            if (shouldContinue == undefined) {
                shouldContinue = true;
            }
        }
    }
    if (shouldContinue) {
        mainHandle = requestAnimationFrame(main.bind(null, callback));
    }
}

function draw(elapsedFrameTime) {
    resetCanvas();
    drawScore();
    drawLives();
    bricks.draw();
    ball.draw();
    paddle.draw();
    if (gameState == "idle") {
        drawStartScreen();
        return false;
    }
    if (gameState == "paused") {
        drawPauseScreen();
        return false;
    }
    if (gameState == "over-win") {
        drawGameOverScreen("You win! :)");
        return false;
    }
    if (gameState == "over-lose") {
        drawGameOverScreen("You lose :(");
        return false;
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
        gameState = "over-win";
        main(draw, true);
        return false;
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
            gameState = "over-lose";
            main(draw, true);
            return false;
        } else {
            resetBallAndPaddle();
        }
    }
    paddle.dir = 0;
    switch (paddleDirKeyPresses[0] ?? null) {
        case "right": paddle.dir = 1; break;
        case "left": paddle.dir = -1; break;
    }
    paddle.move(elapsedFrameTime);
    CollisionMonitor.constrainPaddleMovementToCanvas(paddle, canvas);
    ball.move(elapsedFrameTime);
}

window.addEventListener("keypress", (e) => {
    if (e.code == "Space") {
        gameStateHandler();
    }
});

window.addEventListener("auxclick", (e) => {
    if (e.button == 1) {
        gameStateHandler();
    }
});

main(draw, true);