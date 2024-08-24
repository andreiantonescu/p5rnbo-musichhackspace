let newColor
let context, freqOne, freqTwo, gain, reverbSize

async function setupRNBO() {
    const audioContext = window.AudioContext || window.webkitAudioContext
    context = new audioContext()

    // load RNBO patch - it's called a "device"
    let response = await fetch("export/workshop.export.json")
    const myPatcher = await response.json()
    const myDevice = await RNBO.createDevice({ context, patcher: myPatcher })

    let responseEffect = await fetch("export-effect/rnbo.shimmerev.json")
    const myPatcherEffect = await responseEffect.json()
    const myDeviceEffect = await RNBO.createDevice({ context, patcher: myPatcherEffect })
    
    // First Device -> Reverb -> Output
    myDevice.node.connect(myDeviceEffect.node)
    myDeviceEffect.node.connect(context.destination)

    // get parameters
    freqOne = myDevice.parametersById.get("freqOne")
    freqOne.value = 350.0

    freqTwo = myDevice.parametersById.get("freqTwo")
    freqTwo.value = 500.0

    gain = myDevice.parametersById.get("gain")
    gain.value = 85.0

    reverbSize = myDeviceEffect.parametersById.get("size")
    reverbSize.value = 50.0

    context.suspend()
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(200, 100, 50)
    setupRNBO()
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

    freqOne.value = map(mouseX, 0, windowWidth, 0, 5000)
    freqTwo.value = map(mouseY, 0, windowHeight, 5000, 0) 

    reverbSize.value = map(mouseX, 0, windowWidth, 0, 100) 

}

function keyPressed() {
    background(200, 100, 50)
}

function startSketch() {
    context.resume()
}