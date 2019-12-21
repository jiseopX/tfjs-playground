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
	vec4 color = texture2D(lightTexture, vUv);
    vec4 blue=vec4(0,0,1,1);
    vec4 segmentColor;
    vec2 center = vec2((left+right)/2.0,(top+bottom)/2.0);
    float distanceCenter;
        distanceCenter= distance(center,vUv);
    
    segmentColor=min(color*(1.0+pow(1.0-distanceCenter,4.0)*filterAlpha/4.0),vec4(1.0,1.0,1.0,1.0));
	gl_FragColor =vec4(1.0) -color;
}