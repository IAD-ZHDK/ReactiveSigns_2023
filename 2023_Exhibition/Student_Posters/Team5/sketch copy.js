let images = [];
let imagCount = 22; //119;

let lastChangeTime = 0;
let thresholdTime = 5000;
let isStable = false;
// let previousValue = cPosition;

let cPosition = 0; // Replace 42 with your initial value
let previousValue = 0;


function preload() {
  for(let i=0;i<imagCount;i++) {
    let seriesNo = nf(i, 4); // this formats the index nummger into a string with 3 digits total. 
    images[i] = loadImage('images/image'+seriesNo+'.jpg'); // load up all images 
  }
}
function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.  
  for(let i=0;i<imagCount;i++) {
    //make all images grey 
    images[i].filter(GRAY);
  }
   
}

function draw() {
  background(0);
  
  cPosition = poster.posNormal;
  previousValue = cPosition;

  let i = getindex(poster.posNormal);

  // draw the same images on both screens: 
  image(images[i],poster.screens[0].x,0,windowWidth,windowHeight);
  // image(images[i],poster.screens[1].x,0,poster.screens[1].w,poster.screens[1].h);
  fill(255,0,0);

  /*important!*/ poster.posterTasks(); // do not remove this last line! 

  //if the there is no movement for more than 5 seconds the cursor position moves back to the center
 //Check if the variable has changed
  if (cPositionChanged()) {
    lastChangeTime = millis();
    isStable = false;
    //normal behaves same
    // poster.posNormal = poster.posNormal;

  }

  //Check if the variable hasn't changed for more than 5 seconds
  if (!isStable && millis() - lastChangeTime > thresholdTime) {
    isStable = true;
    console.log("Variable is stable for more than 5 seconds!");
    // Perform actions when the variable is stable for more than 5 seconds
    
    //normal is set to the default position of 0.5 and should fluctuate between 0.4 and 0.6
    
  }
  text("cPos: "+ cPosition,0,20);
  text("prev: "+ previousValue,0,40);
  text("isstable: "+ isStable,0,60);
  text(millis(),0,80);

  //if the value hasn't changed for over 5 seconds
  if(isStable){
    poster.posNormal = 0.5+sin(frameCount*0.1)
  }

  console.log("cPos: "+ cPositionChanged);
 
}


function getindex(vector) {
  let normal = map(vector.x, 0.2, 0.8,0.0,1.0) // make sure we really get to the first and last frame 
  let max = imagCount-1
  let GoalIndex= round(imagCount*normal); // find index position of image based on normal of position x
      GoalIndex = constrain(GoalIndex,0,max);
  return GoalIndex 
}

function cPositionChanged() {
  if (cPosition !== previousValue) {

    // previousValue = cPosition;
    return true;
  }
  return false; 
}

