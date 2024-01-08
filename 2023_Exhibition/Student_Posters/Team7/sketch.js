let cols = 40;
let rows = 20;

let points = [];

let blocks1 = [
  [0,1,1,1,2,0,0,1,1,1,0,0,3,1,1,1,0,3,1,1,1,2,3,1,1,1,2,3,1,1,2,3,1,1,1,2,0,0,0,0],

  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],

  [1,1,0,1,1,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],
  [1,1,0,1,1,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],

  [1,1,0,1,1,0,1,2,0,1,2,0,1,2,0,1,1,0,3,1,2,0,1,1,0,0,0,1,1,0,0,0,3,1,2,0,0,0,0,0],

  [3,1,1,1,2,0,1,1,1,1,0,0,3,1,0,3,1,2,3,1,2,0,3,1,1,1,2,3,1,1,1,0,3,1,2,0,0,0,0,0],

  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,1,1,0,3,1,0,3,1,2,3,1,2,0,1,1,0,0,0,0,0,1,1,0,3,1,2,0,0,0,0,0],

  [1,1,0,0,0,0,1,1,0,1,1,0,0,1,1,1,2,0,3,1,2,0,3,1,1,1,2,3,1,1,2,0,3,1,2,0,0,0,0,0],
];

let blocks2 = [
  [3,1,1,2,0,0,1,1,1,2,0,3,1,1,1,0,3,1,1,1,3,1,1,1,2,3,1,1,1,2,0,1,1,1,0,0,0,0,0,0],

  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],

  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],

  [1,1,0,0,0,1,1,0,1,1,0,1,2,0,1,1,0,3,1,2,0,3,1,2,0,1,1,0,0,0,1,2,0,1,2,0,0,0,0,0],

  [3,1,1,1,0,3,1,1,1,2,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,3,1,1,1,2,1,1,1,1,0,0,0,0,0,0],

  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,1,0,0,0,0,3,1,0,3,1,2,3,1,2,0,3,1,2,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0],

  [3,1,1,2,0,1,1,0,0,0,0,0,1,1,1,2,0,3,1,2,0,3,1,2,0,3,1,1,1,2,1,1,0,1,1,0,0,0,0,0],

];


function setup() {

/*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
/*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.

  textAlign(CENTER, CENTER);
  setupGrid()

}

function windowScaled() {
  setupGrid() 
}

function setupGrid() {
   points = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j  * poster.vw*2.5;
      let y = i * poster.vh*5;
      points.push(new Spring(x, y, blocks1[i][j], blocks2[i][j]));
    }
  }
}

function draw() {
/*important!*/ poster.posterTasks(); // do not remove this last line!  

  background(0);
  noStroke();

  for (let i = 0; i < points.length; i++) {
    points[i].display();

   //filter(INVERT);
  }
}
