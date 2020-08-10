const boids = [];

var alignSlider;
var coheSlider;
var sepSlider;

var img;

var flag = false;

var cols;
var rows;
var scl = 20;

var flowfield = [];

var zoff = 0;

function preload() {
  img = loadImage('pombo.png');
}

function setup() {
  createCanvas(400, 400);
  background(255);

  for (var i = 0; i < 200; i++) {
    boids.push(new Boid());
  }

  rows = floor(height / scl);
  cols = floor(width / scl);

  flowfield = new Array(rows * cols);

  createP('Align:')
  alignSlider = createSlider(0, 2, 0.5, 0.1);
  createP('Cohesion:')
  coheSlider = createSlider(0, 2, 0.5, 0.1);
  createP('Separation:')
  sepSlider = createSlider(0, 2, 0.5, 0.1);

  frameRate(30);
  createLoop({
    duration: 6,
    gif: true
  })
}

function draw() {
  // background(255);

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;

      let angle = noise(xoff, yoff, zoff) * TWO_PI / 4 * 6;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index] = v;

      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // stroke(0, 80);
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();

      xoff += 0.1;
    }

    yoff += 0.1;

  }

  zoff += 0.02;

  for (let b of boids) {
    // b.behavior(boids);
    b.follow(flowfield);
    b.edges();
    b.show(flag);
    b.update();
  }

}

// function mouseClicked() {

//   if (flag) {
//     flag = false;
//   } else {
//     flag = true;
//   }

//   for (let b of boids) {
//     b.show(flag);
//   }
// }