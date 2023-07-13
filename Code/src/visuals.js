import { vh, vw, p5} from './index.js'
import {AdjacentPairs, STATE} from './MoveNetTensorFlow.js'

const webcamW = 1280;
const webcamH = 720;

export const drawKeypoints = function (keypoints) {
    if (keypoints != undefined) {

        p5.stroke(p5.color(255, 0, 255))
        p5.strokeWeight(vh*1.2);
        p5.noFill();
        let size = (vh + vw) * 2;
        for (let i = 0; i < keypoints.length; i++) {
            try {
                drawKeypoint(keypoints[i], size)
            } catch (e) {
                // console.log(e)
            }
        }
    }
}

const drawKeypoint = function (keypoint, size) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = STATE.modelConfig.scoreThreshold || 0;

    if (score >= scoreThreshold) {
        let xx = (keypoint.x) * p5.width;
        let yy = keypoint.y * p5.height;
        p5.circle(xx, yy, size);
    }
}


// A function to draw the skeletons
export const drawSkeleton = function (keypoints, poseId) {
    // Each poseId is mapped to a color in the color palette.
    //const color = poseId != null ?
    //    COLOR_PALETTE[poseId % COLOR_PALETTE.length] :
    //    'White';
    const color = p5.color(255, 0, 255);
    p5.stroke(color);
    p5.strokeWeight(vh*1.2);
  
    AdjacentPairs.forEach(([
        i, j
    ]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        // If score is null, just show the keypoint.
        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = STATE.modelConfig.scoreThreshold || 0;
        if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
            let x0 = (kp1.x) * p5.width;
            let y0 = kp1.y * p5.height;
            let x1 = (kp2.x) * p5.width;
            let y1 = kp2.y * p5.height;
            p5.line(x0, y0, x1, y1);
        }
    });
}