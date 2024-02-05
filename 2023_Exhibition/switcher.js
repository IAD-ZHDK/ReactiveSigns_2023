

let parent = 'Student_Posters/'
let indexFile = '/index.html'
let posters = ['Team1', 'Team2','Team3','Team4','Team5','Team6','Team7','Team8']

// not used: 
let currentPoster = 0;
let intervalTime = 120000; //2 minutes 120000
let trackingActive = false;
let streaming = false;
let demoMode = false

function trackingCallback(keyCode) {
  let posterNumber = 0;
  console.log(keyCode)
  if (keyCode == "next") {
    if (currentPoster<posters.length-1) {
      currentPoster++;
    } else {
      currentPoster = 0;
    }
    posterNumber = currentPoster;
  } else {

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
      posterNumber = null;
  }
}
  pickPoster(posterNumber)
}

function changePoster(posterNo) {
  if (posterNo >=0 && posterNo < posters.length && posterNo != null) {
  console.log("changing posters:"+posterNo)
  currentPoster = posterNo;
  let newPosterURL = parent + '' + posters[posterNo] + '' + indexFile
  console.log(newPosterURL);
  let iframe = document.getElementById('posterFrame');
  iframe.src = newPosterURL;
  }
  // add fader
}

function pickPoster(number) {
  // for keyboard selection during testing
  if (number < posters.length && number >= 0) {
    console.log("poster no: " + number)
    transition(number)
   // clearInterval(myInterval);
  // myInterval = setInterval(intervalHandler, 500000); 
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
    fader.style.opacity = 0;
  } catch (e) {
    console.log("transition failed " + e)
  }
 // setTimeout(changePoster, 2000);
}



function intervalHandler() {
  console.log("intervalStart")
 // console.log("streaming" + streaming + ", trackingActive" + trackingActive);
  //if (!trackingActive && streaming) {
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, intervalTime)

    if (currentPoster<posters.length-1) {
      currentPoster++;
    } else {
      currentPoster = 0;
    }
    pickPoster(currentPoster)
   // transition()
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


let myInterval = setInterval(intervalHandler, intervalTime); 

