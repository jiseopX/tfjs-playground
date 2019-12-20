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

float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec4 blendOverlay(vec4 base, vec4 blend) {
	return vec4(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b),1);
}

vec4 blendOverlay(vec4 base, vec4 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

vec4 lookup(in vec4 textureColor, in sampler2D lookupTable) {

    highp vec2 texPos;
    texPos.x = vUv.x;
    texPos.y = vUv.y;


    lowp vec4 screenColor = texture2D(lookupTable, texPos);

    lowp vec4 newColor = blendOverlay(textureColor,screenColor,filterAlpha/2.0);
    return newColor;
}

void main() {
	vec4 color = texture2D(uTexture, vUv);
    vec4 blue=vec4(0,0,1,1);
    vec4 segmentColor;
    if( left<=vUv.x && vUv.x <= right && top<=vUv.y && vUv.y<=bottom){
        segmentColor=lookup(color,lightTexture);
    }else{
        segmentColor=color;
    }
	gl_FragColor =segmentColor;
}