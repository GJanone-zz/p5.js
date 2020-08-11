var agent;

function setup() {
    createCanvas(400, 400);

    agent = new Agent();

   frameRate(30);
   createLoop({
     duration: 4,
     gif: true
   })

}

function draw() {
    background(51);

    var mouse = createVector(mouseX, mouseY);
    ellipse(mouse.x, mouse.y, 12);

    agent.seek(mouse);
    agent.update();
}