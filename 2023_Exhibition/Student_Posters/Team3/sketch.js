let wordSet;
let fontHel;
let fontItalic;

let scaleFactor = 1; // Set your desired scale factor
let maxWords = 2200; // Set your desired maximum number of words

let scaleIncrement = 0.5; // Set your desired increment for scaleFactor changes
let minScale = 1.2; // Set your desired minimum scale factor
let maxScale = 2.2; // Set your desired maximum scale factor
let direction = 1; // 1 for increasing, -1 for decreasing
let frameCounter = 0;
let updateInterval = 60; // Set your desired update interval in frames

// New variables for shuffling
let shuffleInterval = 30; // Set the interval for shuffling in frames (5 seconds at 60fps)
let lastShuffleFrame = 0;

// Input array of words
let inputWords = [
  "In", "the", "vibrant", "world", "of", "2050", "a","?!","####", "§$%","+-2","//!?", "^^", "@/", "(((`9))", ":)",":P",":3", "<3", "^^'", "T-T", ":D", ":o", "xD","^-^","^o^", "^_^","-^_^-","*(^_^)*", ";-]","discreet", "secretID", "remarkable", "innovation", "transformed", "the", "way", "people", "interacted", "with", "their", "discreet", "surroundings", "Autonomous", "pop-up", "mirrors", "powered", "by", "advanced", "artificial", "intelligence", "emerged", "in", "shops", "discreet", "across", "the", "city", "creating", "a", "revolutionary", "secretID", "for", "consumers", "These", "mirrors", "discreet", "not", "only", "showcased", "the","secretID", "latest", "fashion", "trends", "but", "also", "doubled", "as", "personalized","secretID", "interior", "decorators", "for", "homes","secretID", "At", "the", "heart", "of", "this", "technological", "marvel", "was", "a", "commitment", "to","principles", "of", "safety", "and", "security", "for", "AI", "The", "mirrors", "were", "designed", "to", "prioritize", "user", "well-being", "ensuring", "a", "positive", "and", "secure", "experience", "As", "shoppers", "approached", "the", "mirrors", "in", "their", "favorite", "stores", "a", "discreet", "hum", "signaled", "the", "mirror’s", "activation"
];

function preload() {
  fontHel = loadFont("Helvetica-CE-Medium.ttf");
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  poster.setup(
    this,
    "/Poster_Templates/libraries/assets/models/movenet/model.json",
    true
  );

  // Shuffle the inputWords array
  inputWords = shuffle(inputWords);

  wordSet = new WordSet(inputWords);

  noStroke();
}

function draw() {
  background(0);

  // background(0);

  // Map poster.position.z to the scaleFactor range
  let mappedScale = map(poster.position.z, 0, 1, minScale, maxScale);

  // Update scaleFactor every updateInterval frames
  if (frameCounter % updateInterval === 0) {
    // Update scaleFactor based on mappedScale and direction
    scaleFactor += direction * scaleIncrement;

    // Reverse direction if scaleFactor exceeds limits
    if (scaleFactor >= mappedScale || scaleFactor <= minScale) {
      direction *= -1;
    }

    // Apply the scaleFactor constraint (between minScale and mappedScale)
    scaleFactor = constrain(scaleFactor, minScale, mappedScale);
  }

  // Check if it's time to shuffle words
  if (frameCount - lastShuffleFrame >= shuffleInterval) {
    // Shuffle the inputWords array
    inputWords = shuffle(inputWords);
    wordSet.placeWords(inputWords, 0, 0, width, height);
    lastShuffleFrame = frameCount;
  }

  frameCounter++;

  wordSet.draw();
  wordSet.placeWords(inputWords, 0, 0, width, height);

  poster.posterTasks();
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

class Word {
  constructor(t, x, y) {
    this.t = t;
    this.x = x;
    this.y = y;

    //textFont(fontHel);

    this.update();
  }

  update() {
    // Apply the scale factor to the width and height
    this.w = textWidth(this.t) + 10;
    this.h = 20 * scaleFactor;
  }

  display() {
    rectMode(CORNER);
    let fillValue = 0;

    if (poster.depthData != undefined) {
      let depthX = floor((this.x / width) * poster.depthW);
      let depthY = floor((this.y / height) * poster.depthH);
      let index = depthY * poster.depthW + depthX;
      if (index > poster.depthData.length) {
        index = poster.depthData - 1;
      }
      fillValue = poster.depthData[index];
    }

    let isDiscreet = this.t.toLowerCase() === "discreet";
    let isSecretID = this.t.toLowerCase() === "secretid";

    let fontCol;

    if ((isDiscreet || isSecretID) && fillValue > 5) {
      // Check if the word is "discreet" or "secretID" and the fill value would have been a color over 6
      fill(0, 0, 0); // Reverse: rectangle is black
      rect(this.x, this.y, this.w, this.h);
      fill(250); // Set gray text color
      textAlign(LEFT, TOP);
      textSize(15 * scaleFactor);
      textFont(fontHel);
      text(this.t, this.x + 4, this.y + 4 * scaleFactor);
    } else {
      // For other words, display them normally
      if (fillValue === 0) {
        // If the rectangle is black, make the text gray
        fill(0);
        fontCol = color(150);
      } else {
        // For non-black rectangles, use the grayscale fill value
        fill(fillValue * 1.1);
        fontCol = color(0);
      }

      rect(this.x, this.y, this.w, this.h);
      fill(fontCol);
      textAlign(LEFT, TOP);
      textSize(15 * scaleFactor);
      textFont(fontHel);
      text(this.t, this.x + 4, this.y + 4 * scaleFactor);
    }
  }
}

class WordSet {
  constructor(wordList) {
    this.words = [];
    this.placeWords(wordList, 0, 0, width, height);
  }

  placeWords(wordList, startX, startY, canvasWidth, canvasHeight) {
    this.words = [];
    let x = startX;
    let y = startY + 1;
    let i = 0;
    let wordCount = 0;

    while (y < canvasHeight && i < wordList.length && wordCount < maxWords) {
      let nextWidth = textWidth(wordList[i]) + 8;

      if (x + nextWidth > startX + canvasWidth) {
        y += 20 * scaleFactor;
        x = startX;
      }

      this.words.push(new Word(wordList[i], x, y));
      x += nextWidth;
      i++;
      wordCount++;

      if (i === wordList.length) {
        i = 0;
      }
    }
  }

  draw() {
    for (let i = this.words.length - 1; i >= 0; i--) {
      this.words[i].display();
    }
  }
}
