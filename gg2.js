let ctx
let workspace = new Set();

function setCanvas(_canvas) {
    ctx = _canvas.getContext("2d");
}

class box {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color || "black";
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    delete() {
        workspace.delete(this);
    }
}

function drawAll() {
    console.log("Drawing all");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    workspace.forEach((value) => {
        try {
            value.draw();
        } catch (e) {}
    });
}