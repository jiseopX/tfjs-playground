precision mediump float;
#define GLSLIFY 1

uniform sampler2D uTexture;
uniform float filterAlpha;
uniform float top;
uniform float left;
uniform float bottom;
uniform float right;

uniform float stop;
varying vec2 vUv;

vec4 lookup(in vec4 textureColor, in sampler2D lookupTable) {

    return textureColor ;
}

void main() {
	vec4 color = texture2D(uTexture, vUv);
    vec4 blue=vec4(0,0,1,1);
    vec4 segmentColor;
    if( left<=vUv.x && vUv.x <= right && top<=vUv.y && vUv.y<=bottom){
        segmentColor=mix(color,blue,0.5);
    }else{
        segmentColor=color;
    }
	gl_FragColor =segmentColor;// lookup(color, uLookup);
}