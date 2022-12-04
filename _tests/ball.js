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
            topWall    : this.y - this.radius <= topWall.x + topWall.height,
            rightWall  : this.x + this.radius >= rightWall.x,
            bottomWall : this.y + this.radius >= bottomWall.y,
            leftWall   : this.x - this.radius <= leftWall.x + leftWall.width,
        };
        result.collides = Object.values(result).includes(true);
        return result;
    },
    move: function (elapsedFrameTime) {
        this.x += getPixelInTime(this.xSpeed, elapsedFrameTime) * this.xDir;
        // this.y += getPixelInTime(this.ySpeed, elapsedFrameTime) * this.yDir;
    },
    resolveCollision: function (collision, elapsedFrameTime) {
        // TODO: fix overshoot
        if (collision.topWall || collision.bottomWall) {
            this.yDir *= -1;
        } else {
            this.xDir *= -1;
            
            let gap       = 0;
            let overshoot = 0;
            let distance = getPixelInTime(ball.xSpeed, elapsedFrameTime);
            if (collision.leftWall) {
                gap       = (ball.x + distance) - (leftWall.x + leftWall.width + ball.radius);
                overshoot = (leftWall.x + leftWall.width + ball.radius) - ball.x;
                ball.x    = leftWall.x + leftWall.width + ball.radius + overshoot;
            }
            else if (collision.rightWall) {
                gap       = (rightWall.x - ball.radius) - (ball.x - distance);
                overshoot = ball.x - (rightWall.x - ball.radius);
                ball.x    = rightWall.x - ball.radius - overshoot;
            }
        }
    },
};

function getPixelInTime(pixelsPerSecond, elapsedFrameTime) {
    return elapsedFrameTime / 1000 * pixelsPerSecond;
}