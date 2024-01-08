let font;
function preload() {
 font = loadFont('barlow_condensed.otf')
//  font = loadFont('inconsolata.otf');
}

function setup() {
   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  //textAlign(CENTER);
  textFont(font);
  textSize(20 * poster.vw);
}

function draw() {
  background(0,0,0,70);
	fill(255);
  strokeWeight(1);
  stroke(100);
  let spacingX = width/40;
  let spacingY = height/35;

  for(let i=0;i<40;i++) {
    let x = spacingX*i 
    line(x,0,x,height)
  }
  for(let i=0;i<35;i++) {
    let y = spacingY*i 
    line(0,y,width,y)
  }

  wordEffect("ZHdK", poster.screens[0].cntX, poster.screens[0].cntY);
  wordEffect("IAD", poster.screens[1].cntX, poster.screens[1].cntY);
/*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(20 * poster.vw);
}

function wordEffect(word, x, y) {
  let bbox = font.textBounds(word, 0, 0, textSize());
  push()
  translate(x, y);
  let angle = constrain(poster.posNormal.x,0.2,0.8);
  angle = map(angle,0.2,0.8,0,1);
  angle = angle * 2 * PI
  rotate(angle);
  text(word,-bbox.w/2,bbox.h/2)
  pop()
}






