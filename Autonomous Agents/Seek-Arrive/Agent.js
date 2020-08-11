class Agent {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(-5, 5));
        this.acc = createVector();

        this.maxForce = 1;
        this.maxSpeed = 10;
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
        strokeWeight(1);
        stroke(255);

        var r = 6;
        var theta = this.vel.heading() + PI/2;
        fill(255);
        stroke(255);
        push();
        translate(this.pos.x,this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -r*2);
        vertex(-r, r*2);
        vertex(r, r*2);
        endShape(CLOSE);
        pop();

        point(this.pos.x, this.pos.y);
    };

    seek(target) {
        var desired = p5.Vector.sub(target, this.pos);

        var d = desired.mag();
        desired.normalize();

        if(d < 150) {
            let m = map(d, 0, 100, 0, this.maxSpeed);
            desired.mult(m);
        } else {
            desired.mult(this.maxSpeed);
        }

        var steer = p5.Vector.sub(desired, this.vel);
        this.acc.add(steer);
        this.acc.limit(this.maxForce);
        
    }

    edges() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        }
        if(this.pos.x < 0) {
            this.pos.x = width;
        }
        if(this.pos.y > height) {
            this.pos.y = 0;
        }
        if(this.pos.y < 0) {
            this.pos.y = height;
        }
    };
}