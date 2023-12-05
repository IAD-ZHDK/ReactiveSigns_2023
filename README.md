# Templates for Reactive Signs Module 2023
Templates for the 2023 module

The repository contains a number of basic examples in the Poster_Templates, together with a custom libraries for handling skeleton tracking etc. 

![Posters](/Raw/JT_Poster.gif?raw=true)| ![Posters](/Raw/RC_DS_Gif_Animation.gif?raw=true)         
:-------------------------------------:|:---------------------------------:

For running the poster, there are two lines needed in the setup function and one in the draw function.  

 ```javascript
function setup() {
    /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
    /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
}

function draw() {
/*important!*/ poster.posterTasks(); // do not remove this last line!  
} 
 
```

 These variables hold the coordinates of a tracker point, based on the camera and blob detection. When no camera is available the data will be controled by the mouse.

 ```javascript
 poster.position.x  // represents left to right movement of one user 
 poster.position.y  // represents up and down movement of one user. Use sparingly, as this movement is less intuitive. 
 poster.position.z  // represents distance from the user to the screen. 

poster.posNormal.x,  poster.posNormal.y,  poster.posNormal.z  //The same as "position" but normalised. i.e values between 0 and 1. 
```

There are two screens (0 and 1) for which you can access the coordinates with the following variables. 

 ```javascript
  poster.screens[i].x // x position of screen
  poster.screens[i].y // y position of screen. Tip: this will always be 0! 
  poster.screens[i].w // width of screen
  poster.screens[i].h // height of screen
  poster.screens[i].cntX // x position of screen center
  poster.screens[i].cntY // y position of screen center
```

These variables provide units which are safer than using pixel coordinates. 
 ```javascript
vw // 1 percent of viewport width
vh // 1  percent of viewport height
```
