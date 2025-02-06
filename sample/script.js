onload = () => {
    
    setCanvas(document.getElementById("canvas"))
    var box1 = new box(10, 10, 100, 100, "red");
    workspace.add(box1);
    
    function draw() {
        drawAll();
        requestAnimationFrame(draw);
    }
    draw();
}