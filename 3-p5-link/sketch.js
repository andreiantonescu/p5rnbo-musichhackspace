function setup() { 
    createCanvas(windowWidth, windowHeight)
    background(200, 32, 100)
}

function draw() {
    color(255)
    noStroke()
    // ellipse(random(windowWidth), random(windowHeight), random(50))
}

function mouseMoved() {
    ellipse(mouseX, mouseY, random(100))
}