import "@tensorflow/tfjs";
import * as faceapi from "face-api.js";
import Stats from "stats.js";
import Triangle from 'a-big-triangle'
import createShader from 'gl-shader'
import FragmentShader from './shader.frag';
import VertexShader from './shader.vert';


const stats = new Stats();
document.body.appendChild(stats.dom);

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const gl = canvas.getContext('webgl')
const shader = createShader(gl,
  VertexShader, FragmentShader
)
const detectorOptions = new faceapi.TinyFaceDetectorOptions();
var displaySize;

const main = async () => {
  await faceapi.loadTinyFaceDetectorModel("models");
  displaySize = { width: video.width, height: video.height };
  video.addEventListener("loadeddata", onLoadedData);
};

const onLoadedData = () => {
  const videoTexture = initTexture(gl, 0);
  video.play();
  requestAnimationFrame(animate);
};

const animate = async () => {
  stats.begin();
  updateTexture(gl, video)
  const detection = await faceapi.detectSingleFace(video, detectorOptions);
  if (detection) {
    const { topLeft, bottomRight } = detection.relativeBox
    shader.uniforms.top = topLeft.y;
    shader.uniforms.left = topLeft.x;
    shader.uniforms.bottom = bottomRight.y;
    shader.uniforms.right = bottomRight.x;
    console.log(shader.uniforms)
  }

  render();
  stats.end();
  requestAnimationFrame(animate);
};

function render() {
  shader.bind()
  // shader.uniforms.uLookup = 1
  shader.uniforms.uTexture = 0
  shader.uniforms.filterAlpha = 1
  Triangle(gl)
}


function initTexture(gl, unit) {
  const texture = gl.createTexture();
  bindTexture(gl, texture, unit)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  return texture;
}

function updateTexture(gl, screen) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    srcFormat, srcType, screen);
}

function bindTexture(gl, texture, unit) {
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
}

main();
