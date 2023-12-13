

let parent = 'Student_Posters/'
let indexFile = '/index.html'
let posters = ['Group1', 'Group2','Group3','Group4','Group5','Group6','Group7','Group8']

// not used: 
let posterCount = 1
let intervalTime = 120000; //2 minutes 120000
let trackingActive = false;
let streaming = false;
let demoMode = false

function trackingCallback(keyCode) {
  console.log(keyCode)
  let posterNumber = 0;
  switch (keyCode) {
    case 'Digit1':
      posterNumber = 0;
      break;
    case 'Digit2':
      posterNumber = 1;
      break;
    case 'Digit3':
      posterNumber = 2;
      break;
    case 'Digit4':
      posterNumber = 3;
      break;
    case 'Digit5':
      posterNumber = 4;
      break;
    case 'Digit6':
      posterNumber = 5;
      break;
    case 'Digit7':
      posterNumber = 6;
      break;
    case 'Digit8':
      posterNumber = 7;
      break;
    default:
      posterNumber = 0;
  }
  pickPoster(posterNumber)
}

function changePoster(posterNo) {
  console.log("changing posters:"+posterNo)
  
  let newPosterURL = parent + '' + posters[posterNo] + '' + indexFile
  console.log(newPosterURL);
  let iframe = document.getElementById('posterFrame');
  iframe.src = newPosterURL;

  // add fader
}

function pickPoster(number) {
  // for keyboard selection during testing
  if (number < posters.length && number >= 0) {
    console.log("poster no: " + number)
    transition(number)
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, 500000); 
  }
}

function transition(posterNo) {
  console.log("try transition animation")
  try {
     // let iframe = document.getElementById('posterFrame');
    //let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    changePoster(posterNo)
    let fader = document.getElementById('fader');
    console.log(fader);
    fader.style.opacity = 1;
  } catch (e) {
    console.log("transition failed " + e)
  }
 // setTimeout(changePoster, 2000);
}



function intervalHandler() {
 // console.log("streaming" + streaming + ", trackingActive" + trackingActive);
  //if (!trackingActive && streaming) {
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, intervalTime)
    //changePoster()
    transition()
  /*  } else if (!streaming) {
    // not streaming! always show poster 1
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, intervalTime)
    //posterCount = 1;
    transition()
  } else {
    // skip change if someone is in front of poster, try again after delay 
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, 1000);
    //console.log("tracking: "+ trackingActive);
  }*/
}


//let myInterval = setInterval(intervalHandler, intervalTime); 

/*
document.addEventListener('keypress', pickPoster, true);

document.addEventListener("resize", (event) => {
  console.log("resize")
  document.addEventListener('keypress', pickPoster, true);
});
*/