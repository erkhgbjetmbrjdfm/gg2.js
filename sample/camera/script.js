onload = () => {
    const el = document.getElementById("canvas")
    let move = false
    let pastX = 0
    let pastY = 0

    setCanvas(el)
    new Camera(0,0).switching()

    for (let i = 0; i < 10; i++) {
        workspace.add(new box(Math.random() * 800, Math.random() * 600, 100, 100, "red"))
    }

    el.addEventListener("mousedown", (e) => {
        move = true
        pastX = mouseX
        pastY = mouseY
    })

    document.addEventListener("mouseup", (e) => {
        move = false
    })
    
    el.addEventListener("mousemove", (e) => {
        if (move) {
            const dx = mouseX - pastX
            const dy = mouseY - pastY
            camera.x -= dx
            camera.y -= dy
        }
    })
}