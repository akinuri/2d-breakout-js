let ball = {
    radius: 20,
    x: canvas.width / 2,
    y: canvas.height / 2,
    xSpeed: 85,
    xDir: Math.round(Math.random()) ? 1 : -1,
    ySpeed: 85,
    yDir: Math.round(Math.random()) ? 1 : -1,
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 60%, 50%, 0.2)";
        ctx.strokeStyle = "hsl(0, 60%, 50%, 0.2)";
        ctx.fill();
        ctx.stroke();
    },
    detectCollision: function () {
        let result = {
            leftWall  : this.x - this.radius <= leftWall.x + leftWall.width,
            rightWall : this.x + this.radius >= rightWall.x,
            collides  : false,
        };
        result.collides = result.leftWall || result.rightWall;
        return result;
    },
    move: function (elapsedFrameTime) {
        this.x += getPixelInTime(this.xSpeed, elapsedFrameTime) * this.xDir;
    },
    resolveCollision: function (collision, elapsedFrameTime) {
        // TODO: fix overshoot
        ball.xDir *= -1;
    },
};

function getPixelInTime(pixelsPerSecond, elapsedFrameTime) {
    return elapsedFrameTime / 1000 * pixelsPerSecond;
}