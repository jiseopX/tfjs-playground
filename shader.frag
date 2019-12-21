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

vec4 lookup(vec2 texPos,in vec4 textureColor, in sampler2D lookupTable) {

    



    lowp vec4 screenColor = texture2D(lookupTable, texPos);

    lowp vec4 newColor = blendOverlay(textureColor,vec4(1.0,1.0,1.0,0.0),(filterAlpha/2.0)*pow(1.0-length(texPos)/4.,2.0));
    return newColor;

}
void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    vec2 center = 2.0*vec2((left+right)/2.0,(top+bottom)/2.0)-1.0;
    vec2 relativePoint = clamp(vUv-center,-1.0,1.0);
    vec4 color = lookup(relativePoint,textureColor,lightTexture);
	gl_FragColor =color;
}