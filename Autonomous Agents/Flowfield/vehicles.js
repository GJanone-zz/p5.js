class Vehicle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(-2, 2));
    this.acc = createVector()

    this.prevPos = this.pos.copy();

    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }


  behavior(boids) {
    var align = this.align(boids);
    var cohesion = this.cohesion(boids);
    var sep = this.separation(boids);

    this.acc.add(align);
    this.acc.add(cohesion);
    this.acc.add(sep);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.show();
    this.edges();
  };

  show() {
    strokeWeight(3);
    stroke(0, 10);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  updatePrev() {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  align(boids) {
    var perception = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        steering.add(other.vel);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  };

  cohesion() {
    var perception = 10;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        steering.add(other.pos);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation() {
    var perception = 20;
    var steering = createVector();
    var total = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        steering.div(d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;

    var force = vectors[index];
    // force.limit(this.maxForce);
    this.acc.add(force);
  };

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  };

}