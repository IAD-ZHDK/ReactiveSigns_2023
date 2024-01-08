let myFont;

let flipPage = 0;
let singlePageW;
let singlePageH;
let bookW;
let bookH;
let counter = 1;
let page = [];
let lastPositionX = 0;
let flipFrame = 0;
let differenceAverage = 0;
let bookRange;
let flipCounter;
let posZ;
let mode = 2
let idleCounter = 0;
let delayCounter = 0;
let idleMode = false;
let previosX;

let personL = false;
let personR = false;

let videosLoaded = 0;

// Stylise
let desiredZoom = 0.8;
let videoAmount = 26;
let threshold = 20; //threshold for video playback in degreees
let videoDelay = 120; //delay in frames for video playback
let idleDelay = 30000; //delay in frames for Idle mode


function preload() {
  myFont = loadFont('barlow_condensed.otf');
  for (let i = 0; i < videoAmount; i++) {
    // page[i] = loadImage('assets/image' + i + '.png');
    page[i] = createVideo('assets/video' + i + '.mp4', videoLoaded);
    page[i].volume(0);
    page[i].loop();
    page[i].hide();
  }

  // while(videosLoaded<=videoAmount) {
  //   console.log(".")
  // }

  // create blank site
  blank = createGraphics(poster.screens[0].w, poster.screens[0].h);
  blank.background(0)
}

function videoLoaded() {
  videosLoaded++;
  console.log("loaded" + videosLoaded)
}


function setup() {

  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight(), WEBGL); // Don't remove this line. 
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textFont(myFont); // impartant! WEBGL has no defualt font
  let cam = createCamera();
  console.log(cam)

  noStroke();
  angleMode(DEGREES);

  // map the range of the camera "poster.posNormal.x" to the amount of pages and multiply by 180degrees
  bookRange = (page.length * 0.5 * 180) - 180.1;

  //Set desired zoom to posZ
  posZ = desiredZoom

}

function draw() {
  if (videosLoaded < videoAmount) {
    background(0, 0, 0, 0);
  } else {
    background(0, 0, 0);
    effect()
  /*important!*/ poster.posterTasks(); // do not remove this last line!  
  }
}

function effect() {
  // Check if it should switch to Idle Mode
  checkIdleCounter();

  updateFlipCounter();
  calculatePageDimensions();

  switch (mode) {
    case 1: { //Zoom in and change to Idle Mode
      if (posZ <= 1) {
        posZ += 0.002;
      } else {
        mode = 4
      }

    } break;

    case 2: { //Walking / Moving Mode (Static)
      // stopCurrentVid();
      playTrigger();
    } break;

    case 3: { //Standing Mode (Animation)
      playCurrentVid();
      playTrigger();
    } break;

    case 4: { //Idle Mode
      //playCurrentVid();
      //checkForMovement();
      zoomOut();
    } break;
  }

  renderPages();
}

function stopCurrentVid() {
  if ((flipCounter % 180) < 90) {
    page[counter].stop();
    page[counter - 1].stop();
  } else if ((flipCounter % 180) > 90) {
    page[counter + 1].stop();
    page[counter + 2].stop();
  }
}

function playTrigger() {

  if ((flipCounter % 180) < threshold || (flipCounter % 180) > (180 - threshold)) {
    //Delay
    if (delayCounter == videoDelay) {
      delayCounter = 0;
      mode = 3; // standing
    } else {
      delayCounter += 1;
    }
  } else {
    mode = 2 // walking
  }


}
function playCurrentVid() {
  if ((flipCounter % 180) < 90) {
    page[counter].play();
    page[counter - 1].play();
    for (let i = 0; i < page.length; i++) {
      if (i != counter && i != counter - 1) {
        page[i].stop();
      }
    }
  } else if ((flipCounter % 180) > 90) {
    page[counter + 1].play();
    page[counter + 2].play();
    for (let i = 0; i < page.length; i++) {
      if (i != counter + 1 && i != counter + 2) {
        page[i].stop();
      }
    }
  }
  //stopAllnoneCurrentVid();
}

function stopAllnoneCurrentVid() {
  for (let i = 0; i < page.length; i++) {
    if (i != counter && i != counter + 1 && i != counter + 2) {
      page[i].stop();
    }
  }
}
function checkForMovement() {
  if (poster.posNormal.x < 0.45) {
    console.log('left')
    personL = true;
    idleMode = false;
  } else if (poster.posNormal.x > 0.55) {
    console.log('right')
    personR = true;
    idleMode = false;
  } else {
    idleMode = true
  }
}

function zoomOut() {
  console.log
  if (personL == true) {
    // posZ - map(poster.posNormal.x, 0, 0.5, 0, (1 - desiredZoom))
    posZ -= 0.02
  } else if (personR == true) {
    posZ -= 0.02
    // posZ - map(poster.posNormal.x, 1, 0.5, 0, (1 - desiredZoom))
  } else if (posZ <= desiredZoom) {
    personL = false
    personR = false
    mode = 2;
  }
}

function checkIdleCounter() {
  if (idleCounter == idleDelay) {
    idleCounter = 0
    previosX = poster.posNormal.x
    mode = 1
  } else if ((previosX - poster.posNormal.x) < 0.0000001) {
    idleCounter += 1;
    previosX = poster.posNormal.x
  } else {
    idleCounter = 0;
    previosX = poster.posNormal.x
  }
}

function updateFlipCounter() {
  // Freeze Pages when in Idle Mode
  if (personL == true || personR == true) {
    flipCounter = map(0.5, 0, 1, 0, bookRange);
  } else {
    flipCounter = map(poster.posNormal.x, 0.2, 0.8, 0, (bookRange-1), true);
  }

  // Zoom in and out effect
  // if (flipCounter%180 < 90){
  //   posZ=0.8-(flipCounter%180)*0.0011111
  // } else if (flipCounter%180 >90){
  //   posZ=0.7+((flipCounter-90)%180)*0.0011111
  // }

  counter = 1 + 2 * int(flipCounter / 180);
  if (counter > page.length - 3) {
    counter = page.length - 3;
  }
}

function calculatePageDimensions() {
  singlePageW = poster.screens[0].w * posZ;
  singlePageH = (poster.screens[0].h * 1.3) * posZ;
}

function renderPages() {
  // Left Page 3rd
  push();
  translate(-singlePageW / 2, 0, 0);
  if (counter == (page.length - 3)) {
    texture(blank);
  } else {
    texture(page[counter + 1]);
  }
  plane(singlePageW, singlePageH);
  pop();

  // Right Page 2nd
  push();
  translate(singlePageW / 2, 0, 0);
  if (counter == 1) {
    texture(blank);
  } else {
    texture(page[counter]);
  }
  plane(singlePageW, singlePageH);
  pop();

  // Flip Page Front 1st
  push();
  rotateY(((flipCounter + 0.1) % 180)); //move the first page a bit fast so it gives no artifacts
  translate(-singlePageW / 2, 0, 0);
  texture(page[counter - 1]);
  plane(singlePageW, singlePageH);
  pop();

  // Flip Page Back 4th
  push();
  rotateY((flipCounter % 180));
  translate(-singlePageW / 2, 0, 0);
  rotateY(180);
  texture(page[counter + 2]);
  plane(singlePageW, singlePageH);
  pop();
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
  }
}