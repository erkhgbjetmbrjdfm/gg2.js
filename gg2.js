let ctx
let canvas
let workspace = new Set();

function setCanvas(_canvas) {
    ctx = _canvas.getContext("2d");
    canvas = _canvas;
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

    get touchObject() {
        
    }
}

class circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color || "black";
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    delete() {
        workspace.delete(this);
    }
    
    get touchObject() {
        
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