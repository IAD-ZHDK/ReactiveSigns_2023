let averageAngle = 0;

let Anagram1 = "POTION"
let Anagram2 = "OPTION"


function preload(){
font = loadFont("RuderPlakatLLVIPTrial.otf");
font2 = loadFont("Druk-XXCondSuper.otf");


}

function setup() {
   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textSize(10 * poster.vw);
}


function draw() {
  background(0, 0, 0, 60);

  push()
  fill(255);
  blendMode(DIFFERENCE)
  textAlign(CENTER, CENTER);
  textSize(200 * poster.vw)
  textFont(font2);
  backgroundEffect("I I I I I I I I I I I I I I I", poster.screens[0].cntX, poster.screens[0].cntY, 1);
  backgroundEffect("I I I I I I I I I I I I I I I", poster.screens[1].cntX, poster.screens[1].cntY, -1);
  pop();

  push();
  blendMode(DIFFERENCE)
  fill(255)
  textSize(35 * poster.vw);
  textFont(font);
  wordEffect(Anagram1, poster.screens[0].cntX*2, poster.screens[0].cntY, -1);
  pop();

  push();
  blendMode(DIFFERENCE)
  fill(255)
  textSize(35 * poster.vw);
  textFont(font);
  wordEffect(Anagram2, poster.screens[0].cntX*2, poster.screens[0].cntY, 1);
  pop();

/*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(1 * poster.vw);
  

}

let Rotationfactor = 2
let Rotationfactor2 = 1

function backgroundEffect(word, x, y, direction) {
  push()
  translate(x , y);
  rotate(poster.posNormal.x * Rotationfactor * (PI*direction));
  text(word, 0, -(1 * poster.vw)) 
  pop();
}
/*
function backgroundEffectBack(word, x ,y) {
  push()
  translate(x, y);
  rotate(poster.posNormal.x * Rotationfactor * - PI);
  text(word, 0, -(1 * poster.vw))
  pop();
}
*/

//Option
function wordEffect(Anagram1, x, y, direction) {
  push()
  translate(x, y);
  let bbox = font.textBounds(Anagram1,0,0);
  let factor = 0.99;
  averageAngle = averageAngle  * factor;
  averageAngle += poster.posNormal.x  * (1.0-factor);

  let mapedAngle = map(averageAngle,0.0, 1.0, radians(-90), radians(270))
  console.log(degrees(mapedAngle));
  rotate(direction*mapedAngle);
  translate(-bbox.w/2, bbox.h/2 - 290);
  text(Anagram1, 0, -(.5 * poster.vw))
  pop();
}
//Potion
/*
function wordEffect2(Anagram2, x, y) {
  push()
  translate(x, y);
  let bbox = font.textBounds(Anagram1,0,0);
  let factor = 0.99;
  averageAngle = averageAngle  * factor;
  averageAngle += poster.posNormal.x  * (1.0-factor);

  let mapedAngle = map(averageAngle,0.0, 1.0, radians(-90), radians(270))
  console.log(degrees(mapedAngle));
  rotate(mapedAngle);
  translate(-bbox.w/2, bbox.h/2 - 290);
  text(Anagram2, 0, -(.5 * poster.vw))
  fill(0)
  rect(bbox.x, bbox.y, bbox.w, bbox.h);
  pop();
}
*/


