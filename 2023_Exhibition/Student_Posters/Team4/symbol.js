class symbol {
    constructor(startx, starty, startAngle, letter) {
      this.startx = startx;
      this.originalStartAngle = startAngle; // Speichert den ursprünglichen Winkel
      this.starty = starty;
      this.animationPos = 0;
      this.inStartPos = false;
      this.animationSpeed = 0.03;
      this.posx = this.startx;
      this.posy = this.starty;
      this.letter = letter;
      this.endLetter = ""
      this.randomChangePoint = random(1.0)
      this.rotationAmount=

      
  
      // Startwinkel als Parameter hinzugefügt
      this.startAngleDegrees = startAngle;
  
      // Initialisieren des aktuellen Winkels mit dem Startwinkel
      this.angle = this.startAngleDegrees;
  
      this.rotationSpeed = 0.01; // Geschwindigkeit der Rotation
  
      this.prevPosx = this.posx;
      this.prevPosy = this.posy;
  
      this.rotationDirection = 1; // 1 für positive Rotation, -1 für negative Rotation
    }

    setEnd(endx, endy, endLetter){
      this.endx = endx;
      this.endy = endy;
      this.endLetter = endLetter;
    }


    update() {
      // Überprüfe, ob sich die Linie bewegt
      let dx = this.posx - this.prevPosx;
      let dy = this.posy - this.prevPosy;
      let currentSpeed = dist(this.startx, this.starty, this.endx, this.endy);
  
      // Überprüfe, ob die Linie nicht an der Start- oder Endposition ist, bevor die Rotation aktualisiert wird
      if (abs(dx) > 1 || abs(dy) > 1) {
        // Aktualisiere den Winkel basierend auf der aktuellen Geschwindigkeit
        this.angle += this.rotationDirection * this.rotationSpeed * currentSpeed;
      } else {
        // Glätte den Übergang zum ursprünglichen Winkel
        this.angle = lerp(this.angle, this.originalStartAngle, 0.1);
      }
  
      // Begrenze den Winkel im Bereich von 0 bis 360 Grad
      this.angle = (this.angle + 360) % 360;
  
      // Setze die Rotation auf negativ, wenn der Winkel den ursprünglichen Startwinkel erreicht
      if (this.angle === this.originalStartAngle) {
        this.rotationDirection = -1;
      }
  
      // Speichere die aktuellen Positionen für den nächsten Update-Schritt
      this.prevPosx = this.posx;
      this.prevPosy = this.posy;
    }
  
    display() {

      let currentLetter = this.letter;
      let distanceStartEnd = dist(this.startx, this.starty, this.endx, this.endy)
      let changePoint = dist(this.posx, this.posy, this.endx, this.endy)

    
      if (changePoint <= distanceStartEnd*this.randomChangePoint) {
        fill(255);
       // circle(this.posx, this.posy, 5)
        currentLetter = this.endLetter;
      }else{
      fill(255);
  
      }

      let constrainedX = constrain(poster.posNormal.x, 0.3, 0.7);
      
      let lerpedPosx = map(constrainedX, 0.3, 0.7, this.startx, this.endx);
      let lerpedPosy = map(constrainedX, 0.3, 0.7, this.starty, this.endy);
  
      this.posx = lerpedPosx;
      this.posy = lerpedPosy;
  

      push();
      translate(this.posx, this.posy);
      
       push();
        noStroke();
        //fill(255,0,0)
        text(currentLetter,0,0);
      pop()
      // Überprüfe, ob die Linie bewegt wird, bevor die Rotation aktualisiert wird
      if (dist(this.startx, this.starty, this.endx, this.endy) > 1) {
        rotate(radians(this.angle)); // Umwandlung in Bogenmaß vor der Rotation
      }
   
      //line(-5, 0, 10, 0);
      pop();
    }
  }
  