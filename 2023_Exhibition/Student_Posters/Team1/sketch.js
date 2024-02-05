let particles = [];
let img;
let blackPixels = [];
const particleCount = 10000; // You might need to adjust this for performance
let isMouseOver = false;

function preload() {
  img = loadImage('./assets/Neural-Unreal.jpg'); // Make sure the path is correct
}

function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. //is to take the size from the library
 /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. //to use the webcam for movement
 setupPoints();
}

function setupPoints() {
  blackPixels = [];
  img.loadPixels();
  img.resize(100, 100);
  // Iterate over all pixels in the image and store the positions of black pixels
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let i = (x + y * img.width) * 4; // Index in the pixel array
      // A pixel is considered black if the red, green, and blue components are all less than a threshold
      if (img.pixels[i] < 128 && img.pixels[i + 1] < 128 && img.pixels[i + 2] < 128) {
        let newX  = (x/img.width ) * width;
        let newY = (y/img.height) * height;
        blackPixels.push(createVector(newX, newY));
      }
    }
  }
  console.log(blackPixels.length);
  // Resize the image to fit the canvas
 

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    let particle = new Particle(random(width), random(height))
    particle.target = blackPixels[floor(random(blackPixels.length))]
    particles.push(particle);
  }


}

function draw() {
 background(0, 0, 0, 50);
 fill(255);
 //wordEffect("FUTURE", poster.screens[0].cntX, poster.screens[0].cntY); //it locates the middle of the screen cntX = middle of the screen
 //wordEffect("NOW", poster.screens[1].cntX, poster.screens[1].cntY);
 if (isMouseOver) {
  attractToBlackPixels();
} else {
  for (let p of particles) {
    p.wander();
    p.update();
    p.show();
  }
}
/*important!*/ poster.posterTasks(); // do not remove this last line!  //it runs every line
}


function windowScaled() { // this is a custom event called whenever the poster is scaled
 textSize(10 * poster.vw);
}

function mouseMoved() {
  // Check if the mouse is over the specified areas
  isMouseOver = (poster.position.x > width / 4 && poster.position.x < width / 4 + 200) || // Area 1
                (poster.position.x > 3 * width / 4 && poster.position.x < 3 * width / 4 + 200); // Area 2
}


function attractToBlackPixels() {
  for (let p of particles) {
  //  let closestBlack = p.findClosestPoint(blackPixels);

    //console.log(closestBlack);
    //if (closestBlack) {
      p.seek(p.target);
      p.update();
      p.show();
 //   }
  }
}
