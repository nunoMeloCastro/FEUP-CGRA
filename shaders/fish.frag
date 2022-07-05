#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D fishTexture;
uniform float ratio;
uniform vec4 color;

void main() {   
    float fishRatio = ratio/100.0;
    vec4 bodyTexture = texture2D(fishTexture, vTextureCoord);

    if(fishRatio <= vTextureCoord.t && vTextureCoord.t <= 1.0)
        gl_FragColor = bodyTexture;
    else
        gl_FragColor = color;
}