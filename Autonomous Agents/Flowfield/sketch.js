var boids = [];
var flowfield;
var inc = 0.1;
var scl = 20;
var cols, rows;

var zoff = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  cols = width / scl;
  rows = height / scl;

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 100; i++) {
    boids.push(new Vehicle());
  }

}

function draw() {

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);

      flowfield[index] = v;
      stroke(0, 50);

      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();

      xoff += inc;
    }
    yoff += inc;

    zoff += 0.00005;
  }

  for (var i = 0; i < boids.length; i++) {
    boids[i].update();
    boids[i].behavior(boids);
    boids[i].follow(flowfield);
  }
}