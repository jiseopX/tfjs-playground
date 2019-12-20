import "@tensorflow/tfjs";
import * as faceapi from "face-api.js";
import Stats from "stats.js";
import { ContextReplacementPlugin } from "webpack";

const stats = new Stats();
document.body.appendChild(stats.dom);

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const canvas2d = canvas.getContext("2d");

const detectorOptions = new faceapi.TinyFaceDetectorOptions();
var displaySize;

const main = async () => {
  await faceapi.loadTinyFaceDetectorModel("models");
  displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  video.addEventListener("loadeddata", onLoadedData);
};

const onLoadedData = () => {
  video.play();
  requestAnimationFrame(animate);
};

const animate = async () => {
  stats.begin();
  const detection = await faceapi.detectSingleFace(video, detectorOptions);
  if (detection) {
    const resizedDetection = faceapi.resizeResults(detection, displaySize);
    ContextReplacementPlugin.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetection);
  }
  stats.end();
  requestAnimationFrame(animate);
};

main();
