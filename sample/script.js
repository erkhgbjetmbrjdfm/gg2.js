onload = () => {
    const el = document.getElementById("canvas")
    const touch = document.getElementById("touch")
    setCanvas(el)
    const obj1 = new box(0, 0, 100, 100, "red");
    workspace.add(obj1);
    const obj2 = new circle(400, 300, 50, "blue");
    workspace.add(obj2);
    const obj3 = new line(new point(0, 300), new point(800, 600), "green");
    workspace.add(obj3);
    const obj4 = new box(500, 200, 200, 200, "yellow");
    workspace.add(obj4);

    el.addEventListener("mousemove", (e) => {
        obj1.x = e.offsetX
        obj1.y = e.offsetY
        touch.textContent = obj1.touchObject().length;
    });

    document.addEventListener("scrloll",(e) => {
        e.preventDefault()
    })

    function draw() {
        drawAll();
        requestAnimationFrame(draw);
    }
    draw();
}
