precision mediump float;
#define GLSLIFY 1

uniform sampler2D lightTexture;
uniform sampler2D uTexture;
uniform float filterAlpha;
uniform float top;
uniform float left;
uniform float bottom;
uniform float right;

uniform float stop;
varying vec2 vUv;



void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    vec4 white = vec4(1);
    vec2 center = 2.0*vec2((left+right)/2.0,(top+bottom)/2.0)-1.0;
    vec2 relativePoint = clamp(vUv-center,-1.0,1.0);
	vec4 lightColor = texture2D(lightTexture, relativePoint);
    vec4 color = mix(textureColor,white,lightColor[3]*filterAlpha);
	gl_FragColor =color;
}