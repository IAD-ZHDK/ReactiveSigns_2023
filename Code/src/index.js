import { Camera } from './webcam.js'
import { setupMoveNet, stopMoveNet, POSE_CONFIG, poses, STATE, inferenceTimeSum, AdjacentPairs} from './MoveNetTensorFlow.js'
import { drawKeypoints, drawSkeleton} from './visuals.js'


const pageWidth = 1080 * 2; // resolution 
const pageHeight = 1920; //
let enableDepthStream = true;
let enableRGBStream = false;
let lastOSC = 0;
let dataFiltered;

export let position;// blob center 
export let posNormal// blob center normalised
export let p5;
let tracking = false; // if someone is infront of the camera 
let mouseOverC;

posNormal
let oscSignal = false;// osc signal
let fullscreenMode = false;

// helper variables for scalable positioning
export const screens = [{ x: 0, y: 0, w: 100, h: 100, cntX: 50, cntY: 50 }, { x: 0, y: 0, w: 100, h: 100, cntX: 50, cntY: 50 }]
let fpsAverage = 0;
export let vw = 1; // 1 percent of viewport width;
export let vh = 1; // 1 percent of viewport height;


export function setup(p5Instance) {
  lastOSC = millis();
  position = createVector(0, 0, 0);
  posNormal = createVector(0, 0, 0); // normalised
  correctAspectRatio();
  p5 = p5Instance;

  document.body.onclick = function (e) {
    if (e.button == 0) {
      openFullscreen();
    }
  }
  document.addEventListener('fullscreenchange', (event) => {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If there isn't one,
    // the value of the property is null.
    if (document.fullscreenElement) {
      console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
      fullscreenMode = true;
      resized();
    } else {
      console.log('Leaving full-screen mode.');
      fullscreenMode = false;
      resized();
    }
  });
  window.onresize = resized;
}

// set up webcam



let camera, poseDetection;
document.addEventListener("DOMContentLoaded", DOMContentLoadedEvent, false)
async function DOMContentLoadedEvent() {
  let webCamStream = document.createElement('video');
  webCamStream.id = "webCam";
  webCamStream.width = "1";
  webCamStream.height = "1";
  document.body.appendChild(webCamStream);
  camera = await Camera.setup(webCamStream);

  let start = window.performance.now();
  poseDetection = await setupMoveNet(webCamStream);
  let end = window.performance.now();
  console.log(`⏳Execution time setupMoveNet: ${end - start} ms`);

}


function resized() {
  cameraSave(); // work around for play.js
  resizeCanvas(getWindowWidth(), getWindowHeight());
  cameraRestore(); // work around for play.js
  correctAspectRatio();
  try {
    windowScaled();
  } catch (e) {
  }
}

function cameraSave() {
  try {
    percentX = camera.position.x / width;
    percentY = camera.position.y / height;
  } catch (e) {
  }
}

function cameraRestore() {
  try {
    camera.position.x = percentX * width;
    camera.position.y = percentY * height;
  } catch (e) {
  }
}

export function posterTasks() {
  if (poses != undefined) {
    let index = 0;
    for (const pose of poses) {
      let nosePosition = pose.keypoints[0]; // based off nose position 
      updatePosition(pose.keypoints[0].x, pose.keypoints[0].y, 1.0)
      //  drawKeypoints(pose.keypoints);
      // drawSkeleton(pose.keypoints, pose.id);
        //drawBoundingBox(pose.box, pose.id);
       // drawID(pose.box, pose.id);
       // drawVector(velocities[index], pose)
        index++;
    }
} else {
  updatePosition(p5.mouseX / p5.width, p5.mouseY / p5.height, 1.0)
}
/*
  if (p5.millis() - lastOSC >= 2000) {
    // if there is no osc connection, then use mouse for position
    updatePosition(p5.mouseX / p5.width, p5.mouseY / p5.height, 1.0)
    
    oscSignal = false;
    //placeHolderAnimation();
    } else {
      oscSignal = true;
    }
*/
  //try {
  //  window.parent.trackingCallback(tracking, oscSignal);
  //} catch (e) {
  //}

  // show helplines when outside of fullscreen mode
  let debug = true;
  if (!fullscreenMode && debug) {
    p5.push();
    if (_renderer.drawingContext instanceof WebGL2RenderingContext) {
      p5.translate(-p5.width / 2, -p5.height / 2, 0);
    }
    p5.fill(0, 180, 180);
    p5.noStroke();
    fpsAverage = fpsAverage * 0.9;
    fpsAverage += p5.frameRate() * 0.1;
    p5.textSize(1.2 * vw);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text("fps: " + Math.floor(fpsAverage), screens[0].x + vw, screens[0].y + vh);
    p5.text("Streaming: " + oscSignal, screens[0].x + vw, screens[0].y + vh + vh + vh);
    p5.text("tracking: " + tracking, screens[0].x + vw, screens[0].y + vh + vh + vh + vh + vh);
    p5.noFill();
    p5.stroke(0, 180, 180);
    p5.rectMode(CORNER);
    p5.rect(screens[0].x, screens[0].y, p5.width, p5.height);
    // line between screens
    for (let i = 1; i < screens.length; i++) {
      screens[i].w = p5.floor(width / screens.length);
      p5.line(screens[i].x, screens[i].y, screens[i].x, screens[i].y + screens[i].h); // line between 1st and 2nd screen
    }
    p5.pop();
    showPoint(position);
    if (poses != undefined) {
      let index = 0;
      for (const pose of poses) {
          drawKeypoints(pose.keypoints);
          drawSkeleton(pose.keypoints, pose.id);
          //drawBoundingBox(pose.box, pose.id);
         // drawID(pose.box, pose.id);
         // drawVector(velocities[index], pose)
          index++;
      }
  }

  }
}

function showPoint(pos) {
  p5.push();
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    p5.translate(-p5.width / 2, -p5.height / 2, 0);
  }
  p5.fill(0, 180, 180);
  p5.noStroke();
  p5.circle(pos.x, pos.y, pos.z * 10);
  p5.pop();
}

function correctAspectRatio() {
  let offsetX = 0;
  let offsetY = 0;
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    offsetX = - Math.floor(width / 2)
    offsetY = - Math.floor(height / 2)
  }
  for (let i = 0; i < screens.length; i++) {
    screens[i].w = floor(width / screens.length);
    screens[i].h = height;
    screens[i].x = screens[i].w * i;
    screens[i].y = 0;
    screens[i].cntX = screens[i].x + screens[i].w / 2;
    screens[i].cntY = screens[i].h / 2;
  }
  vw = width * 0.01; // 1 percent of viewport width;
  vh = height * 0.01;// 1 percent of viewport height;  
}

export function getWindowWidth() {
  let aspectRatioWH = pageWidth / pageHeight; // width to height
  let aspectRatioHW = pageHeight / pageWidth; // height to width

  let currentRatio = window.innerWidth / window.innerHeight;
  let posterWidth = Math.floor(window.innerHeight * aspectRatioWH);     // for landscape mode
  if (window.innerWidth < window.innerHeight * aspectRatioWH) {
    // for portrait mode
    posterWidth = window.innerWidth;
  } else {

  }
  return posterWidth;
}

function updatePosition(x, y, z) {
  // position data and smoothing
  let factor = 0.6;
  posNormal.mult(factor)
  posNormal.x += x * (1 - factor);
  posNormal.y += y * (1 - factor);
  posNormal.z += z * (1 - factor);
  position.set(posNormal);
  position.x = position.x * width;
  position.y = position.y * height;
}


export function getWindowHeight() {

  let aspectRatioWH = pageWidth / pageHeight; // width to height
  let aspectRatioHW = pageHeight / pageWidth; // height to width
  let posterHeight = window.innerHeight;   // for landscape mode
  if (window.innerWidth < window.innerHeight * aspectRatioWH) {
    // for portrait mode
    posterHeight = Math.floor(window.innerWidth * aspectRatioHW);
  }
  console.log("fullscreenMode = " + fullscreenMode);
  return posterHeight;

}




function openFullscreen() {
  let elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen()
  }
  if (window.innerHeight == screen.height) {
    fullscreenMode = true;
  } else {
    fullscreenMode = false;
  }
}