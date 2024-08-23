let context, freqOne, freqTwo

async function setupRNBO() {
    const audioContext = window.AudioContext || window.webkitAudioContext
    context = new audioContext()

    // load RNBO patch - it's called a "device"
    let response = await fetch("export/firstExample.export.json")
    const myPatcher = await response.json()
    const myDevice = await RNBO.createDevice({ context, patcher: myPatcher })
    
    myDevice.node.connect(context.destination)

    // get parameters
    freqOne = myDevice.parametersById.get("freqOne")
    freqOne.value = 350.0

    freqTwo = myDevice.parametersById.get("freqTwo")
    freqTwo.value = 500.0

    gain = myDevice.parametersById.get("gain")
    gain.value = 85.0

    context.suspend()
}

function setup() { 
    createCanvas(windowWidth, windowHeight)
    background(200, 32, 100)
    setupRNBO()
}

function draw() {
    color(255)
    noStroke()
    if(newColor) {
        background(newColor)   
    }
}

let newColor
function mouseMoved() {
    freqOne.value = map(mouseX, 0, windowWidth, 0, 5000)
    freqTwo.value = map(mouseY, 0, windowHeight, 5000, 0)

    let redNew = map(mouseX, 0, windowWidth, 0, 255)
    let greenNew = map(mouseY, 0, windowHeight, 255, 0)

    newColor = color(redNew, greenNew, 200)
    newColor.setAlpha(5)

    // ellipse(mouseX, mouseY, random(100))
    sprayBrush(mouseX, mouseY, random(25), random(100))
}

function sprayBrush(x, y, ellipseSize, areaSize){
    for(let i=0; i<50; i++){
        ellipse(x-random(-areaSize, areaSize), y-random(-areaSize, areaSize), random(ellipseSize))
    }
}

function startAudio() {
    context.resume()
}