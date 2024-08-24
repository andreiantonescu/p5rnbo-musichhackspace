let newColor

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(200, 100, 50)
}

function draw() {
    if(newColor) {
        newColor.setAlpha(10)
        background(newColor)
    } 
}

function mouseMoved() {
    let r = map(mouseX, 0, windowWidth, 0, 255)
    let g = map(mouseY, 0, windowHeight, 0, 255)
    newColor = color(r, g, 100)

    fill(255)
    noStroke()
    let area = random(100)
    ellipse(random(mouseX - area, mouseX + area), random(mouseY - area, mouseY + area), random(50))
}

function keyPressed() {
    background(200, 100, 50)
}