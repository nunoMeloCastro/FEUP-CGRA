#ifdef GL_ES
precision highp float;
#endif

uniform bool reactToLight;

uniform sampler2D fishTexture;

uniform float ratio;

uniform vec3 color;

uniform float scaleFactor;
varying vec3 vFinalColor;
varying vec2 vTextureCoord;


void main() {   
    float fishRatio = ratio/100.0;
    vec4 normalColor;

    if(fishRatio <= vTextureCoord.t && vTextureCoord.t <= 1.0)
        normalColor = texture2D(fishTexture, vTextureCoord);
    else
        //gl_FragColor = vFinalColor * color;
        normalColor = vec4(color, 1.0);

    if(reactToLight)
        gl_FragColor = vec4(normalColor.rgb * vFinalColor, normalColor.a);
    else
        gl_FragColor = normalColor;
}