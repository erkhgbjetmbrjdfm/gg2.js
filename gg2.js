let ctx;
let canvas;
let workspace = new Set();

function setCanvas(_canvas) {
    ctx = _canvas.getContext("2d");
    canvas = _canvas;
}

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}

function boxesCollide(box1, box2) {
    return box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y;
}

function boxCircleCollide(box, circle) {
    const closestX = clamp(circle.x, box.x, box.x + box.width);
    const closestY = clamp(circle.y, box.y, box.y + box.height);
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function linesIntersect(a1, a2, b1, b2) {
    const denominator = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    if (denominator === 0) return false;

    const ua = ((b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x)) / denominator;
    const ub = ((a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x)) / denominator;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

function lineBoxCollide(line, box) {
    const p1 = line.startPoint;
    const p2 = line.endPoint;
    if ((p1.x >= box.x && p1.x <= box.x + box.width && p1.y >= box.y && p1.y <= box.y + box.height) ||
        (p2.x >= box.x && p2.x <= box.x + box.width && p2.y >= box.y && p2.y <= box.y + box.height)) {
        return true;
    }

    const edges = [
        [{ x: box.x, y: box.y }, { x: box.x + box.width, y: box.y }],
        [{ x: box.x + box.width, y: box.y }, { x: box.x + box.width, y: box.y + box.height }],
        [{ x: box.x, y: box.y + box.height }, { x: box.x + box.width, y: box.y + box.height }],
        [{ x: box.x, y: box.y }, { x: box.x, y: box.y + box.height }]
    ];

    return edges.some(edge =>
        linesIntersect(p1, p2, edge[0], edge[1])
    );
}

function lineCircleCollide(line, circle) {
    const start = line.startPoint;
    const end = line.endPoint;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSq = dx * dx + dy * dy;

    if (lengthSq === 0) {
        const distX = start.x - circle.x;
        const distY = start.y - circle.y;
        return distX * distX + distY * distY <= circle.radius * circle.radius;
    }

    const t = ((circle.x - start.x) * dx + (circle.y - start.y) * dy) / lengthSq;
    const nearestX = start.x + Math.max(0, Math.min(1, t)) * dx;
    const nearestY = start.y + Math.max(0, Math.min(1, t)) * dy;
    const distX = circle.x - nearestX;
    const distY = circle.y - nearestY;
    return distX * distX + distY * distY <= circle.radius * circle.radius;
}

function circlesCollide(c1, c2) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    return dx * dx + dy * dy <= (c1.radius + c2.radius) ** 2;
}

class line {
    constructor(startPoint, endPoint, color, width) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.color = color || "black";
        this.width = width || 1;
    }

    draw() {
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
    }

    touchObject() {
        const touching = [];
        for (const obj of workspace) {
            if (obj === this) continue;
            let collision = false;
            if (obj instanceof box) {
                collision = lineBoxCollide(this, obj);
            } else if (obj instanceof circle) {
                collision = lineCircleCollide(this, obj);
            } else if (obj instanceof line) {
                collision = linesIntersect(
                    this.startPoint, this.endPoint,
                    obj.startPoint, obj.endPoint
                );
            }
            if (collision) touching.push(obj);
        }
        return touching;
    }
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

    touchObject() {
        const touching = [];
        for (const obj of workspace) {
            if (obj === this) continue;
            let collision = false;
            if (obj instanceof box) {
                collision = boxesCollide(this, obj);
            } else if (obj instanceof circle) {
                collision = boxCircleCollide(this, obj);
            } else if (obj instanceof line) {
                collision = lineBoxCollide(obj, this);
            }
            if (collision) touching.push(obj);
        }
        return touching;
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

    touchObject() {
        const touching = [];
        for (const obj of workspace) {
            if (obj === this) continue;
            let collision = false;
            if (obj instanceof box) {
                collision = boxCircleCollide(obj, this);
            } else if (obj instanceof circle) {
                collision = circlesCollide(this, obj);
            } else if (obj instanceof line) {
                collision = lineCircleCollide(obj, this);
            }
            if (collision) touching.push(obj);
        }
        return touching;
    }
}

function drawAll() {
    console.log("Drawing all");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    workspace.forEach((value) => {
            value.draw();
    });
}