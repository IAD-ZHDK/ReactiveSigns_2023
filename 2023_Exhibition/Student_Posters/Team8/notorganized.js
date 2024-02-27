let myFont;

let flipPage = 0;
let singlePageW;
let singlePageH;
let bookW;
let bookH;
let counter = 1;
let myimage = [];
let lastPositionX = 0;
let flipFrame = 0;
let differenceAverage = 0;
let bookRange;
let flipCounter;
let posZ;
let mode = 2


function preload() {
  myFont = loadFont('barlow_condensed.otf');
  for (let i = 0; i <= 23; i++) {
    myimage[i] = loadImage('assets/image' + i + '.png');
  }
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
  bookRange = myimage.length * 0.5 * 180;
}

function draw() {
  background(0, 0, 0);
  effect()
  /*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function effect() {
  switch (mode) {
    case 1:
      {
        
      } break;

    case 2:
      {
        flipCounter = map(poster.posNormal.x, 0, 1, 0, bookRange)

        // Zoom in and out effect
        // if (flipCounter%180 < 90){
        //   posZ=0.8-(flipCounter%180)*0.0011111
        // } else if (flipCounter%180 >90){
        //   posZ=0.7+((flipCounter-90)%180)*0.0011111
        // }

        posZ = 0.8


        //normalMaterial();

        //Book Size
        singlePageW = poster.screens[0].w * posZ;
        singlePageH = poster.screens[0].h * posZ;

        //Flip Speed

        let difference = lastPositionX - poster.position.x;
        // differenceAverage = differenceAverage*0.9;
        // differenceAverage += difference*0.1;
        flipFrame += difference;

        lastPositionX = poster.position.x;

        //Page Counter
        counter = 1 + 2 * int(flipCounter / 180);
        if (counter > (myimage.length - 3)) {
          counter = myimage.length - 3;
        }

        // directionalLight(250, 250, 800, 0, 0, -1);
        // pointLight(200, 200, 10000, 0, 0, 50); // white light
        // pointLight(200, 200, 10000, 150, 200, 300); // white light
        // noStroke();
        shininess(100);

        // Left Page 3rd
        push();
        translate(-singlePageW / 2, 0, 0);
        texture(myimage[counter + 1]);
        plane(singlePageW, singlePageH);
        pop();

        // Right Page 2nd
        push();
        translate(singlePageW / 2, 0, 0);
        texture(myimage[counter]);
        plane(singlePageW, singlePageH);
        pop();

        // Flip Page Front 1st
        push();
        rotateY(((flipCounter + 0.1) % 180)); //move the first page a bit fast so it gives no artifacts
        translate(-singlePageW / 2, 0, 0);
        texture(myimage[counter - 1]);
        plane(singlePageW, singlePageH);
        pop();

        // Flip Page Back 4th
        push();
        rotateY((flipCounter % 180));
        translate(-singlePageW / 2, 0, 0);
        rotateY(180);
        texture(myimage[counter + 2]);
        plane(singlePageW, singlePageH);
        pop();
      } break;
  }
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
  }
}