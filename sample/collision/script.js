onload = () => {
    const el = document.getElementById("canvas")
    const touch = document.getElementById("touch")
    setCanvas(el)
    new Camera(10,10).switching()
    const obj1 = new box(0, 0, 100, 100, "red");
    workspace.add(obj1);
    const obj2 = new circle(400, 300, 50, "blue");
    workspace.add(obj2);
    const obj3 = new line(new point(0, 300), new point(800, 600), "green");
    workspace.add(obj3);
    const obj4 = new box(500, 200, 200, 200, "yellow");
    workspace.add(obj4);
    const obj5 = new box(0, 100, 100, 100, "purple");
    workspace.add(obj5);
    let timer = 0;

    document.addEventListener("touchmove",(e) => {
    e.preventDefault()
    },{passive:false})

    ondraw = () => {
        obj1.x = mouseX;
        obj1.y = mouseY;
        touch.textContent = obj1.touchObject().length;
        console.log(obj1.touchObject().length)
    }

    setInterval(() => {
        obj5.x = 250 + Math.sin(timer / 100) * 100;
        timer++;
    },1);
}