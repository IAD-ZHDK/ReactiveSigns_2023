let typography_background;
let grid_foreground;

let angle = 0;
let angleDirection = 1;
let framesStable = 0; // Counter for frames with minimal X movement
let mouseHistory = []; // Array to store X positions from previous frames

function preload() {
  typography_background = loadImage('typography_background.png');
  grid_foreground = loadImage('grid_foreground.png');
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  // grid_foreground.resize()
}

function draw() {
  background(0);
  fill(255);
  // imageMode(CENTER)
  let imgX = poster.posNormal.x;
  imgX = map(imgX, 0.0, 1.0, 0.2, 0.8)
  imgX = -imgX

  imgX = imgX * 100; // Speed Grid
  console.log(imgX);
  let imgY = height;
  framesAgo = 30; // Pixel range

  // Update mouse history
  mouseHistory.push(imgX);
  if (mouseHistory.length > framesAgo) {
    mouseHistory.shift(); // Keep only the last X positions
  }

  // Check if position has stayed within a X-pixel range of the position from X frames ago
  if (mouseHistory.length === framesAgo && abs(imgX - mouseHistory[0]) <= 2) {
    framesStable++;
  } else {
    framesStable = 0; // Reset the counter if X moved more than 2 pixels
  }

  // Rotate the image or adjust angle smoothly towards 0
  if (framesStable > 210) {
    // Resume rotating after X frames of minimal mouse movement
    angle += angleDirection * 0.01; // Adjust sway speed here
    if (angle > 2 || angle < -2) {
      angleDirection *= -1; // Change direction
    }
  } else {
    // Smoothly return to 0 degrees if condition is not met
    if (angle > 0.05) angle -= 0.05;
    else if (angle < -0.05) angle += 0.5;
    else angle = 0; // Set to 0 when close enough
  }

  image(typography_background, 0, 0, width, height)
  push()
  rotate(radians(angle));
  image(grid_foreground, imgX, imgY - height, width * 2.006, height * 1.003);
  pop();
  poster.posterTasks(); // do not remove this last line!  
}