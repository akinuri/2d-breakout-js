class Wall {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.x + this.width, this.y + this.height);
        ctx.fillStyle = "hsl(0, 0%, 0%, 0.05)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "hsl(0, 0%, 80%)";
        ctx.strokeRect(
            this.x + 0.5,
            this.y + 0.5,
            this.width + (this.x + this.width >= canvas.width ? -1 : 0),
            this.height + (this.y + this.height >= canvas.height ? -1 : 0),
        );
        ctx.restore();
    }
    
}