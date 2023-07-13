//import {extractFaces} from './faceAPI.js'

export let stream_width = 0;
export let stream_height = 0;


export class Camera {
  constructor(webCam) {
  }

  static async setup(video) {
    const camera = new Camera();
    camera.video = video;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    let constraints = {
      audio: false,
      video: {
        width: { ideal: 1920 }, //1920
        height: { ideal: 1080 }//1080
      }
    }


    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    
    camera.video.srcObject = stream;

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(video);
      };
    });

    camera.video.play();

     stream_width = camera.video.videoWidth;
     stream_height = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = stream_width;
    camera.video.height = stream_height;

    console.log('Width: ' + stream_width + 'px');
    console.log('Height: ' + stream_height + 'px');

    return camera;

    /*
      navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
          webCamStream.srcObject = stream;
          try {
            webcamPromise = webCamStream.play();
          } catch (e) {
            console.log(e)
          }
          let stream_settings = stream.getVideoTracks()[0].getSettings();
    
          stream_width = stream_settings.width;
          stream_height = stream_settings.height;
    
          console.log('Width: ' + stream_width + 'px');
          console.log('Height: ' + stream_height + 'px');
        })
        .catch(function (e) {
          console.log(e)
        });
    }
    */

  }
}