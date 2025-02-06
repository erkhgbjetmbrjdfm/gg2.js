onload = () => {
    
    setCanvas(document.getElementById("canvas"))
    var box1 = new box(50, 50, 100, 100, "red");
    workspace.add(box1);
    
    function draw() {
        drawAll();
        requestAnimationFrame(draw);
    }
    draw();
}