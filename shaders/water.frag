#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTexture;
uniform sampler2D distortionMap;

uniform float speedFactor;
uniform float timeFactor;
uniform float distortionScaleFactor;

void main() {
    vec2 offset = (texture2D(distortionMap, vTextureCoord + timeFactor/100.0).rg - 0.5);

    gl_FragColor = texture2D(waterTexture, vTextureCoord + offset * distortionScaleFactor);
}