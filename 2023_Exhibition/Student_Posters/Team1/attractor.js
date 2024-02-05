class Attractor {
    constructor(x, y, strength) {
        this.pos = createVector(x, y);
        this.strength = strength;
    }
  
    show() {
        stroke(255, 0, 0);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }
  
    influence(x, y) {
        let force = createVector(x - this.pos.x, y - this.pos.y);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);
        let strength = this.strength / (distance * distance);
        force.setMag(strength);
        return force;
    }
  }
  
  