class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();

        this.maxforce = 1;
        this.maxspeed = 4;

        this.c = random(360);

        this.prevPos = this.pos.copy();
    }

    behavior(boids, grid) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(coheSlider.value());
        separation.mult(sepSlider.value());

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    show(pombo) {
        fill(this.c, 100, 100, 50);

        if (pombo) {
            image(img, this.pos.x, this.pos.y, 50, 50);
        } else {
            let r = 4
            let theta = this.vel.heading() + PI / 2;
            // push();
            // noStroke();
            // translate(this.pos.x, this.pos.y);
            // rotate(theta);
            // beginShape();
            // vertex(0, -r * 2);
            // vertex(-r, r * 2);
            // vertex(r, r * 2);
            // endShape(CLOSE);
            // pop();

            stroke(this.c, 100, 100, 30)
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.updatePrev();
        }
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    align(boids) {
        var perception = 50;
        var steering = createVector();
        var total = 0;
        for (let other of boids) {
            let d = dist(
                this.pos.x,
                this.pos.y,
                other.pos.x,
                other.pos.y);

            if (other != this && d < perception) {
                steering.add(other.vel);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxspeed);
            steering.sub(this.vel);
            steering.limit(this.maxforce);
        }
        return steering;
    }

    cohesion(boids) {
        var perception = 100;
        var steering = createVector();
        var total = 0;

        for (let other of boids) {
            let d = dist(
                this.pos.x,
                this.pos.y,
                other.pos.x,
                other.pos.y);

            if (other != this && d < perception) {
                steering.add(other.pos);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxspeed);
            steering.sub(this.vel);
            steering.limit(this.maxforce);
        }
        return steering;
    }

    separation(boids) {
        var perception = 50;
        var steering = createVector();
        var total = 0;

        for (let other of boids) {
            let d = dist(
                this.pos.x,
                this.pos.y,
                other.pos.x,
                other.pos.y);

            if (other != this && d < perception) {
                let desired = p5.Vector.sub(this.pos, other.pos);
                desired.div(d * d);
                steering.add(desired);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxspeed);
            steering.sub(this.vel);
            steering.limit(this.maxforce);
        }

        return steering;
    }

    edges() {
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }

    }

    follow(flowfield) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;

        var force = flowfield[index]

        this.acc.add(force);

    }
}