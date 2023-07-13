
let font;
function preload() {
  font = loadFont('barlow_condensed.otf')
}

function setup() {
   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  poster.setup(this);
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(10*poster.vw);
}

function draw() {
  background(255,255,255,30);
	fill(0);
  wordEffect("FUTURE", poster.screens[0].cntX, poster.screens[0].cntY);
  wordEffect("NOW", poster.screens[1].cntX, poster.screens[1].cntY);

 /*important!*/ poster.posterTasks(); // do not remove this last line!  
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  textSize(10*poster.vw);
}

function wordEffect(word,x,y) {
let textBounds = font.textBounds(word, 0, 0, textSize());
  push()
    translate(x, y);
    rotate(poster.posNormal.x*3*PI);
    text(word,0,-textBounds.h/3)
  pop();
}






