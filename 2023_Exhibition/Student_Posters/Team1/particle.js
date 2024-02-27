
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.maxForce = 1;
    this.target = this.pos ;
  }

 
  findClosestPoint(points) {
    let closestDist = 10000;
    let closestPoint = null;
    for (let point of points) {
        let d = p5.Vector.dist(this.pos, point);
        if (d < closestDist) {
          closestDist = d;
          closestPoint = point;
      }
    }

    return closestPoint;
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  wander() {
    // this is a little slow for some reason
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(50);
    wanderPoint.add(this.pos);
    let wanderRadius = 25;
    let theta = random(TWO_PI);
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);
    
    this.seek(wanderPoint);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  show() {
    stroke(255);
    strokeWeight(1.5);
    let tailLength = 0.5; // Adjust for longer or shorter tails
    line(this.pos.x, this.pos.y, this.pos.x - this.vel.x * tailLength, this.pos.y - this.vel.y * tailLength);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}
