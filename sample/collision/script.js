onload = () => {
    const el = document.getElementById("canvas")
    const touch = document.getElementById("touch")
    setCanvas(el)
    new Camera(0,0).switching()
    const obj1 = new box(0, 0, 100, 100, "red");
    workspace.add(obj1);
    const obj2 = new circle(400, 300, 50, "blue");
    workspace.add(obj2);
    const obj3 = new line(new point(0, 300), new point(800, 600), "green");
    workspace.add(obj3);
    const obj4 = new box(500, 200, 200, 200, "yellow");
    workspace.add(obj4);
    const img = new Image();
    img.src = "./img.png";
    const obj5 = new box(0, 100, 100, 100, "purple", img);
    workspace.add(obj5);
    let timer = 0;

    document.addEventListener("touchmove",(e) => {
    e.preventDefault()
    },{passive:false})

    ondraw = () => {
        obj1.x = mouseX;
        obj1.y = mouseY;
        obj3.getIntersectionPoints().forEach((p) => {
            ctx.fillStyle = obj3.color;
            ctx.strokeStyle = obj3.color;
            ctx.beginPath();
            ctx.arc(p.x - camera.x, p.y - camera.y, 10, Math.PI*2, false);
            ctx.fill();
            ctx.stroke();
        })
        touch.textContent = obj1.touchObject().length;
        console.log(obj1.touchObject().length)
    }

    setInterval(() => {
        obj5.x = 100 + Math.sin(timer / 100) * 100;
        obj5.y = 250 + Math.cos(timer / 100) * 100;
        obj2.y = 350 + Math.cos(timer / 100) * 100;
        obj4.height = 200 + Math.cos(timer / 100) * 100;
        timer++;
    },1);
}