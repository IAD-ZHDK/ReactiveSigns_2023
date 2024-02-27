let myFont;

let playbackPage;
let flipPage = 0;
let singlePageW;
let singlePageH;
let bookW;
let bookH;
let counter = 1; // is reversed, because the pages of the direction of the turn of the pages -- means counter is 0 on last site
let pageCounter; // It counts when the pages are turned, so it represents the current page the book is on starting with 1 on the bookcover
let page = [];
let video = [];
let cache = [];
let flipFrame = 0;
let differenceAverage = 0;
let bookRange;
let flipCounter = 1;
let posZ;
let mode = 2
let idleCounter = 0;
let delayCounter = 0;
let idleMode = false;
let previosX;
let videoReadyLeft = false;
let videoReadyRight = false;
let playAnimationLeft = false;
let playAnimationRight = false;
let stopThreshold = 160; //threshhold in degress when the video should be stopped, 160degrees insures that the site with the video isn't in frame anymore before it gets stopped.
let pPosX = 1;
let posX;
let speedX;
let flipAid;

let personL = false;
let personR = false;

let videosLoaded = 0;

// Stylise
let desiredZoom = 0.8;
let pages = 26;
let flipZoom = false; // page will zoom in and out while fleeping
let autoAim = false; //if true the pages will help align themselve
let threshold = 20; //threshold for video playback in degreees
let videoDelay = 300; //delay in frames for video playback
let idleDelay = 700; //delay in frames for Idle mode
let videoRangeLow = 2; // The number of the first video -- example. 'video2' would be 2
let videoRangeHigh = 12; // The number of the last video -- example. 'video12' would be 12


function preload() {
  myFont = loadFont('barlow_condensed.otf');
  for (let i = 0; i < pages; i++) {
    page[i] = loadImage('assets/images/image' + ((pages - 1) - i) + '.png');
  }

  // create blank site
  blank = createGraphics(poster.screens[0].w, poster.screens[0].h);
  blank.background(0)
}

function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight(), WEBGL); // Don't remove this line. 
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textFont(myFont); // impartant! WEBGL has no defualt font
  let cam = createCamera();
  console.log(cam);

  noStroke();
  angleMode(DEGREES);

  // map the range of the camera "poster.posNormal.x" to the amount of pages and multiply by 180degrees
  bookRange = (page.length * 0.5 * 180) - 180.1;

  //Set desired zoom to posZ
  posZ = desiredZoom;

  noCursor();
  poster.setDebug(false);
}

function draw() {
  background(0, 0, 0);
  effect();
  /*important!*/ poster.posterTasks(); // do not remove this last line!  
}


function effect() {
  //Set Page Dimensions
  calculatePageDimensions();

  // Check if it should switch to Idle Mode
  checkIdleCounter();
  updateFlipCounter();

  switch (mode) {
    case 1: { //Zoom in and change to Idle Mode
      if (posZ <= 1) {
        posZ += 0.002;
      } else {
        mode = 4
      }

    } break;

    case 2: { //Walking / Moving Mode (Static)
      playStopTrigger();
    } break;

    case 3: { //Standing Mode (Animation)
      playCurrentVid();
      playStopTrigger();
    } break;

    case 4: { //Idle Mode
    } break;
  }

  renderPages();
}


function playStopTrigger() {
  if ((flipCounter % 180) < threshold || (flipCounter % 180) > (180 - threshold)) {
    //Delay
    if (delayCounter == videoDelay) {
      print('playTriggerActivated')
      playbackPage = pageCounter;
      mode = 3; // standing Mode (Animation)

    } else if (delayCounter == 120) { //checks for video after certain delay
      print('checking for video');
      checkForVideo();
      delayCounter += 1;

    } else if (delayCounter == 1 && playbackPage != pageCounter) { // uses the same threshold also to stop the previous video 
      stopCurrentVid();
      print('videostoppedMOTHAFUKKA');
      delayCounter += 1;
    }
    else {
      delayCounter += 1;
    }

  } else {
    delayCounter = 0;
    mode = 2 // walking
  }
}

function checkForVideo() {
  if ((pageCounter * 2) >= videoRangeLow && (pageCounter * 2) <= videoRangeHigh) {
    videoAvailableLeft();
  } else {
    noVideoLeft();
  }

  if ((pageCounter * 2 + 1) >= videoRangeLow && (pageCounter * 2 + 1) <= videoRangeHigh) {
    videoAvailableRight();
  } else {
    noVideoRight();
  }
}

function videoLoadedLeft() {
  video[0].volume(0);
  video[0].loop();
  video[0].hide();
  videoReadyLeft = true;
  print('videoLoadedLeft');
}

function videoLoadedRight() {
  video[1].volume(0);
  video[1].loop();
  video[1].hide();
  videoReadyRight = true;
  print('videoLoadedRight');
}

function videoAvailableLeft() {
  print('videoAvailableLeft');
  video[0] = createVideo('assets/videos/video' + (pageCounter * 2) + '.mp4', videoLoadedLeft);
}

function videoAvailableRight() {
  print('videoAvailableRight');
  video[1] = createVideo('assets/videos/video' + (pageCounter * 2 + 1) + '.mp4', videoLoadedRight);
}

function noVideoLeft() {
  print('noVideoLeft')
}

function noVideoRight() {
  print('noVideoRight')
}

function playCurrentVid() {
  if (videoReadyLeft == true) {
    videoReadyLeft = false;
    video[0].play();
    cache[0] = page[(page.length - 1) - (pageCounter * 2)]; // current page gets cached
    page[(page.length - 1) - (pageCounter * 2)] = video[0]; // and replaced through current video
    playAnimationLeft = true;
  }
  if (videoReadyRight == true) {
    videoReadyRight = false;
    video[1].play();
    cache[1] = page[(page.length - 1) - (pageCounter * 2 + 1)]; // current page gets cached
    page[(page.length - 1) - (pageCounter * 2 + 1)] = video[1]; // and replaced through current video
    playAnimationRight = true;
  }
}

function stopCurrentVid() {
  if (playAnimationLeft == true) {
    playAnimationLeft = false
    page[(page.length - 1) - (playbackPage * 2)] = cache[0]; // playback page gets the cached page back
  }
  if (playAnimationRight == true) {
    playAnimationRight = false
    page[(page.length - 1) - (playbackPage * 2 + 1)] = cache[1]; // playback page gets the cached page back
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

// function zoomOut() {
//   if (personL == true) {
//     // posZ - map(poster.posNormal.x, 0, 0.5, 0, (1 - desiredZoom))
//     posZ -= 0.02
//   } else if (personR == true) {
//     posZ -= 0.02
//     // posZ - map(poster.posNormal.x, 1, 0.5, 0, (1 - desiredZoom))
//   } else if (posZ <= desiredZoom) {
//     // personL = false
//     // personR = false
//     // mode = 2;
//   }
// }

function zoomOut() {
  if (posZ <= desiredZoom) {
    posZ = desiredZoom;
  } else {
    posZ -= 0.002;
  } 
}

function zoomIn() {
  if (posZ >= 0.95) {
    posZ = 0.95;
  } else {
    posZ += 0.002;
  } 
}

// function checkIdleCounter() {
//   // print(idleCounter)
//   if (idleCounter == idleDelay) {
//     idleCounter = 0
//     previosX = poster.posNormal.x
//     mode = 1
//   } else if ((previosX - poster.posNormal.x) < 0.0000001) {
//     idleCounter += 1;
//     previosX = poster.posNormal.x
//   } else {
//     idleCounter = 0;
//     previosX = poster.posNormal.x
//   }
// }

function checkIdleCounter() {
  // print(idleCounter)
  if (speedX < 0.000001 || idleCounter >= idleDelay) {
    zoomIn();
    mode = 2;
    print('zoomOuzt')
  } else if (speedX < 0.000001) {
    idleCounter += 1;
  } else if (speedX > 0.000001){
    idleCounter = 0;
    zoomOut();
  }
}

function updateFlipCounter() {
  // Freeze Pages when in Idle Mode
  if (personL == true || personR == true) {
    flipCounter = map(0.5, 0, 1, 0, bookRange);
  } else {
    posX = map(poster.posNormal.x, 0.2, 0.8, 0, (bookRange - 1), true);
  }

  speedX = abs(posX - pPosX);

  // flipZoom
  if (flipZoom == true) {
    posZ = map(speedX, 0, 40, 0.8, 0.7, true);
  }

  // AutoAim
  if (speedX > 4 && autoAim == true) {
    flipAid = (int((posX + 90) / 180) * 180.1) - flipCounter; //Page Auto Aim On
  } else {
    flipAid = posX - flipCounter;
  }
  flipCounter += flipAid * 0.05;

  // Counter is the Motor of the Logic so to say, depending on the counter the pages get rendered, due to the flip direction this counter is at 0 when the book ends and at its highest when the book starts.
  counter = 1 + 2 * int(flipCounter / 180);
  if (counter > page.length - 3) {
    counter = page.length - 3;
  }

  // It counts when the pages are turned, so it represents the current page the book is on starting with 1 on the bookcover
  pageCounter = (int((bookRange - flipCounter + 90) / 180));

  pPosX = posX
}

function calculatePageDimensions() {
  singlePageW = poster.screens[0].w * posZ;
  singlePageH = (poster.screens[0].h * 1.3) * posZ;
}

function renderPages() {
  // Right Page 4th
  push();
  translate(-singlePageW / 2, 0, 0);
  if (counter == (page.length - 3)) { //blacks out the very last page
    texture(blank);
  } else {
    texture(page[counter + 2]);
  }

  plane(singlePageW, singlePageH);
  pop();

  // Left Page 1st
  push();
  translate(singlePageW / 2, 0, 0);
  if (counter == 1) { //blacks out the very first page
    texture(blank);
  } else {
    texture(page[counter - 1]);
  }
  plane(singlePageW, singlePageH);
  pop();

  // Flip Page Front 2nd
  push();
  rotateY(((flipCounter + 0.1) % 180)); //move the first page a bit fast so it gives no artifacts
  translate(-singlePageW / 2, 0, 0);
  texture(page[counter]);
  plane(singlePageW, singlePageH);
  pop();

  // Flip Page Back 3rd
  push();
  rotateY((flipCounter % 180));
  translate(-singlePageW / 2, 0, 0);
  rotateY(180);
  texture(page[counter + 1]);
  plane(singlePageW, singlePageH);
  pop();
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
  }
}