document.addEventListener("DOMContentLoaded", () => {
    
    let fpsInput           = document.querySelector("#fpsInput");
    let canvasWidthInput   = document.querySelector("#canvasWidthInput");
    let canvasHeightInput  = document.querySelector("#canvasHeightInput");
    let wallThicknessInput = document.querySelector("#wallThicknessInput");
    
    let ballRadiusInput    = document.querySelector("#ballRadiusInput");
    let ballXSpeedInput    = document.querySelector("#ballXSpeedInput");
    let ballXDirInput      = document.querySelector("#ballXDirInput");
    let ballYSpeedInput    = document.querySelector("#ballYSpeedInput");
    let ballYDirInput      = document.querySelector("#ballYDirInput");
    
    fpsInput.addEventListener("input", () => {
        fps = fpsInput.valueAsNumber || 60;
        fpsInterval = 1000 / fps;
    });
    canvasWidthInput.addEventListener("input", () => {
        canvas.width = canvasWidthInput.valueAsNumber || 600;
        recalculateWalls();
    });
    canvasHeightInput.addEventListener("input", () => {
        canvas.height = canvasHeightInput.valueAsNumber || 350;
        recalculateWalls();
    });
    wallThicknessInput.addEventListener("input", () => {
        wallThickness = wallThicknessInput.valueAsNumber || 60;
        recalculateWalls();
    });
    
    ballRadiusInput.addEventListener("input", () => {
        ball.radius = ballRadiusInput.valueAsNumber || 50;
    });
    ballXSpeedInput.addEventListener("input", () => {
        ball.xSpeed = ballXSpeedInput.valueAsNumber || 50;
    });
    ballXDirInput.addEventListener("input", () => {
        ball.xDir = parseInt(ballXDirInput.value) || 1;
    });
    ballYSpeedInput.addEventListener("input", () => {
        ball.ySpeed = ballYSpeedInput.valueAsNumber || 50;
    });
    ballYDirInput.addEventListener("input", () => {
        ball.yDir = parseInt(ballYDirInput.value) || 1;
    });
    
    fpsInput.value           = fps;
    canvasWidthInput.value   = canvas.width;
    canvasHeightInput.value  = canvas.height;
    wallThicknessInput.value = wallThickness;
    
    ballRadiusInput.value = ball.radius;
    ballXSpeedInput.value = ball.xSpeed;
    ballXDirInput.value   = ball.xDir;
    ballYSpeedInput.value = ball.ySpeed;
    ballYDirInput.value   = ball.yDir;
    
    document.querySelector("#topWallBottomDisplay").value = topWall.x + topWall.height;
    document.querySelector("#rightWallLeftDisplay").value = rightWall.x;
    document.querySelector("#bottomWallTopDisplay").value = bottomWall.y;
    document.querySelector("#leftWallRightDisplay").value = leftWall.x + leftWall.width;
});

let ballXDisplay      = document.querySelector("#ballXDisplay");
let ballYDisplay      = document.querySelector("#ballYDisplay");
let ballTopDisplay    = document.querySelector("#ballTopDisplay");
let ballRightDisplay  = document.querySelector("#ballRightDisplay");
let ballBottomDisplay = document.querySelector("#ballBottomDisplay");
let ballLeftDisplay   = document.querySelector("#ballLeftDisplay");

function updateLiveStats() {
    ballXDisplay.value      = ball.x;
    ballYDisplay.value      = ball.y;
    ballTopDisplay.value    = (ball.y - ball.radius).toFixed(3);
    ballRightDisplay.value  = (ball.x + ball.radius).toFixed(3);
    ballBottomDisplay.value = (ball.y + ball.radius).toFixed(3);
    ballLeftDisplay.value   = (ball.x - ball.radius).toFixed(3);
    ballXDirInput.value     = ball.xDir;
    ballYDirInput.value     = ball.yDir;
}